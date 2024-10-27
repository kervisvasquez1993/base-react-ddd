export const generateEndPoint = (direction: string) => {
  const api = import.meta.env.VITE_APP_BACKEND_URL
  const endpoint = `${api}${direction}`
  return endpoint
}
