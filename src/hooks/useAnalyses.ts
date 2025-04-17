import { useState, useEffect } from 'react';
import { AnalysisItem } from '@/src/types/analysis';
import { fetchAnalyses, fetchAnalysisBySlug } from '@/src/app/api/analyses';

export const useAnalyses = () => {
    const [analyses, setAnalyses] = useState<AnalysisItem[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<Error | null>(null);

    useEffect(() => {
        const loadAnalyses = async () => {
            try {
                setLoading(true);
                const response = await fetchAnalyses();
                setAnalyses(response.data);
                setError(null);
            } catch (err) {
                setError(err instanceof Error ? err : new Error('Ошибка при загрузке данных'));
            } finally {
                setLoading(false);
            }
        };

        loadAnalyses();
    }, []);

    return { analyses, loading, error };
};

export const useAnalysisDetail = (slug: string) => {
    const [analysis, setAnalysis] = useState<AnalysisItem | null>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<Error | null>(null);

    useEffect(() => {
        const loadAnalysisDetail = async () => {
            if (!slug) return;

            try {
                setLoading(true);
                const data = await fetchAnalysisBySlug(slug);
                setAnalysis(data);
                setError(null);
            } catch (err) {
                setError(err instanceof Error ? err : new Error('Ошибка при загрузке данных'));
            } finally {
                setLoading(false);
            }
        };

        loadAnalysisDetail();
    }, [slug]);

    return { analysis, loading, error };
};