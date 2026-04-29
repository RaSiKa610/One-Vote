import fs from 'fs';
import translate from 'google-translate-api-x';
import path from 'path';

const en = JSON.parse(fs.readFileSync(path.join(process.cwd(), 'src/i18n/en.json'), 'utf8'));

const TARGETS = ['hi', 'mr', 'gu', 'bn', 'ta', 'te', 'kn', 'ml', 'pa'];

async function main() {
  for (const lang of TARGETS) {
    console.log(`Translating to ${lang}...`);
    const translated = {};
    const keys = Object.keys(en);
    
    // Process in batches of 10 to avoid rate limiting or large payload failures
    const BATCH_SIZE = 10;
    for (let i = 0; i < keys.length; i += BATCH_SIZE) {
      const batchKeys = keys.slice(i, i + BATCH_SIZE);
      const batchTexts = batchKeys.map(k => en[k]);
      
      try {
        const res = await translate(batchTexts, { to: lang });
        // res can be an array if input is an array
        const resArray = Array.isArray(res) ? res : [res];
        
        for (let j = 0; j < batchKeys.length; j++) {
          translated[batchKeys[j]] = resArray[j].text;
        }
      } catch (e) {
        console.error(`Failed on batch starting at index ${i} for ${lang}`, e);
        // fallback to english
        for (const k of batchKeys) translated[k] = en[k];
      }
      
      // tiny sleep
      await new Promise(r => setTimeout(r, 200));
    }
    
    fs.writeFileSync(path.join(process.cwd(), `src/i18n/${lang}.json`), JSON.stringify(translated, null, 2));
    console.log(`Saved ${lang}.json`);
  }
}

main();
