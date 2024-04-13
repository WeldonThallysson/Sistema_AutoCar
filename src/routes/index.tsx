import { createBrowserRouter } from "react-router-dom";
import { Home } from "../pages/home";
import { Dashboard } from "../pages/dashboard";
import { CadastrarCarro } from "../pages/dashboard/new";
import { SignIn } from "../pages/signin";
import { SignUp } from "../pages/signup";

import { Layout } from "../components/Layout";
import { CarDetails } from "../pages/car";

export const router = createBrowserRouter([
    {   
        path: '/',
        element: <Layout/>,
        children: [
            {
                path: '/home',
                element: <Home/>
            },
            {
                path: '/dashboard',
                element: <Dashboard/>
            },
            {
                path: '/dashboard/new',
                element: <CadastrarCarro/>
            },
            {
                path: '/car/:id',
                element: <CarDetails/>
            },
           
        ]
    },
    {
        path: '/signin',
        element: <SignIn/>
    },
    {
        path: '/signup',
        element: <SignUp/>
    }
])