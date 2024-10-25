import { Link } from 'react-router-dom'

const LandingPage = () => {
  return (
    <div className='flex flex-col items-center justify-center h-screen bg-background'>
      <h1 className='text-4xl font-bold mb-8'>Welcome to the Quiz Game!</h1>
      <p className='mb-4'>Join us and test your knowledge!</p>
      <div className='flex space-x-4'>
        <Link to='/login' className='btn-primary'>
          Login
        </Link>
        <Link to='/register' className='btn-secondary'>
          Register
        </Link>
      </div>
    </div>
  )
}

export default LandingPage
