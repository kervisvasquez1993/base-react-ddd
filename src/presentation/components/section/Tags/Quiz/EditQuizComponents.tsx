import { useState } from 'react'

import { Pencil } from 'lucide-react';
import { Button } from '@/presentation/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/presentation/components/ui/dialog';
import { Label } from '@/presentation/components/ui/label';
import { Input } from '@/presentation/components/ui/input';
import { useEditQuiz } from '@/presentation/hooks/useEditQuiz';
interface Quiz {
    id: string
    title: string,
    description: string
}

interface Props {
    quiz: Quiz
}

interface Quiz {
    id: string;
    title: string;
    description: string;
}

interface Props {
    quiz: Quiz;
}

export const EditQuizComponents = ({ quiz }: Props) => {
    const [isEditCategoryOpen, setIsEditCategoryOpen] = useState(false);
    const { register, handleSubmit, errors, errorsForm, onSubmit } = useEditQuiz(Number(quiz.id), () => setIsEditCategoryOpen(false));

    return (
        <>
            <Button
                variant="ghost"
                size="icon"
                onClick={() => setIsEditCategoryOpen(true)}
            >
                <Pencil className="h-4 w-4" />
            </Button>

            <Dialog open={isEditCategoryOpen} onOpenChange={setIsEditCategoryOpen}>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>Editar Quiz</DialogTitle>
                    </DialogHeader>
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <Label htmlFor="title">Título</Label>
                        <Input id="title" {...register("title", { required: true })} defaultValue={quiz.title} />
                        {errors.title && <span>This field is required</span>}

                        <Label htmlFor="description">Descripción</Label>
                        <Input id="description" {...register("description", { required: true })} defaultValue={quiz.description} />
                        {errors.description && <span>This field is required</span>}

                        {errorsForm && (
                            <div className="text-red-500 py-2 bg-red-100 border border-red-300 rounded">
                                {errorsForm.split('\n').map((error, index) => (
                                    <div key={index}>{error}</div>
                                ))}
                            </div>
                        )}

                        <Button type="submit" className="mt-4">Guardar</Button>
                    </form>
                </DialogContent>
            </Dialog>
        </>
    );
};