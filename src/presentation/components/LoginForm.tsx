import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import useAuthRedirect from '@/presentation/hooks/useAuthRedirect'
import axios from 'axios'

const LoginForm = () => {
  useAuthRedirect() // Redirect to home if already authenticated
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [notification, setNotification] = useState<string | null>(null)
  const [notificationType, setNotificationType] = useState<'success' | 'error'>(
    'error'
  )
  const [countdown, setCountdown] = useState<number | null>(null)

  const navigate = useNavigate()
  const api = import.meta.env.VITE_APP_BACKEND_URL
  const endpoint = `${api}/login`

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    try {
      const response = await axios.post(endpoint, { email, password })

      if (response.data.access_token) {
        const { access_token, data } = response.data

        // Save token, username, and role in localStorage
        localStorage.setItem('access_token', access_token)
        localStorage.setItem('username', data.username)
        localStorage.setItem('role', data.role)

        // Set success notification with countdown
        setNotification(
          `Welcome ${data.username}! Redirecting to home in 5 seconds...`
        )
        setNotificationType('success')
        setCountdown(5) // Start the countdown

        // Clear form fields after successful login
        setEmail('')
        setPassword('')
      }
    } catch (error: any) {
      // Set error notification
      const errorMessage =
        error.response?.data?.error || 'Login failed. Please try again.'
      setNotification(errorMessage)
      setNotificationType('error')
    }
  }

  useEffect(() => {
    if (countdown === null) return
    if (countdown === 0) {
      navigate('/home') // Redirect to home page
      return
    }

    const timer = setInterval(() => {
      setCountdown((prev) => (prev !== null ? prev - 1 : null))
    }, 1000)

    return () => clearInterval(timer)
  }, [countdown, navigate])

  const closeNotification = () => setNotification(null)

  return (
    <div className='flex flex-col items-center justify-center h-screen bg-background'>
      <h2 className='text-2xl font-bold mb-6'>Login</h2>
      <form onSubmit={handleSubmit} className='space-y-4 w-full max-w-sm'>
        <input
          type='email'
          placeholder='Email'
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className='input'
          required
        />
        <input
          type='password'
          placeholder='Password'
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className='input'
          required
        />
        <button type='submit' className='btn-primary'>
          Submit
        </button>
      </form>

      {notification && (
        <div
          className={`fixed top-4 left-1/2 transform -translate-x-1/2 px-6 py-2 w-[90%] max-w-[300px] rounded-xl text-white text-center ${
            notificationType === 'success' ? 'bg-green-500' : 'bg-red-500'
          }`}
        >
          <p className='text-xl md:text-2xl'>
            {notification}{' '}
            {countdown !== null &&
              countdown > 0 &&
              `in ${countdown} seconds...`}
          </p>
          <button onClick={closeNotification} className='mt-2 btn-secondary'>
            Close
          </button>
        </div>
      )}
    </div>
  )
}

export default LoginForm
