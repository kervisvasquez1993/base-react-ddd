import { createBrowserRouter, Navigate } from "react-router-dom";
import { PublicRoute } from "./PublicRoute";
import { PrivateRoute } from "./PrivateRoute";

import {
    Home,
    Users,
    Wallet,
    Landmark,
    NotepadText,
    LogOut,
} from "lucide-react";
import { LoginScreen } from "../screens/Login.screen";
import { RegisterScreen } from '../screens/Register.screen';
import { HomeScreen } from "../screens/Home.screen";
import { LandingLayout } from "../layouts/LandingLayout";
export const menuRoutes = [
    {
        to: "home",
        icon: Home,
        title: "Inicio",
        description: "Home Page",
        component: <HomeScreen />,
    },
    {
        to: "login",
        icon: Home,
        title: "Login Page",
        description: "Login Page",
        component: <LoginScreen />,
    },
    {
        to: "register",
        icon: Home,
        title: "Register Page",
        description: "Register Page",
        component: <RegisterScreen />,
    },
    {
        to: "tabline",
        icon: Home,
        title: "Tabline Page",
        description: "Tabline Page",
        component: <RegisterScreen />,
    },

    {
        to: "logout",
        icon: LogOut,
        title: "Cerrar Sesión",
        description: "Logout Page",
        component: <div>Logout</div>,
    },
];
export const router = createBrowserRouter([
    {
        path: "/login",
        element: (
            <PublicRoute>
                <LandingLayout />
            </PublicRoute>
        ),
    },
    {
        path: "/dashboard",
        element: (
            <PrivateRoute>
                {/* <DashboardLayout /> */}
                <h1>hola</h1>
            </PrivateRoute>
        ),
        children: [
            ...menuRoutes.map((route) => ({
                path: route.to,
                element: route.component,
            })),
            {
                path: "",
                element: <Navigate to="home" />,
            },
        ],
    },
    {
        path: "/",
        element: <Navigate to="/login" />,
    },
]);
