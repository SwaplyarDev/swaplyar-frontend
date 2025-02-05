import { PixDarkImg, strokepopup, swaplyarAvatarpopup } from '@/utils/assets/img-database';
import { BankDarkImg, BankImg, PayoneerUsdDarkImg } from '@/utils/assets/imgDatabaseCloudinary';
import Image from 'next/image';

export default function ImagenesTranferencia() {
  return (
    <article className="inline-flex items-center justify-start gap-[98.25px] overflow-hidden rounded-[121px] border-2 border-[#012a8d] pb-[9px] pl-3.5 pr-[171.25px] pt-2">
      <article className="inline-flex h-[60px] w-[60px] items-center justify-center">
        <Image className="h-[60px] w-[60px]" src={swaplyarAvatarpopup} alt="avatar" width={200} height={200} />
      </article>
      <article className="inline-flex items-center justify-center gap-4 self-stretch">
        <article className="flex h-[70px] w-[200px] items-center justify-center">
          <Image
            className="h-[70px] w-[200px]"
            alt="imagen1"
            src={BankImg}
            width={200}
            height={70}
            unoptimized={true}
          />
        </article>
        <article className="flex w-[10%] flex-row items-center justify-center">
          <Image className="ml-3 h-[16px] w-[16px]" alt="imagen1" src={strokepopup} width={19.167} height={10.833} />
          <Image className="h-[16px] w-[16px]" alt="imagen1" src={strokepopup} width={19.167} height={10.833} />
          <Image className="mr-3 h-[16px] w-[16px]" alt="imagen1" src={strokepopup} width={19.167} height={10.833} />
        </article>
        <article className="flex items-center justify-start gap-0.5" />
        <article className="flex h-[70px] w-[200px] items-center justify-center">
          <Image
            className="h-[70px] w-[200px]"
            alt="imagen1"
            src={PixDarkImg}
            width={200}
            height={70}
            unoptimized={true}
          />
        </article>
      </article>
    </article>
  );
}
