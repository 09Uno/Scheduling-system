import styles from "./styles.module.scss"
import Head from "next/head"
import { Header } from "../../components/header/header"
import { Input } from "../../components/ui/inputs/inputs"
import { CanSSRAuth } from "../../utils/canSSRAuth"
import { setupAPICliente } from "../../services/api"
import { useState } from "react"
import { Item } from "semantic-ui-react"
import { AiOutlinePlus } from "react-icons/ai";


interface clienteProps {
    nome: string;
    cpf: string;
    telefone: string;
}

interface HomeProps {
    clientes: clienteProps[]
}


export default function Clientes({ clientes }: HomeProps) {

    const [clientesLista, setClienteLista] = useState(clientes || [])
    const [busca, setBusca] = useState('')

    const Lbusca = busca.toLowerCase()
    const clientesBusca = clientesLista.filter((item => item.nome.toLowerCase().includes(Lbusca) || item.cpf.toLowerCase().startsWith(Lbusca)))

    return (

        <>
            <Head>Sistema - Clientes</Head>
            <div className={styles.clientes}>
                <Header />
                <main className={styles.ContainerCenter}>
                    <div className={styles.ContainerHeader}>
                        <div className={styles.ContainerHeaderDiv}>
                            <h3>LISTA DE CLIENTES CADASTRADOS</h3>
                            <div className={styles.searchAdd}>
                                <input className={styles.search} placeholder='CPF OU NOME' value={busca}
                                    onChange={(e) => setBusca(e.target.value)}
                                />
                                <button >
                                   <AiOutlinePlus className={styles.item} size={40} color="black" /> 
                                </button>
                                </div>
                        </div>
                    </div>
                    <div className={styles.clientesLista}>


                        {clientesBusca.length === 0 && (
                            <section>
                                <p>Nenhum cliente encontrado</p>
                            </section>
                        )}

                        {clientesBusca.map(itens => (
                            <section key={itens.cpf} className={styles.clientesDadosLista}>


                                <div className={styles.clientesDados}><p>Nome: {itens.nome} </p> </div>
                                <div className={styles.clientesDados}><p>Telefone: {itens.telefone} </p></div>
                                <div className={styles.clientesDados}><p>CPF: {itens.cpf} </p></div>


                            </section>
                        ))}


                    </div>

                </main>

            </div>



        </>



    )


}

export const getServerSideProps = CanSSRAuth(async (ctx) => {

    const apiClient = setupAPICliente(ctx);

    const response = await apiClient.get('/cliente/listar')

    return {
        props: {
            clientes: response.data
        }
    }
})