import { useEffect, useState } from 'react'
import { Button } from '@/presentation/components/ui/button'
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/presentation/components/ui/dialog'
import { Input } from '@/presentation/components/ui/input'
import { Label } from '@/presentation/components/ui/label'
import { Pencil } from 'lucide-react'
import { useInitialDataQuiz } from '@/presentation/hooks/initialDataQuizTabline'
import { Spinner } from '../../SpinerComponents'
import { useEditQuestion } from '@/presentation/hooks/useEditQuestion'


interface Props {
    question: any
}
export const EditQuestionComponents = ({ question }: Props) => {
    const [isEditQuestionOpen, setIsEditQuestionOpen] = useState(false);
    const { data, isLoading } = useInitialDataQuiz();
    const {
        register,
        handleSubmit,
        setValue,
        errors,
        errorsForm,
        onSubmit,
    } = useEditQuestion(question.id, () => setIsEditQuestionOpen(false));

    useEffect(() => {
        setValue("question", question.question);
        setValue("correct_answer", question.correct_answer);
        setValue("quiz_id", question.quiz_id.toString());
    }, [question, setValue]);

    return (
        <>
            <Button variant="ghost" size="icon" onClick={() => { setIsEditQuestionOpen(true); }}>
                <Pencil className="h-4 w-4" />
            </Button>
            <Dialog open={isEditQuestionOpen} onOpenChange={setIsEditQuestionOpen}>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>Editar Pregunta</DialogTitle>
                    </DialogHeader>
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <div className="grid gap-4">
                            <div>
                                <Label htmlFor="question">Pregunta</Label>
                                <Input
                                    id="question"
                                    {...register("question", { required: true })}
                                />
                                {errors.question && (
                                    <span className="text-red-500">Este campo es requerido</span>
                                )}
                            </div>
                            <div className="flex items-center space-x-2">
                                <input
                                    id="isCorrect"
                                    type="checkbox"
                                    {...register("correct_answer", { required: false })}
                                    onChange={(e) => setValue("correct_answer", e.target.checked)}
                                />
                                <Label htmlFor="isCorrect">Es correcta</Label>
                                {errors.correct_answer && (
                                    <span className="text-red-500">Este campo es requerido</span>
                                )}
                            </div>
                            <div>
                                <Label htmlFor="quiz_id">Categoría</Label>
                                <select
                                    id="quiz_id"
                                    {...register("quiz_id", { required: true })}
                                    className="block w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-200"
                                >
                                    <option value="">Selecciona una categoría</option>
                                    {isLoading ? (
                                        <option disabled>
                                            <Spinner />
                                        </option>
                                    ) : (
                                        data.data.map((quiz: any) => (
                                            <option key={quiz.id} value={quiz.id.toString()}>
                                                {quiz.title}
                                            </option>
                                        ))
                                    )}
                                </select>
                                {errors.quiz_id && (
                                    <span className="text-red-500">Este campo es requerido</span>
                                )}
                            </div>
                        </div>

                        {errorsForm && (
                            <div className="text-red-500 py-2 bg-red-100 border border-red-300 rounded mt-4">
                                {errorsForm.split('\n').map((error, index) => (
                                    <div key={index}>{error}</div>
                                ))}
                            </div>
                        )}

                        <Button type="submit" className="mt-4">
                            Actualizar
                        </Button>
                    </form>
                </DialogContent>
            </Dialog>
        </>
    );
};