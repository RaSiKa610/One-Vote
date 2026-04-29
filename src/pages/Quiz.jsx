import { useState } from 'react';
import { useLanguage } from '../context/LanguageContext';
import { useUser } from '../context/UserContext';
import { useVoice } from '../hooks/useVoice';
import { Volume2, VolumeX, Check, X, RotateCcw, Trophy, BookOpen } from 'lucide-react';

const QUIZ_QUESTIONS = [
  { qKey: 'quiz_q1', optKeys: ['quiz_q1_o1', 'quiz_q1_o2', 'quiz_q1_o3', 'quiz_q1_o4'], answer: 1, expKey: 'quiz_q1_exp' },
  { qKey: 'quiz_q2', optKeys: ['quiz_q2_o1', 'quiz_q2_o2', 'quiz_q2_o3', 'quiz_q2_o4'], answer: 1, expKey: 'quiz_q2_exp' },
  { qKey: 'quiz_q3', optKeys: ['quiz_q3_o1', 'quiz_q3_o2', 'quiz_q3_o3', 'quiz_q3_o4'], answer: 1, expKey: 'quiz_q3_exp' },
  { qKey: 'quiz_q4', optKeys: ['quiz_q4_o1', 'quiz_q4_o2', 'quiz_q4_o3', 'quiz_q4_o4'], answer: 2, expKey: 'quiz_q4_exp' },
  { qKey: 'quiz_q5', optKeys: ['quiz_q5_o1', 'quiz_q5_o2', 'quiz_q5_o3', 'quiz_q5_o4'], answer: 0, expKey: 'quiz_q5_exp' }
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
    speak(t(q.expKey));
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
    const grade = pct >= 70 ? { label: t('excellent'), color: 'var(--teal)' } : pct >= 40 ? { label: t('good_effort'), color: '#D4A017' } : { label: t('keep_learning'), color: 'var(--navy)' };
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
          <RotateCcw size={18} /> {t('try_again')}
        </button>
      </div>
    );
  }

  // ── QUESTION ─────────────────────────────────────────────────────────
  return (
    <div className="page-enter">
      <div style={{ background: 'linear-gradient(135deg, #C0392B, #7c3aed)', padding: '28px 20px 24px', color: 'white' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 16 }}>
          <span style={{ fontSize: '0.68rem', fontWeight: 800, letterSpacing: '0.12em', background: 'rgba(255,255,255,0.2)', padding: '4px 12px', borderRadius: 20 }}>{t('knowledge_quiz')}</span>
          <span style={{ fontSize: '0.85rem', fontWeight: 700 }}>{current + 1}/{QUIZ_QUESTIONS.length}</span>
        </div>
        <div style={{ height: 6, background: 'rgba(255,255,255,0.2)', borderRadius: 3, overflow: 'hidden' }}>
          <div style={{ height: '100%', width: `${(current / QUIZ_QUESTIONS.length) * 100}%`, background: 'white', borderRadius: 3, transition: 'width 0.4s ease' }} />
        </div>
      </div>

      <div style={{ padding: '24px 20px' }}>
        {/* Question */}
        <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: 12, marginBottom: 24 }}>
          <h2 style={{ fontFamily: 'var(--font-heading)', fontWeight: 700, fontSize: '1.2rem', color: 'var(--navy)', flex: 1, lineHeight: 1.4, letterSpacing: '0.01em' }}>{t(q.qKey)}</h2>
          <button
            onClick={() => isSpeaking ? stopSpeaking() : speak(t(q.qKey))}
            style={{ width: 36, height: 36, borderRadius: 10, background: 'var(--cream)', border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}
            aria-label="Read question aloud"
          >
            {isSpeaking ? <VolumeX size={16} color="var(--red)" /> : <Volume2 size={16} color="var(--navy)" />}
          </button>
        </div>

        {/* Options */}
        {q.optKeys.map((optKey, i) => {
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
              <span style={{ fontWeight: selected !== null && (i === q.answer || i === selected) ? 600 : 400 }}>{t(optKey)}</span>
              {selected !== null && i === q.answer && <Check size={18} color="var(--teal)" strokeWidth={3} />}
              {selected !== null && i === selected && selected !== q.answer && <X size={18} color="var(--red)" strokeWidth={3} />}
            </button>
          );
        })}

        {selected !== null && (
          <div style={{ background: 'var(--cream)', border: '1px solid var(--border)', borderRadius: 14, padding: '14px 16px', marginTop: 4, display: 'flex', gap: 10 }}>
            <BookOpen size={16} color="var(--navy)" style={{ flexShrink: 0, marginTop: 2 }} />
            <div>
              <p style={{ fontSize: '0.7rem', fontWeight: 800, color: 'var(--text-muted)', marginBottom: 4, letterSpacing: '0.08em' }}>{t('explanation')}</p>
              <p style={{ fontSize: '0.875rem', color: 'var(--text-secondary)', lineHeight: 1.6 }}>{t(q.expKey)}</p>
            </div>
          </div>
        )}

        {selected !== null && (
          <button className="btn btn-primary btn-full" style={{ marginTop: 16 }} onClick={handleNext}>
            {current + 1 >= QUIZ_QUESTIONS.length ? t('see_result') : t('next_question')}
          </button>
        )}
      </div>
    </div>
  );
}
