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
  not_understood: {
    speakKey: 'ast_not_understood',
    returnToPrevious: true 
  }
};

export const matchIntent = (transcript, currentNodeId) => {
  const node = ASSISTANT_NODES[currentNodeId];
  if (!node || !node.buttons) return null;
  
  const text = transcript.toLowerCase();
  
  // Try to match keywords in the buttons
  for (const btn of node.buttons) {
    if (btn.keywords && btn.keywords.some(kw => text.includes(kw))) {
      return btn.next;
    }
  }
  
  return 'not_understood';
};
