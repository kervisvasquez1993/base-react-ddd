// quizStore.ts
import { create } from 'zustand'

interface QuizStore {
  score: number
  answeredQuestions: { [quizId: number]: { [questionId: number]: boolean } }
  incrementScore: (quizId: number, questionId: number) => void
  resetQuiz: () => void
}

export const useQuizStore = create<QuizStore>((set) => ({
  score: 0,
  answeredQuestions: {},

  // Increment score only if the question hasn't been answered correctly before in the specific quiz
  incrementScore: (quizId, questionId) =>
    set((state) => {
      const quizAnsweredQuestions = state.answeredQuestions[quizId] || {}

      if (!quizAnsweredQuestions[questionId]) {
        return {
          score: state.score + 10,
          answeredQuestions: {
            ...state.answeredQuestions,
            [quizId]: {
              ...quizAnsweredQuestions,
              [questionId]: true,
            },
          },
        }
      }
      return state
    }),

  // Reset function to clear scores and answered questions for a new game
  resetQuiz: () => set({ score: 0, answeredQuestions: {} }),
}))
