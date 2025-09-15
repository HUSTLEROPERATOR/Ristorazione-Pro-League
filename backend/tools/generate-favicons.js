const fs = require('fs');
const path = require('path');
const sharp = require('sharp');
// png-to-ico may export as default in some environments; handle both
const _pngToIcoLib = require('png-to-ico');
const pngToIco = (_pngToIcoLib && _pngToIcoLib.default) ? _pngToIcoLib.default : _pngToIcoLib;

(async () => {
  try {
    const projectRoot = path.resolve(__dirname, '..', '..');
    const sourceFolder = path.join(projectRoot, 'LOGHI E GRAFICHE');
    const outputFolder = path.join(projectRoot, 'backend', 'public', 'favicons');

    // ensure output
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

      const sizes = [512, 192, 180, 128, 64, 32, 16];
      const generatedPngs = [];

      for (const size of sizes) {
        const out = path.join(outputFolder, `${name}-${size}.png`);
        await sharp(src)
          .resize(size, size, { fit: 'contain', background: { r: 0, g:0, b:0, alpha: 0 } })
          .png()
          .toFile(out);
        console.log('Generated', out);
        if ([64,32,16].includes(size)) generatedPngs.push(out);
      }

      // create ico from 64/32/16
      try {
        const icoOut = path.join(outputFolder, `${name}.ico`);
        const buf = await pngToIco(generatedPngs);
        fs.writeFileSync(icoOut, buf);
        console.log('Generated', icoOut);
      } catch (err) {
        console.error('Failed to generate ICO for', name, err.message || err);
      }
    }

    console.log('Favicons generated at', outputFolder);
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
})();