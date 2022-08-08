import { useState } from "react";
import { FiRefreshCcw } from "react-icons/fi";
import { Header } from "../../components/header/header";
import { setupAPICliente } from "../../services/api";
import { CanSSRAuth } from "../../utils/canSSRAuth";
import styles from "./styles.module.scss"
import moment from 'moment';
import { ModalAgendamentos } from "../../components/modalAgendamento/index";
import Modal from "react-modal"
import { api } from "../../services/apiClient";

type AgendamentosProps = {
    id: string;
    data: string;
    horario: string;
    cliente_id: string;

}

interface HomeProps {

    agendamentos: AgendamentosProps[];

}

export type AgendamentosDetalhesProps = {
    id: string;
    data: string;
    horario: string
    cliente_id: string
    descricao: string
    agendamento_id: string
    cliente: {
        id: string;
        nome: string;
        telefone: string;
        cpf: string
    }
}



export default function Dashboard({ agendamentos }: HomeProps) {

    const [agendamentoList, setAgendamentoList] = useState(agendamentos || [])

    const [modalItem, setModalItem] = useState<AgendamentosDetalhesProps[]>()
    const [modalVisible, setModalVisible] = useState(false)


    function handleCloseModal() {
        setModalVisible(false);
    }


    async function handleModal(id_agendamento: string) {

        const api = setupAPICliente()

        const response = await api.get('/agendar/detalhes', {
            params: {

                agendamento_id: id_agendamento,
            }
        })
        setModalItem(response.data)
        setModalVisible(true)
    }





    Modal.setAppElement('#__next');


    return (
        <>
            <Header />
            <div>
                <main className={styles.container}>
                    <div className={styles.containerCenter}>
                        <div className={styles.Header}>
                            <h1>Horários Agendados</h1>
                            <button className={styles.refresh}>
                                <FiRefreshCcw size={20} color="white" />
                            </button>
                        </div>

                        <article className={styles.listarAgendamentos}>




                                    {agendamentoList.map(item => (

                                        <section key={item.id} className={styles.agendamentos}>

                                            <button onClick={() => handleModal(item.id)}>
                                                
                                                <div className={styles.tag}></div>
                                                <span className={styles.cliente}>{moment(item.data).format(" DD/MM/YYYY ")}</span>
                                                <span> {moment(item.horario).format("HH: MM")} </span>

                                            </button>


                                        </section>


                                    ))}





                        </article>


                    </div>
                </main>

                {modalVisible && (
                    <ModalAgendamentos

                        isOpen={modalVisible}
                        onRequestClose={handleCloseModal}
                        agendamento={modalItem}

                    />
                )}

            </div>

        </>
    )
}

export const getServerSideProps = CanSSRAuth(async (ctx) => {

    const apiClient = setupAPICliente(ctx);

    const response = await apiClient.get('/agendar/listar')

    return {
        props: {
            agendamentos: response.data
        }
    }
})