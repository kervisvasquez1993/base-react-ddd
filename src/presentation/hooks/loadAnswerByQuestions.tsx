
import { fetchSWR } from '@/infrastructure/services/fetchSWR';
interface Props {
    id: string
}
export const loadDataAnswerByQuestion = ({ id }: Props) => {
    const { data, isLoading, isError, mutate } = fetchSWR(`/api/questions/${id}/answers`);
    return {
        data,
        isLoading,
        isError,
        mutate
    };
};