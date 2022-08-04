import { AuthError } from './../services/errors/AuthError';
import { destroyCookie, parseCookies } from "nookies";
import { GetServerSideProps, GetServerSidePropsContext, GetServerSidePropsResult } from 'next';


export function CanSSRAuth<p>(fn: GetServerSideProps<p>){

    return async (ctx: GetServerSidePropsContext): Promise<GetServerSidePropsResult<p>> =>{
        const cookie = parseCookies(ctx)

        const token = cookie['@nextAuthToken'];

        if(!token){
            return {
                redirect: {
                    destination: '/',
                    permanent: false
                }
            }
        }

        try{
            return await fn(ctx);

        }catch(err){
            if(err instanceof AuthError){
                destroyCookie(ctx, '@nextAuthToken');

                return{
                    redirect:{
                        destination:'/',
                        permanent: false  
                    }
                }
            }
        }
    }



}