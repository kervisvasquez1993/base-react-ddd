import React from 'react'
import { AddQuestionComponents } from './AddQuestionComponents'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '../../../ui/table'
import { Button } from '../../../ui/button'
import { ImageIcon, Pencil, Trash2 } from 'lucide-react'
import { EditQuestionComponents } from './EditQuestionComponents'
import { useInitialDataQuestionTabline } from '@/presentation/hooks/initialDataQuestionTabline'
import { Spinner } from '../../SpinerComponents'
import { EditQuestionImageComponents } from './EditQuestionImageComponents'
import { useInitialDataQuiz } from '@/presentation/hooks/initialDataQuizTabline'

export const TagQuestionComponent = () => {
    const { data, isLoading } = useInitialDataQuestionTabline()
    const { data: quizData, isLoading: LoadingQuiz } = useInitialDataQuiz()
    return (
        <>
            <div className="mb-4">
                <AddQuestionComponents />
            </div>
            <Table>
                <TableHeader>
                    <TableRow>
                        <TableHead>Pregunta</TableHead>
                        <TableHead>Correcta</TableHead>
                        <TableHead>Categoría</TableHead>
                        <TableHead>Acciones</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {
                        isLoading ? <Spinner /> : (
                            data.data.map((question: any) => (
                                <TableRow key={question.id}>
                                    <TableCell>{question.question}</TableCell>
                                    <TableCell>{question.isCorrect ? 'Sí' : 'No'}</TableCell>
                                    {LoadingQuiz ? <Spinner /> : (<TableCell>{quizData.data.find((c: any) => c.title === question.quiz_name)?.title}</TableCell>)}
                                    {/* */}
                                    <TableCell>
                                        <EditQuestionComponents question={question} />
                                        
                                        <EditQuestionImageComponents id={question.id} />
                                        <Button variant="ghost" size="icon" onClick={() => console.log("hola")}>
                                            <Trash2 className="h-4 w-4" />
                                        </Button>
                                    </TableCell>
                                </TableRow>
                            ))
                        )
                    }

                </TableBody>
            </Table>


        </>
    )
}
