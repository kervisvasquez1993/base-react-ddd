import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import {
  LandingPage,
  LoginForm,
  RegisterForm,
  Header,
  Footer,
} from './presentation/components'
import './App.css'

function App() {
  return (
    <Router>
      <div className='flex flex-col min-h-screen'>
        <Header />
        <main className='flex-grow'>
          <Routes>
            <Route path='/' element={<LandingPage />} />
            <Route path='/login' element={<LoginForm />} />
            <Route path='/register' element={<RegisterForm />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  )
}

export default App
