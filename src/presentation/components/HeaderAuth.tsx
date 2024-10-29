import { Link } from 'react-router-dom'


export const HeaderAuth = () => {
    return (

        <header className="bg-background border-b">
            <div className="container mx-auto px-4">
                <div className="flex h-16 items-center justify-between">
                    <div className="flex items-center justify-between w-full">
                        <Link to="/" className="text-2xl font-bold text-primary">
                            QuizApp
                        </Link>
                        <nav className="ml-8 hidden md:flex space-x-4">
                            <Link to="/dashboard" className="text-muted-foreground hover:text-primary transition-colors">
                                Inicio
                            </Link>
                            <Link to="/dashboard/leaderboard" className="text-muted-foreground hover:text-primary transition-colors ">
                                Clasificación
                            </Link>
                            <Link to={"/dashboard/admin"} className='flex items-center'>

                                <span>Admin</span>
                            </Link>
                        </nav>
                    </div>
                    <div className="flex items-center ">
                        {/* <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                                <Button variant="ghost" className="relative h-8 w-8 rounded-full">
                                    <Avatar className="h-8 w-8">
                                        <AvatarImage src="/placeholder-user.jpg" alt="Usuario" />
                                        <AvatarFallback>U</AvatarFallback>
                                    </Avatar>
                                </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent className="w-56" align="end" forceMount>
                                <DropdownMenuLabel className="font-normal">
                                    <div className="flex flex-col space-y-1">
                                        <p className="text-sm font-medium leading-none">Usuario</p>
                                        <p className="text-xs leading-none text-muted-foreground">usuario@ejemplo.com</p>
                                    </div>
                                </DropdownMenuLabel>
                                <DropdownMenuSeparator />
                                <DropdownMenuItem>
                                   

                                </DropdownMenuItem>
                                <DropdownMenuItem>
                                    <Book className="mr-2 h-4 w-4" />
                                    <span>Mis Respuestas</span>
                                </DropdownMenuItem>
                                <DropdownMenuSeparator />
                                <DropdownMenuItem>
                                    <LogOut className="mr-2 h-4 w-4" />
                                    <span>Cerrar sesión</span>
                                </DropdownMenuItem>
                            </DropdownMenuContent>
                        </DropdownMenu> */}
                    </div>
                </div>
            </div>
        </header>
    )
}

