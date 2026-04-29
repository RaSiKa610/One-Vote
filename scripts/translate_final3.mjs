import fs from 'fs';
import translate from 'google-translate-api-x';
import path from 'path';

const enFinal3 = JSON.parse(fs.readFileSync(path.join(process.cwd(), 'src/i18n/en_final3.json'), 'utf8'));

const TARGETS = ['hi', 'mr', 'gu', 'bn', 'ta', 'te', 'kn', 'ml', 'pa'];

async function main() {
  for (const lang of TARGETS) {
    console.log(`Translating final3 to ${lang}...`);
    // read existing
    const existingPath = path.join(process.cwd(), `src/i18n/${lang}.json`);
    let translated = {};
    if (fs.existsSync(existingPath)) {
      translated = JSON.parse(fs.readFileSync(existingPath, 'utf8'));
    }
    
    const keys = Object.keys(enFinal3);
    const BATCH_SIZE = 10;
    for (let i = 0; i < keys.length; i += BATCH_SIZE) {
      const batchKeys = keys.slice(i, i + BATCH_SIZE);
      const batchTexts = batchKeys.map(k => enFinal3[k]);
      
      try {
        const res = await translate(batchTexts, { to: lang });
        const resArray = Array.isArray(res) ? res : [res];
        
        for (let j = 0; j < batchKeys.length; j++) {
          translated[batchKeys[j]] = resArray[j].text;
        }
      } catch (e) {
        console.error(`Failed final3 batch at ${i} for ${lang}`, e);
        for (const k of batchKeys) translated[k] = enFinal3[k];
      }
      
      await new Promise(r => setTimeout(r, 200));
    }
    
    fs.writeFileSync(existingPath, JSON.stringify(translated, null, 2));
    console.log(`Saved final3 to ${lang}.json`);
  }
}

main();
