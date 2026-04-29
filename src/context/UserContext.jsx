import { createContext, useContext, useState, useCallback } from 'react';

const UserContext = createContext(null);

const DEFAULT_CHECKLIST = [
  { id: 'register', label: 'Register as a voter', done: false },
  { id: 'voter_id', label: 'Get your Voter ID (EPIC Card)', done: false },
  { id: 'check_roll', label: 'Check your name on voter roll', done: false },
  { id: 'find_booth', label: 'Find your polling booth', done: false },
  { id: 'know_candidate', label: 'Know your candidates', done: false },
  { id: 'election_day', label: 'Carry valid ID on election day', done: false },
];

export function UserProvider({ children }) {
  const [voterType, setVoterType] = useState(() => localStorage.getItem('one_vote_type') || null);
  const [userName, setUserName] = useState(() => localStorage.getItem('one_vote_name') || 'Voter');
  const [checklist, setChecklist] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem('one_vote_checklist')) || DEFAULT_CHECKLIST;
    } catch { return DEFAULT_CHECKLIST; }
  });
  const [quizScores, setQuizScores] = useState(() => {
    try { return JSON.parse(localStorage.getItem('one_vote_scores')) || {}; }
    catch { return {}; }
  });

  const selectVoterType = useCallback((type) => {
    setVoterType(type);
    localStorage.setItem('one_vote_type', type);
  }, []);

  const toggleChecklist = useCallback((id) => {
    setChecklist(prev => {
      const updated = prev.map(item => item.id === id ? { ...item, done: !item.done } : item);
      localStorage.setItem('one_vote_checklist', JSON.stringify(updated));
      return updated;
    });
  }, []);

  const saveQuizScore = useCallback((quizId, score) => {
    setQuizScores(prev => {
      const updated = { ...prev, [quizId]: score };
      localStorage.setItem('one_vote_scores', JSON.stringify(updated));
      return updated;
    });
  }, []);

  const checklistProgress = Math.round((checklist.filter(i => i.done).length / checklist.length) * 100);

  return (
    <UserContext.Provider value={{
      voterType, selectVoterType,
      userName, setUserName,
      checklist, toggleChecklist,
      checklistProgress,
      quizScores, saveQuizScore
    }}>
      {children}
    </UserContext.Provider>
  );
}

export const useUser = () => {
  const ctx = useContext(UserContext);
  if (!ctx) throw new Error('useUser must be used within UserProvider');
  return ctx;
};
