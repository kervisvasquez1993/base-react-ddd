import { useState } from 'react'
import { useQuizStore } from '../store/quizStore.ts'

export interface QuizQuestion {
  id: number
  question: string
  image?: string
  answer: 'True' | 'False'
}

const Quiz = ({
  questions,
  quizId,
  onQuizComplete,
}: {
  questions: QuizQuestion[]
  quizId: number
  onQuizComplete: () => void
}) => {
  const [currentQuizIndex, setCurrentQuizIndex] = useState(0)
  const [error, setError] = useState<string | null>(null)

  // Zustand state and actions
  const score = useQuizStore((state) => state.score)
  const incrementScore = useQuizStore((state) => state.incrementScore)

  const handleAnswer = (userAnswer: 'True' | 'False') => {
    const currentQuiz = questions[currentQuizIndex]

    // Check answer and only increment score if it was previously incorrect
    if (userAnswer === currentQuiz.answer) {
      incrementScore(quizId, currentQuiz.id)
    }

    // Move to the next question or complete the quiz
    if (currentQuizIndex < questions.length - 1) {
      setCurrentQuizIndex((prevIndex) => prevIndex + 1)
      setError(null)
    } else {
      setError(`Quiz completed! Your total score: ${score}`)
      onQuizComplete()
    }
  }

  const currentQuiz = questions[currentQuizIndex]

  return (
    <div className='mt-8 w-full max-w-md text-center'>
      {error ? (
        <p className='text-xl font-bold text-green-600'>{error}</p>
      ) : (
        <>
          <h2 className='text-2xl font-semibold'>{currentQuiz.question}</h2>
          {currentQuiz.image && (
            <img
              src={currentQuiz.image}
              alt=''
              className='w-full h-auto mt-4'
            />
          )}
          <div className='flex space-x-4 mt-6 justify-center'>
            <button onClick={() => handleAnswer('True')} className='btn-true'>
              True
            </button>
            <button onClick={() => handleAnswer('False')} className='btn-false'>
              False
            </button>
          </div>
          <p className='mt-4'>Current Score: {score}</p>
        </>
      )}
    </div>
  )
}

export default Quiz
