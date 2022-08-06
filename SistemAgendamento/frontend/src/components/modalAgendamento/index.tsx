import styles from "./styles.module.scss"


import Modal from "react-modal"
import { AgendamentosDetalhesProps } from '../../pages/dashboard/index'
import {FiX} from 'react-icons/fi'
import { FaJediOrder } from "react-icons/fa"
import { NULL } from "sass"


interface ModalProps {
    isOpen: boolean,
    onRequestClose: () => void
    agendamento: AgendamentosDetalhesProps[]
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
            backgroundColor: 'white'
        }
    }

    return (


        <Modal
            isOpen={isOpen}
            onRequestClose={onRequestClose}
            style={customStyles}
        >

            <button
                type="button"
                onClick={onRequestClose}
                className="react-modal-close"
                style={{ background: 'transparent', border: 0 }}

            >

                <FiX size={45} color='#f34748'/>

            </button>

            

            <div className={styles.container}>

            <h2>Detalhes do Agendamento</h2>
              {agendamento.map(item =>(
                <section key={item.id}>
                    <span>Nome do cliente: {item.cliente.nome}</span>
                </section>
              ))}   

            </div>



        </Modal>
    )
}