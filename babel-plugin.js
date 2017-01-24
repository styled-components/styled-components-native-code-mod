/* eslint-disable no-param-reassign */
/* eslint comma-dangle: ["error", {
  "arrays": "always-multiline",
  "objects": "always-multiline",
  "imports": "always-multiline",
  "exports": "always-multiline"
}] */
const postcss = require('postcss');
const _ = require('lodash/fp');
const t = require('babel-types');

const tagTypes = {
  CallExpression: node => node.callee,
  MemberExpression: node => node.object,
};

const simpleNumberReplacementProps = [
  // All tests have hyhens removed and are lower case
  /^border(top|bottom)(right|left)radius$/,
  /^borderradius$/,
  /^border(top|right|bottom|left|horizontal|vertical)?width$/,
  /^border$/,
  /^(margin|padding)(top|right|bottom|left|horizontal|vertical)?$/,
  /^(top|right|left|bottom)$/,
  /^(min|max)?(width|height)$/,
  /^flexbasis$/,
  /^font(size)?$/,
  /^lineheight$/,
];

const isSimpleNumberReplacement = testProp =>
  _.some(re => re.test(testProp), simpleNumberReplacementProps);

const replaceSimpleNumbers = value =>
  value.replace(/([+-]?(?:\d*\.)?\d+(?:[Ee][+-]?\d+)?)(?!\d|\.|[Ee]|px|substitution)/g, '$1px');

module.exports = () => ({
  visitor: {
    TaggedTemplateExpression(path) {
      const { quasi, tag } = path.node;
      if (!(tag.type in tagTypes)) return;

      // Get the identifier for styled in either styled.View`...` or styled(View)`...`
      // Note we aren't checking the name of the callee
      const callee = tagTypes[tag.type](tag);
      if (!t.isIdentifier(callee)) return;

      // Find the import statement for the `styled` part
      const importSpecifier = _.get([callee.name, 'path'], path.scope.bindings);
      if (!importSpecifier || !t.isImportDefaultSpecifier(importSpecifier)) return;
      const importDeclaration = importSpecifier.findParent(t.isImportDeclaration);
      if (!importDeclaration) return;
      const source = importDeclaration.node.source.value;
      // And make sure it's only for styled-components/native
      if (source !== 'styled-components/native') return;

      const { quasis, expressions } = quasi;
      if (!quasis[0].value.cooked) return; // Caused when calling with a node that we replaced

      // Substitute all ${interpolations} with arbitrary test that we can find later
      // This is so we can shove it in postCSS
      const substitutionNames = expressions.map((value, index) => `__${index}substitution__`);
      const cssText =
        quasis[0].value.cooked +
        substitutionNames.map((name, index) => name + quasis[index + 1].value.cooked).join('');
      const substitutionMap = _.fromPairs(_.zip(substitutionNames, expressions));

      // Transform all simple values
      const root = postcss.parse(cssText);
      root.walkDecls((decl) => {
        const testProp = decl.prop.replace(/-/, '').toLowerCase();
        if (isSimpleNumberReplacement(testProp)) decl.value = replaceSimpleNumbers(decl.value);
        if (/fontfamily/.test(testProp)) decl.value = `"${decl.value}"`;
      });

      const nextCssText = String(root);

      const substititionNames = Object.keys(substitutionMap);
      const substitionNamesRegExp = new RegExp(`(${substititionNames.join('|')})`, 'g');

      // Create new template literal using transformed CSS and previous expressions
      const allValues = !_.isEmpty(substitutionMap)
        ? _.chunk(2, nextCssText.split(substitionNamesRegExp))
        : [[nextCssText]];
      const quasiValues = _.map(0, allValues);
      const expressionValues = _.dropLast(1, _.map(1, allValues));

      const newQuasis = [].concat(
        _.map(raw => t.templateElement({ raw }), _.initial(quasiValues)),
        t.templateElement({ raw: _.last(quasiValues) }, true)
      );
      const newExpressions = _.map(_.propertyOf(substitutionMap), expressionValues);
      const newQuasi = t.templateLiteral(newQuasis, newExpressions);

      const newTaggedTemplateExpression = t.taggedTemplateExpression(tag, newQuasi);

      // Drop in the new tagged template expression
      path.replaceWith(newTaggedTemplateExpression);
    },
  },
});
