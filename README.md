# styled-components-native-code-mod

Transforms v1 styled-components to v2. It

* Adds `px` units where relevant
* Fixes `font-family` to include quotes

In

```js
styled.View`
  top: 10;
  flex: 1;
  margin: 10 20;
  font-family: Georgia;
  color: ${props => props.color};
`;
```

Out

```js
styled.View`
  top: 10px;
  flex: 1;
  margin: 10px 20px;
  font-family: "Georgia";
  color: ${props => props.color};
`;
```

# Caveats

If you interpolate values that need units, you'll have to do that manually.

```js
const value = '10px';

styled.View`
  top: ${value};
`;
```
