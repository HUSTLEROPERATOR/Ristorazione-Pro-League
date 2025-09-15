const fs = require('fs');
const path = require('path');
const sharp = require('sharp');

(async () => {
  try {
    const projectRoot = path.resolve(__dirname, '..', '..');
    const sourceFolder = path.join(projectRoot, 'LOGHI E GRAFICHE');
    const outputFolder = path.join(projectRoot, 'backend', 'public', 'images');
    fs.mkdirSync(outputFolder, { recursive: true });

    const tops = [
      '01U8vspIR4mlslDQvPXMFA.jpg',
      '9qtCJ0izRsajUwT0xiPYaA.webp',
      'ELPANTvsTMKxxom1ptPO3A.webp'
    ];

    for (const file of tops) {
      const src = path.join(sourceFolder, file);
      if (!fs.existsSync(src)) { console.warn('Source not found:', src); continue; }
      const name = path.parse(file).name;

      const outWebp = path.join(outputFolder, `${name}.webp`);
      const outPng = path.join(outputFolder, `${name}.png`);

      await sharp(src)
        .resize({ width: 800, height: 800, fit: 'contain', background: { r:255,g:255,b:255,alpha:0 } })
        .webp({ quality: 80 })
        .toFile(outWebp);
      console.log('Generated', outWebp);

      await sharp(src)
        .resize({ width: 800, height: 800, fit: 'contain', background: { r:255,g:255,b:255,alpha:0 } })
        .png({ quality: 90 })
        .toFile(outPng);
      console.log('Generated', outPng);
    }

    console.log('Images generated at', outputFolder);
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
})();