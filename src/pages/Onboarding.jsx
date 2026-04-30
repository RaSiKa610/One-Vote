import { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { useLanguage } from '../context/LanguageContext';
import { useUser } from '../context/UserContext';
import { auth, db } from '../config/firebase';
import {
  RecaptchaVerifier,
  signInWithPhoneNumber,
} from 'firebase/auth';
import { doc, setDoc, getDoc } from 'firebase/firestore';
import { Globe, Leaf, Vote, ChevronRight, Phone, KeyRound, ArrowLeft, RefreshCw } from 'lucide-react';

function LogoMark({ size = 56 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 56 56" fill="none" aria-hidden="true">
      <rect width="56" height="56" rx="16" fill="rgba(234,227,209,0.12)" />
      <rect x="1" y="1" width="54" height="54" rx="15" stroke="rgba(234,227,209,0.25)" strokeWidth="2" />
      <path d="M16 38 L28 18 L40 38" stroke="#EAE3D1" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"/>
      <path d="M20 32 L36 32" stroke="#C0392B" strokeWidth="2.5" strokeLinecap="round"/>
      <circle cx="28" cy="18" r="3" fill="#C0392B"/>
    </svg>
  );
}

export default function Onboarding() {
  const [step, setStep] = useState(0);
  const { t, languages, langCode, setLanguage } = useLanguage();
  const { selectVoterType, setUserName, syncToCloud } = useUser();
  const navigate = useNavigate();

  // phone auth state
  const [phone, setPhone] = useState('');
  const [otp, setOtp] = useState('');
  const [confirmResult, setConfirmResult] = useState(null);
  const [sending, setSending] = useState(false);
  const [verifying, setVerifying] = useState(false);
  const [phoneError, setPhoneError] = useState('');
  const [otpError, setOtpError] = useState('');
  const [voterTypeSelected, setVoterTypeSelected] = useState(null);
  const recaptchaRef = useRef(null);
  const recaptchaWidgetRef = useRef(null);

  useEffect(() => {
    if (step === 0) {
      const timer = setTimeout(() => setStep(1), 2200);
      return () => clearTimeout(timer);
    }
  }, [step]);

  // Setup reCAPTCHA when reaching phone step
  useEffect(() => {
    if (step === 3) {
      try {
        if (!window.recaptchaVerifier) {
          window.recaptchaVerifier = new RecaptchaVerifier(auth, 'recaptcha-container', {
            size: 'invisible',
            callback: () => {},
          });
        }
      } catch (e) {
        console.error('reCAPTCHA init error:', e);
      }
    }
  }, [step]);

  const handleVoterType = (type) => {
    setVoterTypeSelected(type);
    selectVoterType(type);
    setStep(3); // go to phone login
  };

  const handleSendOtp = async () => {
    const cleaned = phone.replace(/\s/g, '');
    if (!cleaned.startsWith('+') || cleaned.length < 10) {
      setPhoneError(t('phone_invalid') || 'Enter a valid phone number with country code e.g. +91...');
      return;
    }
    setPhoneError('');
    setSending(true);
    try {
      const verifier = window.recaptchaVerifier;
      const result = await signInWithPhoneNumber(auth, cleaned, verifier);
      setConfirmResult(result);
      setStep(4);
    } catch (e) {
      console.error('OTP send error:', e);
      setPhoneError(t('phone_send_error') || 'Failed to send OTP. Check the number and try again.');
      // Reset recaptcha on error
      if (window.recaptchaVerifier) {
        window.recaptchaVerifier.clear();
        window.recaptchaVerifier = null;
      }
    } finally {
      setSending(false);
    }
  };

  const handleVerifyOtp = async () => {
    if (otp.length !== 6) {
      setOtpError(t('otp_invalid') || 'Enter the 6-digit code sent to your phone.');
      return;
    }
    setOtpError('');
    setVerifying(true);
    try {
      const result = await confirmResult.confirm(otp);
      const user = result.user;

      // Create or update Firestore profile
      const userRef = doc(db, 'users', user.uid);
      const snap = await getDoc(userRef);
      if (!snap.exists()) {
        await setDoc(userRef, {
          phone: user.phoneNumber,
          voterType: voterTypeSelected,
          createdAt: new Date().toISOString(),
        });
      }

      setStep(5);
    } catch (e) {
      console.error('OTP verify error:', e);
      setOtpError(t('otp_wrong') || 'Incorrect code. Please try again.');
    } finally {
      setVerifying(false);
    }
  };

  const handleFinish = () => navigate('/home');

  // ── SPLASH ──────────────────────────────────────────────────────────
  if (step === 0) return (
    <div className="splash">
      <div className="splash-logo" aria-hidden="true"><LogoMark size={56} /></div>
      <h1 className="splash-title">{t('app_name')}</h1>
      <p className="splash-subtitle">{t('splash_subtitle')}</p>
      <div className="splash-dots" aria-hidden="true">
        <div className="splash-dot"></div><div className="splash-dot"></div><div className="splash-dot"></div>
      </div>
    </div>
  );

  // ── LANGUAGE SELECTION ───────────────────────────────────────────────
  if (step === 1) return (
    <div style={{ minHeight: '100dvh', background: 'var(--bg-app)', display: 'flex', flexDirection: 'column' }}>
      <div style={{ background: 'var(--navy)', padding: '48px 20px 32px', color: 'white', textAlign: 'center' }}>
        <div style={{ display: 'inline-flex', alignItems: 'center', justifyContent: 'center', width: 56, height: 56, borderRadius: 16, background: 'rgba(255,255,255,0.12)', marginBottom: 16 }}>
          <Globe size={28} color="white" />
        </div>
        <h1 className="heading-lg" style={{ color: 'white' }}>{t('select_language')}</h1>
        <p style={{ color: 'rgba(255,255,255,0.7)', marginTop: 8, fontSize: '0.9rem' }}>{t('language_subtitle')}</p>
      </div>
      <div style={{ flex: 1, overflowY: 'auto', padding: '24px 20px' }}>
        <div className="lang-grid">
          {languages.map(lang => (
            <button
              key={lang.code}
              className={`lang-btn${langCode === lang.code ? ' selected' : ''}`}
              onClick={() => setLanguage(lang.code)}
              aria-pressed={langCode === lang.code}
            >
              <div style={{ width: 32, height: 32, borderRadius: 8, background: langCode === lang.code ? 'var(--navy)' : 'var(--cream)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                <span style={{ fontSize: '0.65rem', fontWeight: 800, color: langCode === lang.code ? 'white' : 'var(--navy)', letterSpacing: '0.04em' }}>{lang.code.toUpperCase()}</span>
              </div>
              <div>
                <div className="lang-native">{lang.native}</div>
                <div className="lang-english">{lang.label}</div>
              </div>
              {langCode === lang.code && <span style={{ marginLeft: 'auto', color: 'var(--teal)', fontSize: '1.1rem', fontWeight: 700 }}>✓</span>}
            </button>
          ))}
        </div>
      </div>
      <div style={{ padding: '16px 20px 32px' }}>
        <button className="btn btn-primary btn-full btn-lg" onClick={() => setStep(2)}>
          {t('continue')} <ChevronRight size={20} />
        </button>
      </div>
    </div>
  );

  // ── VOTER TYPE ───────────────────────────────────────────────────────
  if (step === 2) return (
    <div style={{ minHeight: '100dvh', background: 'var(--bg-app)', display: 'flex', flexDirection: 'column' }}>
      <div style={{ background: 'var(--navy)', padding: '48px 20px 32px', color: 'white', textAlign: 'center' }}>
        <h1 className="heading-lg" style={{ color: 'white' }}>{t('who_are_you')}</h1>
        <p style={{ color: 'rgba(255,255,255,0.7)', marginTop: 8, fontSize: '0.9rem' }}>{t('voter_type_subtitle')}</p>
      </div>
      <div style={{ flex: 1, padding: '32px 20px', display: 'flex', flexDirection: 'column', gap: 16 }}>
        <button onClick={() => handleVoterType('new')}
          style={{ background: 'white', border: '2px solid var(--border)', borderRadius: 20, padding: '28px 24px', textAlign: 'left', cursor: 'pointer', transition: 'var(--transition)', display: 'flex', alignItems: 'center', gap: 20 }}
          onMouseEnter={e => { e.currentTarget.style.borderColor = 'var(--teal)'; e.currentTarget.style.transform = 'translateY(-2px)'; }}
          onMouseLeave={e => { e.currentTarget.style.borderColor = 'var(--border)'; e.currentTarget.style.transform = ''; }}
        >
          <div style={{ width: 72, height: 72, borderRadius: 20, background: 'linear-gradient(135deg, #2A9D8F, #1a7a6e)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
            <Leaf size={32} color="white" strokeWidth={1.5} />
          </div>
          <div>
            <div style={{ fontFamily: 'var(--font-heading)', fontWeight: 700, fontSize: '1.3rem', color: 'var(--navy)', marginBottom: 4 }}>{t('new_voter')}</div>
            <div style={{ fontSize: '0.875rem', color: 'var(--text-muted)', lineHeight: 1.5 }}>{t('new_voter_desc')}</div>
          </div>
        </button>
        <button onClick={() => handleVoterType('existing')}
          style={{ background: 'white', border: '2px solid var(--border)', borderRadius: 20, padding: '28px 24px', textAlign: 'left', cursor: 'pointer', transition: 'var(--transition)', display: 'flex', alignItems: 'center', gap: 20 }}
          onMouseEnter={e => { e.currentTarget.style.borderColor = 'var(--navy)'; e.currentTarget.style.transform = 'translateY(-2px)'; }}
          onMouseLeave={e => { e.currentTarget.style.borderColor = 'var(--border)'; e.currentTarget.style.transform = ''; }}
        >
          <div style={{ width: 72, height: 72, borderRadius: 20, background: 'linear-gradient(135deg, #1A304D, #243d5e)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
            <Vote size={32} color="white" strokeWidth={1.5} />
          </div>
          <div>
            <div style={{ fontFamily: 'var(--font-heading)', fontWeight: 700, fontSize: '1.3rem', color: 'var(--navy)', marginBottom: 4 }}>{t('existing_voter')}</div>
            <div style={{ fontSize: '0.875rem', color: 'var(--text-muted)', lineHeight: 1.5 }}>{t('existing_voter_desc')}</div>
          </div>
        </button>
      </div>
    </div>
  );

  // ── PHONE NUMBER ENTRY ───────────────────────────────────────────────
  if (step === 3) return (
    <div style={{ minHeight: '100dvh', background: 'var(--bg-app)', display: 'flex', flexDirection: 'column' }}>
      {/* Hidden recaptcha container */}
      <div id="recaptcha-container" ref={recaptchaRef}></div>

      <div style={{ background: 'var(--navy)', padding: '48px 20px 32px', color: 'white', textAlign: 'center' }}>
        <div style={{ display: 'inline-flex', alignItems: 'center', justifyContent: 'center', width: 64, height: 64, borderRadius: 20, background: 'rgba(255,255,255,0.12)', marginBottom: 20 }}>
          <Phone size={30} color="white" />
        </div>
        <h1 className="heading-lg" style={{ color: 'white' }}>{t('phone_title') || 'Verify Your Number'}</h1>
        <p style={{ color: 'rgba(255,255,255,0.7)', marginTop: 8, fontSize: '0.9rem' }}>
          {t('phone_subtitle') || 'We will send a one-time code to confirm your identity.'}
        </p>
      </div>

      <div style={{ flex: 1, padding: '32px 20px', display: 'flex', flexDirection: 'column', gap: 16 }}>
        <div>
          <label style={{ display: 'block', fontSize: '0.82rem', fontWeight: 700, color: 'var(--navy)', marginBottom: 8, letterSpacing: '0.04em', textTransform: 'uppercase' }}>
            {t('phone_label') || 'Mobile Number'}
          </label>
          <input
            type="tel"
            value={phone}
            onChange={e => setPhone(e.target.value)}
            placeholder="+91 98765 43210"
            style={{ width: '100%', padding: '16px', borderRadius: 14, border: `2px solid ${phoneError ? 'var(--red)' : 'var(--border)'}`, fontSize: '1.1rem', fontFamily: 'var(--font-heading)', color: 'var(--navy)', outline: 'none', boxSizing: 'border-box', background: 'white' }}
          />
          <p style={{ fontSize: '0.78rem', color: 'var(--text-muted)', marginTop: 6 }}>
            {t('phone_hint') || 'Include your country code, e.g. +91 for India'}
          </p>
          {phoneError && <p style={{ color: 'var(--red)', fontSize: '0.82rem', marginTop: 4 }}>{phoneError}</p>}
        </div>

        <button
          className="btn btn-primary btn-full btn-lg"
          onClick={handleSendOtp}
          disabled={sending}
          style={{ opacity: sending ? 0.7 : 1 }}
        >
          {sending ? (t('sending') || 'Sending...') : (t('send_otp') || 'Send OTP')} {!sending && <ChevronRight size={20} />}
        </button>

        <button onClick={() => setStep(2)} style={{ background: 'none', border: 'none', color: 'var(--text-muted)', fontSize: '0.85rem', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 6, marginTop: 8 }}>
          <ArrowLeft size={16} /> {t('go_back') || 'Go Back'}
        </button>
      </div>
    </div>
  );

  // ── OTP VERIFICATION ─────────────────────────────────────────────────
  if (step === 4) return (
    <div style={{ minHeight: '100dvh', background: 'var(--bg-app)', display: 'flex', flexDirection: 'column' }}>
      <div style={{ background: 'var(--navy)', padding: '48px 20px 32px', color: 'white', textAlign: 'center' }}>
        <div style={{ display: 'inline-flex', alignItems: 'center', justifyContent: 'center', width: 64, height: 64, borderRadius: 20, background: 'rgba(255,255,255,0.12)', marginBottom: 20 }}>
          <KeyRound size={30} color="white" />
        </div>
        <h1 className="heading-lg" style={{ color: 'white' }}>{t('otp_title') || 'Enter OTP'}</h1>
        <p style={{ color: 'rgba(255,255,255,0.7)', marginTop: 8, fontSize: '0.9rem' }}>
          {t('otp_subtitle') || `Code sent to ${phone}`}
        </p>
      </div>

      <div style={{ flex: 1, padding: '32px 20px', display: 'flex', flexDirection: 'column', gap: 16 }}>
        <div>
          <label style={{ display: 'block', fontSize: '0.82rem', fontWeight: 700, color: 'var(--navy)', marginBottom: 8, letterSpacing: '0.04em', textTransform: 'uppercase' }}>
            {t('otp_label') || '6-Digit Code'}
          </label>
          <input
            type="number"
            value={otp}
            onChange={e => setOtp(e.target.value.slice(0, 6))}
            placeholder="● ● ● ● ● ●"
            maxLength={6}
            style={{ width: '100%', padding: '16px', borderRadius: 14, border: `2px solid ${otpError ? 'var(--red)' : 'var(--border)'}`, fontSize: '1.8rem', fontFamily: 'var(--font-heading)', color: 'var(--navy)', outline: 'none', boxSizing: 'border-box', background: 'white', textAlign: 'center', letterSpacing: '0.3em' }}
          />
          {otpError && <p style={{ color: 'var(--red)', fontSize: '0.82rem', marginTop: 6 }}>{otpError}</p>}
        </div>

        <button
          className="btn btn-primary btn-full btn-lg"
          onClick={handleVerifyOtp}
          disabled={verifying}
          style={{ opacity: verifying ? 0.7 : 1 }}
        >
          {verifying ? (t('verifying') || 'Verifying...') : (t('verify_otp') || 'Verify & Continue')} {!verifying && <ChevronRight size={20} />}
        </button>

        <button onClick={() => setStep(3)} style={{ background: 'none', border: 'none', color: 'var(--text-muted)', fontSize: '0.85rem', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 6 }}>
          <RefreshCw size={14} /> {t('resend_otp') || 'Resend OTP'}
        </button>
      </div>
    </div>
  );

  // ── WELCOME ──────────────────────────────────────────────────────────
  return (
    <div style={{ minHeight: '100dvh', background: 'var(--bg-app)', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '40px 28px', textAlign: 'center' }}>
      <div style={{ width: 80, height: 80, borderRadius: 24, background: 'var(--navy)', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: 24 }}>
        <LogoMark size={48} />
      </div>
      <h2 className="heading-lg text-navy">{t('welcome_title') || 'Welcome to One Vote'}</h2>
      <p style={{ color: 'var(--text-muted)', marginTop: 8, marginBottom: 32, fontSize: '0.9rem' }}>
        {t('welcome_desc') || "India's democracy is in your hands."}
      </p>
      <button className="btn btn-primary btn-full btn-lg" onClick={handleFinish}>
        {t('get_started')}
      </button>
    </div>
  );
}
