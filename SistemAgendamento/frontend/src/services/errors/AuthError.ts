export class AuthError extends Error{
    constructor(){
        super("Erro ao autenticar o token.")
    }
}