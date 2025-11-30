import React, { createContext, useContext, useState } from 'react';
import { Question, questions as initialQuestions, currentUser } from './mock-data';

interface StoreContextType {
  questions: Question[];
  addQuestion: (question: Omit<Question, 'id' | 'userId' | 'timestamp' | 'answers' | 'views' | 'isUnanswered' | 'important'>) => void;
}

const StoreContext = createContext<StoreContextType | undefined>(undefined);

export function StoreProvider({ children }: { children: React.ReactNode }) {
  const [questions, setQuestions] = useState<Question[]>(initialQuestions);

  const addQuestion = (newQuestionData: any) => {
    const newQuestion: Question = {
      id: `q-${Date.now()}`,
      userId: currentUser.id,
      timestamp: "Just now",
      isUnanswered: true,
      important: false,
      answers: [],
      views: 0,
      ...newQuestionData
    };
    
    // Add to beginning of list
    setQuestions(prev => [newQuestion, ...prev]);
  };

  return (
    <StoreContext.Provider value={{ questions, addQuestion }}>
      {children}
    </StoreContext.Provider>
  );
}

export function useStore() {
  const context = useContext(StoreContext);
  if (context === undefined) {
    throw new Error('useStore must be used within a StoreProvider');
  }
  return context;
}
