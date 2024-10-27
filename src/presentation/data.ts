import type { QuizQuestion } from './components/Quiz'

const quizSet1: QuizQuestion[] = [
  {
    id: 1,
    question: 'The sky is blue.',
    image: 'https://wallpaperaccess.com/full/398864.jpg',
    answer: 'True',
  },
  {
    id: 2,
    question: 'Cats can fly.',
    image:
      'https://th.bing.com/th/id/R.54c50ee1808b7ae7b7d94af97f2bf21b?rik=TjN6yfqQszSUyA&pid=ImgRaw&r=0',
    answer: 'False',
  },
  {
    id: 3,
    question: 'Humans need water to survive.',
    image: 'https://todayspast.net/wp-content/uploads/2019/03/Drink-Water.jpg',
    answer: 'True',
  },
]

const quizSet2: QuizQuestion[] = [
  {
    id: 1,
    question: 'The Earth revolves around the sun.',
    image:
      'https://cdn.britannica.com/28/151528-138-447D5EF0/Earth-rotation-axis-revolution-Sun.jpg',
    answer: 'True',
  },
  {
    id: 2,
    question: 'Fish can live out of water.',
    image:
      'https://www.algaebarn.com/wp-content/uploads/2020/10/shutterstock_391864198-scaled.jpg',
    answer: 'False',
  },
  {
    id: 3,
    question: 'Bananas are berries.',
    image:
      'https://th.bing.com/th/id/OIP.IXKCpF-CG8jGSmOdUoYKIQHaEK?rs=1&pid=ImgDetMain',
    answer: 'True',
  },
]

const quizSet3: QuizQuestion[] = [
  {
    id: 1,
    question: 'Venus is the hottest planet in the solar system.',
    image: 'https://space-facts.com/wp-content/uploads/venus.png',
    answer: 'True',
  },
  {
    id: 2,
    question: 'A year on Jupiter is shorter than a year on Earth.',
    image:
      'https://i2.wp.com/mossandfog.com/wp-content/uploads/2017/03/jupiter-vs-earth-size-comparison.jpg?ssl=1',
    answer: 'False',
  },
  {
    id: 3,
    question: 'The Great Wall of China is visible from space.',
    image:
      'https://th.bing.com/th/id/R.b23408d5240b0affc9093d3e9e61a0bd?rik=xdLodUnznRpFrg&pid=ImgRaw&r=0',
    answer: 'False',
  },
]

// Define available quizzes
export const quizzes = [quizSet1, quizSet2, quizSet3]
