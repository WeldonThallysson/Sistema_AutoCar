import React from "react";
import { Outlet } from "react-router-dom";
import { Header } from "../header";

export const Layout: React.FC = () => {
    return(
        <>
            <Header/>
            <Outlet/>
        </>
    )
}