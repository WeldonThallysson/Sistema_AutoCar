import { createBrowserRouter } from "react-router-dom";
import Home from "../pages/home";
import Dashboard from "../pages/dashboard";
import CadastrarCarro from "../pages/dashboard/new";
import SignIn from "../pages/signin";
import SignUp from "../pages/signup";

import { Layout } from "../components/Layout";
import CarDetails from "../pages/car";
import { Private } from "./private";
export const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/dashboard",
        element: (
          <Private>
            <Dashboard />
          </Private>
        ),
      },
      {
        path: "/dashboard/new",
        element: (
          <Private>
            <CadastrarCarro />
          </Private>
        ),
      },
      {
        path: "/car/:id",
        element: <CarDetails />,
      },
    ],
  },
  {
    path: "/signin",
    element: <SignIn />,
  },
  {
    path: "/signup",
    element: <SignUp />,
  },
]);
