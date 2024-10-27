import './App.css'
import { Toaster } from 'sonner'
import { router } from './presentation/navigation/AppRouter'
import { RouterProvider } from 'react-router-dom'

function App() {
  return (
    // <Router>
    //   <div className='flex flex-col min-h-screen'>
    //     <Header />
    //     <main className='flex-grow'>
    //       <Routes>
    //         <Route path='/' element={<LandingPage />} />
    //         <Route path='/login' element={<LoginForm />} />
    //         <Route path='/register' element={<RegisterForm />} />
    //       </Routes>
    //     </main>
    //     <Footer />
    //   </div>
    // </Router>
    <>
      <Toaster position="top-center" richColors />
      <RouterProvider router={router} />
    </>
  )
}

export default App
