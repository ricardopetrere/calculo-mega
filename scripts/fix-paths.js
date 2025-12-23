const fs = require('fs');
const path = require('path');

const distDir = path.join(__dirname, '../dist');
const basePath = '/calculo-mega';

// Move _expo e favicon para dentro de calculo-mega
const calculoMegaDir = path.join(distDir, 'calculo-mega');
if (!fs.existsSync(calculoMegaDir)) {
  fs.mkdirSync(calculoMegaDir, { recursive: true });
}

const expoDir = path.join(distDir, '_expo');
const faviconPath = path.join(distDir, 'favicon.ico');

if (fs.existsSync(expoDir)) {
  const newExpoDir = path.join(calculoMegaDir, '_expo');
  if (fs.existsSync(newExpoDir)) {
    fs.rmSync(newExpoDir, { recursive: true, force: true });
  }
  fs.renameSync(expoDir, newExpoDir);
}

if (fs.existsSync(faviconPath)) {
  fs.renameSync(faviconPath, path.join(calculoMegaDir, 'favicon.ico'));
}

// Corrige os HTMLs
function fixHTMLFiles(dir) {
  const files = fs.readdirSync(dir);
  files.forEach(file => {
    const filePath = path.join(dir, file);
    const stat = fs.statSync(filePath);
    if (stat.isDirectory()) {
      fixHTMLFiles(filePath);
    } else if (file.endsWith('.html')) {
      let content = fs.readFileSync(filePath, 'utf8');
      content = content.replace(/src="\/_expo/g, `src="${basePath}/_expo`);
      content = content.replace(/href="\/_expo/g, `href="${basePath}/_expo`);
      content = content.replace(/href="\/favicon/g, `href="${basePath}/favicon`);
      fs.writeFileSync(filePath, content, 'utf8');
    }
  });
}

fixHTMLFiles(distDir);
console.log('Paths fixed and assets moved!');
