
import { fetchSWR } from '@/infrastructure/services/fetchSWR';
interface Props {
    id: string
}
export const useInitialDataQuestionOne = ({ id }: Props) => {
    const { data, isLoading, isError, mutate } = fetchSWR(`/api/questions/${id}`);
    return {
        data,
        isLoading,
        isError,
        mutate
    };
};