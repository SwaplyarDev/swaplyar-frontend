interface IDiscountsData {
  user_discounts_id: string;
  code_id: string;
  user_id: string;
  transactions_id: string;
  is_used: 'FALSE' | 'TRUE';
  created_at: string;
  used_at: string;
  code: string;
  discount: string;
}

export interface IDiscountsObject {
  data: IDiscountsData[];
}
