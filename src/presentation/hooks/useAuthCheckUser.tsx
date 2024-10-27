import { useEffect, useState } from 'react'
const useAuthCheckUser = () => {
  const [isLogged, setIsLogged] = useState(false)

  useEffect(() => {
    const token = localStorage.getItem('access_token')
    const username = localStorage.getItem('username')
    const role = localStorage.getItem('role')
    if (token && username && role) {
      setIsLogged(true)
    }
  }, [])
  return isLogged
}
export default useAuthCheckUser
