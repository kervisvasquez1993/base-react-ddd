import  { useState } from 'react'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '../../../ui/dialog'
import { Button } from '../../../ui/button'
import { Label } from '../../../ui/label'
import { Input } from '../../../ui/input'
import { useInitialDataQuiz } from '@/presentation/hooks/initialDataQuizTabline'
import { Spinner } from '../../SpinerComponents'
import { useAddQuestion } from '@/presentation/hooks/useAddQuestion'


export const AddQuestionComponents = () => {
    const [isAddQuestionOpen, setIsAddQuestionOpen] = useState(false)
    const { data, isLoading } = useInitialDataQuiz()
    const {
        register,
        handleSubmit,
        errors,
        errorsForm,
        onSubmit,
        setValue
    } = useAddQuestion(() => setIsAddQuestionOpen(false));
    return (
        <Dialog open={isAddQuestionOpen} onOpenChange={setIsAddQuestionOpen}>
            <DialogTrigger asChild>
                <Button>Agregar Pregunta</Button>
            </DialogTrigger>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Agregar Nueva Pregunta</DialogTitle>
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

                        {/* <div>
                            <Label htmlFor="image">Imagen</Label>
                            <Input
                                id="image"
                                type="file"
                                accept="image/*"
                                onChange={(e) => {
                                    const file = e.target.files?.[0] || null;
                                    setValue("image", file);
                                }}
                            />
                            {errors.image && (
                                <span className="text-red-500">Este campo es requerido</span>
                            )}
                        </div> */}

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
                        Guardar
                    </Button>
                </form>

            </DialogContent>
        </Dialog>
    );
}
