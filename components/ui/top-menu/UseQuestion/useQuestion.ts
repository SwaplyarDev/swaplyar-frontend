import useQuestionStore from '@/store/useQuestion.store';
import { useEffect, useState } from 'react';

const BASE_URL = process.env.NEXT_PUBLIC_BACKEND_URL;

type UseQuestionOptions = { force?: boolean; page?: number; minCount?: number; path?: string; scope?: string };

const useQuestion = (options: UseQuestionOptions = {}) => {
  const { force = false, page, minCount, path = '/questions/paginated', scope } = options;
  const { questions, setQuestions } = useQuestionStore();
  const { currentPage } = useQuestionStore();
  const [loading, setLoading] = useState(false);
  // Scoped local state to avoid collisions across different consumers
  const [scopedQuestions, setScopedQuestions] = useState<any[]>([]);

  useEffect(() => {
    // Determine current list and setter based on scope
    const currentList = scope ? scopedQuestions : questions;
    const setList = scope ? setScopedQuestions : setQuestions;

    // Solo fetch si no hay preguntas cargadas, a menos que force=true
    if (!force && currentList.length > 0) return;
    
    const fetchQuestions = async () => {
      try {
        setLoading(true);
        const targetPage = page ?? currentPage;

        // Función auxiliar para normalizar la respuesta del backend a un array de preguntas
        const extractArray = (payload: any): any[] => {
          if (Array.isArray(payload)) return payload;
          if (Array.isArray(payload?.data)) return payload.data; // soporte backend Nest: { data, total, page, limit }
          if (Array.isArray(payload?.questions)) return payload.questions;
          if (Array.isArray(payload?.questionsPerPage)) return payload.questionsPerPage;
          if (Array.isArray(payload?.results)) return payload.results;
          return [];
        };

        // Si no se requiere un mínimo, realizar un único fetch
        if (!minCount || minCount <= 0) {
          const url = `${BASE_URL}${path}?page=${targetPage}`;
          const res = await fetch(url);
          if (!res.ok) throw new Error('No funcionó');
          const data = await res.json();
          console.log('Response:', data);
          const questionsData = extractArray(data);
          const uniqueQuestions = questionsData.filter((question, index, self) =>
            index === self.findIndex(q => q.id === question.id)
          );
          setList(uniqueQuestions);
          setLoading(false);
          return;
        }

      
        const collected: any[] = [];
        let p = targetPage || 1;
        let pageSize = 0;
        const maxPages = 20; 

        while (collected.length < minCount && p <= maxPages) {
          const url = `${BASE_URL}${path}?page=${p}`;
          const res = await fetch(url);
          if (!res.ok) break;
          const data = await res.json();
          const batch = extractArray(data);
          if (p === targetPage) pageSize = batch.length;
          // Merge evitando duplicados por id
          for (const q of batch) {
            if (!collected.find((e) => e.id === q.id)) collected.push(q);
          }

     
          if (batch.length === 0) break;
    
          if (pageSize > 0 && batch.length < pageSize) break;

          p += 1;
        }

        setList(collected);
        setLoading(false);
      } catch (error) {
        console.log('Error fetching datos', error);
        // Fallback questions
        const fallbackQuestions = [
          {
            id: '1',
            title: '¿Es seguro usar SwaplyAr?',
            description: 'Sí, SwaplyAr es una plataforma segura y confiable. Contamos con sistemas de verificación para garantizar la protección de cada transacción y asegurar que tu dinero llegue correctamente al destino seleccionado.',
          },
          {
            id: '2',
            title: '¿Cuánto tarda en completarse la operación?',
            description: 'El proceso suele tardar menos de 5 minutos una vez que hemos confirmado el pago y recibido el comprobante.',
          },
          {
            id: '3',
            title: '¿Qué métodos de pago aceptan?',
            description: 'Aceptamos pagos mediante transferencias bancarias y billeteras digitales. Puedes ver las opciones disponibles en nuestra calculadora.',
          },
        ];
        setList(fallbackQuestions);
        setLoading(false);
      }
    };
    fetchQuestions();
  }, [questions.length, scopedQuestions.length, setQuestions, currentPage, force, page, minCount, path, scope]);

  return { questions: scope ? scopedQuestions : questions, loading };
};

export default useQuestion;
