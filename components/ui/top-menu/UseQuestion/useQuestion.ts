import useQuestionStore from '@/store/useQuestion.store';
import { useEffect } from 'react';

const BASE_URL = process.env.NEXT_PUBLIC_BACKEND_URL;

// Falta integracion con back 2

const useQuestion = () => {
  const { questions, setQuestions } = useQuestionStore();
  const { currentPage } = useQuestionStore();

  useEffect(() => {
    const fetchQuestions = async () => {
      try {
        let url = `${BASE_URL}/v1/questions?page=${currentPage}`;
        const response = await fetch(url);
        if (!response.ok) throw new Error('No funcionó');
        const data = await response.json();
        setQuestions(data.questionsPerPage);
      } catch (error) {
        console.log('Error fetching datos', error);
      }
    };
    fetchQuestions();
  }, [setQuestions, currentPage]);

  return { questions };
};

export default useQuestion;
