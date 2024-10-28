import React, { useState } from 'react'
import { Button } from '@/presentation/components/ui/button'
import { Checkbox } from '@/presentation/components/ui/checkbox'
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/presentation/components/ui/dialog'
import { Input } from '@/presentation/components/ui/input'
import { Label } from '@/presentation/components/ui/label'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/presentation/components/ui/select'
import { Pencil } from 'lucide-react'
import { useInitialDataQuiz } from '@/presentation/hooks/initialDataQuizTabline'
import { Spinner } from '../../SpinerComponents'

interface Question {
    id: number,
    quiz_id: number,
    question: string,
    correct_answer: boolean
}
interface Props {
    question: any
}

export const EditQuestionComponents = ({ question }: Props) => {
    const [isEditQuestionOpen, setIsEditQuestionOpen] = useState(false)
    const { data, isLoading } = useInitialDataQuiz()
    return (
        <>
            <Button variant="ghost" size="icon" onClick={() => { setIsEditQuestionOpen(true) }}>
                <Pencil className="h-4 w-4" />
            </Button>
            <Dialog open={isEditQuestionOpen} onOpenChange={setIsEditQuestionOpen}>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>Editar Pregunta</DialogTitle>
                    </DialogHeader>
                    {question && (
                        <form onSubmit={(e) => {
                            e.preventDefault()
                            console.log("hola")
                        }}>
                            <div className="grid gap-4">
                                <div>
                                    <Label htmlFor="question">Pregunta</Label>
                                    <Input id="question" name="question" defaultValue={question.question} required />
                                </div>
                                <div className="flex items-center space-x-2">
                                    <Checkbox id="isCorrect" name="isCorrect" defaultChecked={question.correct_answer} />
                                    <Label htmlFor="isCorrect">Es correcta</Label>
                                </div>
                                <div>
                                    <Label htmlFor="categoryId">Categoría</Label>
                                    <Select name="categoryId" defaultValue={question.quiz_name.toString()} required>
                                        <SelectTrigger>
                                            <SelectValue placeholder="Selecciona una categoría" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            {
                                                isLoading ? <Spinner /> : (
                                                    data.data.map((quiz: any) => (
                                                        <SelectItem key={quiz.id} value={quiz.id.toString()}>
                                                            {quiz.title}
                                                        </SelectItem>
                                                    ))
                                                )
                                            }
                                            {

                                            }
                                        </SelectContent>
                                    </Select>
                                </div>
                            </div>
                            <Button type="submit" className="mt-4">Actualizar</Button>
                        </form>
                    )}
                </DialogContent>
            </Dialog>
        </>
    )
}
