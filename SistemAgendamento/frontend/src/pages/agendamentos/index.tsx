import { setupAPICliente } from "../../services/api";
import { CanSSRAuth } from "../../utils/canSSRAuth";
import styles from "./Home.module.scss"
import { Header } from "../../components/header/header";
import { Input, TextArea } from "../../components/ui/inputs/inputs";
import { Button } from "../../components/ui/buttons/button";
import DatePick from "../../components/datetimepick/dateTimePick";
import { useState } from "react";

export default function Agendamentos() {

    const [loading, setLoading] = useState(false)



    return (


        <>
            <div className={styles.ContainerCenter}>
                <Header />

                <div className={styles.ContainerMarcar}>
                    <h3>Agendar</h3>

                    <form>


                        <div className={styles.div1}>
                            <Input
                                placeholder="Selecione o cliente."
                            />
                            <TextArea
                                placeholder="descrição..."

                            />
                        </div>

                        <div className={styles.calendar}>
                            <DatePick


                            />
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