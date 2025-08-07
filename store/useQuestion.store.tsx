import { create } from 'zustand';

interface Question {
  id: string;
  title: string;
  description: string;
}
interface QuestionStore {
  questions: Question[];
  currentPage: number;
  setQuestions: (questions: Question[]) => void; // Función para actualizar el estado
  setCurrentPage: (page: number) => void;
}

const useQuestionStore = create<QuestionStore>((set) => ({
  questions: [],
  setQuestions: (questions) => set({ questions }), // Actualiza el estado
  currentPage: 1,
  setCurrentPage: (page) => set({ currentPage: page }),
}));

export default useQuestionStore;
