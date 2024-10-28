import { useInitialDataQuizTabline } from '@/presentation/hooks/initialDataQuizTabline'
import { Spinner } from './Spiner.components'
import { Badge } from '../ui/badge'

export const BadgeQuizComponents = () => {
    const { data, isLoading } = useInitialDataQuizTabline()
    return (
        <div className="flex flex-wrap gap-2 justify-center">
            {
                isLoading ? <Spinner /> : (
                    data?.data.map((quiz: any) => (
                        <Badge
                            key={quiz.id}
                            variant={"outline"}
                            className="cursor-pointer text-lg px-4 py-2 rounded-[15px]"
                        >
                            {quiz.title}
                        </Badge>
                    ))
                )
            }
        </div>
    )
}
