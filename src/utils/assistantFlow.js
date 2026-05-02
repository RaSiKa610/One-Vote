export const ASSISTANT_NODES = {
  root: {
    speakKey: 'ast_greeting',
    buttons: [
      { labelKey: 'ast_btn_register', next: 'register', keywords: ['register', 'form 6', 'new voter'] },
      { labelKey: 'ast_btn_booth', next: 'booth', keywords: ['booth', 'station', 'where to vote', 'location'] },
      { labelKey: 'ast_btn_process', next: 'process', keywords: ['process', 'how', 'steps'] }
    ]
  },
  register: {
    speakKey: 'ast_register_info',
    action: { type: 'OPEN_URL', payload: 'https://voters.eci.gov.in' },
    buttons: [
      { labelKey: 'ast_btn_yes', next: 'confirm_action', keywords: ['yes', 'yeah', 'sure', 'okay', 'ha', 'please'] },
      { labelKey: 'ast_btn_no', next: 'end_loop', keywords: ['no', 'nahi', 'stop', 'cancel', "don't"] }
    ]
  },
  booth: {
    speakKey: 'ast_booth_info',
    action: { type: 'NAVIGATE', payload: '/find' },
    buttons: [
      { labelKey: 'ast_btn_yes', next: 'confirm_action', keywords: ['yes', 'yeah', 'sure', 'okay', 'ha', 'please'] },
      { labelKey: 'ast_btn_no', next: 'end_loop', keywords: ['no', 'nahi', 'stop', 'cancel', "don't"] }
    ]
  },
  process: {
    speakKey: 'ast_process_info',
    action: { type: 'NAVIGATE', payload: '/learn/election-process' },
    buttons: [
      { labelKey: 'ast_btn_yes', next: 'confirm_action', keywords: ['yes', 'yeah', 'sure', 'okay', 'ha', 'please'] },
      { labelKey: 'ast_btn_no', next: 'end_loop', keywords: ['no', 'nahi', 'stop', 'cancel', "don't"] }
    ]
  },
  confirm_action: {
    speakKey: 'ast_confirm_yes',
    triggerAction: true,
    endCall: true
  },
  end_loop: {
    speakKey: 'ast_confirm_no',
    buttons: [
      { labelKey: 'ast_btn_register', next: 'register', keywords: ['register'] },
      { labelKey: 'ast_btn_booth', next: 'booth', keywords: ['booth'] },
      { labelKey: 'ast_btn_process', next: 'process', keywords: ['process'] },
      { labelKey: 'ast_btn_end', next: 'goodbye', keywords: ['end', 'no', 'stop', 'bye', 'nothing'] }
    ]
  },
  goodbye: {
    speakKey: 'ast_goodbye',
    endCall: true
  },
  political_info: {
    speakKey: 'ast_political_info_response',
    returnToPrevious: true
  },
  not_understood: {
    speakKey: 'ast_not_understood',
    returnToPrevious: true 
  }
};

const KNOWLEDGE_BASE = [
  // 1. Specific CMs & States
  { keywords: ['andhra pradesh', 'naidu', 'chandrababu'], responseKey: 'gk_cm_ap' },
  { keywords: ['arunachal', 'khandu'], responseKey: 'gk_cm_ar' },
  { keywords: ['assam', 'himanta'], responseKey: 'gk_cm_as' },
  { keywords: ['bihar', 'nitish'], responseKey: 'gk_cm_br' },
  { keywords: ['chhattisgarh', 'vishnu deo'], responseKey: 'gk_cm_cg' },
  { keywords: ['delhi cm', 'rekha gupta'], responseKey: 'gk_cm_dl' },
  { keywords: ['goa', 'sawant'], responseKey: 'gk_cm_ga' },
  { keywords: ['gujarat', 'bhupendra'], responseKey: 'gk_cm_gj' },
  { keywords: ['haryana', 'saini'], responseKey: 'gk_cm_hr' },
  { keywords: ['himachal', 'sukhu'], responseKey: 'gk_cm_hp' },
  { keywords: ['jammu', 'kashmir', 'omar abdullah'], responseKey: 'gk_cm_jk' },
  { keywords: ['jharkhand', 'hemant soren'], responseKey: 'gk_cm_jh' },
  { keywords: ['karnataka', 'siddaramaiah'], responseKey: 'gk_cm_ka' },
  { keywords: ['kerala', 'pinarayi'], responseKey: 'gk_cm_kl' },
  { keywords: ['madhya pradesh', 'mohan yadav'], responseKey: 'gk_cm_mp' },
  { keywords: ['maharashtra', 'fadnavis', 'cm of maharashtra'], responseKey: 'gk_cm_mh' },
  { keywords: ['manipur', 'khemchand'], responseKey: 'gk_cm_mn' },
  { keywords: ['odisha', 'majhi'], responseKey: 'gk_cm_od' },
  { keywords: ['rajasthan', 'bhajan lal'], responseKey: 'gk_cm_rj' },
  { keywords: ['sikkim', 'tamang'], responseKey: 'gk_cm_sk' },
  { keywords: ['tamil nadu', 'stalin'], responseKey: 'gk_cm_tn' },
  { keywords: ['telangana', 'revanth'], responseKey: 'gk_cm_tg' },
  { keywords: ['tripura', 'manik saha'], responseKey: 'gk_cm_tr' },
  { keywords: ['uttar pradesh', 'yogi', 'adityanath'], responseKey: 'gk_cm_up' },
  { keywords: ['uttarakhand', 'dhami'], responseKey: 'gk_cm_uk' },
  { keywords: ['west bengal', 'mamata'], responseKey: 'gk_cm_wb' },

  // 2. Specific Leaders
  { keywords: ['sardar patel', 'iron man'], responseKey: 'gk_leader_patel' },
  { keywords: ['narasimha rao', '1991 reforms', 'liberalisation'], responseKey: 'gk_leader_rao' },
  { keywords: ['vajpayee', 'nuclear test', 'pokhran'], responseKey: 'gk_leader_vajpayee' },
  { keywords: ['manmohan singh', 'mgnrega', 'economist'], responseKey: 'gk_leader_manmohan_long' },
  { keywords: ['modi', 'narendra'], responseKey: 'ast_ans_pm' },
  { keywords: ['droupadi murmu', 'president'], responseKey: 'ast_ans_president' },
  { keywords: ['ambedkar', 'constitution'], responseKey: 'ast_ans_constitution' },
  { keywords: ['shyam saran negi', 'first voter'], responseKey: 'ast_ans_first_voter' },

  // 3. Specific Concepts
  { keywords: ['hegemony', 'congress era', '1947-1967'], responseKey: 'gk_era_hegemony' },
  { keywords: ['populism', 'garibi hatao', 'emergency', '1975'], responseKey: 'gk_era_populism' },
  { keywords: ['coalitions', '1989', 'v p singh', 'vajpayee era'], responseKey: 'gk_era_coalitions' },
  { keywords: ['dominant system', '2014', 'bjp dominance'], responseKey: 'gk_era_dominant' },
  { keywords: ['nda', 'bjp alliance'], responseKey: 'gk_alliance_nda' },
  { keywords: ['india bloc', 'opposition alliance', '26 parties'], responseKey: 'gk_alliance_india' },

  // 4. Voting Fundamentals (Specific keywords)
  { keywords: ['what is voting'], responseKey: 'gk_v101_what' },
  { keywords: ['why voting', 'importance'], responseKey: 'gk_v101_importance' },
  { keywords: ['constituency'], responseKey: 'gk_v101_constituency' },
  { keywords: ['who can vote', 'voting age'], responseKey: 'gk_v101_eligibility' },
  { keywords: ['cannot vote', 'ineligible'], responseKey: 'gk_v101_ineligibility' },
  { keywords: ['contest age', 'age to stand'], responseKey: 'gk_v101_contest_age' },
  { keywords: ['mcc', 'code of conduct'], responseKey: 'gk_v101_mcc' },
  { keywords: ['polling steps', 'at booth'], responseKey: 'gk_v101_polling_steps' },
  { keywords: ['secrecy', 'booth secrecy'], responseKey: 'gk_v101_secrecy' },
  { keywords: ['nota', 'none of the above'], responseKey: 'gk_v101_nota' },
  { keywords: ['audit', 'audit trail'], responseKey: 'gk_v101_audit' },
  { keywords: ['primary', 'general election'], responseKey: 'gk_v101_primary_vs_general' },
  { keywords: ['electoral college', 'usa election'], responseKey: 'gk_v101_electoral_college' },

  // 5. General / Catch-all (Lowest priority)
  { keywords: ['prime minister', 'pm'], responseKey: 'ast_ans_pm' },
  { keywords: ['chief minister', 'cm', 'who is the cm'], responseKey: 'ast_ans_cm' },
  { keywords: ['education minister'], responseKey: 'ast_ans_edu_min' },
  { keywords: ['lok sabha', 'parliament'], responseKey: 'ast_ans_lok_sabha' },
  { keywords: ['evm', 'safe', 'secure'], responseKey: 'ast_ans_evm' },
  { keywords: ['election commission', 'eci'], responseKey: 'ast_ans_eci' },
  { keywords: ['capital', 'delhi'], responseKey: 'ast_ans_capital' },
  { keywords: ['independence', '1947'], responseKey: 'ast_ans_independence' },
  { keywords: ['who are you', 'help'], responseKey: 'ast_ans_gk_generic' },
];

export const matchIntent = (transcript, currentNodeId) => {
  const node = ASSISTANT_NODES[currentNodeId];
  const text = transcript.toLowerCase();

  // 1. Check Knowledge Base first for "any question" capability
  for (const item of KNOWLEDGE_BASE) {
    if (item.keywords.some(kw => text.includes(kw))) {
      // Store the specific response key globally or in a way the UI can read it
      // For now, we'll return a special node that we can customize in the component
      return { type: 'KNOWLEDGE', key: item.responseKey };
    }
  }
  
  if (!node || !node.buttons) return null;
  
  // 2. Try to match keywords in the buttons
  for (const btn of node.buttons) {
    if (btn.keywords && btn.keywords.some(kw => text.includes(kw))) {
      return btn.next;
    }
  }
  
  return 'not_understood';
};
