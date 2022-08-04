import { ApiError } from "next/dist/server/api-utils";
import { setCookie, parseCookies, destroyCookie } from "nookies";
import { createContext, ReactNode, useEffect, useState } from "react";
import { toast } from "react-toastify"
import { api } from '../services/apiClient'
import Router from "next/router"


type AuthContextData = {
    user: UserProps;
    isAuthenticated: boolean;
    singIn: (credentials: SingInProps) => Promise<void>;
    singUp: (credentials: SingUpProps) => Promise<void>
}

type SingUpProps = {
    nome: string;
    user: string;
    cpf: string;
    senha: string;
}

type UserProps = {
    id: string;
    nome: string;
    user: string;
}

type SingInProps = {
    user: string;
    senha: string
}

type AuthProviderProps = {
    children: ReactNode;
}


export const AuthContext = createContext({} as AuthContextData)

export function singOut() {
    try {
        destroyCookie(undefined, '@nextAuthToken')
        Router.push('/')
    } catch {
        toast.error('Erro ao deslogar!', {
            position: "top-center",
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: false,
            draggable: false,
            progress: undefined,
        });
    }
}

export function AuthProvider({ children }: AuthProviderProps) {


    const [user, setUser] = useState<UserProps>()
    const isAuthenticated = !!user;


    useEffect(() => {
        const { '@nextAuthToken': token } = parseCookies();

        if (token) {

            api.get('/me').then(response => {
                const { id, nome, user } = response.data

                setUser({
                    id,
                    nome,
                    user,
                })
            })

        }


    }, [])

    //Login
    async function singIn({ user, senha }: SingInProps) {
        try {
            const response = await api.post('/autentificar', {
                user,
                senha
            })

            const { id, nome, token } = response.data


            setCookie(undefined, '@nextAuthToken', token, {
                maxAge: 60 * 60 * 24 * 30,
                path: '/',
            })

            setUser({
                id,
                nome,
                user,
            })

            toast.success("Bem Vindo!")
            Router.push('/dashboard')
            api.defaults.headers['Authorization'] = `Bearer ${token}`

            console.log(response.data)

        } catch (err) {
            toast.error('Erro ao Logar!', {
                position: "top-center",
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: false,
                draggable: false,
                progress: undefined,
            });
            toast.error('Usuário ou senha incorretos!', {
                position: "top-center",
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: false,
                draggable: false,
                progress: undefined,
            });
        }
    }
    //SingUp
    async function singUp({ nome, user, cpf, senha }: SingUpProps) {
        try {
            const response = await api.post('/usuario', {
                nome,
                user,
                cpf,
                senha
            })

            toast.success('Usuário cadastrado com sucesso!', {
                position: "top-center",
                autoClose: 2000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: false,
                draggable: true,
                progress: undefined,
            });
            Router.push('/')
        } catch (err) {
            toast.error(' Erro ao cadastrar usuário!'
                , {
                    position: "top-center",
                    autoClose: 2000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: false,
                    draggable: true,
                    progress: undefined,
                });
            toast.error(' CPF ou user id já cadastrados!'
                , {
                    position: "top-center",
                    autoClose: 2000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: false,
                    draggable: true,
                    progress: undefined,
                });
        }
    }


    return (
        <AuthContext.Provider value={{ user, isAuthenticated, singIn, singUp }}>
            {children}
        </AuthContext.Provider>
    )
}