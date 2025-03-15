'use client';

import React from 'react';
import { UniversalCard } from './UniversalCard';
import { StethoscopeIcon, ChecklistIcon, NeuronIcon, BloodCellsIcon } from './MedicalIcons';
import { useTranslation } from '@/src/hooks/useTranslation';

const translations = {
  ru: {
    specialists: {
      title: 'К кому обратиться?',
      items: [
        {
          title: 'Аллергия',
          description: 'Аллерголог-иммунолог — проведёт диагностику и подберёт лечение',
          link: '/specialists/allergology'
        },
        {
          title: 'Неврология',
          description: 'Диагностика и лечение заболеваний нервной системы, включая головные боли и расстройства сна',
          link: '/specialists/neurology',
          servicesCount: 7
        }
      ]
    },
    checkups: {
      title: 'Какой чек-ап пройти?',
      items: [
        {
          title: 'Аллергия',
          description: 'Чек-ап «Женское здоровье» или «Мужское здоровье до 40 лет»',
          link: '/checkups/allergy'
        },
        {
          title: 'Простуда',
          description: 'Чек-ап «Женское здоровье» или «Мужское здоровье до 40 лет»',
          link: '/checkups/cold'
        }
      ]
    },
    analysis: {
      title: 'Анализы',
      items: [
        {
          title: 'Коагулограмма',
          description: 'Оценка свертываемости крови и выявление нарушений',
          link: '/analysis/coagulogram'
        }
      ]
    }
  },
  uz: {
    specialists: {
      title: 'Kimga murojaat qilish kerak?',
      items: [
        {
          title: 'Allergiya',
          description: 'Allergolog-immunolog — diagnostika o\'tkazadi va davolashni tanlaydi',
          link: '/specialists/allergology'
        },
        {
          title: 'Nevrologiya',
          description: 'Asab tizimi kasalliklarini diagnostika qilish va davolash, shu jumladan bosh og\'rig\'i va uyqu buzilishlari',
          link: '/specialists/neurology',
          servicesCount: 7
        }
      ]
    },
    checkups: {
      title: 'Qanday tekshiruvdan o\'tish kerak?',
      items: [
        {
          title: 'Allergiya',
          description: '«Ayollar salomatligi» yoki «40 yoshgacha bo\'lgan erkaklar salomatligi» tekshiruvi',
          link: '/checkups/allergy'
        },
        {
          title: 'Shamollash',
          description: '«Ayollar salomatligi» yoki «40 yoshgacha bo\'lgan erkaklar salomatligi» tekshiruvi',
          link: '/checkups/cold'
        }
      ]
    },
    analysis: {
      title: 'Tahlillar',
      items: [
        {
          title: 'Koagulogramma',
          description: 'Qonning ivishini baholash va buzilishlarni aniqlash',
          link: '/analysis/coagulogram'
        }
      ]
    }
  }
};

interface ServiceCardsContainerProps {
  type: 'specialists' | 'checkups' | 'analysis';
  className?: string;
}

export const ServiceCardsContainer: React.FC<ServiceCardsContainerProps> = ({
  type,
  className = '',
}) => {
  const { t } = useTranslation(translations);
  const section = t(type, { returnObjects: true });
  
  // Функция для получения иконки на основе типа карточки и её заголовка
  const getIcon = (cardType: string, cardTitle: string) => {
    if (cardType === 'specialists') {
      if (cardTitle.toLowerCase().includes('аллерг') || 
          cardTitle.toLowerCase().includes('allerg')) {
        return <StethoscopeIcon />;
      } else if (cardTitle.toLowerCase().includes('невро') || 
                cardTitle.toLowerCase().includes('nevro')) {
        return <NeuronIcon />;
      }
    } else if (cardType === 'checkups') {
      return <ChecklistIcon />;
    } else if (cardType === 'analysis') {
      if (cardTitle.toLowerCase().includes('коагуло') || 
          cardTitle.toLowerCase().includes('koagulo')) {
        return <BloodCellsIcon />;
      }
    }
    
    // Дефолтная иконка
    return <StethoscopeIcon />;
  };
  
  // Определяем параметры отображения в зависимости от типа
  const getCardProps = (type: string) => {
    switch (type) {
      case 'specialists':
        return {
          variant: 'specialist' as const,
          iconPosition: 'bottom' as const
        };
      case 'checkups':
        return {
          variant: 'checkup' as const,
          iconPosition: 'bottom' as const
        };
      case 'analysis':
        return {
          variant: 'analysis' as const,
          iconPosition: 'top' as const
        };
      default:
        return {
          variant: 'default' as const,
          iconPosition: 'top' as const
        };
    }
  };

  return (
    <div className={`space-y-6 ${className}`}>
      <h2 className="text-2xl font-semibold">{section.title}</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4  gap-4">
        {section.items.map((item: any, index: number) => (
          <UniversalCard
            key={index}
            title={item.title}
            description={item.description}
            icon={getIcon(type, item.title)}
            additionalInfo={item.servicesCount ? `${item.servicesCount} услуг` : undefined}
            link={item.link}
            {...getCardProps(type)}
          />
        ))}
      </div>
    </div>
  );
};