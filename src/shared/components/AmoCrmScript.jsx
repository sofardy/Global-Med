'use client';

import { useEffect, useRef } from 'react';

export default function AmoCrmScript() {
  const scriptLoaded = useRef(false);
  
  useEffect(() => {
    if (typeof window !== 'undefined' && !scriptLoaded.current) {
      scriptLoaded.current = true;
      
      // Создаем элемент script
      const scriptElement = document.createElement('script');
      
      // Устанавливаем содержимое скрипта
      scriptElement.innerHTML = `(function(a,m,o,c,r,m){a[m]={id:"428337",hash:"25bacc1063dcef90299d97873170f18fc0e0480ed74ffe1d1816157487ede439",locale:"ru",inline:false,setMeta:function(p){this.params=(this.params||[]).concat([p])}};a[o]=a[o]||function(){(a[o].q=a[o].q||[]).push(arguments)};var d=a.document,s=d.createElement('script');s.async=true;s.id=m+'_script';s.src='https://gso.amocrm.ru/js/button.js';d.head&&d.head.appendChild(s)}(window,0,'amoSocialButton',0,0,'amo_social_button'));`;
      
      // Добавляем скрипт в документ
      document.head.appendChild(scriptElement);
    }
  }, []);

  return null;
}