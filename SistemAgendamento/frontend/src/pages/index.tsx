import styles from '../../styles/Home.module.scss'
import Head from "next/head"
import Link from "next/link"
import Image from 'next/image'
import { Input } from "../components/ui/inputs/inputs"
import { Button } from "../components/ui/buttons/button"
import logo from '../../src/imgs/logo.png'
import { useState, FormEvent, useContext } from 'react'
import { AuthContext } from '../contexts/AuthContext'
import { toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';
import { canSSRGuest } from '../utils/canSSRGuess'
import { api } from '../services/apiClient'


export default function Home() {

    const {singIn} = useContext(AuthContext)

    const [user, setUser] = useState('')
    const [senha, setSenha] = useState('')
    const [loading, setLoading]= useState(false)

    async function handleLogin(event: FormEvent) {
        event.preventDefault(); 

        if (user === "" || senha === ""){

            toast.warn('Preencha todos os campos', {
                position: "top-center",
                autoClose: 2000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: false,
                draggable: true,
                progress: undefined,
                });
            return;
        }


        setLoading(true);

        let data ={
            user, 
            senha
        }

        await singIn(data);

        setLoading(false);
    }

    return (

        <>
            <Head>
                Sistema - Faça seu Login
            </Head>

            <div className={styles.ContainerCenter}>


                <main className={styles.login}>
                    <Link href='/'>
                        <Image src={logo} width={190} height={190} alt=""/>
                    </Link>
                    <form onSubmit={handleLogin}>
                        <Input
                            type="text"
                            placeholder="Digite seu Usuário aqui."
                            value={user}
                            onChange={(e) => setUser(e.target.value)}
                        />

                        <Input
                            type="password"
                            placeholder="Digite sua Senha aqui."
                            value={senha}
                            onChange={(e) => setSenha(e.target.value)}
                            
                        />
                        <Button
                        type="submit"
                        loading={loading}

                        >

                            Confirmar
                            
                        </Button>
                    </form>
                    <Link href="/cadastro">
                        <a className={styles.text}>Fazer Cadastro</a>
                    </Link>
                </main>




            </div>




        </>

    )

}
export const getServerSideProps = canSSRGuest(async (ctx) => {
    return {
      props: {}
    }
  })