'use server';

import { sendNoteType, NoteTypeSingle } from '@/types/transactions/notesType';

const NEXT_PUBLIC_BACKEND_URL = process.env.NEXT_PUBLIC_BACKEND_URL;

export const getAllNotes = async () => {
  try {
    const response = await fetch(`${NEXT_PUBLIC_BACKEND_URL}/v1/notes`);
    if (!response.ok) throw new Error('Failed to fetch notes');

    const data: NoteTypeSingle[] = await response.json();
    return data;
  } catch (error: any) {
    console.error('Error fetching notes:', error);
    return null;
  }
};

export const getNoteById = async (id: string) => {
  try {
    const response = await fetch(`${NEXT_PUBLIC_BACKEND_URL}/v1/notes/${id}`);
    if (!response.ok) throw new Error('Failed to fetch notes');

    const data: NoteTypeSingle = await response.json();
    return data;
  } catch (error: any) {
    console.error('Error fetching notes:', error);
    return null;
  }
};

export const deleteNoteById = async (id: string) => {
  try {
    const response = await fetch(`${NEXT_PUBLIC_BACKEND_URL}/v1/notes/${id}`, {
      method: 'DELETE',
    });
    if (!response.ok) throw new Error('Failed to delete note');

    return response;
  } catch (error: any) {
    console.error('Error deleting note:', error);
    return null;
  }
};

export const createNote = async ({ message, file, transaccionId }: sendNoteType) => {
  try {
    const formData = new FormData();
    formData.append('note', JSON.stringify(message));
    if (file) {
      formData.append('file', file);
    }
    formData.append('transaccionId', transaccionId);
    const response = await fetch(`${NEXT_PUBLIC_BACKEND_URL}/v1/notes/${transaccionId}`, {
      method: 'POST',
      body: formData,
    });

    if (!response.ok) {
      throw new Error('Failed to create note');
    }

    const result = await response.json();
    return result;
  } catch (error: any) {
    console.error('Error creating note:', error);
    return null;
  }
};

export const updateNote = async ({ message, file, transaccionId }: sendNoteType) => {
  try {
    const formData = new FormData();
    formData.append('note', JSON.stringify(message));
    if (file) {
      formData.append('file', file);
    }
    formData.append('transaccionId', transaccionId);
    const response = await fetch(`${NEXT_PUBLIC_BACKEND_URL}/v1/notes/${transaccionId}`, {
      method: 'PUT',
      body: formData,
    });

    if (!response.ok) {
      throw new Error('Failed to update note');
    }

    const result = await response.json();
    return result;
  } catch (error: any) {
    console.error('Error updating note:', error);
    return null;
  }
};
