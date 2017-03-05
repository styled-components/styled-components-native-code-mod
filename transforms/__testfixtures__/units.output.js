/* eslint-disable */
import styled from 'styled-components/native';
import other from 'styled-components/native';

// Transforms numbers
// Uses styled.View notation
styled.View`
  top: 10px;
  right: 1.5px;
  bottom: 1e3px;
  left: -1.5e3px;
`;

// Uses styled(View) notation
styled(View)`
  top: 10px;
  right: 1.5px;
  bottom: 1e3px;
  left: -1.5e3px;
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
  margin: 10px 20px;
  border-radius: 20px 30px;
  font: bold italic 12px/16px "Helvetica";
`;

// Does not transform unitless numbers
styled.View`
  flex: 1;
  z-index: 5;
`;

// Transforms with substitutions
styled.View`
  color: ${color};
  background-color: ${props => props.backgroundColor};
`;

// Does not require 'styled' name
other.View`
  top: 10px;
`;

// Doesn't incorrectly scope
function test(styled) {
  styled.View`
    top: 10;
  `;
}

// Transforms font family
styled.View`
  font-family: "Helvetica";
`;
