import { Trash2 } from 'lucide-react';
import { useInitialDataQuiz } from '@/presentation/hooks/initialDataQuizTabline';
import { AddQuizComponent } from './AddQuizComponents';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/presentation/components/ui/table';
import { Spinner } from '../../SpinerComponents';
import { EditQuizComponents } from './EditQuizComponents';
import { Button } from '@/presentation/components/ui/button';
import { deleteQuizUseCase } from '@/core/use-case/quiz/delete.use-case';
import { useAuthStore } from '@/presentation/store/useAuthStatus.store';
import { toast } from 'sonner';


export const TagsQuizComponent = () => {
    const { data, isLoading, mutate } = useInitialDataQuiz();
    const token = useAuthStore(state => state.token)
    const handleDeleteQuiz = async (quizId: number) => {
        try {
            if (token) {
                const data = await deleteQuizUseCase(token, quizId);
                console.log(data)
                mutate()
                toast.success(`Quiz : ${data.title} eliminado de forma correcta `)
            }


        } catch (error) {
            console.error("Error eliminando el quiz:", error);
            toast.error("Ocurrió un error al intentar eliminar el quiz.");
        }
    };
    return (
        <>
            <div className="mb-4">
                <AddQuizComponent />
            </div>

            <Table>
                <TableHeader>
                    <TableRow>
                        <TableHead>Nombre</TableHead>
                        <TableHead>Description</TableHead>
                        <TableHead>Acciones</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {isLoading ? (
                        <Spinner />
                    ) : (
                        data.data.map((quiz: any) => (
                            <TableRow key={quiz.id}>
                                <TableCell>{quiz.title}</TableCell>
                                <TableCell>{quiz.description}</TableCell>
                                <TableCell>
                                    <EditQuizComponents quiz={quiz} />
                                    <Button
                                        variant="ghost"
                                        size="icon"
                                        onClick={() => handleDeleteQuiz(quiz.id)}
                                    >
                                        <Trash2 className="h-4 w-4" />
                                    </Button>
                                </TableCell>
                            </TableRow>
                        ))
                    )}
                </TableBody>
            </Table>


        </>
    );
};
