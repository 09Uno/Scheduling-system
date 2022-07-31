import { sign } from "crypto"
import Head from "next/head"
import React from "react"
import { useState, useContext } from "react"




export default function Cadastro() {

    const { signUp } = useContext(AuthContext)

    const [nome, setNome] = useState('')
    const [user, SerUser] = useState('')
    const [senha, setSenha] = useState('')

    const [loading, setLoading] = useState(false)

    async function handleSingUp(event: FormDataEvent) {

        event.preventDefault()


        if (nome === "" || user === "" || senha === "") {
            alert("preencha todos os campos")
            return;
        }

        setLoading(true)

        let data = {
            nome,
            user,
            senha
        }

        await signUp(data)

        setLoading(false)

    }

    return (
        <>
            <Head>
                <title>Sistema - Faça Seu Cadastro</title>
            </Head>
        </>
    )

}