import { useState } from 'react'
import { Button } from '@/presentation/components/ui/button'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/presentation/components/ui/dialog'
import { Input } from '@/presentation/components/ui/input'
import { Label } from '@/presentation/components/ui/label'
import { addQuizUseCase } from '@/core/use-case/quiz/add.user-case'
import { useForm } from 'react-hook-form';
import { QuizPayload } from '@/infrastructure/interfaces/quiz/quizInterface'
import { useAuthStore } from '@/presentation/store/useAuthStatus.store'
import { useInitialDataQuiz } from '@/presentation/hooks/initialDataQuizTabline'
import { toast } from 'sonner'




export const AddQuizComponent = () => {
    const token = useAuthStore(state => state.token);
    const { mutate } = useInitialDataQuiz();
    const [isAddCategoryOpen, setIsAddCategoryOpen] = useState(false);
    const [errorsForm, setErrorsForm] = useState<string>("");
    const { register, handleSubmit, reset, formState: { errors } } = useForm<QuizPayload>();
    const onSubmit = async (data: QuizPayload) => {
        try {
            if (token) {
                await addQuizUseCase(token, {
                    title: data.title,
                    description: data.description,
                });
                setIsAddCategoryOpen(false);
                mutate();
                toast.success("Registro Agregado de forma correcta");
                reset();
            }
        } catch (error) {
            console.error("Error al agregar el quiz:", error);
            if (error instanceof Error) {
                setErrorsForm(error.message);
            } else {
                setErrorsForm("Ocurrió un error inesperado. Inténtalo de nuevo.");
            }
        }
    };
    return (
        <Dialog open={isAddCategoryOpen} onOpenChange={setIsAddCategoryOpen}>
            <DialogTrigger asChild>
                <Button>Agregar Categoría</Button>
            </DialogTrigger>

            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Agregar Nuevo Quiz</DialogTitle>
                </DialogHeader>

                <form onSubmit={handleSubmit(onSubmit)}>
                    <Label htmlFor="categoryName">Nombre de la Categoría</Label>
                    <Input id="categoryName" {...register("title", { required: true })} />
                    {errors.title && <span>This field is required</span>}

                    <Label htmlFor="description">Descripción</Label>
                    <Input id="description" {...register("description", { required: true })} />
                    {errors.description && <span>This field is required</span>}
                    <br />
                    {errorsForm && (
                        <div className="text-red-500 py-2 bg-red-100 border border-red-300 rounded">
                            {errorsForm.split('\n').map((error, index) => (
                                <div key={index}>{error}</div>
                            ))}
                        </div>
                    )}
                    <br />

                    <Button type="submit" className="mt-4">Guardar</Button>
                </form>
            </DialogContent>
        </Dialog>
    );
}
