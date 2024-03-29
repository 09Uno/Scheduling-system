import { parseCookies } from 'nookies';
import { GetServerSideProps, GetServerSidePropsContext, GetServerSidePropsResult} from "next";

export function canSSRGuest<P>(fn: GetServerSideProps<P>){
    return async (ctx: GetServerSidePropsContext): Promise<GetServerSidePropsResult<P>> =>{

        const cookies = parseCookies(ctx);

        if(cookies['@nextAuthToken']){
            return{
                redirect:{
                    destination:'/dashboard',
                    permanent:false,
                }
            }
        }


        return await fn(ctx);
    }
}