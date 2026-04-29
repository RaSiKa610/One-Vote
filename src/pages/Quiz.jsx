import { useState } from 'react';
import { useLanguage } from '../context/LanguageContext';
import { useUser } from '../context/UserContext';
import { useVoice } from '../hooks/useVoice';
import { Volume2, VolumeX, Check, X, RotateCcw, Trophy, BookOpen } from 'lucide-react';

const QUIZ_QUESTIONS = [
  {
    q: 'What is the minimum age to vote in India?',
    options: ['16 years', '18 years', '21 years', '25 years'],
    answer: 1,
    explanation: 'The minimum voting age in India is 18 years, as per the 61st Constitutional Amendment Act of 1988.'
  },
  {
    q: 'What does EVM stand for?',
    options: ['Electronic Voter Machine', 'Electronic Voting Machine', 'Electoral Vote Machine', 'Electoral Voting Method'],
    answer: 1,
    explanation: 'EVM stands for Electronic Voting Machine. India has been using EVMs since the 2004 general elections.'
  },
  {
    q: 'What does NOTA stand for?',
    options: ['No Option To Abstain', 'None Of The Above', 'Not On The Agenda', 'Null Of The Allowed'],
    answer: 1,
    explanation: 'NOTA stands for "None Of The Above". The Supreme Court of India mandated its inclusion in 2013.'
  },
  {
    q: 'Which body conducts elections in India?',
    options: ['Ministry of Home Affairs', 'Supreme Court of India', 'Election Commission of India', 'UPSC'],
    answer: 2,
    explanation: 'The Election Commission of India (ECI) is an autonomous constitutional body responsible for administering Union and State election processes.'
  },
  {
    q: 'What is VVPAT?',
    options: ['Voter Verified Paper Audit Trail', 'Verified Voter Paper And Trail', 'Vote Validity Paper Audit Trial', 'Voter Verified Poll Audit Track'],
    answer: 0,
    explanation: 'VVPAT stands for Voter Verified Paper Audit Trail. It shows a paper slip for 7 seconds confirming your vote.'
  },
  {
    q: "On which date is National Voters' Day celebrated?",
    options: ['January 26', 'January 25', 'February 2', 'August 15'],
    answer: 1,
    explanation: "National Voters' Day is celebrated on January 25 every year, which is the founding anniversary of the Election Commission of India (1950)."
  },
  {
    q: 'What is the Model Code of Conduct?',
    options: ['Rules for voters at polling booths', 'Guidelines for political parties during election period', 'Code for election officials', 'Rules for counting votes'],
    answer: 1,
    explanation: 'The Model Code of Conduct is a set of guidelines issued by ECI for political parties and candidates during elections to ensure free and fair polling.'
  },
  {
    q: 'Which ink is applied to prevent double voting?',
    options: ['Permanent ink', 'Indelible ink', 'Soluble ink', 'Fluorescent ink'],
    answer: 1,
    explanation: "Indelible ink (also called voter's ink) is applied to the left index finger of voters. It is manufactured by Mysore Paints and Varnish Ltd."
  },
];

export default function Quiz() {
  const { t } = useLanguage();
  const { saveQuizScore } = useUser();
  const { speak, stopSpeaking, isSpeaking } = useVoice();
  const [current, setCurrent] = useState(0);
  const [selected, setSelected] = useState(null);
  const [score, setScore] = useState(0);
  const [done, setDone] = useState(false);

  const q = QUIZ_QUESTIONS[current];

  const handleSelect = (idx) => {
    if (selected !== null) return;
    setSelected(idx);
    if (idx === q.answer) setScore(s => s + 1);
    speak(q.explanation);
  };

  const handleNext = () => {
    stopSpeaking();
    if (current + 1 >= QUIZ_QUESTIONS.length) {
      setDone(true);
      saveQuizScore('civic', Math.round(((selected === q.answer ? score + 1 : score) / QUIZ_QUESTIONS.length) * 100));
    } else {
      setCurrent(c => c + 1);
      setSelected(null);
    }
  };

  const handleRestart = () => {
    setCurrent(0); setSelected(null); setScore(0); setDone(false); stopSpeaking();
  };

  const finalScore = selected === q.answer ? score + 1 : score;

  // ── RESULTS ─────────────────────────────────────────────────────────
  if (done) {
    const pct = Math.round((finalScore / QUIZ_QUESTIONS.length) * 100);
    const grade = pct >= 70 ? { label: 'Excellent', color: 'var(--teal)' } : pct >= 40 ? { label: 'Good Effort', color: '#D4A017' } : { label: 'Keep Learning', color: 'var(--navy)' };
    return (
      <div className="page-enter" style={{ padding: '60px 20px', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', minHeight: '80vh', textAlign: 'center' }}>
        <div style={{ width: 80, height: 80, borderRadius: '50%', background: grade.color, display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: 20, boxShadow: `0 8px 32px ${grade.color}55` }}>
          <Trophy size={36} color="white" strokeWidth={1.5} />
        </div>
        <h2 style={{ fontFamily: 'var(--font-heading)', fontWeight: 700, fontSize: '2.2rem', color: 'var(--navy)', letterSpacing: '0.02em' }}>{finalScore}/{QUIZ_QUESTIONS.length}</h2>
        <p style={{ fontSize: '1rem', color: 'var(--text-muted)', marginTop: 6, fontWeight: 600 }}>{grade.label}</p>
        <div style={{ marginTop: 28, padding: '24px', background: 'var(--cream)', borderRadius: 20, width: '100%' }}>
          <div style={{ fontSize: '2.5rem', fontWeight: 700, color: grade.color, fontFamily: 'var(--font-heading)' }}>{pct}%</div>
          <div className="progress-bar" style={{ marginTop: 12 }}>
            <div className="progress-fill" style={{ width: `${pct}%`, background: grade.color }} />
          </div>
        </div>
        <button className="btn btn-primary btn-full btn-lg" style={{ marginTop: 24 }} onClick={handleRestart}>
          <RotateCcw size={18} /> Try Again
        </button>
      </div>
    );
  }

  // ── QUESTION ─────────────────────────────────────────────────────────
  return (
    <div className="page-enter">
      <div style={{ background: 'linear-gradient(135deg, #C0392B, #7c3aed)', padding: '28px 20px 24px', color: 'white' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 16 }}>
          <span style={{ fontSize: '0.68rem', fontWeight: 800, letterSpacing: '0.12em', background: 'rgba(255,255,255,0.2)', padding: '4px 12px', borderRadius: 20 }}>KNOWLEDGE QUIZ</span>
          <span style={{ fontSize: '0.85rem', fontWeight: 700 }}>{current + 1}/{QUIZ_QUESTIONS.length}</span>
        </div>
        <div style={{ height: 6, background: 'rgba(255,255,255,0.2)', borderRadius: 3, overflow: 'hidden' }}>
          <div style={{ height: '100%', width: `${(current / QUIZ_QUESTIONS.length) * 100}%`, background: 'white', borderRadius: 3, transition: 'width 0.4s ease' }} />
        </div>
      </div>

      <div style={{ padding: '24px 20px' }}>
        {/* Question */}
        <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: 12, marginBottom: 24 }}>
          <h2 style={{ fontFamily: 'var(--font-heading)', fontWeight: 700, fontSize: '1.2rem', color: 'var(--navy)', flex: 1, lineHeight: 1.4, letterSpacing: '0.01em' }}>{q.q}</h2>
          <button
            onClick={() => isSpeaking ? stopSpeaking() : speak(q.q)}
            style={{ width: 36, height: 36, borderRadius: 10, background: 'var(--cream)', border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}
            aria-label="Read question aloud"
          >
            {isSpeaking ? <VolumeX size={16} color="var(--red)" /> : <Volume2 size={16} color="var(--navy)" />}
          </button>
        </div>

        {/* Options */}
        {q.options.map((opt, i) => {
          let bg = 'white', border = 'var(--border)', color = 'var(--navy)';
          if (selected !== null) {
            if (i === q.answer) { bg = 'rgba(42,157,143,0.07)'; border = 'var(--teal)'; color = 'var(--teal)'; }
            else if (i === selected && selected !== q.answer) { bg = 'rgba(192,57,43,0.06)'; border = 'var(--red)'; color = 'var(--red)'; }
          }
          return (
            <button
              key={i}
              onClick={() => handleSelect(i)}
              style={{ width: '100%', textAlign: 'left', padding: '15px 18px', border: `2px solid ${border}`, borderRadius: 14, marginBottom: 10, fontSize: '0.9rem', background: bg, color, cursor: selected !== null ? 'default' : 'pointer', transition: 'var(--transition)', display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 10 }}
            >
              <span style={{ fontWeight: selected !== null && (i === q.answer || i === selected) ? 600 : 400 }}>{opt}</span>
              {selected !== null && i === q.answer && <Check size={18} color="var(--teal)" strokeWidth={3} />}
              {selected !== null && i === selected && selected !== q.answer && <X size={18} color="var(--red)" strokeWidth={3} />}
            </button>
          );
        })}

        {/* Explanation */}
        {selected !== null && (
          <div style={{ background: 'var(--cream)', border: '1px solid var(--border)', borderRadius: 14, padding: '14px 16px', marginTop: 4, display: 'flex', gap: 10 }}>
            <BookOpen size={16} color="var(--navy)" style={{ flexShrink: 0, marginTop: 2 }} />
            <div>
              <p style={{ fontSize: '0.7rem', fontWeight: 800, color: 'var(--text-muted)', marginBottom: 4, letterSpacing: '0.08em' }}>EXPLANATION</p>
              <p style={{ fontSize: '0.875rem', color: 'var(--text-secondary)', lineHeight: 1.6 }}>{q.explanation}</p>
            </div>
          </div>
        )}

        {selected !== null && (
          <button className="btn btn-primary btn-full" style={{ marginTop: 16 }} onClick={handleNext}>
            {current + 1 >= QUIZ_QUESTIONS.length ? 'See Results' : 'Next Question'}
          </button>
        )}
      </div>
    </div>
  );
}
