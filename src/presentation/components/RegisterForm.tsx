import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import useAuthRedirect from '@/presentation/hooks/useAuthRedirect'

const RegisterForm = () => {
  useAuthRedirect() 
  const [username, setUsername] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [passwordConfirmation, setPasswordConfirmation] = useState('')
  const [notification, setNotification] = useState<{
    message: string
    type: 'success' | 'error'
  } | null>(null)
  const [countdown, setCountdown] = useState<number | null>(null)

  const navigate = useNavigate()
  const api = import.meta.env.VITE_APP_BACKEND_URL
  const endpoint = `${api}/register`

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    if (password !== passwordConfirmation) {
      setNotification({ message: 'Passwords do not match!', type: 'error' })
      return
    }

    try {
      const response = await axios.post(endpoint, {
        username,
        email,
        password,
        password_confirmation: passwordConfirmation,
      })

      if (response.data.message === 'Validation errors' && response.data.data) {
        const { username: usernameErrors, email: emailErrors } =
          response.data.data
        const validationMessage = [
          ...(usernameErrors || []),
          ...(emailErrors || []),
        ].join(' ')
        setNotification({
          message: validationMessage || 'Validation failed',
          type: 'error',
        })
      } else {
        setNotification({
          message: `Welcome, ${response.data.user.username}! Registration successful. Redirecting to login in 5 seconds...`,
          type: 'success',
        })
        setCountdown(5)
        setUsername('')
        setEmail('')
        setPassword('')
        setPasswordConfirmation('')
      }
    } catch (error: any) {
      const errorMessage =
        error.response?.data?.message ||
        'Registration failed. Please try again.'
      setNotification({ message: errorMessage, type: 'error' })
    }
  }

  useEffect(() => {
    // Countdown effect for redirect after success
    if (countdown === null) return
    if (countdown === 0) {
      navigate('/login')
      return
    }

    const timer = setInterval(() => {
      setCountdown((prev) => (prev !== null ? prev - 1 : null))
    }, 1000)

    return () => clearInterval(timer)
  }, [countdown, navigate])

  const closeNotification = () => {
    setNotification(null)
    setCountdown(null)
  }

  return (
    <div className='flex flex-col items-center justify-center h-screen bg-background'>
      <h2 className='text-2xl font-bold mb-6'>Register</h2>
      <form onSubmit={handleSubmit} className='space-y-4 w-full max-w-sm'>
        <input
          type='text'
          placeholder='Username'
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          className='input'
          required
        />
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
        <input
          type='password'
          placeholder='Confirm Password'
          value={passwordConfirmation}
          onChange={(e) => setPasswordConfirmation(e.target.value)}
          className='input'
          required
        />
        <button type='submit' className='btn-primary'>
          Submit
        </button>
      </form>

      {notification && (
        <div
          className={`fixed top-4 left-1/2 transform -translate-x-1/2 px-6 py-2 w-[90%] max-w-[500px] rounded-lg ${
            notification.type === 'success' ? 'bg-green-500' : 'bg-red-500'
          } text-white`}
        >
          <p className='text-xl md:text-2xl'>
            {notification.message}{' '}
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

export default RegisterForm
