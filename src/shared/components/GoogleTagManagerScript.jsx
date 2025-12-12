'use client';

import { useEffect, useRef } from 'react';

export default function GoogleTagManagerScript() {
  const scriptLoaded = useRef(false);
  
  useEffect(() => {
    if (typeof window !== 'undefined' && !scriptLoaded.current) {
      scriptLoaded.current = true;
      
      // Создаем элемент script для Google Tag Manager
      const scriptElement = document.createElement('script');
      scriptElement.type = 'text/javascript';
      
      // Устанавливаем содержимое скрипта Google Tag Manager
      scriptElement.innerHTML = `
        (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
        new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
        j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
        'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
        })(window,document,'script','dataLayer','GTM-NWCG8LN8');
      `;
      
      // Добавляем скрипт в head документа
      document.head.appendChild(scriptElement);
      
      // Добавляем noscript элемент для случаев когда JavaScript отключен
      // Google Tag Manager требует размещения noscript сразу после открывающего тега <body>
      const noscriptElement = document.createElement('noscript');
      noscriptElement.innerHTML = '<iframe src="https://www.googletagmanager.com/ns.html?id=GTM-NWCG8LN8" height="0" width="0" style="display:none;visibility:hidden"></iframe>';
      // Вставляем в начало body, если есть первый элемент, иначе просто добавляем
      if (document.body.firstChild) {
        document.body.insertBefore(noscriptElement, document.body.firstChild);
      } else {
        document.body.appendChild(noscriptElement);
      }
    }
  }, []);

  return null;
}
