import { FooterLink } from '../FooterLink/FooterLink';

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
          className={`mb-4  flex flex-col items-center text-left sm:mb-0  sm:items-center sm:text-center ${align === 'start' ? 'lg:items-start' : align === 'end' ? 'lg:items-end' : 'lg:items-center'
            }`}
        >
          <span className="mb-2  font-textFont text-[18px]">{title}</span>

          {links.map(({ href, label, view }) => (
            <FooterLink key={href} href={href} label={label} view={view} />
          ))}
        </section>
      )}
    </>
  );
}
