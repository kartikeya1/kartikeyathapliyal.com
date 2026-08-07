import type { AnchorHTMLAttributes } from "react";

/**
 * Any link that leaves this site. Always target=_blank + rel=noopener
 * noreferrer - the rel pair is required whenever target=_blank is used with
 * an untrusted or third-party destination, to stop the new page from
 * accessing window.opener.
 */
export function ExternalLink({
  href,
  children,
  ...rest
}: AnchorHTMLAttributes<HTMLAnchorElement> & {
  href: string;
  children: React.ReactNode;
}) {
  return (
    <a href={href} target="_blank" rel="noopener noreferrer" {...rest}>
      {children}
    </a>
  );
}
