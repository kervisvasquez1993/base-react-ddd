import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'

const Header = () => {
  const [username, setUsername] = useState<string | null>(null)

  useEffect(() => {
    // Retrieve username from localStorage if it exists
    const storedUsername = localStorage.getItem('username')
    setUsername(storedUsername)
  }, [])

  const handleLogout = () => {
    // Remove user data from localStorage
    localStorage.removeItem('username')
    localStorage.removeItem('access_token')
    localStorage.removeItem('role')
    setUsername(null) // Update state to reflect logged-out status
  }

  return (
    <header className='bg-card py-4 shadow-lg'>
      <div className='container mx-auto flex justify-between items-center'>
        <Link to='/' className='text-2xl font-bold text-primary'>
          Quiz Game
        </Link>
        <nav className='flex items-center'>
          {username ? (
            <>
              <span className='font-bold mx-4 text-muted'>
                Welcome, {username}!
              </span>
              <button
                onClick={handleLogout}
                className='font-bold mx-4 text-red-500 hover:text-red-700'
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <Link
                to='/login'
                className='font-bold mx-4 text-muted hover:text-primary'
              >
                Login
              </Link>
              <Link
                to='/register'
                className='font-bold mx-4 text-muted hover:text-primary'
              >
                Register
              </Link>
            </>
          )}
        </nav>
      </div>
    </header>
  )
}

export default Header
