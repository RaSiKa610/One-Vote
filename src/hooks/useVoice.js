import { useState, useCallback, useRef } from 'react';
import { useLanguage } from '../context/LanguageContext';

export function useVoice() {
  const { currentLanguage } = useLanguage();
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [isListening, setIsListening] = useState(false);
  const recognitionRef = useRef(null);
  const utteranceRef = useRef(null);

  const speak = useCallback((text) => {
    if (!('speechSynthesis' in window)) return;
    window.speechSynthesis.cancel();
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = currentLanguage.tts;
    utterance.rate = 0.9;
    utterance.pitch = 1;
    utterance.onstart = () => setIsSpeaking(true);
    utterance.onend = () => setIsSpeaking(false);
    utterance.onerror = () => setIsSpeaking(false);
    utteranceRef.current = utterance;
    window.speechSynthesis.speak(utterance);
  }, [currentLanguage]);

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

  return { speak, stopSpeaking, isSpeaking, listen, stopListening, isListening };
}
