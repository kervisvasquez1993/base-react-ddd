import { AddQuestionComponents } from './AddQuestionComponents'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '../../../ui/table'
import { Button } from '../../../ui/button'
import { Trash2 } from 'lucide-react'
import { EditQuestionComponents } from './EditQuestionComponents'
import { useInitialDataQuestionTabline } from '@/presentation/hooks/initialDataQuestionTabline'
import { Spinner } from '../../SpinerComponents'
import { EditQuestionImageComponents } from './EditQuestionImageComponents'
import { useInitialDataQuiz } from '@/presentation/hooks/initialDataQuizTabline'
import { useAuthStore } from '@/presentation/store/useAuthStatus.store'
import { deleteQuestionUseCase } from '@/core/use-case/question/delete.use-case'
import { toast } from 'sonner'

export const TagQuestionComponent = () => {
    const { data, isLoading, mutate } = useInitialDataQuestionTabline()
    const { data: quizData, isLoading: LoadingQuiz } = useInitialDataQuiz()
    const token = useAuthStore(state => state.token)
    const handleDeleteQuestion = async (questionId: number) => {
        try {
            if (token) {
                const data = await deleteQuestionUseCase(token, questionId);
                console.log(data);
                mutate(); 
                toast.success(`Pregunta eliminada de forma correcta.`);
            }
        } catch (error) {
            console.error("Error eliminando la pregunta:", error);
            toast.error("Ocurrió un error al intentar eliminar la pregunta.");
        }
    };
    return (
        <>
            <div className="mb-4">
                <AddQuestionComponents />
            </div>
            <Table>
                <TableHeader>
                    <TableRow>
                        <TableHead>Pregunta</TableHead>
                        <TableHead>Correcta</TableHead>
                        <TableHead>Categoría</TableHead>
                        <TableHead>Acciones</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {
                        isLoading ? <Spinner /> : (
                            data?.data?.map((question: any) => (
                                <TableRow key={question.id}>
                                    <TableCell>{question.question}</TableCell>
                                    <TableCell>{question.correct_answer ? 'Sí' : 'No'}</TableCell>
                                    {LoadingQuiz ? <Spinner /> : (<TableCell>{quizData.data.find((c: any) => c.title === question.quiz_name)?.title}</TableCell>)}
                                    {/* */}
                                    <TableCell>
                                        <EditQuestionComponents question={question} />

                                        <EditQuestionImageComponents  />
                                        <Button
                                            variant="ghost"
                                            size="icon"
                                            onClick={() => handleDeleteQuestion(question.id)}
                                        >
                                            <Trash2 className="h-4 w-4" />
                                        </Button>
                                    </TableCell>
                                </TableRow>
                            ))
                        )
                    }

                </TableBody>
            </Table>

        </>
    )
}
