import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

const useAuthRedirect = () => {
  const navigate = useNavigate()

  useEffect(() => {
    const token = localStorage.getItem('access_token')
    const username = localStorage.getItem('username')
    const role = localStorage.getItem('role')

    if (token && username && role) {
      navigate('/home')
    }
  }, [navigate])
}

export default useAuthRedirect
