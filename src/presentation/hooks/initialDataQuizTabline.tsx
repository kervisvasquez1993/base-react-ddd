
import { fetchSWR } from '@/infrastructure/services/fetchSWR';
export const useInitialDataQuizTabline = () => {
    const { data, isLoading, isError, mutate } = fetchSWR('/api/quiz');
    return {
        data,
        isLoading,
        isError,
        mutate
    };
};