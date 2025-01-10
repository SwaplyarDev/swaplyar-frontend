import useQuestionStore from '@/store/useQuestion.store';
import { useEffect } from 'react';

const BASE_URL = process.env.NEXT_PUBLIC_URL;

const useQuestion = () => {
  const { questions, setQuestions } = useQuestionStore();

  useEffect(() => {
    const fetchQuestions = async () => {
      try {
        let url = 'https://apiswaplyar.vercel.app/api/v1/questions';
        const response = await fetch(url);
        if (!response.ok) throw new Error('No funcionó');
        const data = await response.json();
        setQuestions(data.questionsPerPage); // Actualiza el estado global
      } catch (error) {
        console.log('Error fetching datos', error);
      }
    };
    fetchQuestions();
  }, [setQuestions]);

  return { questions }; // Retorna las preguntas para uso en el componente
};

export default useQuestion;
