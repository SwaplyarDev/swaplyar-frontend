import Image from 'next/image';
import { MockImagesTransLight } from '@/data/mockImagesTransaction';
import { TransactionTypeSingle } from '@/types/transactions/transactionsType';
import { strokepopup, swaplyarAvatarpopup } from '@/utils/assets/img-database';

interface TransactionProps {
  trans: TransactionTypeSingle;
}

const TransferImages: React.FC<TransactionProps> = ({ trans }) => {
  const { payment_method } = trans;
  const senderImg = MockImagesTransLight.find((img) => img.name === payment_method.sender.value)?.image;

  const receiverImg = MockImagesTransLight.find((img) => img.name === payment_method.receiver.value)?.image;

  return (
    <section className="flex min-h-24 flex-row items-center justify-evenly overflow-hidden rounded-full border-2 border-[#012a8d] p-3">
      <article className="flex h-16 w-16 items-center justify-center">
        <Image className="h-full w-full" src={swaplyarAvatarpopup} alt="avatar" width={200} height={200} />
      </article>
      <article className="flex items-center gap-4">
        <article className="flex h-20 w-48 items-center justify-center">
          {senderImg ? (
            <Image className="h-full w-full" alt="sender" src={senderImg} width={200} height={70} unoptimized />
          ) : (
            <p className="text-red-500">No encontrada</p>
          )}
        </article>
        <article className="flex flex-row items-center justify-center">
          <Image className="h-4 w-4" alt="flecha" src={strokepopup} width={19.167} height={10.833} />
          <Image className="h-4 w-4" alt="flecha" src={strokepopup} width={19.167} height={10.833} />
          <Image className="h-4 w-4" alt="flecha" src={strokepopup} width={19.167} height={10.833} />
        </article>
        <article className="flex h-20 w-48 items-center justify-center">
          {receiverImg ? (
            <Image className="h-full w-full" alt="receiver" src={receiverImg} width={200} height={70} unoptimized />
          ) : (
            <p className="text-red-500">No encontrada</p>
          )}
        </article>
      </article>
    </section>
  );
};

export default TransferImages;
