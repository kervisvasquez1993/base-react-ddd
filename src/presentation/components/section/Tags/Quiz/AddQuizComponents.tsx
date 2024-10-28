import { useState } from 'react'
import { Button } from '@/presentation/components/ui/button'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/presentation/components/ui/dialog'
import { Input } from '@/presentation/components/ui/input'
import { Label } from '@/presentation/components/ui/label'
import { useAddQuiz } from '@/presentation/hooks/useAddQuiz'

export const AddQuizComponent = () => {
    const [isAddCategoryOpen, setIsAddCategoryOpen] = useState(false);
    const {
        register,
        handleSubmit,
        errors,
        errorsForm,
        onSubmit,
    } = useAddQuiz(() => setIsAddCategoryOpen(false)); 
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