import { Button } from "@/presentation/components/ui/button"
import { Dialog, DialogContent, DialogHeader } from "@/presentation/components/ui/dialog"
import { Input } from "@/presentation/components/ui/input"
import { Label } from "@/presentation/components/ui/label"
import { DialogTitle } from "@radix-ui/react-dialog"
import { ImageIcon } from "lucide-react"
import { useState } from "react"


export const EditQuestionImageComponents = () => {
    const [isEditImageOpen, setIsEditImageOpen] = useState(false)
    return (
        <>
            <Button variant="ghost" size="icon" onClick={() => {
                setIsEditImageOpen(true)
            }}>
                <ImageIcon className="h-4 w-4" />
            </Button>
            <Dialog open={isEditImageOpen} onOpenChange={setIsEditImageOpen}>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>Editar Imagen de la Pregunta</DialogTitle>
                        <DialogTitle> <p className="text-red-500">Logica en el frontend no implementada </p></DialogTitle>
                    </DialogHeader>

                    <form onSubmit={(e) => {
                        e.preventDefault()
                        // const image = (e.target as HTMLFormElement).image.files[0]
                        // updateQuestionImage(editingQuestion.id, image)
                    }}>
                        <div>
                            <Label htmlFor="image">Nueva Imagen</Label>
                            <Input id="image" name="image" type="file" accept="image/*" required />
                        </div>
                        <Button type="submit" className="mt-4">Actualizar Imagen</Button>
                    </form>

                </DialogContent>
            </Dialog>
        </>
    )
}
