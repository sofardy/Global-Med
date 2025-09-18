'use client';

import { useEffect, useRef } from 'react';

export default function YandexMetrikaScript() {
  const scriptLoaded = useRef(false);
  
  useEffect(() => {
    if (typeof window !== 'undefined' && !scriptLoaded.current) {
      scriptLoaded.current = true;
      
      // Создаем элемент script для Yandex.Metrika
      const scriptElement = document.createElement('script');
      scriptElement.type = 'text/javascript';
      
      // Устанавливаем содержимое скрипта Yandex.Metrika
      scriptElement.innerHTML = `
        (function(m,e,t,r,i,k,a){
            m[i]=m[i]||function(){(m[i].a=m[i].a||[]).push(arguments)};
            m[i].l=1*new Date();
            for (var j = 0; j < document.scripts.length; j++) {if (document.scripts[j].src === r) { return; }}
            k=e.createElement(t),a=e.getElementsByTagName(t)[0],k.async=1,k.src=r,a.parentNode.insertBefore(k,a)
        })(window, document,'script','https://mc.yandex.ru/metrika/tag.js?id=104200568', 'ym');

        ym(104200568, 'init', {ssr:true, webvisor:true, clickmap:true, ecommerce:"dataLayer", accurateTrackBounce:true, trackLinks:true});
      `;
      
      // Добавляем скрипт в head документа
      document.head.appendChild(scriptElement);
      
      // Добавляем noscript элемент для случаев когда JavaScript отключен
      const noscriptElement = document.createElement('noscript');
      noscriptElement.innerHTML = '<div><img src="https://mc.yandex.ru/watch/104200568" style="position:absolute; left:-9999px;" alt="" /></div>';
      document.body.appendChild(noscriptElement);
    }
  }, []);

  return null;
}