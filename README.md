# styled-components-native-code-mod

Transforms v1 styled-components to v2. It adds `px` units where relevant.

In

```js
styled.View`
  top: 10;
  flex: 1;
  font: bold 12/16 "Helvetica";
  color: ${props => props.color};
`;
```

Out

```js
styled.View`
  top: 10px;
  flex: 1;
  font: bold 12px/16px "Helvetica";
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
