'use client';

import { useState, useEffect } from 'react';
import { usePathname, useSearchParams } from 'next/navigation';
import { useRouter } from 'next/navigation';

/**
 * Component that provides smooth page transitions with loading state
 */
export function PageTransition() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [isNavigating, setIsNavigating] = useState(false);
  
  // Listen for route changes and handle transitions
  useEffect(() => {
    // Handle start of navigation
    const handleRouteChangeStart = () => {
      setIsNavigating(true);
    };
    
    // Handle end of navigation
    const handleRouteChangeComplete = () => {
      // Slight delay to ensure DOM is fully updated
      setTimeout(() => {
        // Scroll to header or top of page
        const headerElement = document.getElementById('page-header');
        
        if (headerElement) {
          headerElement.scrollIntoView({
            behavior: 'smooth',
            block: 'start'
          });
        } else {
          window.scrollTo({
            top: 0,
            behavior: 'smooth'
          });
        }
        
        // Hide loading indicator
        setIsNavigating(false);
      }, 100);
    };

    // Add event listeners
    document.addEventListener('beforeRouteChange', handleRouteChangeStart);
    document.addEventListener('routeChangeComplete', handleRouteChangeComplete);
    
    // Custom link click handler to show loading state
 const handleLinkClick = (e: MouseEvent) => {
      // Type assertion for the target element
      const target = e.target as HTMLElement;
      
      // Only handle internal links with href attribute
      if (target.tagName === 'A' && 
          (target as HTMLAnchorElement).href && 
          (target as HTMLAnchorElement).href.startsWith(window.location.origin)) {
        setIsNavigating(true);
      }
    };
    
    document.addEventListener('click', handleLinkClick);
    
    // Clean up event listeners
    return () => {
      document.removeEventListener('beforeRouteChange', handleRouteChangeStart);
      document.removeEventListener('routeChangeComplete', handleRouteChangeComplete);
      document.removeEventListener('click', handleLinkClick);
    };
  }, []);
  
  // Reset navigation state when route actually changes
  useEffect(() => {
    setIsNavigating(false);
    
    // Smooth scroll to top on actual route change
    const headerElement = document.getElementById('page-header');
    if (headerElement) {
      headerElement.scrollIntoView({
        behavior: 'smooth',
        block: 'start'
      });
    } else {
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
    }
  }, [pathname, searchParams]);

  return (
    <>
      {/* Overlay loading indicator that appears during navigation */}
      {isNavigating && (
        <div 
          className="fixed inset-0 bg-white/70 dark:bg-gray-900/70 z-50 flex items-center justify-center transition-opacity duration-300"
          style={{ backdropFilter: 'blur(4px)' }}
        >
          <div className="relative">
            {/* Pulse animation for loading */}
            <div className="w-16 h-16 rounded-full border-4 border-light-accent border-t-transparent animate-spin"></div>
            <div className="absolute inset-0 rounded-full border-4 border-transparent animate-pulse"></div>
          </div>
        </div>
      )}
    </>
  );
}