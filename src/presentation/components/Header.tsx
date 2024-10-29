
import { Link } from 'react-router-dom'

export const Header = () => {

  return (
    <header className="bg-background border-b">
      <div className="container mx-auto px-4">
        <div className="flex h-16 items-center justify-between">
          <div className="flex items-center justify-between  w-full">
            <Link to="/" className="text-2xl font-bold text-primary">
              QuizApp
            </Link>
            <nav className="ml-8 hidden md:flex space-x-4">
              <Link to="/login" className="text-muted-foreground hover:text-primary transition-colors">
                login
              </Link>
              <Link to="/register" className="text-muted-foreground hover:text-primary transition-colors">
                register
              </Link>
            </nav>
          </div>

        </div>
      </div>
    </header>
  )
}

