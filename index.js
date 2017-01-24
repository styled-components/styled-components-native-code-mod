#!/usr/bin/env node
const path = require('path');
const fs = require('fs');
const { transform } = require('babel-core');
const plugin = require('./babel-plugin');

const files = process.argv.slice(2).map(file => path.resolve(process.cwd(), file));

const transformed = [];
const failed = [];
files.forEach((file) => {
  try {
    const source = fs.readFileSync(file, 'utf8');
    let output = transform(source, {
      babelrc: false,
      plugins: [plugin],
    }).code;

    const fileTerminalWhitespace = source.match(/\s*$/);
    output += fileTerminalWhitespace[0];

    fs.writeFileSync(file, output, 'utf8');
    transformed.push(file);
  } catch (e) {
    console.log(`Failed to transform ${file}`);
    failed.push(file);
  }
});

console.log(`Transformed ${transformed.length} files (${failed.length} failed)`);
