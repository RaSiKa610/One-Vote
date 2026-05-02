import fs from 'fs';
import translate from 'google-translate-api-x';
import path from 'path';

const en = JSON.parse(fs.readFileSync(path.join(process.cwd(), 'src/i18n/en.json'), 'utf8'));

const NEW_KEYS = [
  "vt_hub_title", "vt_hub_sub", "vt_general_title", "vt_general_desc", "vt_service_title", "vt_service_desc", 
  "vt_overseas_title", "vt_overseas_desc", "vt_pwd_title", "vt_pwd_desc", "htv_title", "htv_sub", 
  "htv_step1", "htv_step2", "htv_step3", "htv_step4", "htv_step5", "htv_step6", "htv_step7", 
  "ast_ans_pm", "ast_ans_president", "ast_ans_capital", "ast_ans_eci", "ast_ans_age", 
  "ast_ans_constitution", "ast_ans_independence", "ast_ans_first_voter", "ast_political_info_response", 
  "analytics_title", "analytics_sub", "analytics_turnout", "analytics_gender", "analytics_age", 
  "analytics_growth", "analytics_first_time", "analytics_states", "guest_user", "voter_type_not_set", "sign_in_google",
  "vaf_title", "vaf_desc", "vaf_members", "vaf_activities", "vt_general_long", "vt_service_long", "vt_overseas_long", 
  "vt_pwd_long", "vt_reg_online", "vt_reg_portal", "vt_reg_status", "vt_offline_title", "vt_offline_desc", 
  "vt_service_forms", "vt_proxy_title", "vt_proxy_desc", "vt_overseas_docs", "vt_pwd_facilitation", 
  "vt_gen_eligibility", "vt_gen_offline", "vt_gen_forms", "vt_service_eligibility", "vt_service_etpbs", 
  "vt_overseas_eligibility", "vt_overseas_vote", "vt_pwd_eligibility", "vt_pwd_form", "elc_title", "elc_sub", 
  "resources_title", "helpline_title",
  "service_voters", "how_to_enroll", "ETPBS", "overseas_electors", "documents_required", "pwd_electors", "facilitation",
  "quiz_q1", "quiz_q1_o1", "quiz_q1_o2", "quiz_q1_o3", "quiz_q1_o4", "quiz_q1_exp",
  "quiz_q2", "quiz_q2_o1", "quiz_q2_o2", "quiz_q2_o3", "quiz_q2_o4", "quiz_q2_exp",
  "quiz_q3", "quiz_q3_o1", "quiz_q3_o2", "quiz_q3_o3", "quiz_q3_o4", "quiz_q3_exp",
  "quiz_q4", "quiz_q4_o1", "quiz_q4_o2", "quiz_q4_o3", "quiz_q4_o4", "quiz_q4_exp",
  "quiz_q5", "quiz_q5_o1", "quiz_q5_o2", "quiz_q5_o3", "quiz_q5_o4", "quiz_q5_exp",
  "overall_pct", "female_pct", "turnout_pct", "Male", "Female", "Third Gender", "18-25", "26-40", "41-60", "60+", "electors_cr",
  "Lakshadweep", "Assam", "West Bengal", "Kerala", "Tamil Nadu", "Maharashtra", "Uttar Pradesh", "Bihar",
  "ast_ans_cm", "ast_ans_edu_min", "ast_ans_lok_sabha", "ast_ans_evm", "ast_ans_gk_generic",
  "gk_era_hegemony", "gk_era_populism", "gk_era_coalitions", "gk_era_dominant",
  "gk_leader_patel", "gk_leader_rao", "gk_leader_vajpayee", "gk_leader_manmohan_long",
  "gk_alliance_nda", "gk_alliance_india",
  "gk_cm_ap", "gk_cm_ar", "gk_cm_as", "gk_cm_br", "gk_cm_cg", "gk_cm_dl", "gk_cm_ga", "gk_cm_gj", "gk_cm_hr", "gk_cm_hp", "gk_cm_jk", "gk_cm_jh", "gk_cm_ka", "gk_cm_kl", "gk_cm_mp", "gk_cm_mh", "gk_cm_mn", "gk_cm_od", "gk_cm_rj", "gk_cm_sk", "gk_cm_tn", "gk_cm_tg", "gk_cm_tr", "gk_cm_up", "gk_cm_uk", "gk_cm_wb",
  "gk_v101_what", "gk_v101_importance", "gk_v101_constituency", "gk_v101_eligibility", "gk_v101_ineligibility", "gk_v101_contest_age", "gk_v101_mcc", "gk_v101_polling_steps", "gk_v101_secrecy", "gk_v101_nota", "gk_v101_audit", "gk_v101_primary_vs_general", "gk_v101_electoral_college"
];

const TARGETS = ['hi', 'mr', 'gu', 'bn', 'ta', 'te', 'kn', 'ml', 'pa'];

async function main() {
  for (const lang of TARGETS) {
    console.log(`Translating v2 keys to ${lang}...`);
    const existingPath = path.join(process.cwd(), `src/i18n/${lang}.json`);
    let translated = {};
    if (fs.existsSync(existingPath)) {
      translated = JSON.parse(fs.readFileSync(existingPath, 'utf8'));
    }
    
    const batchTexts = NEW_KEYS.map(k => en[k]);
    
    try {
      const res = await translate(batchTexts, { to: lang });
      const resArray = Array.isArray(res) ? res : [res];
      
      for (let j = 0; j < NEW_KEYS.length; j++) {
        translated[NEW_KEYS[j]] = resArray[j].text;
      }
    } catch (e) {
      console.error(`Failed v2 translation for ${lang}`, e);
      for (const k of NEW_KEYS) translated[k] = en[k];
    }
    
    fs.writeFileSync(existingPath, JSON.stringify(translated, null, 2));
    console.log(`Saved v2 keys to ${lang}.json`);
    await new Promise(r => setTimeout(r, 500));
  }
}

main();
