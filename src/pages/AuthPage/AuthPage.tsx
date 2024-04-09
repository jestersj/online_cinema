import React, {useState} from 'react';
import Cookies from "js-cookie";
import {useNavigate} from "react-router-dom";
import {useAppDispatch} from "@/hooks/redux";
import {setAuth} from "@/store/usersSlice";
import s from "./AuthPage.module.css";

const AuthPage = () => {
    const [login, setLogin] = useState('')
    const [password, setPassword] = useState('')

    const [error, setError] = useState(false)

    const navigate = useNavigate()
    const dispatch = useAppDispatch()
    const logIn = () => {
        if (password === '123') {
            Cookies.set('auth', password)
            dispatch(setAuth(true))
            setError(false)
            navigate('/')
        } else {
            setError(true)
        }
    }
    return (
        <div className={'custom_cont'}>
            <form
                className={s.form}
                onSubmit={(e) => {
                    e.preventDefault()
                    logIn()
                }}
            >
                <h1>Вход в аккаунт</h1>
                <input
                    placeholder={'Логин'}
                    value={login}
                    onChange={(e) => setLogin(e.target.value)}
                />
                <input
                    placeholder={'Пароль'}
                    type={'password'}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />
                <button
                    type={'submit'}
                    className={'gradient_button'}
                >
                    Войти
                </button>
                {
                    error && <h2>Неверный пароль</h2>
                }
            </form>
        </div>
    );
};

export default AuthPage;