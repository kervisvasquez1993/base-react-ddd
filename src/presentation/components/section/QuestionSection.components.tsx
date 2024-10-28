import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '../ui/card'
import { Badge } from '../ui/badge'
import { useInitialDataQuestionTabline } from '@/presentation/hooks/initialDataQuestionTabline';
import { Spinner } from './Spiner.components';
import { Link } from 'react-router-dom';

export const QuestionSectionComponent = () => {
    const { data, isLoading } = useInitialDataQuestionTabline();
    console.log(data)
    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {
                isLoading ? <Spinner /> : (
                    data.data.map((question: any) => (
                        <Card key={question.id} className="flex flex-col">
                            <CardHeader>
                                <CardTitle>{question.question}</CardTitle>
                            </CardHeader>
                            <CardContent className="flex-grow">
                                <img
                                    src={question.image ? `${import.meta.env.VITE_API_BACKEND}${question.image}` : "/no-image.jpg"}
                                    alt={question.question || "No image available"}
                                    width={300}
                                    height={200}
                                    className="w-full h-48 object-cover rounded-md mb-4"
                                />
                                <div className="flex justify-between items-center">
                                    <Badge variant="secondary">
                                        Correctas: {question.answer_count}/{question.answer_count}
                                    </Badge>
                                    <Badge>{question.quiz_name}</Badge>
                                </div>
                            </CardContent>
                            <CardFooter className="justify-end">
                                <Badge variant="outline" className="cursor-pointer">
                                    <Link to={`/question/${question.id}`}>
                                        Ver detalles
                                    </Link>
                                </Badge>
                            </CardFooter>
                        </Card>

                    ))
                )
            }
        </div>
    )
}
