import { useEffect, useState } from 'react';
import { CheckupItem, CheckupsResponse, fetchCheckups, fetchCheckupBySlug } from '../app/api/checkups';

export const useCheckups = () => {
    const [checkups, setCheckups] = useState<CheckupItem[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<Error | null>(null);

    useEffect(() => {
        const loadCheckups = async () => {
            try {
                setLoading(true);
                const response = await fetchCheckups();
                setCheckups(response.data);
                setError(null);
            } catch (err) {
                setError(err instanceof Error ? err : new Error('Ошибка при загрузке данных'));
            } finally {
                setLoading(false);
            }
        };

        loadCheckups();
    }, []);

    return { checkups, loading, error };
};

export const useCheckupDetail = (slug: string) => {
    const [checkup, setCheckup] = useState<CheckupItem | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<Error | null>(null);

    useEffect(() => {
        const loadCheckupDetail = async () => {
            if (!slug) return;

            try {
                setLoading(true);
                const data = await fetchCheckupBySlug(slug);
                setCheckup(data);
                setError(null);
            } catch (err) {
                setError(err instanceof Error ? err : new Error('Ошибка при загрузке данных'));
            } finally {
                setLoading(false);
            }
        };

        loadCheckupDetail();
    }, [slug]);

    return { checkup, loading, error };
};