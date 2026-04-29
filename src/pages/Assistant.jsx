import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { useLanguage } from '../context/LanguageContext';
import { useVoice } from '../hooks/useVoice';
import { ASSISTANT_NODES, matchIntent } from '../utils/assistantFlow';
import { PhoneOff, Mic, MicOff, Volume2, Waves } from 'lucide-react';

export default function Assistant({ onClose }) {
  const navigate = useNavigate();
  const { t } = useLanguage();
  const { speak, stopSpeaking, isSpeaking, listen, stopListening, isListening } = useVoice();
  
  const [currentNodeId, setCurrentNodeId] = useState('root');
  const [transcript, setTranscript] = useState('');
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
      // It's the not_understood node, play message then go back to previous node to listen again
      speak(t(node.speakKey));
      const checkEnd = setInterval(() => {
        if (!isSpeakingRef.current) {
          clearInterval(checkEnd);
          runNode(prevNodeId); // restart previous node
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
        // give it a short delay to start speaking
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
          // When listening ends (due to silence or match)
          if (tempTranscript) {
              const nextNodeId = matchIntent(tempTranscript, nodeId);
              if (nextNodeId) {
                  runNode(nextNodeId);
              } else {
                  // Restart listening if no match, or go to not_understood
                  runNode('not_understood');
              }
          } else {
              // No transcript, just keep the buttons on screen
          }
       }
     );
  };
  
  const handleButtonPress = (nextNodeId) => {
     stopSpeaking();
     stopListening();
     runNode(nextNodeId);
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
    <div style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, background: 'linear-gradient(180deg, #1A304D 0%, #0a1320 100%)', zIndex: 9999, display: 'flex', flexDirection: 'column', color: 'white' }}>
      {/* Header */}
      <div style={{ padding: '40px 20px 20px', textAlign: 'center' }}>
         <h2 style={{ fontFamily: 'var(--font-heading)', fontWeight: 700, fontSize: '1.4rem', letterSpacing: '0.02em', marginBottom: 4 }}>{t('ast_assistant_name')}</h2>
         <p style={{ color: 'var(--teal)', fontSize: '0.9rem', fontWeight: 600, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 6 }}>
            {isSpeaking ? <Volume2 size={16} /> : (isListening ? <Mic size={16} /> : <div style={{width: 16}}/>)}
            {isSpeaking ? 'Speaking...' : (isListening ? t('ast_listening') : 'Connected')}
         </p>
      </div>
      
      {/* Avatar / Animation */}
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
         <div style={{ 
             width: 120, height: 120, borderRadius: '50%', 
             background: 'linear-gradient(135deg, #2A9D8F, #1A304D)',
             display: 'flex', alignItems: 'center', justifyContent: 'center',
             boxShadow: isSpeaking ? '0 0 40px rgba(42,157,143,0.6)' : (isListening ? '0 0 30px rgba(124,58,237,0.5)' : '0 0 20px rgba(0,0,0,0.3)'),
             transition: 'all 0.3s ease',
             transform: isSpeaking ? 'scale(1.05)' : 'scale(1)'
         }}>
             {isListening ? <Mic size={50} color="white" /> : <Waves size={50} color="white" />}
         </div>
         
         <div style={{ marginTop: 40, height: 80, padding: '0 30px', textAlign: 'center', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
            <p style={{ fontSize: '1.1rem', color: 'rgba(255,255,255,0.9)', fontStyle: 'italic', opacity: transcript ? 1 : 0.5, lineHeight: 1.5 }}>
               "{transcript || t('ast_speak_now')}"
            </p>
         </div>
      </div>
      
      {/* Fallback Buttons */}
      <div style={{ padding: '0 20px 40px', display: 'flex', flexDirection: 'column', gap: 12 }}>
         {currentNode.buttons && currentNode.buttons.map((btn, i) => (
             <button 
                key={i} 
                onClick={() => handleButtonPress(btn.next)}
                style={{ background: 'rgba(255,255,255,0.1)', border: '1px solid rgba(255,255,255,0.2)', padding: '16px', borderRadius: 16, color: 'white', fontSize: '1rem', fontWeight: 600, display: 'flex', justifyContent: 'center', transition: 'background 0.2s', cursor: 'pointer' }}
                onMouseEnter={e => e.currentTarget.style.background = 'rgba(255,255,255,0.2)'}
                onMouseLeave={e => e.currentTarget.style.background = 'rgba(255,255,255,0.1)'}
             >
                {t(btn.labelKey)}
             </button>
         ))}
         
         {/* End Call Button */}
         <button 
            onClick={handleEndCall}
            style={{ margin: '20px auto 0', width: 64, height: 64, borderRadius: '50%', background: '#e74c3c', border: 'none', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', boxShadow: '0 4px 12px rgba(231,76,60,0.4)' }}
         >
            <PhoneOff size={28} color="white" />
         </button>
      </div>
    </div>
  );
}
