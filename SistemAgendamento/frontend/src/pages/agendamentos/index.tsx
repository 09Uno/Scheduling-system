import { setupAPICliente } from "../../services/api";
import { CanSSRAuth } from "../../utils/canSSRAuth";
import styles from "./Home.module.scss"
import { Header } from "../../components/header/header";
import { Input, TextArea } from "../../components/ui/inputs/inputs";
import { Button } from "../../components/ui/buttons/button";
import { FormEvent, useState } from "react";
import 'react-toastify/dist/ReactToastify.css';


import moment, { Moment } from 'moment';
import { AdapterMoment } from '@mui/x-date-pickers/AdapterMoment';
import TextField from '@mui/material/TextField';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';
import { toast } from "react-toastify";
import { api } from "../../services/apiClient";

type AgendamentosProps = {
    horario: Moment;
    descricao: string;
    cliente_id: string;

}

type clientesProps = {
    id: string;
    nome: string;
    cpf: string;

}



interface HomeProps {
    clientes: clientesProps[]
}



export default function Agendamentos({ clientes }: HomeProps) {

    const [loading, setLoading] = useState(false)
    const [cliente_id, setCliente_id] = useState("")
    const [descricao, setDescricao] = useState("")
    const [horario, setHorario] = useState<Moment | null>(moment());

    const [clientesLista, setClientesLista] = useState(clientes || [])




    async function criarAgendamento({ descricao, cliente_id, horario }: AgendamentosProps) {

        try {
            const response = await api.post("/agendar", {
                horario,
                descricao,
                cliente_id,


            })

            toast.success('Horário agendado com sucesso', {
                position: "top-center",
                autoClose: 2000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: false,
                draggable: true,
                progress: undefined,
            });


        } catch (err) {

            toast.error('Erro ao fazer o agendamento '

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


    async function handleCriarAgendamento(event: FormEvent) {
        event.preventDefault();




        let data = {
            descricao,
            cliente_id,
            horario,
        }

        criarAgendamento(data)
    }



    return (


        <>
            <div className={styles.ContainerCenter}>
                <Header />

                <div className={styles.ContainerMarcar}>
                    <h3>Agendar</h3>

                    <form onSubmit={handleCriarAgendamento} >


                        <div className={styles.div1}>
                            <select className={styles.option} value={cliente_id}
                                onChange={(e) => setCliente_id(e.target.value)}
                            >

                                {clientesLista.length === 0 && (
                                    <option >Nenhum Cliente Cadastrado</option>

                                )}


                                {clientesLista.map(item => (

                                    <option placeholder="Selecione o Nome do Cliente" key={item.id} value={item.id}

                                    >{item.nome}</option>



                                ))}
                            </select>

                            <TextArea
                                placeholder="descrição..."
                                value={descricao}
                                onChange={(e) => setDescricao(e.target.value)}

                            />

                        </div>

                        <div className={styles.calendar}>
                            <LocalizationProvider dateAdapter={AdapterMoment}>
                                <DateTimePicker
                                    inputFormat={"DD/MM/YY HH:mm"}
                                    disablePast={true}
                                    className={styles.date}
                                    renderInput={(props) => <TextField {...props} />}
                                    label="Data e Horário"
                                    value={horario}


                                    onChange={(Nhorario) => {
                                        setHorario(Nhorario);
                                    }}



                                />
                            </LocalizationProvider>

                        </div>


                        <Button
                            type="submit"
                            loading={loading}

                        >

                            Agendar

                        </Button>

                    </form>

                </div>



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