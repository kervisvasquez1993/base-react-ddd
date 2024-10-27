
import { useState } from 'react'

import { Home, Book, Settings, LogOut } from 'lucide-react'
import { Badge } from '../components/ui/badge'
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '../components/ui/card'
import { BadgeQuizComponents } from '../components/section/BadgeQuiz.components'
import { QuestionSectionComponent } from '../components/section/QuestionSection.components'

// Simulación de datos
const quizzes = [
    { id: 1, name: "Historia" },
    { id: 2, name: "Ciencia" },
    { id: 3, name: "Geografía" },
    { id: 4, name: "Literatura" },
    { id: 5, name: "Arte" },
]

const questions = [
    { id: 1, quizId: 1, name: "¿En qué año comenzó la Segunda Guerra Mundial?", image: "/placeholder.svg?height=200&width=300", correctAnswers: 3, totalAnswers: 5, quizName: "Historia" },
    { id: 2, quizId: 2, name: "¿Cuál es el símbolo químico del oro?", image: "/placeholder.svg?height=200&width=300", correctAnswers: 4, totalAnswers: 4, quizName: "Ciencia" },
    { id: 3, quizId: 3, name: "¿Cuál es la capital de Francia?", image: "/placeholder.svg?height=200&width=300", correctAnswers: 5, totalAnswers: 5, quizName: "Geografía" },
    { id: 4, quizId: 4, name: "¿Quién escribió 'Cien años de soledad'?", image: "/placeholder.svg?height=200&width=300", correctAnswers: 2, totalAnswers: 3, quizName: "Literatura" },
    { id: 5, quizId: 5, name: "¿Quién pintó 'La noche estrellada'?", image: "/placeholder.svg?height=200&width=300", correctAnswers: 3, totalAnswers: 4, quizName: "Arte" },
]

export function TablineScreen() {


    const [selectedQuizId, setSelectedQuizId] = useState<number | null>(null)
    const filteredQuestions = selectedQuizId
        ? questions.filter(q => q.quizId === selectedQuizId)
        : questions

    return (
        <div className="min-h-screen flex flex-col">


            <main className="flex-grow">
                <div className="container mx-auto p-4 space-y-8">
                    <BadgeQuizComponents />
                    <QuestionSectionComponent />
                </div>
            </main>
        </div>
    )
}