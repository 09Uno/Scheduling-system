import styles from "./styles.module.scss"
import { clienteProps } from '../../pages/clientes/index'

import Modal from 'react-modal'
import React, { FormEvent, useState } from 'react';
import { Input } from '../ui/inputs/inputs'
import { Button } from "../ui/buttons/button";
import { api } from '../../services/apiClient'
import { toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import { setupAPICliente } from "../../services/api";
import { FiX } from "react-icons/fi";
import { flexbox } from "@mui/system";
import InputMask from "react-input-mask";





interface ModalProps {

    isOpen: boolean;
    onRequestClose: () => void
    cliente: clienteProps[]

}

type CriarClienteProps = {
    nome: string;
    cpf: string;
    telefone: string
}


export function ModalCriarCliente({ isOpen, onRequestClose, cliente }: ModalProps) {


    const [nome, setNome] = useState('');
    const [cpf, setCpf] = useState('');
    const [telefone, setTelefone] = useState('');





    const [loading, setLoading] = useState(false)

    async function CriarCliente({ nome, cpf, telefone }: CriarClienteProps) {

        try {

            const response = await api.post("/cliente", {
                nome,
                cpf,
                telefone,
            })

            toast.success('Cliente cadastrado com sucesso!', {
                position: "top-center",
                autoClose: 2000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: false,
                draggable: true,
                progress: undefined,
            });


        } catch (err) {

            toast.error('CPF já cadastrado no banco de dados  '

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

    async function handleCriarCliente(event: FormEvent) {

        event.preventDefault()
        if (nome === "" || cpf === "" || telefone === "") {



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

        setLoading(true)

        let data = {
            nome,
            cpf,
            telefone
        }

        CriarCliente(data)
        onRequestClose()
        setLoading(false)


    }


    const customStyles = {
        content: {
            top: '50%',
            bottom: 'auto',
            left: '50%',
            right: "auto%",
            padding: '30px',
            transform: 'translate(-50%, -50%)',
            backgroundColor: 'rgba(56, 53, 53, 0.8)',
            borderRadius: '0px',
        }
    }

    return (
        <Modal
            isOpen={isOpen}
            onRequestClose={onRequestClose}
            style={customStyles}
            className={styles.modal}
        >

            <div className={styles.ContainerCenter}>
                <button
                    type="button"
                    onClick={onRequestClose}
                    className="react-modal-close"
                    style={{ background: 'transparent', border: 0, display: 'flex', left: '142px', top: '-12px', position: 'relative' }}
                >

                    <FiX size={45} color='#f34748' />

                </button>

                <h3>Cadastrar Cliente</h3>


                <form className={styles.dados}
                    onSubmit={handleCriarCliente}
                >
                    <Input placeholder="Nome" className={styles.input}
                        value={nome}
                        onChange={(e) => setNome(e.target.value)}
                    />
                    <InputMask placeholder="CPF" className={styles.input}
                        mask="999.999.999-99"
                        maskPlaceholder=""
                        value={cpf}
                        onChange={(e) => setCpf(e.target.value)}
                        pattern="\d{3}\.\d{3}\.\d{3}-\d{2}"
                        title="Digite o CPF no formato xxx.xxx.xxx-xx"

                    />
                    <InputMask placeholder="Telefone" className={styles.input}
                        mask="(99) 9999-9999"
                        pattern="\(\d{2})\s9?\d{4}-\d{4}"
                        title="Digite o Telefone no formato (xx) xxxx-xxxx"
                        value={telefone}
                        maskPlaceholder=""
                        onChange={(e) => setTelefone(e.target.value)}
                    />
                    <Button
                        className={styles.botao}
                        type="submit"
                        loading={loading}
                    >

                        Cadastrar

                    </Button>
                </form>



            </div>

        </Modal>

    )


}