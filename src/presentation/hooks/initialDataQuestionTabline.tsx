
import { fetchSWR } from '@/infrastructure/services/fetchSWR';
export const useInitialDataQuestionTabline = () => {
    const { data, isLoading, isError, mutate } = fetchSWR('/api/questions');
    return {
        data,
        isLoading,
        isError,
        mutate
    };
};