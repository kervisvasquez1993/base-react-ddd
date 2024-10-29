import './App.css'
import { Toaster } from 'sonner'
import { router } from './presentation/navigation/AppRouter'
import { RouterProvider } from 'react-router-dom'


function App() {
  return (
    <>
      <Toaster position="top-center" richColors />
      <RouterProvider router={router} />
    </>

  )
}

export default App
