import fs from 'fs';
import translate from 'google-translate-api-x';

const TARGETS = ['hi', 'mr', 'gu', 'bn', 'ta', 'te', 'kn', 'ml', 'pa'];
const newKeys = [
  'phone_title','phone_subtitle','phone_label','phone_hint','phone_invalid',
  'phone_send_error','send_otp','sending','otp_title','otp_subtitle','otp_label',
  'otp_invalid','otp_wrong','verifying','verify_otp','resend_otp','go_back',
  'welcome_title','welcome_desc','verified_user','not_logged_in'
];
const en = JSON.parse(fs.readFileSync('src/i18n/en.json', 'utf8'));
const texts = newKeys.map(k => en[k]);

async function main() {
  for (const lang of TARGETS) {
    const p = `src/i18n/${lang}.json`;
    const j = JSON.parse(fs.readFileSync(p, 'utf8'));
    let success = false, retries = 3;
    while (!success && retries > 0) {
      try {
        const res = await translate(texts, { to: lang });
        const arr = Array.isArray(res) ? res : [res];
        newKeys.forEach((k, i) => { j[k] = arr[i].text; });
        success = true;
      } catch(e) {
        retries--;
        if (retries === 0) newKeys.forEach((k, i) => { j[k] = texts[i]; });
        else await new Promise(r => setTimeout(r, 2000));
      }
    }
    fs.writeFileSync(p, JSON.stringify(j, null, 2));
    console.log('Translated auth strings for', lang);
    await new Promise(r => setTimeout(r, 500));
  }
  console.log('Done!');
}
main();
