import React, { createContext, useCallback, useState } from "react";
import { fetchConToken, fetchSinToken } from "../helpers/fetch";

export const AuthContext = createContext();

const initialState = {
    uid: null,
    checking: true,
    logged: false,
    name: null,
    email: null
};

export const AuthProvider = ({ children }) => {

    const [ auth, setAuth ] = useState(initialState);

    const login = async(email, password) => {
        const res = await fetchSinToken('login', { email, password }, 'POST');
        console.log('token del server', res.token)

        if(res.ok) {
            localStorage.setItem('token', res.token);
            
            const { uid, nombre, email } = res.usuario
            setAuth({
                uid: uid,
                checking: false,
                logged: true,
                name: nombre,
                email: email,
            })
        }

        return res.ok;
    };

    const register = async(nombre, email, password) => {
        const res = await fetchSinToken('login/new', { nombre, email, password }, 'POST');

        console.log('esto es auth del register =>', auth)

        if(res.ok) {
            localStorage.getItem('token', res.token);

            const { uid, nombre, email } = res.usuario;
            setAuth({
                uid: uid,
                checking: false,
                logged: false,
                name: nombre,
                email: email,
            })
        }

        return res.ok;
    }; 

    const verificarToken = useCallback(async() => {
        const token = localStorage.getItem('token');

        if(!token) {
            setAuth({
                uid: null,
                checking: false,
                logged: false,
                name: null,
                email: null
            });

            return false;
        };
        
        const res = await fetchConToken('login/renew');

        if(res.ok) {
            localStorage.getItem('token', res.token);

            const { uid, nombre, email } = res.usuario;
            setAuth({
                uid: uid,
                checking: false,
                logged: true,
                name: nombre,
                email: email,
            })
            return true;
        } else {
            setAuth({
                uid: null,
                checking: false,
                logged: false,
                name: null,
                email: null,
            })
            return false;
        }

    }, []);

    const logout = () => {
        localStorage.removeItem('token');

        setAuth({
            checking: false,
            logged: false,
        })
    };

    return(
        <AuthContext.Provider value={{ auth, login, register, verificarToken, logout, }}>
            { children }
        </AuthContext.Provider>
    )
}