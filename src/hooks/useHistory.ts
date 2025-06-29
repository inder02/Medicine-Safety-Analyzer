import { useState, useEffect } from 'react';
import { HistoryEntry, Medicine } from '../types';
import { useAuth } from '../contexts/AuthContext';

export const useHistory = () => {
  const [history, setHistory] = useState<HistoryEntry[]>([]);
  const { user } = useAuth();

  useEffect(() => {
    loadHistory();
  }, [user]);

  const loadHistory = () => {
    const storedHistory = localStorage.getItem('medisafe_history');
    if (storedHistory) {
      const allHistory: HistoryEntry[] = JSON.parse(storedHistory);
      if (user) {
        // Filter history for logged-in user
        setHistory(allHistory.filter(entry => entry.userId === user.id));
      } else {
        // For guest users, show entries with userId 'guest'
        setHistory(allHistory.filter(entry => entry.userId === 'guest'));
      }
    }
  };

  const addToHistory = (
    medicine: Medicine,
    searchType: 'camera' | 'search' | 'upload',
    searchQuery?: string
  ) => {
    const newEntry: HistoryEntry = {
      id: Date.now().toString(),
      userId: user?.id || 'guest',
      medicine,
      searchType,
      searchQuery,
      timestamp: new Date().toISOString()
    };

    const storedHistory = localStorage.getItem('medisafe_history');
    const existingHistory: HistoryEntry[] = storedHistory ? JSON.parse(storedHistory) : [];
    const updatedHistory = [newEntry, ...existingHistory];
    
    localStorage.setItem('medisafe_history', JSON.stringify(updatedHistory));
    loadHistory();
  };

  const removeFromHistory = (entryId: string) => {
    const storedHistory = localStorage.getItem('medisafe_history');
    if (storedHistory) {
      const existingHistory: HistoryEntry[] = JSON.parse(storedHistory);
      const updatedHistory = existingHistory.filter(entry => entry.id !== entryId);
      localStorage.setItem('medisafe_history', JSON.stringify(updatedHistory));
      loadHistory();
    }
  };

  const clearHistory = () => {
    const storedHistory = localStorage.getItem('medisafe_history');
    if (storedHistory) {
      const existingHistory: HistoryEntry[] = JSON.parse(storedHistory);
      const currentUserId = user?.id || 'guest';
      const updatedHistory = existingHistory.filter(entry => entry.userId !== currentUserId);
      localStorage.setItem('medisafe_history', JSON.stringify(updatedHistory));
      loadHistory();
    }
  };

  return {
    history,
    addToHistory,
    removeFromHistory,
    clearHistory
  };
};