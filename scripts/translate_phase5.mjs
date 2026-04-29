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
      
      let success = false;
      let retries = 3;
      while (!success && retries > 0) {
        try {
          const res = await translate(batchTexts, { to: lang });
          const resArray = Array.isArray(res) ? res : [res];
          
          for (let j = 0; j < batchKeys.length; j++) {
            translated[batchKeys[j]] = resArray[j].text;
          }
          success = true;
        } catch (e) {
          retries--;
          console.error(`Failed batch at ${i} for ${lang}, retries left: ${retries}`);
          if (retries === 0) {
            for (const k of batchKeys) translated[k] = newStrings[k]; // fallback only if all retries fail
          } else {
            await new Promise(r => setTimeout(r, 2000)); // wait 2s before retry
          }
        }
      }
      
      await new Promise(r => setTimeout(r, 200));
    }
    
    fs.writeFileSync(existingPath, JSON.stringify(translated, null, 2));
    console.log(`Saved new strings to ${lang}.json`);
  }
}

main();
