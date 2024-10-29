import { fetchSWR } from '@/infrastructure/services/fetchSWR';
interface Props {
    id: string
}
export const useDataForUser = ({ id }: Props) => {

    const { data, isLoading, isError, mutate } = fetchSWR(`/api/user/${id}/answers`);
    return {
        data,
        isLoading,
        isError,
        mutate
    };
};