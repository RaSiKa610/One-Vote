import fs from 'fs';

const TARGET_LANGS = ['hi', 'mr', 'gu', 'bn', 'ta', 'te', 'kn', 'ml', 'pa'];

const corrections = {
  hi: { l4: "मायावती", l5: "कांशीराम" },
  mr: { l4: "मायावती", l5: "कांशीराम" },
  gu: { l4: "માયાવતી", l5: "કાંશીરામ" },
  bn: { l4: "মায়াবতী", l5: "कांशीराम" },
  ta: { l4: "மாயாவதி", l5: "கன்சிராம்" },
  te: { l4: "మాయావతి", l5: "కాన్షీరామ్" },
  kn: { l4: "ಮಾಯಾವತಿ", l5: "ಕಾನ್ಶೀರಾಮ್" },
  ml: { l4: "മായാവതി", l5: "കാൻഷി റാം" },
  pa: { l4: "ਮਾਇਆਵਤੀ", l5: "ਕਾਂਸ਼ੀ ਰਾਮ" }
};

TARGET_LANGS.forEach(lang => {
  const p = `src/i18n/${lang}.json`;
  if (fs.existsSync(p)) {
    const data = JSON.parse(fs.readFileSync(p, 'utf8'));
    if (corrections[lang]) {
      data.era3_leader4_name = corrections[lang].l4;
      data.era3_leader5_name = corrections[lang].l5;
    }
    fs.writeFileSync(p, JSON.stringify(data, null, 2));
  }
});
console.log("Fixed leaders names in all languages.");
