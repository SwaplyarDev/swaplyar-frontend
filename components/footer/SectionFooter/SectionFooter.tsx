import Link from 'next/link';
import { FooterLink } from '../FooterLink/FooterLink';
import Image from 'next/image';
import LogoSwaplySVG from '@/public/LogoSwaplySVG.svg'

interface FooterLinkProps {
  href: string;
  label: string;
  view?: 'login' | 'register';
}

export function Section({
  title,
  links,
  align,
  blog,
}: {
  title: string;
  links: FooterLinkProps[];
  align?: 'start' | 'center' | 'end';
  blog?: boolean;
}) {
  return (
    <>
      {blog ? (
        <section className="flex flex-col items-center sm:mb-4 sm:flex-row">
          {links.map(({ href, label, view }, index) => (
            <>
              <FooterLink key={href} href={href} label={label} view={view} />
              {index < links.length - 1 && <span className="mx-2 hidden sm:block">|</span>}
            </>
          ))}
        </section>
      ) : (
        <section
          className={`pb-12  flex flex-col items-center text-left sm:mb-0   ${align === 'start' ? 'sm:items-start' : align === 'end' ? 'sm:items-end' : 'sm:items-center'
            }`}
        >
          <span className="mb-2  font-textFont text-[18px]">{title}</span>

          {links.map(({ href, label, view }) => (
            <FooterLink key={href} href={href} label={label} view={view} />
          ))}
          {/* Conditional Rendering for the view image */}
          {title == "Normativa" && (
            <section className="absolute bottom-5  flex flex-grow justify-center filter dark:brightness-[0%] dark:invert sm:mb-0 sm:w-1/3 sm:justify-center">
              <Link href="/">
                <Image src={LogoSwaplySVG} alt="Cambiar saldo online" width={60} height={60} />
              </Link>
            </section>
          )}

        </section>

      )}
    </>
  );
}
