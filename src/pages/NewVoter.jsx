import { useLanguage } from '../context/LanguageContext';
import { useVoice } from '../hooks/useVoice';
import { Volume2, VolumeX, ExternalLink, CheckCircle, CreditCard, Building2, Monitor, Calendar, User, ChevronRight } from 'lucide-react';

// Icon components for each step
const STEP_ICONS = [User, CheckCircle, CreditCard, Building2, Monitor, Calendar];

const NEW_VOTER_STEPS = [
  {
    step: 1,
    title: 'Are You Eligible?',
    content: `You are eligible to vote if:
• You are an Indian citizen
• You are 18 years of age or older (as on January 1 of the qualifying year)
• You are ordinarily resident of the constituency where you want to register
• Your name is in the Electoral Roll of that constituency

You are NOT eligible if:
• You are a foreign national
• You have been declared of unsound mind by a court
• You have been disqualified under any law`,
    highlight: 'Age 18+ as on 1st January of the qualifying year',
  },
  {
    step: 2,
    title: 'How to Register',
    content: `Register at voters.eci.gov.in — it's FREE!

Online registration (Form 6):
1. Visit voters.eci.gov.in
2. Click "Register as New Voter"
3. Fill Form 6 with your details
4. Upload: Proof of Age + Proof of Address
5. Submit and note your Application ID

Documents needed:
• Age proof: Aadhaar, Birth certificate, Class 10 certificate
• Address proof: Aadhaar, Ration card, Utility bill

Your Voter ID (EPIC card) will be delivered to your address after verification.`,
    highlight: 'Registration is FREE — Never pay anyone for voter registration',
    cta: { label: 'Register on ECI Portal', url: 'https://voters.eci.gov.in' },
  },
  {
    step: 3,
    title: 'Your Voter ID (EPIC Card)',
    content: `The Elector's Photo Identity Card (EPIC) is your official voter ID.

What it contains:
• Your photo
• EPIC number (unique identifier)
• Your name, father's / husband's name
• Your registered address
• Your part number and serial number

Lost your EPIC?
Download e-EPIC (digital copy) from voters.eci.gov.in for free!

Voting without EPIC?
You can also vote using: Aadhaar Card, Passport, Driving Licence, PAN Card, MNREGS Job Card, or any government-issued photo ID.`,
    highlight: 'You can vote with 12 types of valid photo ID — not just Voter ID!',
  },
  {
    step: 4,
    title: 'Finding Your Polling Booth',
    content: `Every voter is assigned a specific polling booth. You MUST vote at your assigned booth.

How to find your booth:
1. Visit voters.eci.gov.in
2. Search for "Find your Polling Station"
3. Enter your EPIC number or name
4. Your booth address will be shown

The Voter Slip:
Before election day, your local BLO (Booth Level Officer) will deliver a Voter Information Slip to your home with:
• Your booth address
• Voting date and time
• Your serial number on the electoral roll

Use our "Find Booth" section to locate it on the map!`,
    highlight: 'Polling booths cannot be changed — you must vote at your designated booth',
    cta: { label: 'Find My Booth', internal: '/find' },
  },
  {
    step: 5,
    title: 'Understanding the EVM',
    content: `EVM = Electronic Voting Machine — India uses these since 2004.

How to vote:
1. Show your ID to the Presiding Officer
2. Your finger will be marked with indelible ink
3. You receive a ballot slip
4. Go to the EVM — candidates are listed with their party symbols
5. Press the BLUE BUTTON next to your chosen candidate
6. A BEEP confirms your vote

VVPAT:
After pressing, a paper slip with your chosen party's name and symbol appears in the VVPAT window for 7 seconds — this is your vote confirmation.

NOTA:
"None Of The Above" is the last option on every EVM. Press it if you want to reject all candidates.`,
    highlight: 'Once you press the button, your vote is final and cannot be changed',
  },
  {
    step: 6,
    title: 'Election Day Checklist',
    content: `What to carry on Election Day:
- Any valid photo ID (Voter ID, Aadhaar, Passport, etc.)
- Voter Information Slip (if you received one)
- Dress comfortably — it can take time

What NOT to do:
- Do not carry mobile phones inside the polling booth
- Do not take photos inside the booth
- Do not accept money or gifts from candidates (it is illegal)
- Do not bring campaign material to the booth

Your rights at the booth:
• You can ask the Presiding Officer to explain the process
• You can challenge any person impersonating you
• You have a right to a secret ballot — no one can ask whom you voted for`,
    highlight: 'Voting hours are typically 7 AM to 6 PM. Go early to avoid queues!',
  },
];

export default function NewVoter() {
  const { t } = useLanguage();
  const { speak, stopSpeaking, isSpeaking } = useVoice();

  const handleReadAloud = (step) => {
    if (isSpeaking) { stopSpeaking(); return; }
    speak(`${step.title}. ${step.content}`);
  };

  return (
    <div className="page-enter">
      {/* Hero */}
      <div style={{ background: 'linear-gradient(135deg, #2A9D8F 0%, #1A304D 100%)', padding: '28px 20px 24px', color: 'white' }}>
        <span style={{ fontSize: '0.68rem', fontWeight: 800, letterSpacing: '0.12em', background: 'rgba(255,255,255,0.2)', padding: '4px 12px', borderRadius: 20 }}>NEW VOTER GUIDE</span>
        <h1 className="heading-lg" style={{ color: 'white', marginTop: 10 }}>First Time Voting</h1>
        <p style={{ color: 'rgba(255,255,255,0.8)', marginTop: 8, fontSize: '0.9rem' }}>
          Everything you need — from registration to casting your first vote
        </p>
        <div style={{ marginTop: 16, display: 'flex', gap: 12 }}>
          {['6 Steps', 'Audio Available', 'Works Offline'].map((tag, i) => (
            <div key={i} style={{ background: 'rgba(255,255,255,0.12)', borderRadius: 10, padding: '8px 12px', fontSize: '0.75rem', fontWeight: 600 }}>
              {tag}
            </div>
          ))}
        </div>
      </div>

      {/* Steps */}
      <div style={{ padding: '20px' }}>
        {NEW_VOTER_STEPS.map((step, i) => {
          const StepIcon = STEP_ICONS[i] || User;
          return (
            <div key={step.step} style={{ marginBottom: 16 }}>
              <div style={{ background: 'white', borderRadius: 20, border: '2px solid var(--border)', overflow: 'hidden' }}>
                {/* Step header */}
                <div style={{ padding: '18px 18px 0', display: 'flex', alignItems: 'flex-start', gap: 14 }}>
                  <div style={{ width: 48, height: 48, borderRadius: 14, background: 'var(--navy)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                    <StepIcon size={22} color="white" strokeWidth={1.75} />
                  </div>
                  <div style={{ flex: 1 }}>
                    <span style={{ fontSize: '0.68rem', fontWeight: 800, color: 'var(--teal)', letterSpacing: '0.1em' }}>STEP {step.step}</span>
                    <h2 style={{ fontFamily: 'var(--font-heading)', fontWeight: 700, fontSize: '1.2rem', color: 'var(--navy)', marginTop: 2, letterSpacing: '0.02em' }}>{step.title}</h2>
                  </div>
                  <button
                    onClick={() => handleReadAloud(step)}
                    style={{ width: 36, height: 36, borderRadius: 10, background: 'var(--cream)', border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}
                    aria-label={isSpeaking ? t('stop_reading') : t('read_aloud')}
                  >
                    {isSpeaking ? <VolumeX size={16} color="var(--red)" /> : <Volume2 size={16} color="var(--navy)" />}
                  </button>
                </div>

                {/* Content */}
                <div style={{ padding: '14px 18px' }}>
                  <p style={{ fontSize: '0.875rem', color: 'var(--text-secondary)', lineHeight: 1.8, whiteSpace: 'pre-line' }}>
                    {step.content}
                  </p>
                </div>

                {/* Highlight */}
                <div style={{ margin: '0 18px 18px', background: 'rgba(42,157,143,0.07)', border: '1px solid rgba(42,157,143,0.2)', borderRadius: 12, padding: '12px 14px', display: 'flex', gap: 10 }}>
                  <CheckCircle size={16} color="var(--teal)" style={{ flexShrink: 0, marginTop: 2 }} />
                  <p style={{ fontSize: '0.82rem', color: 'var(--teal)', fontWeight: 600, lineHeight: 1.5 }}>{step.highlight}</p>
                </div>

                {/* CTA */}
                {step.cta && (
                  <div style={{ padding: '0 18px 18px' }}>
                    {step.cta.url ? (
                      <a href={step.cta.url} target="_blank" rel="noopener noreferrer"
                        style={{ display: 'inline-flex', alignItems: 'center', gap: 6, background: 'var(--navy)', color: 'white', padding: '11px 20px', borderRadius: 12, fontSize: '0.85rem', fontWeight: 700 }}>
                        {step.cta.label} <ExternalLink size={14} />
                      </a>
                    ) : (
                      <a href={step.cta.internal}
                        style={{ display: 'inline-flex', alignItems: 'center', gap: 6, background: 'var(--teal)', color: 'white', padding: '11px 20px', borderRadius: 12, fontSize: '0.85rem', fontWeight: 700 }}>
                        {step.cta.label} <ChevronRight size={14} />
                      </a>
                    )}
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
