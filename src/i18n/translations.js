import en from './en.json';
import hi from './hi.json';
import mr from './mr.json';
import gu from './gu.json';
import bn from './bn.json';
import ta from './ta.json';
import te from './te.json';
import kn from './kn.json';
import ml from './ml.json';
import pa from './pa.json';

export const languages = [
  { code: 'en', label: 'English', native: 'English', tts: 'en-IN', flag: '🇮🇳' },
  { code: 'hi', label: 'Hindi', native: 'हिंदी', tts: 'hi-IN', flag: '🇮🇳' },
  { code: 'mr', label: 'Marathi', native: 'मराठी', tts: 'mr-IN', flag: '🇮🇳' },
  { code: 'gu', label: 'Gujarati', native: 'ગુજરાતી', tts: 'gu-IN', flag: '🇮🇳' },
  { code: 'ta', label: 'Tamil', native: 'தமிழ்', tts: 'ta-IN', flag: '🇮🇳' },
  { code: 'te', label: 'Telugu', native: 'తెలుగు', tts: 'te-IN', flag: '🇮🇳' },
  { code: 'kn', label: 'Kannada', native: 'ಕನ್ನಡ', tts: 'kn-IN', flag: '🇮🇳' },
  { code: 'ml', label: 'Malayalam', native: 'മലയാളം', tts: 'ml-IN', flag: '🇮🇳' },
  { code: 'bn', label: 'Bengali', native: 'বাংলা', tts: 'bn-IN', flag: '🇮🇳' },
  { code: 'pa', label: 'Punjabi', native: 'ਪੰਜਾਬੀ', tts: 'pa-IN', flag: '🇮🇳' },
];

export const translations = { en, hi, mr, gu, bn, ta, te, kn, ml, pa };
