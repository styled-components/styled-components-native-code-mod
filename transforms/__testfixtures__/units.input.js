/* eslint-disable */
import styled, { css } from 'styled-components/native';
import other from 'styled-components/native';

// Transforms numbers
// Uses styled.View notation
styled.View`
  top: 10;
  right: 1.5;
  bottom: 1e3;
  left: -1.5e3;
`;

// Uses styled(View) notation
styled(View)`
  top: 10;
  right: 1.5;
  bottom: 1e3;
  left: -1.5e3;
`;

// Does not attach units twice
styled.View`
  top: 10px;
  right: 1.5px;
  bottom: 1e3px;
  left: -1.5e3px;
`;

// Transforms when using shorthands
styled.View`
  margin: 10 20;
  border-radius: 20 30;
  font: bold italic 12/16 "Helvetica";
`;

// Does not transform unitless numbers
styled.View`
  flex: 1;
  z-index: 5;
`;

// Does not add units to interpolated values in properties that need units
styled.View`
  top: ${top};
  padding: 0 ${horizontal};
  margin: ${top} 0 ${bottom} 0;
`;

// Transforms with substitutions
styled.View`
  color: ${color};
  background-color: ${props => props.backgroundColor};
`;

// Transforms with mixin substitutions
styled.View`
  color: ${color};
  ${props => props.customStyles};
`;

// Transforms font family
styled.View`
  font-family: Helvetica;
`;

// Transforms special cases of shorthands
styled.View`
  flex: 1 2 3;
  font: bold italic 12/16 Helvetica;
  font: 12 Helvetica;
`;

// Transforms css
css`
  top: 10;
`;

// Does not require 'styled' name
other.View`
  top: 10;
`;

// Doesn't incorrectly scope
function test(styled) {
  styled.View`
    top: 10;
  `;
}
