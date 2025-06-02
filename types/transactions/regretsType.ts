export interface RegretTypeSingle {
  regret_id: string;
  transaction_id: string;
  last_name: string;
  email: string;
  phone_number: string;
  status: string;
  note: string;
  created_at: string;
  error?: {
    message: string;
    details: null | string;
  };
}

export const emptyRegret: RegretTypeSingle = {
  regret_id: '',
  transaction_id: '',
  last_name: '',
  email: '',
  phone_number: '',
  status: '',
  note: '',
  created_at: '',
};
