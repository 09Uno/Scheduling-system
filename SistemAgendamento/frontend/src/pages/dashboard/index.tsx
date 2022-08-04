import { setupAPICliente } from "../../services/api";
import { CanSSRAuth } from "../../utils/canSSRAuth";

export default function Dashboard(){
    return(
        <>
        
        
        <h1>asdasd</h1>
        </>
    )
}

export const getServerSideProps = CanSSRAuth(async (ctx) => {

    const apiClient = setupAPICliente(ctx);

    const response = await apiClient.get('/')


    return {
        props: {
            orders: response.data
        }
    }
})