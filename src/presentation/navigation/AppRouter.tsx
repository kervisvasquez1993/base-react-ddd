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
import { HomeScreen } from "../screens/Auth/Home.screen";
import { LandingLayout } from "../layouts/LandingLayout";
import { TablineScreen } from "../screens/TabLine.screen";
import { QuizScreen } from "../screens/QuizScreen.screen";
import { QuestionScreen } from "../screens/Question.screen";
import { SettingsScreen } from "../screens/Setting.screen";
import { ProfileScreen } from "../screens/Profile.screen";
import { AuthLayout } from "../layouts/AuthLayout";
import { AdminScreen } from "../screens/Admin.screen";
import { ClasificationScreen } from "../screens/Auth/Clasification.screen";

export const menuRoutes = [
    {
        to: "home",
        icon: Home,
        title: "Inicio",
        description: "Página de Inicio",
        component: <HomeScreen />,
    },
    {
        to: "tabline",
        icon: Home,
        title: "Tabline",
        description: "Página Tabline",
        component: <TablineScreen />,
    },
    {
        to: "quiz/:quizId",
        icon: Home,
        title: "Quiz",
        description: "Página del Quiz",
        component: <QuizScreen />,
    },
    {
        to: "question/:questionId",
        icon: Home,
        title: "Pregunta",
        description: "Página de Pregunta",
        component: <QuestionScreen />,
    },
    {
        to: "logout",
        icon: LogOut,
        title: "Cerrar Sesión",
        description: "Logout",
        component: <div>Logout</div>,
    },
];

export const router = createBrowserRouter([
    {
        path: "/",
        element: (
            <PublicRoute>
                <LandingLayout />
            </PublicRoute>
        ),
        children: [
            { path: "login", element: <LoginScreen /> },
            { path: "register", element: <RegisterScreen /> },
            { path: "", element: <TablineScreen /> },
            { path: "quiz/:quizId", element: <QuizScreen /> },
            { path: "question/:questionId", element: <QuestionScreen /> },
        ],
    },
    {
        path: "/dashboard",
        element: (
            <PrivateRoute>
                <AuthLayout />
            </PrivateRoute>
        ),
        children: [
            { path: "", element: <TablineScreen/> },
            { path: "admin", element: <AdminScreen /> },
            { path: "leaderboard", element: <ClasificationScreen /> },
            // { path: "tabline", element: <TablineScreen /> },
            { path: "quiz/:quizId", element: <QuizScreen /> },
            { path: "question/:questionId", element: <QuestionScreen /> },
        ],
    },
    {
        path: "*",
        element: <Navigate to="/login" />,
    },
]);