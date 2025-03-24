'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

/**
 * Enhanced Link component that handles transitions between pages
 */
interface EnhancedLinkProps {
  href: string;
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
  scroll?: boolean;
  prefetch?: boolean;
  [key: string]: any; // For any other props
}

export const EnhancedLink: React.FC<EnhancedLinkProps> = ({
  href,
  children,
  className = '',
  onClick,
  scroll = true,
  prefetch = true,
  ...rest
}) => {
  const router = useRouter();
  const [isTransitioning, setIsTransitioning] = useState(false);

  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    // Skip if it's an external link or special behavior is needed
    if (href.startsWith('http') || href.startsWith('#') || href.startsWith('tel:') || href.startsWith('mailto:')) {
      if (onClick) onClick();
      return;
    }

    e.preventDefault();
    
    // Notify that we're about to change routes
    document.dispatchEvent(new Event('beforeRouteChange'));
    setIsTransitioning(true);
    
    // Call onClick handler if provided
    if (onClick) onClick();
    
    // Use setTimeout to create a small delay for the loading state to be visible
    setTimeout(() => {
      router.push(href);
      
      // After navigation completes
      setTimeout(() => {
        document.dispatchEvent(new Event('routeChangeComplete'));
        setIsTransitioning(false);
      }, 300);
    }, 100);
  };

  return (
    <Link
      href={href}
      className={`${className} ${isTransitioning ? 'pointer-events-none' : ''}`}
      scroll={scroll}
      prefetch={prefetch}
      onClick={handleClick}
      {...rest}
    >
      {children}
    </Link>
  );
};