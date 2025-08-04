'use server';

import { QuestionResponse } from '@/types/questions/question';

export const fetchQuestions = async (): Promise<QuestionResponse> => {
  const BASE_URL = process.env.NEXT_PUBLIC_BACKEND_URL;

  if (!BASE_URL) {
    throw new Error('Backend URL is not defined.');
  }

  try {
    const response = await fetch(`${BASE_URL}/questions`, { method: 'GET', cache: 'no-store' });
    if (!response.ok) {
      throw new Error(`Failed to fetch questions: ${response.status} ${response.statusText}`);
    }

    const data: QuestionResponse = await response.json();
    return data;
  } catch (error: any) {
    throw new Error(`Failed to fetch questions. Error: ${error.message}`);
  }
};

export const fetchQuestionsParams = async (params: number): Promise<QuestionResponse> => {
  const BASE_URL = process.env.NEXT_PUBLIC_BACKEND_URL;

  if (!BASE_URL) {
    throw new Error('Backend URL is not defined.');
  }

  try {
    const response = await fetch(`${BASE_URL}/questions?page=${params}`, { method: 'GET', cache: 'no-store' });
    if (!response.ok) {
      throw new Error(`Failed to fetch questions: ${response.status} ${response.statusText}`);
    }

    const data = await response.json();
    return data;
  } catch (error: any) {
    throw new Error(`Failed to fetch questions. Error: ${error.message}`);
  }
};
