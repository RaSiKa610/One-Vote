import fs from 'fs';
import translate from 'google-translate-api-x';
import path from 'path';

const enHistory = JSON.parse(fs.readFileSync(path.join(process.cwd(), 'src/i18n/en_history.json'), 'utf8'));
const enSchemes = JSON.parse(fs.readFileSync(path.join(process.cwd(), 'src/i18n/en_schemes.json'), 'utf8'));
const newStrings = { ...enHistory, ...enSchemes };

const TARGETS = ['hi', 'mr', 'gu', 'bn', 'ta', 'te', 'kn', 'ml', 'pa'];

async function main() {
  for (const lang of TARGETS) {
    console.log(`Translating new strings to ${lang}...`);
    const existingPath = path.join(process.cwd(), `src/i18n/${lang}.json`);
    let translated = {};
    if (fs.existsSync(existingPath)) {
      translated = JSON.parse(fs.readFileSync(existingPath, 'utf8'));
    }
    
    const keys = Object.keys(newStrings);
    const BATCH_SIZE = 10;
    for (let i = 0; i < keys.length; i += BATCH_SIZE) {
      const batchKeys = keys.slice(i, i + BATCH_SIZE);
      const batchTexts = batchKeys.map(k => newStrings[k]);
      
      try {
        const res = await translate(batchTexts, { to: lang });
        const resArray = Array.isArray(res) ? res : [res];
        
        for (let j = 0; j < batchKeys.length; j++) {
          translated[batchKeys[j]] = resArray[j].text;
        }
      } catch (e) {
        console.error(`Failed batch at ${i} for ${lang}`, e);
        for (const k of batchKeys) translated[k] = newStrings[k];
      }
      
      await new Promise(r => setTimeout(r, 200));
    }
    
    fs.writeFileSync(existingPath, JSON.stringify(translated, null, 2));
    console.log(`Saved new strings to ${lang}.json`);
  }
}

main();
