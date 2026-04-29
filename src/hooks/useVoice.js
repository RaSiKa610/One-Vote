import { useState, useCallback, useRef, useEffect } from 'react';
import { useLanguage } from '../context/LanguageContext';

export function useVoice() {
  const { currentLanguage } = useLanguage();
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [isListening, setIsListening] = useState(false);
  const [hasVoice, setHasVoice] = useState(true);
  const recognitionRef = useRef(null);
  const utteranceRef = useRef(null);

  useEffect(() => {
    const checkVoice = () => {
      if (!('speechSynthesis' in window)) {
        setHasVoice(false);
        return;
      }
      const voices = window.speechSynthesis.getVoices();
      if (voices.length === 0) return; // wait for onvoiceschanged
      
      const langPrefix = currentLanguage.tts.split('-')[0];
      const hasMatch = voices.some(v => v.lang.startsWith(langPrefix));
      setHasVoice(hasMatch);
    };

    checkVoice();
    if ('speechSynthesis' in window) {
      window.speechSynthesis.onvoiceschanged = checkVoice;
    }
  }, [currentLanguage]);

  const speak = useCallback((text) => {
    if (!('speechSynthesis' in window)) return;
    if (!hasVoice) return; // Don't try to speak if voice doesn't exist
    
    window.speechSynthesis.cancel();
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = currentLanguage.tts;
    utterance.rate = 0.9;
    utterance.pitch = 1;
    
    // Try to find the exact voice to ensure it uses it
    const voices = window.speechSynthesis.getVoices();
    const langPrefix = currentLanguage.tts.split('-')[0];
    const voice = voices.find(v => v.lang === currentLanguage.tts) || voices.find(v => v.lang.startsWith(langPrefix));
    if (voice) utterance.voice = voice;
    
    utterance.onstart = () => setIsSpeaking(true);
    utterance.onend = () => setIsSpeaking(false);
    utterance.onerror = () => setIsSpeaking(false);
    utteranceRef.current = utterance;
    window.speechSynthesis.speak(utterance);
  }, [currentLanguage, hasVoice]);

  const stopSpeaking = useCallback(() => {
    window.speechSynthesis.cancel();
    setIsSpeaking(false);
  }, []);

  const listen = useCallback((onResult, onEnd) => {
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (!SpeechRecognition) { onEnd?.('Speech recognition not supported'); return; }
    const recognition = new SpeechRecognition();
    recognition.lang = currentLanguage.tts;
    recognition.interimResults = false;
    recognition.maxAlternatives = 1;
    recognition.onstart = () => setIsListening(true);
    recognition.onresult = (e) => {
      const transcript = e.results[0][0].transcript;
      onResult?.(transcript);
    };
    recognition.onend = () => { setIsListening(false); onEnd?.(); };
    recognition.onerror = () => { setIsListening(false); onEnd?.(); };
    recognitionRef.current = recognition;
    recognition.start();
  }, [currentLanguage]);

  const stopListening = useCallback(() => {
    recognitionRef.current?.stop();
    setIsListening(false);
  }, []);

  return { speak, stopSpeaking, isSpeaking, listen, stopListening, isListening, hasVoice };
}
