import { createContext, useContext, useState, useCallback, useEffect } from 'react';
import { auth, db, googleProvider } from '../config/firebase';
import { onAuthStateChanged, signInWithPopup, signOut } from 'firebase/auth';
import { doc, setDoc, getDoc } from 'firebase/firestore';

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
  const [user, setUser] = useState(null);
  const [authLoading, setAuthLoading] = useState(true);
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

  // Sync to Cloud helper
  const syncToCloud = async (data) => {
    if (!auth.currentUser) return;
    try {
      await setDoc(doc(db, 'users', auth.currentUser.uid), data, { merge: true });
    } catch (error) {
      console.error('Error syncing to cloud:', error);
    }
  };

  // Auth Listener
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      setUser(currentUser);
      if (currentUser) {
        setUserName(currentUser.displayName || 'Voter');
        // Fetch cloud data
        try {
          const docSnap = await getDoc(doc(db, 'users', currentUser.uid));
          if (docSnap.exists()) {
            const data = docSnap.data();
            if (data.voterType) { setVoterType(data.voterType); localStorage.setItem('one_vote_type', data.voterType); }
            if (data.checklist) { setChecklist(data.checklist); localStorage.setItem('one_vote_checklist', JSON.stringify(data.checklist)); }
            if (data.quizScores) { setQuizScores(data.quizScores); localStorage.setItem('one_vote_scores', JSON.stringify(data.quizScores)); }
          }
        } catch (error) {
          console.error('Error fetching cloud data:', error);
        }
      }
      setAuthLoading(false);
    });
    return () => unsubscribe();
  }, []);

  const loginWithGoogle = async () => {
    try {
      await signInWithPopup(auth, googleProvider);
    } catch (error) {
      console.error('Error signing in:', error);
    }
  };

  const logout = async () => {
    try {
      await signOut(auth);
      setUserName('Voter');
    } catch (error) {
      console.error('Error signing out:', error);
    }
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
      user, authLoading, loginWithGoogle, logout,
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
