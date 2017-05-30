console.log(`styled-components-native-code-mod cannot be used on its own. Please use the following steps,

npm install -g jscodeshift
npm install https://github.com/styled-components/styled-components-native-code-mod
jscodeshift -t styled-components-native-code-mod/transforms/units <path>
`);
