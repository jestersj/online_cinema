import React, {useEffect} from 'react';
import SearchInput from "@/components/SearchInput/SearchInput";
import {NavLink} from "react-router-dom";
import Cookies from "js-cookie";
import {useAppDispatch, useAppSelector} from "@/hooks/redux";
import {setAuth} from "@/store/usersSlice";
import s from "./Navbar.module.css";

const Navbar = () => {
    const {isAuth} = useAppSelector(state => state.authSlice)
    const dispatch = useAppDispatch()

    const logout = () => {
        Cookies.remove('auth')
        dispatch(setAuth(false))
    }

    useEffect(() => {
        if (Cookies.get('auth') === '123') {
            dispatch(setAuth(true))
        }
    }, []);
    return (
        <nav className={s.navbar}>
            <div className={'custom_cont'}>
                <div className={s.content}>
                    <div>
                        <NavLink to={'/'}>Главная</NavLink>
                        {
                            isAuth && <NavLink to={'/random'}>Случайный фильм</NavLink>
                        }
                        {
                            !isAuth
                                ?
                                <NavLink to={'/auth'}>Вход</NavLink>
                                :
                                <NavLink to={'/'} onClick={logout}>Выйти</NavLink>
                        }
                    </div>
                    <div>
                        <SearchInput/>
                    </div>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;