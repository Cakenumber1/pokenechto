import { useRouter } from 'next/router';
import { SyntheticEvent } from 'react';

type ActiveLinkType = {
  children : any,
  href: string,
  onclick: () => void
};

export const ActiveLink = ({ children, href, onclick } : ActiveLinkType) => {
  const router = useRouter();

  const handleClick = (e : SyntheticEvent) => {
    e.preventDefault();
    onclick();
    setTimeout(() => {
      router.push(href);
    }, 2300);
  };

  return (
    <a href={href} onClick={handleClick}>
      {children}
    </a>
  );
};
