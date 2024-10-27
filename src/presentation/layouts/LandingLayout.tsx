import { Outlet } from "react-router-dom"
import { Footer, Header } from "../components";


export const LandingLayout = () => {
    return (
        <div className='flex flex-col min-h-screen'>
            <Header />
            <main className='flex-grow'>
                <div className='flex flex-col items-center justify-center h-screen bg-background'>
                    <h1 className='text-4xl font-bold mb-8'>Welcome to the Quiz Game!</h1>
                    <p className='mb-4'>Join us and test your knowledge!</p>
                    <div className='flex space-x-4'>
                        <Outlet />
                    </div>
                </div>
            </main>
            <Footer />
        </div>
    );
};
