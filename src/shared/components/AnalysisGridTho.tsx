import React, { useState, useEffect } from 'react';
import { UniversalCard } from '../components/UniversalCard';
import { applyColorToIcon, getIconColorByTheme } from '../utils/iconUtils';
import { useThemeStore } from '@/src/store/theme';
import { API_BASE_URL } from '@/src/config/constants';
import axios from 'axios';
import { getAnalysisIcon } from '@/src/config/iconMapping';
import {useLanguageStore} from "@/src/store/language";

interface AnalysisItem {
  uuid: string;
  slug: string;
  name: string;
  mini_description: string;
  icon: string;
}

export const AnalysisGridTho = () => {
  const [analyses, setAnalyses] = useState<AnalysisItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isMobile, setIsMobile] = useState(false);
  const [visibleGroups, setVisibleGroups] = useState(1);
  const { theme } = useThemeStore();

  const { currentLocale } = useLanguageStore();
  
  // Загрузка данных с API
  useEffect(() => {
    const fetchAnalyses = async () => {
      try {
        setLoading(true);
        const response = await axios.get(`${API_BASE_URL}/medical-tests`, {
          headers: {
            'Content-Type': 'application/json',
            'X-Language': currentLocale || 'ru', // Используем currentLocale с fallback на 'ru'
          }
        });
        setAnalyses(response.data.data);
        setError(null);
      } catch (err) {
        console.error('Error fetching analyses:', err);
        setError('Ошибка при загрузке данных');
      } finally {
        setLoading(false);
      }
    };

    fetchAnalyses();
  }, []);

  // Обработка размера экрана
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    handleResize(); // Инициализация
    window.addEventListener('resize', handleResize);
    
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Группировка данных по 4 элемента для мобильного вида
  const itemsPerGroup = 4;
  const groupedData: AnalysisItem[][] = [];
  
  for (let i = 0; i < analyses.length; i += itemsPerGroup) {
    groupedData.push(analyses.slice(i, i + itemsPerGroup));
  }
  
  // Определяем общее количество видимых элементов
  const visibleItems = isMobile 
    ? (groupedData.slice(0, visibleGroups).flat()) 
    : analyses;

  // Показать следующую группу
  const showMoreItems = () => {
    if (visibleGroups < groupedData.length) {
      setVisibleGroups(visibleGroups + 1);
    }
  };

  // Проверка, можно ли показать еще группы
  const canShowMore = isMobile && visibleGroups < groupedData.length;

  if (loading) {
    return (
      <div className="mt-20 flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-light-accent"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="mt-20">
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
          <p>{error}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="mt-20">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
        {visibleItems.map((analysis) => (
          <div key={analysis.uuid} className="h-full">
            <UniversalCard
              variant="analysis-card"
              title={analysis.name}
              description={analysis.mini_description || ''} 
              additionalInfo={`${Math.floor(Math.random() * 10) + 5} показателей`} // Генерируем случайное количество или можете заменить на реальное, если API его предоставляет
              icon={analysis.icon}
              link={`/analysis/${analysis.slug}`}
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
            Показать ещё {Math.min(itemsPerGroup, analyses.length - visibleItems.length)} анализа
          </button>
        </div>
      )}
    </div>
  );
};

export default AnalysisGridTho;