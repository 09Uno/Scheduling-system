import styles from '../../../styles/Home.module.scss'
import Head from "next/head"
import Link from "next/link"
import Image from 'next/image'
import { Input } from '../../components/ui/inputs/inputs'
import { Button } from '../../components/ui/buttons/button'
import logo from '../../imgs/logo.png'
import { FormEvent, useContext, useState } from 'react'
import { toast } from 'react-toastify'
import { AuthContext } from '../../contexts/AuthContext'
import { canSSRGuest } from '../../utils/canSSRGuess'
import 'react-toastify/dist/ReactToastify.css';
import InputMask from "react-input-mask";





export default function Home() {

    const { singUp } = useContext(AuthContext)

    const [nome, setNome] = useState('')
    const [user, setUser] = useState('')
    const [cpf, setCpf] = useState('')
    const [senha, setSenha] = useState('')
    const [confirmar, setConfirmar] = useState('')
    const [loading, setLoading] = useState(false)

    async function handleSingUp(event: FormEvent) {

        event.preventDefault();

        if (nome === "" || user === '' || cpf === "" || senha === "" || confirmar === '') {
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

        if (senha !== confirmar) {
            toast.warn('Senhas diferentes', {
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

        setLoading(true)

        let data = {
            nome,
            user,
            cpf,
            senha,
        }

        await singUp(data)
        setLoading(false)

    }

    return (

        <>
            <Head>
                Sistema - Faça seu Login
            </Head>

            <div className={styles.ContainerCenter}>


                <div className={styles.login}>
                    <Link href='/cadastro'>
                        <Image src={logo} width={190} height={190} alt="" />
                    </Link>
                    <form onSubmit={handleSingUp}>
                        <Input
                            type="text"
                            placeholder="Digite seu Nome aqui."
                            value={nome}
                            onChange={(e) => setNome(e.target.value)}
                        />
                        <Input
                            type="text"
                            placeholder="Digite seu Usuário aqui."
                            value={user}
                            onChange={(e) => setUser(e.target.value)}
                        />
                        <InputMask
                            className={styles.input}
                            type="text"
                            placeholder='Digite seu CPF '
                            mask="999.999.999-99"
                            maskPlaceholder=""
                            pattern="\d{3}\.\d{3}\.\d{3}-\d{2}"
                            title="Digite o CPF no formato xxx.xxx.xxx-xx"
                            value={cpf}
                            onChange={(e) => setCpf(e.target.value)}
                        />
                        <Input
                            type="password"
                            placeholder="Digite sua senha"
                            value={senha}
                            onChange={(e) => setSenha(e.target.value)}
                        />
                        <Input
                            type="password"
                            placeholder="Confirme sua senha."
                            value={confirmar}
                            onChange={(e) => setConfirmar(e.target.value)}
                        />
                        <Button
                            type='submit'
                            loading={loading}
                        >Cadastrar</Button>
                    </form>
                    <Link href="/">
                        <a className={styles.text}>Fazer login</a>
                    </Link>
                </div>




            </div>




        </>

    )



}
export const getServerSideProps = canSSRGuest(async (ctx) => {
    return {
        props: {}
    }
})