import { fetchSWR } from '@/infrastructure/services/fetchSWR';
export const usePositionUser = () => {
    const { data, isLoading, isError, mutate } = fetchSWR('/api/players-position');
    return {
        data,
        isLoading,
        isError,
        mutate
    };
};