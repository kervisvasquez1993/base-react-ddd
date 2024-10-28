
import { fetchSWR } from '@/infrastructure/services/fetchSWR';
export const useInitialDataQuiz = () => {
    const { data, isLoading, isError, mutate } = fetchSWR('/api/quiz');
    return {
        data,
        isLoading,
        isError,
        mutate
    };
};