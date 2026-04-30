import { createContext, useContext, useState, useCallback, useEffect } from 'react';
import { auth, db } from '../config/firebase';
import { onAuthStateChanged, signOut } from 'firebase/auth';
import { doc, setDoc, getDoc } from 'firebase/firestore';

const UserContext = createContext(null);

const DEFAULT_CHECKLIST = [
  { id: 'register', labelKey: 'chk_register', done: false },
  { id: 'voter_id', labelKey: 'chk_voter_id', done: false },
  { id: 'check_roll', labelKey: 'chk_check_roll', done: false },
  { id: 'find_booth', labelKey: 'chk_find_booth', done: false },
  { id: 'know_candidate', labelKey: 'chk_know_candidate', done: false },
  { id: 'election_day', labelKey: 'chk_election_day', done: false },
];

export function UserProvider({ children }) {
  const [user, setUser] = useState(null);
  const [authLoading, setAuthLoading] = useState(true);
  const [voterType, setVoterType] = useState(() => localStorage.getItem('one_vote_type') || null);
  const [userName, setUserName] = useState(() => localStorage.getItem('one_vote_name') || 'Voter');
  const [checklist, setChecklist] = useState(() => {
    try { return JSON.parse(localStorage.getItem('one_vote_checklist')) || DEFAULT_CHECKLIST; }
    catch { return DEFAULT_CHECKLIST; }
  });
  const [quizScores, setQuizScores] = useState(() => {
    try { return JSON.parse(localStorage.getItem('one_vote_scores')) || {}; }
    catch { return {}; }
  });

  // Sync to Cloud helper
  const syncToCloud = async (data) => {
    if (!auth.currentUser) return;
    try {
      await setDoc(doc(db, 'users', auth.currentUser.uid), data, { merge: true });
    } catch (e) { console.error('Cloud sync error:', e); }
  };

  // Auth Listener
  useEffect(() => {
    const unsub = onAuthStateChanged(auth, async (currentUser) => {
      setUser(currentUser);
      if (currentUser) {
        // Try fetching cloud profile
        try {
          const docSnap = await getDoc(doc(db, 'users', currentUser.uid));
          if (docSnap.exists()) {
            const data = docSnap.data();
            if (data.voterType) { setVoterType(data.voterType); localStorage.setItem('one_vote_type', data.voterType); }
            if (data.checklist) { setChecklist(data.checklist); localStorage.setItem('one_vote_checklist', JSON.stringify(data.checklist)); }
            if (data.quizScores) { setQuizScores(data.quizScores); localStorage.setItem('one_vote_scores', JSON.stringify(data.quizScores)); }
            if (data.userName) { setUserName(data.userName); localStorage.setItem('one_vote_name', data.userName); }
          }
        } catch (e) { console.error('Fetch cloud data error:', e); }
      }
      setAuthLoading(false);
    });
    return () => unsub();
  }, []);

  const logout = async () => {
    try {
      await signOut(auth);
      setUser(null);
      setUserName('Voter');
      localStorage.removeItem('one_vote_type');
      localStorage.removeItem('one_vote_name');
      localStorage.removeItem('one_vote_checklist');
      localStorage.removeItem('one_vote_scores');
    } catch (e) { console.error('Logout error:', e); }
  };

  const selectVoterType = useCallback((type) => {
    setVoterType(type);
    localStorage.setItem('one_vote_type', type);
    syncToCloud({ voterType: type });
  }, []);

  const toggleChecklist = useCallback((id) => {
    setChecklist(prev => {
      const updated = prev.map(item => item.id === id ? { ...item, done: !item.done } : item);
      localStorage.setItem('one_vote_checklist', JSON.stringify(updated));
      syncToCloud({ checklist: updated });
      return updated;
    });
  }, []);

  const saveQuizScore = useCallback((quizId, score) => {
    setQuizScores(prev => {
      const updated = { ...prev, [quizId]: score };
      localStorage.setItem('one_vote_scores', JSON.stringify(updated));
      syncToCloud({ quizScores: updated });
      return updated;
    });
  }, []);

  const checklistProgress = Math.round((checklist.filter(i => i.done).length / checklist.length) * 100);

  return (
    <UserContext.Provider value={{
      user, authLoading, logout,
      voterType, selectVoterType,
      userName, setUserName,
      checklist, toggleChecklist,
      checklistProgress,
      quizScores, saveQuizScore,
      syncToCloud,
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
