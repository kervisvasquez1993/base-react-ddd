import { useState } from 'react'
import { Button } from '@/presentation/components/ui/button'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/presentation/components/ui/dialog'
import { Input } from '@/presentation/components/ui/input'
import { Label } from '@/presentation/components/ui/label'



export const AddQuizComponent = () => {
    const [isAddCategoryOpen, setIsAddCategoryOpen] = useState(false)
    return (
        <Dialog open={isAddCategoryOpen} onOpenChange={setIsAddCategoryOpen}>
            <DialogTrigger asChild>
                <Button>Agregar Categoría</Button>
            </DialogTrigger>

            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Agregar Nueva Categoría</DialogTitle>
                </DialogHeader>
                <form onSubmit={(e) => {
                    e.preventDefault()
                    // const name = (e.target as HTMLFormElement).categoryName.value
                    // addCategory(name)
                    console.log("call desde form")
                }}>
                    <Label htmlFor="categoryName">Nombre de la Categoría</Label>
                    <Input id="categoryName" name="categoryName" required />
                    <Button type="submit" className="mt-4">Guardar</Button>
                </form>
            </DialogContent>
        </Dialog>
    )
}
