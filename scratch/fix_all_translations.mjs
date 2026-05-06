import fs from 'fs';
import { TranslationServiceClient } from '@google-cloud/translate';

const TARGET_LANGS = ['hi', 'mr', 'gu', 'bn', 'ta', 'te', 'kn', 'ml', 'pa'];
const en = JSON.parse(fs.readFileSync('src/i18n/en.json', 'utf8'));

// Note: Official API requires GOOGLE_APPLICATION_CREDENTIALS or an API Key
// For simplicity in a script, we'll assume the environment is authenticated
const translationClient = new TranslationServiceClient();

async function translateChunk(texts, lang) {
  try {
    const projectId = process.env.VITE_FIREBASE_PROJECT_ID || 'one-vote-41412';
    const location = 'global';

    const request = {
      parent: `projects/${projectId}/locations/${location}`,
      contents: texts,
      mimeType: 'text/plain',
      sourceLanguageCode: 'en',
      targetLanguageCode: lang,
    };

    const [response] = await translationClient.translateText(request);
    return response.translations.map(t => t.translatedText);
  } catch (e) {
    console.error(`Error translating to ${lang}:`, e);
    console.log("Ensure you have enabled the Cloud Translation API and set up credentials.");
    return texts; // Fallback to English on error
  }
}

async function fixTranslations() {
  for (const lang of TARGET_LANGS) {
    const p = `src/i18n/${lang}.json`;
    if (!fs.existsSync(p)) continue;
    
    const target = JSON.parse(fs.readFileSync(p, 'utf8'));
    const keysToTranslate = [];
    const valuesToTranslate = [];

    for (const key in en) {
      const enVal = en[key];
      const targetVal = target[key];

      // Translate if missing or if it's identical to English (and not a short technical string like "SVEEP")
      const isUntranslated = !targetVal || (targetVal === enVal && enVal.length > 5 && !/^[A-Z0-9\s]+$/.test(enVal));
      
      if (isUntranslated) {
        keysToTranslate.push(key);
        valuesToTranslate.push(enVal);
      }
    }

    if (keysToTranslate.length > 0) {
      console.log(`Translating ${keysToTranslate.length} keys for ${lang}...`);
      
      // Translate in chunks of 20 to avoid API limits
      const chunkSize = 20;
      for (let i = 0; i < valuesToTranslate.length; i += chunkSize) {
        const chunk = valuesToTranslate.slice(i, i + chunkSize);
        const translated = await translateChunk(chunk, lang);
        
        chunk.forEach((_, idx) => {
          const key = keysToTranslate[i + idx];
          target[key] = translated[idx];
        });
        
        await new Promise(r => setTimeout(r, 1000)); // Rate limiting
      }
      
      fs.writeFileSync(p, JSON.stringify(target, null, 2));
      console.log(`Updated ${lang}.json`);
    } else {
      console.log(`${lang}.json is already fully translated.`);
    }
  }
}

fixTranslations();
