'use client';

import React from 'react';
import Link from 'next/link';
import { Suspense } from 'react';

interface EnhancedLinkProps {
  href: string;
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
  scroll?: boolean;
  prefetch?: boolean;
  [key: string]: any;
}

function LinkComponent(props: EnhancedLinkProps) {
  const { href, children, className, onClick, ...rest } = props;
  
  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    // Если внешняя или специальная ссылка, просто выполняем стандартное поведение
    if (href.startsWith('http') || href.startsWith('#') || href.startsWith('tel:') || href.startsWith('mailto:')) {
      if (onClick) onClick();
      return;
    }
    
    // Для внутренних ссылок вызываем onClick, если он предоставлен
    if (onClick) onClick();
  };

  return (
    <Link
      href={href}
      className={className}
      onClick={handleClick}
      {...rest}
    >
      {children}
    </Link>
  );
}

export const EnhancedLink: React.FC<EnhancedLinkProps> = (props) => {
  return (
    <Suspense fallback={<Link href={props.href} className={props.className}>{props.children}</Link>}>
      <LinkComponent {...props} />
    </Suspense>
  );
};