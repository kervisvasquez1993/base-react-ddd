import { Outlet } from "react-router-dom"
import { Footer, Header } from "../components";


export const LandingLayout = () => {
    return (
        <div className='flex flex-col min-h-screen'>
            <Header />
            <main className='flex-grow'>
                <div className='flex flex-col items-center justify-center  bg-background'>
                    <Outlet />
                </div>
            </main>
            {/* <Footer /> */}
        </div>
    );
};
