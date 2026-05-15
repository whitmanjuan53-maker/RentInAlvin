const fs = require('fs');
const path = require('path');
const babel = require('@babel/core');

const SRC = __dirname;
const JS_DIR = path.join(SRC, 'js');

// Clean/create js directory
if (fs.existsSync(JS_DIR)) {
  fs.rmSync(JS_DIR, { recursive: true });
}
fs.mkdirSync(JS_DIR);

// Compile all JSX files to js/
const files = fs.readdirSync(SRC);
const jsxFiles = files.filter(f => f.endsWith('.jsx'));

for (const file of jsxFiles) {
  const srcPath = path.join(SRC, file);
  try {
    const result = babel.transformFileSync(srcPath, {
      presets: ['@babel/preset-react'],
    });
    const outName = file.replace('.jsx', '.js');
    // Wrap compiled output in IIFE to prevent global-scope const redeclaration
    // errors when multiple scripts load on the same page.
    const wrapped = `(function(){\n'use strict';\n${result.code}\n})();`;
    fs.writeFileSync(path.join(JS_DIR, outName), wrapped);
    console.log(`Compiled: ${file} -> js/${outName}`);
  } catch (err) {
    console.error(`Skipped:  ${file} (syntax error: ${err.message.split('\n')[0]})`);
  }
}

// HTML files to process (skip __temp_template and old standalone variants we don't actively maintain)
const htmlFiles = files.filter(f =>
  f.endsWith('.html') &&
  !f.startsWith('__') &&
  !f.includes(' - Standalone') &&
  !f.includes('-print') &&
  !f.includes('ES') &&
  !f.includes('Logos') &&
  !f.includes('Living in') &&
  !f.includes('Vivir en')
);

for (const file of htmlFiles) {
  const filePath = path.join(SRC, file);
  let content = fs.readFileSync(filePath, 'utf8');
  let modified = false;

  // Switch React to production builds
  if (content.includes('react.development.js')) {
    content = content.replace(
      /https:\/\/unpkg\.com\/react@18\.3\.1\/umd\/react\.development\.js/g,
      'https://unpkg.com/react@18.3.1/umd/react.production.min.js'
    );
    modified = true;
  }
  if (content.includes('react-dom.development.js')) {
    content = content.replace(
      /https:\/\/unpkg\.com\/react-dom@18\.3\.1\/umd\/react-dom\.development\.js/g,
      'https://unpkg.com/react-dom@18.3.1/umd/react-dom.production.min.js'
    );
    modified = true;
  }

  // Remove Babel standalone script tag
  if (content.includes('@babel/standalone')) {
    content = content.replace(
      /<script src="https:\/\/unpkg\.com\/@babel\/standalone@[^"]+"[^>]*><\/script>\n?/g,
      ''
    );
    modified = true;
  }

  // Replace text/babel .jsx references with regular js/ scripts
  // Handles optional ?v=N query strings
  if (content.includes('type="text/babel"')) {
    content = content.replace(
      /<script type="text\/babel" src="([^"]+?)\.jsx(?:\?v=\d+)?"><\/script>/g,
      '<script src="js/$1.js"></script>'
    );
    modified = true;
  }

  if (modified) {
    fs.writeFileSync(filePath, content);
    console.log(`Processed: ${file}`);
  } else {
    console.log(`Skipped:   ${file} (no changes needed)`);
  }
}

console.log('\nBuild complete. Compiled JS files are in js/');
