const fs = require('fs');
const path = require('path');

const srcDir = path.join(__dirname, 'src');
const apiPath = path.join(__dirname, 'src', 'utils', 'api');

function walk(dir) {
  let results = [];
  const list = fs.readdirSync(dir);
  list.forEach(file => {
    file = path.join(dir, file);
    const stat = fs.statSync(file);
    if (stat && stat.isDirectory()) {
      results = results.concat(walk(file));
    } else if (file.endsWith('.js') || file.endsWith('.jsx')) {
      results.push(file);
    }
  });
  return results;
}

const files = walk(srcDir);

files.forEach(file => {
  let content = fs.readFileSync(file, 'utf8');
  let changed = false;

  // Replace hardcoded localhost
  if (content.includes('http://localhost:5000')) {
    content = content.replace(/http:\/\/localhost:5000/g, '');
    changed = true;
  }

  // Inject API import
  if (content.includes("import axios from 'axios'") && !file.includes('utils\\api.js')) {
    let relative = path.relative(path.dirname(file), apiPath).replace(/\\/g, '/');
    if (!relative.startsWith('.')) relative = './' + relative;
    
    content = content.replace(/import axios from 'axios';?/g, `import api from '${relative}';`);
    content = content.replace(/axios\./g, 'api.');
    changed = true;
  }

  if (changed) {
    fs.writeFileSync(file, content);
    console.log(`Updated: ${file}`);
  }
});
