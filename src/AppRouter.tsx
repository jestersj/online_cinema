import React from 'react';
import MainPage from "@/pages/MainPage/MainPage";
import {Route, Routes} from "react-router-dom";
import MoviePage from "@/pages/MoviePage/MoviePage";
import RandomPage from "@/pages/RandomPage/RandomPage";
import AuthPage from "@/pages/AuthPage/AuthPage";
import ErrorPage from "@/pages/ErrorPage/ErrorPage";

const routes = [
    {
        path: '/',
        element: <MainPage/>
    },
    {
        path: '/:movieId',
        element: <MoviePage/>
    },
    {
        path: '/random',
        element: <RandomPage/>
    },
    {
        path: '/auth',
        element: <AuthPage/>
    },
    {
        path: '/error',
        element: <ErrorPage/>
    }
]
const AppRouter = () => {
    return (
        <Routes>
            {
                routes.map(el =>
                    <Route path={el.path} element={el.element} key={el.path}/>
                )
            }
        </Routes>
    );
};

export default AppRouter;