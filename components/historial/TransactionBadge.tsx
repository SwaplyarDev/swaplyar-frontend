import { getEstadoEspanol } from "@/utils/transactionHelpers";

interface TransactionBadgeProps  {
  status: "completed" | "approved" | "in_transit" | "refund_in_transit" | "pending" | "review_payment" | "modified" | "discrepancy" | "rejected" | "cancelled" | "canceled" | "refunded";
}

const TransactionBadge = ({ status }: TransactionBadgeProps) => {
  const name = getEstadoEspanol(status);
  
  let colorClass = '';
  
  switch (status) {
    case 'completed':
    case 'approved':
      colorClass = 'bg-success-50 text-success-700';
      break;
    case 'in_transit':
      colorClass = 'bg-blue-light-50 text-blue-light-700';
      break;
    case 'refund_in_transit':
      colorClass = 'bg-blue-50 text-blue-700';
      break;
    case 'refunded':
      colorClass = 'bg-indigo-50 text-indigo-700';
      break;
    case 'pending':
      colorClass = 'bg-gray-100 text-gray-800';
      break;
    case 'review_payment':
      colorClass = 'bg-warning-50 text-warning-700';
      break;
    case 'modified':
      colorClass = 'bg-purple-50 text-purple-700';
      break;
    case 'discrepancy':
      colorClass = 'bg-orange-50 text-orange-700';
      break;
    case 'rejected':
      colorClass = 'bg-error-50 text-error-700';
      break;
    case 'cancelled':
    case 'canceled':
      colorClass = 'bg-blue-gray-50 text-blue-gray-700';
      break;
    default:
      colorClass = 'bg-gray-100 text-gray-900 dark:bg-gray-700 dark:text-gray-300';
  }
  
  return <div className={`${colorClass} px-2.5 py-0.5 rounded-2xl text-sm font-medium bg-blu`}>{name}</div>;
}

export default TransactionBadge;