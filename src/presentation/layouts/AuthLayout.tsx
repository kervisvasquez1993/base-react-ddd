import { Outlet } from "react-router-dom"
import { HeaderAuth } from "../components/HeaderAuth";


export const AuthLayout = () => {
    return (
        <div className='flex flex-col min-h-screen'>
            <HeaderAuth />
            <main className='flex-grow'>
                <div className='flex flex-col items-center justify-center bg-background'>
                    <Outlet />
                </div>
            </main>
            {/* <Footer /> */}
        </div>
    );
};
