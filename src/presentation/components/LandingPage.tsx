import { useState } from 'react'
import { Link } from 'react-router-dom'
import useAuthCheckUser from '../hooks/useAuthCheckUser'
import Quiz from './Quiz'
import type { QuizQuestion } from './Quiz'
import { quizzes } from '../data'

const LandingPage = () => {
  const isLogged = useAuthCheckUser()
  const [selectedQuiz, setSelectedQuiz] = useState<QuizQuestion[] | null>(null)
  const [selectedQuizId, setSelectedQuizId] = useState<number | null>(null)

  const handleQuizSelection = (index: number) => {
    setSelectedQuiz(quizzes[index])
    setSelectedQuizId(index)
  }

  return (
    <div className='flex flex-col items-center justify-center h-screen bg-background'>
      <h1 className='text-4xl font-bold mb-8'>Welcome to the Quiz Game!</h1>
      {!isLogged ? (
        <>
          <p className='mb-4'>Join us and test your knowledge!</p>
          <div className='flex space-x-4'>
            <Link to='/login' className='btn-primary'>
              Login
            </Link>
            <Link to='/register' className='btn-secondary'>
              Register
            </Link>
          </div>
        </>
      ) : (
        <>
          <h2 className='text-2xl font-semibold mb-4'>Select a Quiz</h2>
          <div className='flex space-x-4 mb-6'>
            {quizzes.map((quiz, i) => (
              <button
                onClick={() => handleQuizSelection(i)}
                className='btn-primary'
                key={i}
              >
                Quiz Set {i + 1}
              </button>
            ))}
          </div>
          {selectedQuiz && selectedQuizId !== null ? (
            <Quiz
              questions={selectedQuiz}
              quizId={selectedQuizId}
              onQuizComplete={() => setSelectedQuiz(null)}
            />
          ) : (
            <p className='text-lg'>Please select a quiz to get started.</p>
          )}
        </>
      )}
    </div>
  )
}

export default LandingPage
