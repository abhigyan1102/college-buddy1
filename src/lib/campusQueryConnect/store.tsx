import { create } from "zustand";
import { Question, questions as mockQuestions, currentUser } from "./mock-data";

export type { Question };

interface StoreState {
  questions: Question[];
  addQuestion: (question: Omit<Question, 'id' | 'userId' | 'timestamp' | 'answers' | 'views' | 'isUnanswered' | 'important'>, userId: string) => void;
  addAnswer: (questionId: string, answer: any, userId: string) => void;
  toggleLike: (questionId: string) => void;
}

export const useStore = create<StoreState>((set) => ({
  questions: mockQuestions,
  addQuestion: (newQuestionData, userId) => set((state) => {
    const newQuestion: Question = {
      id: `q-${Date.now()}`,
      userId: userId,
      timestamp: "Just now",
      isUnanswered: true,
      important: false,
      answers: [],
      views: 0,
      isAnonymous: false,
      ...newQuestionData
    };
    return { questions: [newQuestion, ...state.questions] };
  }),
  addAnswer: (questionId, answer, userId) => set((state) => ({
    questions: state.questions.map(q =>
      q.id === questionId
        ? { ...q, answers: [...q.answers, { ...answer, userId }] }
        : q
    )
  })),
  toggleLike: (questionId) => set((state) => ({
    // For now, we'll just return state as is or implement if mock-data supports it.
    // Looking at mock-data, there isn't a likes field on Question, so this might be a placeholder.
    questions: state.questions
  }))
}));
