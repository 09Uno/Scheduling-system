import { useEffect, useState } from "react";
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
    horario: string;
    cliente_id: string;

}

interface HomeProps {

    agendamentos: AgendamentosProps[];

}

export type AgendamentosDetalhesProps = {
    id: string;
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



    function handleCloseModal(): void {
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

    async function atualizar() {
        const api = setupAPICliente()
        const response = await api.get('/agendar/detalhes')
        setAgendamentoList(response.data)
    }






    async function apagarAgendamento(id_delete: string) {

        const apiDelete = await api.delete('/agendar', {

            params: {
                agendamento_id: id_delete,
            }

        })

    }

    async function apagar(id_delete: string) {

        apagarAgendamento(id_delete);


    }


    useEffect(() => {


        agendamentoList.forEach(element => {
            moment.locale('pt-br');
            const now = new Date();

            
            const hora = moment.utc(element.horario).format('DD-MM-YYYY HH:mm')
            const hora2 = moment(now).format('DD-MM-YYYY HH:mm')


            const dataCompare = new Date(hora)
            const nowCompare = new Date(hora2)

            



            if (nowCompare > dataCompare) {
                apagar(element.id)

            }
            

        });

    }, [agendamentoList]
    )


    useEffect(() => { atualizar() }, [agendamentoList])


    Modal.setAppElement('#__next');


    return (
        <>
            <Header />
            <div>
                <main className={styles.container}>
                    <div className={styles.containerCenter}>
                        <div className={styles.Header}>
                            <h2>Horários Agendados</h2>
                            <button className={styles.refresh} onClick={atualizar}>
                                <FiRefreshCcw size={30} color="black" />
                            </button>
                        </div>

                        <article className={styles.listarAgendamentos}>


                            {agendamentoList.length === 0 && (
                                <p className={styles.emptyList}>
                                    Nenhum horário marcado foi encontrado...
                                </p>
                            )}

                            {agendamentoList.map(item => (



                                <section key={item.id} className={styles.agendamentos}>

                                    <button onClick={() => handleModal(item.id)}>

                                        <div className={styles.tag}></div>
                                        <span className={styles.cliente}>{moment.utc(item.horario).format(" DD/MM/YYYY ")}</span>
                                        <span> {moment.utc(item.horario).format("HH:mm")} </span>

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