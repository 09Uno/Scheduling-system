import styles from "./styles.module.scss"


import Modal from "react-modal"
import { AgendamentosDetalhesProps } from '../../pages/dashboard/index'
import { FiX } from 'react-icons/fi'
import { FaJediOrder } from "react-icons/fa"
import { NULL } from "sass"
import moment from 'moment';
import { api } from "../../services/apiClient";
import { AiFillDelete } from "react-icons/ai";
import { MuiDialog } from '../alertas/alertaConfirma'



interface ModalProps {
    isOpen: boolean,
    onRequestClose: () => void
    agendamento: AgendamentosDetalhesProps[]
}

interface apagar {

    onRequestClose: () => void



}

export function ModalAgendamentos({ isOpen, onRequestClose, agendamento }: ModalProps) {

    const customStyles = {
        content: {
            top: '50%',
            bottom: 'auto',
            left: '50%',
            right: "auto%",
            padding: '30px',
            transform: 'translate(-50%, -50%)',
            backgroundColor: 'rgb(163 153 153 / 90%)',
            borderRadius: '10px',
        }
    }
    async function apagarAgendamento(id_delete: string) {

        const apiDelete = await api.delete('/agendar', {

            params: {
                agendamento_id: id_delete,
            }

        })

    }

    async function apagar(id_delete: string) {

        onRequestClose();
        apagarAgendamento(id_delete);

       
    }


    return (



        <Modal
            isOpen={isOpen}
            onRequestClose={onRequestClose}
            style={customStyles}
            className={styles.modal}
        >




            <div className={styles.container}>



                {agendamento.map(item => (

                    <section key={item.agendamento_id} className={styles.container}>
                        <div className={styles.icons}>

                            <MuiDialog
                                del={() => apagar(item.id)}
                            >
                                <button
                                    type="button"
                                    className=""
                                    style={{ background: 'transparent', border: 0 }}

                                >
                                    <AiFillDelete size={45} />
                                </button>

                            </MuiDialog>

                            <button
                                type="button"
                                onClick={onRequestClose}
                                className="react-modal-close"
                                style={{ background: 'transparent', border: 0 }}
                            >

                                <FiX size={45} color='#f34748' />

                            </button>

                        </div>

                        <h2 className={styles.titulo}>Detalhes do Agendamento</h2>
                        <span>Nome do Cliente: {item.cliente.nome}</span>
                        <span className={styles.cliente}>Data do Agendamento:{moment(item.data).format(" DD/MM/YYYY ")}</span>
                        <span className={styles.cliente}>Horário Marcado: {moment(item.horario).format(" HH:MM ")}</span>
                        <span>Observação:</span>
                        <div className={styles.descricao}>{item.descricao}</div>


                    </section>

                ))}


            </div>



        </Modal>
    )
}
