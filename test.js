/* eslint-disable no-console */
const path = require('path');
const fs = require('fs');
const { transform } = require('babel-core');
const plugin = require('./babel-plugin');

const input = fs.readFileSync(path.join(__dirname, 'actual.js'), 'utf8');
const actual = transform(input, {
  plugins: [plugin],
}).code;
const expected = fs.readFileSync(path.join(__dirname, 'expected.js'), 'utf8');

if (actual.trim() === expected.trim()) {
  console.log('Test passed');
} else {
  console.error(actual);
  throw new Error('Expected actual to match expected');
}
