import { create } from 'zustand';

interface Question {
  question_id: string;
  title: string;
  descripcion: string;
}
interface QuestionStore {
  questions: Question[];
  setQuestions: (questions: Question[]) => void; // Función para actualizar el estado
}

const useQuestionStore = create<QuestionStore>((set) => ({
  questions: [],
  setQuestions: (questions) => set({ questions }), // Actualiza el estado
}));

export default useQuestionStore;
