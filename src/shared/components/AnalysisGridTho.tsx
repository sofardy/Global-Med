import React, { useState, useEffect } from 'react';
import { UniversalCard } from '../components/UniversalCard';
import { analysisData, AnalysisItem } from '../mocks/analysisData';
import { applyColorToIcon, getIconColorByTheme } from '../utils/iconUtils';
import { useThemeStore } from '@/src/store/theme';

// If AnalysisItem doesn't have these properties, extend the interface in this file
// or update the original interface in analysisData.ts
interface ExtendedAnalysisItem extends AnalysisItem {
  description?: string;
  servicesCount?: string;
}

export const AnalysisGridTho = () => {
  const [isMobile, setIsMobile] = useState(false);
  const [visibleGroups, setVisibleGroups] = useState(1);
  const { theme } = useThemeStore();
  
  // Cast to the extended type
  const typedAnalysisData = analysisData as ExtendedAnalysisItem[];
  
  // Группировка данных по 4 элемента
  const itemsPerGroup = 4;
  const groupedData: ExtendedAnalysisItem[][] = [];
  for (let i = 0; i < typedAnalysisData.length; i += itemsPerGroup) {
    groupedData.push(typedAnalysisData.slice(i, i + itemsPerGroup));
  }
  
  // Определяем общее количество видимых элементов
  const visibleItems = isMobile ? 
    (groupedData.slice(0, visibleGroups).flat()) : 
    typedAnalysisData;
  
  // Обработка размера экрана
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    handleResize(); // Инициализация
    window.addEventListener('resize', handleResize);
    
    return () => window.removeEventListener('resize', handleResize);
  }, []);
  
  // Показать следующую группу
  const showMoreItems = () => {
    if (visibleGroups < groupedData.length) {
      setVisibleGroups(visibleGroups + 1);
    }
  };
  
  // Проверка, можно ли показать еще группы
  const canShowMore = isMobile && visibleGroups < groupedData.length;
  
  return (
    <div className="mt-20">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
        {visibleItems.map((analysis) => (
          <div key={analysis.id} className="h-full">
            <UniversalCard
              variant="analysis-card"
              title={analysis.title}
              description={analysis.description || ''} // Provide default value
              additionalInfo={analysis.servicesCount || ''} // Provide default value
              icon={applyColorToIcon(analysis.iconPath, getIconColorByTheme(theme))}
              link={analysis.link}
              buttonText="Подробнее"
              className="h-full min-h-[160px] sm:min-h-[180px] md:min-h-[200px]"
            />
          </div>
        ))}
      </div>
      {canShowMore && (
        <div className="mt-6 flex justify-center">
          <button
            onClick={showMoreItems}
            className="px-6 py-3 bg-light-accent text-white rounded-xl hover:bg-light-accent/90 transition-colors"
          >
            Показать ещё {Math.min(itemsPerGroup, typedAnalysisData.length - visibleItems.length)} анализа
          </button>
        </div>
      )}
    </div>
  );
};

export default AnalysisGridTho;