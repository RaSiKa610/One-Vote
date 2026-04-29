import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { useLanguage } from '../context/LanguageContext';
import { useVoice } from '../hooks/useVoice';
import { ASSISTANT_NODES, matchIntent } from '../utils/assistantFlow';
import { PhoneOff, Mic, MicOff, Volume2, Waves, AlertTriangle, Send } from 'lucide-react';

export default function Assistant({ onClose }) {
  const navigate = useNavigate();
  const { t, currentLanguage } = useLanguage();
  const { speak, stopSpeaking, isSpeaking, listen, stopListening, isListening, hasVoice } = useVoice();
  
  const [currentNodeId, setCurrentNodeId] = useState('root');
  const [transcript, setTranscript] = useState('');
  const [textInput, setTextInput] = useState('');
  const [actionToExecute, setActionToExecute] = useState(null);
  const [prevNodeId, setPrevNodeId] = useState('root');
  
  const isSpeakingRef = useRef(false);
  const isListeningRef = useRef(false);
  
  useEffect(() => {
    isSpeakingRef.current = isSpeaking;
  }, [isSpeaking]);
  
  useEffect(() => {
    isListeningRef.current = isListening;
  }, [isListening]);

  // Start flow on mount
  useEffect(() => {
    runNode('root');
    return () => {
      stopSpeaking();
      stopListening();
    };
  }, []);
  
  const runNode = (nodeId) => {
    const node = ASSISTANT_NODES[nodeId];
    if (!node) return;
    
    stopListening();
    setTranscript('');
    
    if (node.returnToPrevious) {
      speak(t(node.speakKey));
      const checkEnd = setInterval(() => {
        if (!isSpeakingRef.current) {
          clearInterval(checkEnd);
          runNode(prevNodeId);
        }
      }, 500);
      return;
    }
    
    setPrevNodeId(nodeId);
    setCurrentNodeId(nodeId);
    
    if (node.action) {
       setActionToExecute(node.action);
    }
    
    if (node.endCall) {
       speak(t(node.speakKey));
       if (node.triggerAction && actionToExecute) {
           executeAction(actionToExecute);
       }
       setTimeout(() => {
           onClose();
       }, 3000);
       return;
    }
    
    speak(t(node.speakKey));
    
    // Wait until speaking ends, then start listening
    const checkEnd = setInterval(() => {
        if (!isSpeakingRef.current && !window.speechSynthesis.speaking) {
          clearInterval(checkEnd);
          startListeningForNode(nodeId);
        }
    }, 500);
  };
  
  const startListeningForNode = (nodeId) => {
     let tempTranscript = '';
     listen(
       (text) => {
          tempTranscript = text;
          setTranscript(text);
       }, 
       () => {
          if (tempTranscript) {
              const nextNodeId = matchIntent(tempTranscript, nodeId);
              if (nextNodeId) {
                  runNode(nextNodeId);
              } else {
                  runNode('not_understood');
              }
          }
       }
     );
  };
  
  const handleButtonPress = (nextNodeId) => {
     stopSpeaking();
     stopListening();
     runNode(nextNodeId);
  };

  const handleTextSubmit = () => {
      if (!textInput.trim()) return;
      stopSpeaking();
      stopListening();
      setTranscript(textInput);
      const nextNodeId = matchIntent(textInput, currentNodeId);
      setTextInput('');
      if (nextNodeId) {
          runNode(nextNodeId);
      } else {
          runNode('not_understood');
      }
  };
  
  const executeAction = (action) => {
      if (action.type === 'OPEN_URL') {
         window.open(action.payload, '_blank');
      } else if (action.type === 'NAVIGATE') {
         navigate(action.payload);
      }
  };
  
  const handleEndCall = () => {
      stopSpeaking();
      stopListening();
      onClose();
  };
  
  const currentNode = ASSISTANT_NODES[currentNodeId] || {};
  
  return (
    <div style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, background: 'linear-gradient(180deg, #1A304D 0%, #0a1320 100%)', zIndex: 9999, display: 'flex', flexDirection: 'column', color: 'white', overflowY: 'auto' }}>
      
      {!hasVoice && (
        <div style={{ background: '#e67e22', color: 'white', padding: '12px 16px', fontSize: '0.85rem', display: 'flex', alignItems: 'flex-start', gap: 10 }}>
            <AlertTriangle size={18} style={{ flexShrink: 0, marginTop: 2 }} />
            <p style={{ lineHeight: 1.4 }}>
               TTS voice for {currentLanguage.label} is not installed on your device. Please read the responses on the screen below.
            </p>
        </div>
      )}

      {/* Header */}
      <div style={{ padding: '30px 20px 10px', textAlign: 'center' }}>
         <h2 style={{ fontFamily: 'var(--font-heading)', fontWeight: 700, fontSize: '1.4rem', letterSpacing: '0.02em', marginBottom: 4 }}>{t('ast_assistant_name')}</h2>
         <p style={{ color: 'var(--teal)', fontSize: '0.9rem', fontWeight: 600, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 6 }}>
            {isSpeaking ? <Volume2 size={16} /> : (isListening ? <Mic size={16} /> : <div style={{width: 16}}/>)}
            {isSpeaking ? 'Speaking...' : (isListening ? t('ast_listening') : 'Connected')}
         </p>
      </div>
      
      {/* Avatar / Animation */}
      <div style={{ padding: '20px', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
         <div style={{ 
             width: 100, height: 100, borderRadius: '50%', 
             background: 'linear-gradient(135deg, #2A9D8F, #1A304D)',
             display: 'flex', alignItems: 'center', justifyContent: 'center',
             boxShadow: isSpeaking ? '0 0 40px rgba(42,157,143,0.6)' : (isListening ? '0 0 30px rgba(124,58,237,0.5)' : '0 0 20px rgba(0,0,0,0.3)'),
             transition: 'all 0.3s ease',
             transform: isSpeaking ? 'scale(1.05)' : 'scale(1)'
         }}>
             {isListening ? <Mic size={40} color="white" /> : <Waves size={40} color="white" />}
         </div>
         
         <div style={{ marginTop: 24, padding: '16px', background: 'rgba(255,255,255,0.05)', borderRadius: 16, width: '100%', maxWidth: 400, textAlign: 'center', minHeight: 80, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <p style={{ fontSize: '1.05rem', color: 'rgba(255,255,255,0.95)', lineHeight: 1.5 }}>
               {t(currentNode.speakKey)}
            </p>
         </div>

         <div style={{ marginTop: 16, height: 40, textAlign: 'center', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
            <p style={{ fontSize: '0.95rem', color: 'var(--teal)', fontStyle: 'italic', opacity: transcript ? 1 : 0.5 }}>
               "{transcript || t('ast_speak_now')}"
            </p>
         </div>
      </div>

      <div style={{ flex: 1 }} />
      
      {/* Fallback Buttons & Input */}
      <div style={{ padding: '0 20px 40px', display: 'flex', flexDirection: 'column', gap: 12, maxWidth: 500, margin: '0 auto', width: '100%' }}>
         
         <div style={{ display: 'flex', gap: 8, marginBottom: 10 }}>
            <input 
              type="text" 
              value={textInput}
              onChange={e => setTextInput(e.target.value)}
              onKeyDown={e => e.key === 'Enter' && handleTextSubmit()}
              placeholder="Type your answer..."
              style={{ flex: 1, padding: '12px 16px', borderRadius: 12, border: 'none', background: 'rgba(255,255,255,0.1)', color: 'white', fontSize: '1rem', outline: 'none' }}
            />
            <button onClick={handleTextSubmit} style={{ width: 48, borderRadius: 12, background: 'var(--teal)', border: 'none', color: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer' }}>
               <Send size={18} />
            </button>
         </div>

         {currentNode.buttons && currentNode.buttons.map((btn, i) => (
             <button 
                key={i} 
                onClick={() => handleButtonPress(btn.next)}
                style={{ background: 'rgba(255,255,255,0.08)', border: '1px solid rgba(255,255,255,0.2)', padding: '14px', borderRadius: 16, color: 'white', fontSize: '0.95rem', fontWeight: 600, display: 'flex', justifyContent: 'center', transition: 'background 0.2s', cursor: 'pointer' }}
                onMouseEnter={e => e.currentTarget.style.background = 'rgba(255,255,255,0.2)'}
                onMouseLeave={e => e.currentTarget.style.background = 'rgba(255,255,255,0.08)'}
             >
                {t(btn.labelKey)}
             </button>
         ))}
         
         {/* End Call Button */}
         <button 
            onClick={handleEndCall}
            style={{ margin: '16px auto 0', width: 56, height: 56, borderRadius: '50%', background: '#e74c3c', border: 'none', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', boxShadow: '0 4px 12px rgba(231,76,60,0.4)' }}
         >
            <PhoneOff size={24} color="white" />
         </button>
      </div>
    </div>
  );
}
