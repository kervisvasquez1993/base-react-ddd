import React, { useState } from 'react'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '../../../ui/dialog'
import { Button } from '../../../ui/button'
import { Label } from '../../../ui/label'
import { Input } from '../../../ui/input'
import { Checkbox } from '../../../ui/checkbox'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../../../ui/select'

export const AddQuestionComponents = () => {
    const [isAddQuestionOpen, setIsAddQuestionOpen] = useState(false)
    return (
        <Dialog open={isAddQuestionOpen} onOpenChange={setIsAddQuestionOpen}>
            <DialogTrigger asChild>
                <Button>Agregar Pregunta</Button>
            </DialogTrigger>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Agregar Nueva Pregunta</DialogTitle>
                </DialogHeader>
                <form onSubmit={(e) => {
                    e.preventDefault()
                    // const question = (e.target as HTMLFormElement).question.value
                    // const isCorrect = (e.target as HTMLFormElement).isCorrect.checked
                    // const image = (e.target as HTMLFormElement).image.files[0]
                    // const categoryId = parseInt((e.target as HTMLFormElement).categoryId.value)
                    // addQuestion(question, isCorrect, image, categoryId)
                }}>
                    <div className="grid gap-4">
                        <div>
                            <Label htmlFor="question">Pregunta</Label>
                            <Input id="question" name="question" required />
                        </div>
                        <div className="flex items-center space-x-2">
                            <Checkbox id="isCorrect" name="isCorrect" />
                            <Label htmlFor="isCorrect">Es correcta</Label>
                        </div>
                        <div>
                            <Label htmlFor="image">Imagen</Label>
                            <Input id="image" name="image" type="file" accept="image/*" required />
                        </div>
                        <div>
                            <Label htmlFor="categoryId">Categoría</Label>
                            <Select name="categoryId" required>
                                <SelectTrigger>
                                    <SelectValue placeholder="Selecciona una categoría" />
                                </SelectTrigger>
                                <SelectContent>
                                    {/* {categories.map((category) => (
                                        <SelectItem key={category.id} value={category.id.toString()}>
                                            {category.name}
                                        </SelectItem>
                                    ))} */}
                                </SelectContent>
                            </Select>
                        </div>
                    </div>
                    <Button type="submit" className="mt-4">Guardar</Button>
                </form>
            </DialogContent>
        </Dialog>
    )
}
