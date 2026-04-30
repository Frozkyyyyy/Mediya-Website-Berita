const fs = require('fs');
const path = require('path');

const navbarHtml = fs.readFileSync(path.join(__dirname, 'components', 'navbar.html'), 'utf8');
// We just extract the <nav class="navbar">...</nav> part
const navMatch = navbarHtml.match(/<nav class="navbar">[\s\S]*?<\/nav>/);
if (!navMatch) {
  console.error("Could not find <nav class='navbar'> in components/navbar.html");
  process.exit(1);
}
const navContent = navMatch[0];

const dirsToScan = [
  __dirname, // root
  path.join(__dirname, 'kategori'),
  path.join(__dirname, 'tentang'),
  path.join(__dirname, 'berita') // this will need recursive scan
];

function scanRecursively(dir, fileList) {
  const files = fs.readdirSync(dir);
  files.forEach(file => {
    const fullPath = path.join(dir, file);
    const stat = fs.statSync(fullPath);
    if (stat.isDirectory()) {
      if (file !== 'node_modules' && file !== 'components') {
        scanRecursively(fullPath, fileList);
      }
    } else if (file.endsWith('.html')) {
      fileList.push(fullPath);
    }
  });
}

let htmlFiles = [];
scanRecursively(__dirname, htmlFiles);
// Filter out components
htmlFiles = htmlFiles.filter(f => !f.includes(path.join(__dirname, 'components')));

let updatedCount = 0;
htmlFiles.forEach(file => {
  let content = fs.readFileSync(file, 'utf8');
  // Find existing <nav class="navbar">...</nav>
  const replaced = content.replace(/<!-- NAVBAR -->[\s\S]*?<nav class="navbar">[\s\S]*?<\/nav>|<!-- NAVBAR START -->[\s\S]*?<!-- NAVBAR END -->|<nav class="navbar">[\s\S]*?<\/nav>/, `<!-- NAVBAR -->\n  ${navContent}`);
  
  if (replaced !== content) {
    fs.writeFileSync(file, replaced, 'utf8');
    console.log('Updated navbar in: ' + file.replace(__dirname, ''));
    updatedCount++;
  }
});

console.log(`\nUpdated navbar in ${updatedCount} files.`);
