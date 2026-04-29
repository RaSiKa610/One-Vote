import fs from 'fs';
import translate from 'google-translate-api-x';

const enSchemes = JSON.parse(fs.readFileSync('src/i18n/en_schemes.json', 'utf8'));
const TARGETS = ['hi', 'mr', 'gu', 'bn', 'ta', 'te', 'kn', 'ml', 'pa'];

async function main() {
  for (const lang of TARGETS) {
    const p = `src/i18n/${lang}.json`;
    if (!fs.existsSync(p)) continue;
    
    let j = JSON.parse(fs.readFileSync(p, 'utf8'));
    let toTranslateKeys = [];
    let toTranslateTexts = [];

    // Find keys in en_schemes that are either missing in lang.json, OR identical to English (which means it fell back)
    for (const [key, text] of Object.entries(enSchemes)) {
      if (!j[key] || j[key] === text) {
        toTranslateKeys.push(key);
        toTranslateTexts.push(text);
      }
    }

    if (toTranslateKeys.length > 0) {
      console.log(`Need to translate ${toTranslateKeys.length} keys for ${lang}`);
      try {
        const res = await translate(toTranslateTexts, { to: lang });
        const resArray = Array.isArray(res) ? res : [res];
        for (let i = 0; i < toTranslateKeys.length; i++) {
          j[toTranslateKeys[i]] = resArray[i].text;
        }
        fs.writeFileSync(p, JSON.stringify(j, null, 2));
        console.log(`Fixed translations for ${lang}`);
      } catch (e) {
        console.error(`Error translating for ${lang}`, e);
      }
      await new Promise(r => setTimeout(r, 1000));
    } else {
      console.log(`${lang} is fully translated for schemes.`);
    }
  }
}
main();
