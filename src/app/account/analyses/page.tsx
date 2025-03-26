'use client';
import { DownloadIcon } from '@/src/shared/ui/Icon';
import PacifierIcon from '@/src/shared/ui/Icon/PatientIcon';
import React, { useState } from 'react';

export default function Analyses() {
  const [loading, setLoading] = useState(false);
  const [showEmpty, setShowEmpty] = useState(false);
  
  // Mock test results data
  const testResults = [
    {
      id: 1,
      date: '19.05.2025',
      testType: 'Биохимический анализ крови',
      doctor: 'Врач лаборатории',
      doctorName: 'Иванова Мария Александровна'
    },
    {
      id: 2,
      date: '19.05.2025',
      testType: 'Биохимический анализ крови',
      doctor: 'Врач лаборатории',
      doctorName: 'Иванова Мария Александровна'
    },
    {
      id: 3,
      date: '19.05.2025',
      testType: 'Биохимический анализ крови',
      doctor: 'Врач лаборатории',
      doctorName: 'Иванова Мария Александровна'
    },
    {
      id: 4,
      date: '19.05.2025',
      testType: 'Биохимический анализ крови',
      doctor: 'Врач лаборатории',
      doctorName: 'Иванова Мария Александровна'
    },
    {
      id: 5,
      date: '19.05.2025',
      testType: 'Биохимический анализ крови',
      doctor: 'Врач лаборатории',
      doctorName: 'Иванова Мария Александровна'
    },
    {
      id: 6,
      date: '19.05.2025',
      testType: 'Биохимический анализ крови',
      doctor: 'Врач лаборатории',
      doctorName: 'Иванова Мария Александровна'
    },
    {
      id: 7,
      date: '19.05.2025',
      testType: 'Биохимический анализ крови',
      doctor: 'Врач лаборатории',
      doctorName: 'Иванова Мария Александровна'
    }
  ];

  // Empty state component
  const EmptyState = () => (
    <div className="flex flex-col items-center justify-center py-16 px-4">
      <div className="mb-6">
        <PacifierIcon size={120} color="#174F4B" />
      </div>
      <h3 className="text-2xl text-[#174F4B] font-medium">У вас пока нет результатов анализов...</h3>
    </div>
  );

  // Handle load more
  const handleLoadMore = () => {
    setLoading(true);
    // Simulate API call
    setTimeout(() => {
      setLoading(false);
    }, 1000);
  };

  // Download results function
    const handleDownload = (id: number) => {
    console.log(`Downloading results for ID: ${id}`);
    // Implementation for download functionality would go here
  };

  return (
    <div className="">
      <div className="mb-4 flex justify-end">
        <button 
          onClick={() => setShowEmpty(!showEmpty)}
          className="bg-[#094A54] text-white px-4 py-2 rounded-lg hover:bg-[#073a42] transition-colors"
        >
          {showEmpty ? 'Показать результаты' : 'Показать пустое состояние'}
        </button>
      </div>
      
      {showEmpty ? (
        <EmptyState />
      ) : (
        <div>
          {testResults.map((result) => (
            <div 
              key={result.id} 
              className="bg-white rounded-2xl mb-4 px-10 py-6 shadow-sm"
            >
              <div className="grid grid-cols-3">
                {/* Left column: date and test type */}
                <div className="col-span-1">
                  <div className="text-lg font-medium text-[#094A54]">
                    {result.date}
                  </div>
                  <div className="text-[#094A54] mt-1">
                    {result.testType}
                  </div>
                </div>
                
                {/* Middle column: doctor specialty and name */}
                <div className="col-span-1">
                  <div className="text-[#094A54] font-medium">{result.doctor}</div>
                  <div className="text-[#094A5480] text-sm mt-2">{result.doctorName}</div>
                </div>
                
                {/* Right column: download button */}
                <div className="col-span-1 flex justify-end items-center">
                  <button 
                    onClick={() => handleDownload(result.id)}
                    className="bg-[#094A54] hover:bg-[#243739] text-white px-6 py-4 rounded-[16px] flex items-center transition-colors"
                  >
                    <DownloadIcon size={20} color="#FFFFFF" className="mr-2" />
                    Скачать результаты
                  </button>
                </div>
              </div>
            </div>
          ))}
          
          <button 
            onClick={handleLoadMore}
            className="w-full bg-[#00C78B] text-white py-4 rounded-xl hover:bg-[#00b57d] transition-colors duration-300 mt-4"
          >
            {loading ? 'Загрузка...' : 'Загрузить еще'}
          </button>
        </div>
      )}
    </div>
  );
};
