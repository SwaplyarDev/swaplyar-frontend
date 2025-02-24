export interface NoteTypeSingle {
  note_id: string;
  transaction_id: string;
  note: string;
  created_at: string;
  updated_at?: string;
}

export const emptyNote: NoteTypeSingle = {
  note_id: '',
  transaction_id: '',
  note: '',
  created_at: '',
  updated_at: '',
};

export interface sendNoteType {
  message: string;
  file: File | null;
  transaccionId: string;
}
