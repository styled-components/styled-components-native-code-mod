/* eslint-disable */
import styled from 'styled-components/native';
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

// Transforms with substitutions
styled.View`
  color: ${color};
  background-color: ${props => props.backgroundColor};
`;

// Does not require 'styled' name
other.View`
  top: 10;
`;
