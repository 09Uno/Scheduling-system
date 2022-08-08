import { Button, Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions } from '@mui/material'
import { Children, useState } from 'react'
import { ButtonHTMLAttributes, ReactNode } from 'react'
import { toast } from "react-toastify"
import 'react-toastify/dist/ReactToastify.css';



interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
    children: ReactNode,
    del: () => void
}


export const MuiDialog = ({ children, del }: ButtonProps) => {

    const [open, setOpen] = useState(false)


    function ex() {
        setOpen(false)
        { del() }

        toast.success('Agendamento Apagado com sucesso!', {
            position: "top-center",
            autoClose: 1000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: false,
            draggable: false,
            progress: undefined,
        });
    }


    return (

        <>
            <Button onClick={() => setOpen(true)}>{children}</Button>
            <Dialog
                open={open}
                onClose={() => setOpen(false)}
                arial-labelledby="dialog-title"
                arial-describedby='dialog-description'
            >
                < DialogTitle id="dialog-description"></DialogTitle>
                <DialogContent>
                    <DialogContentText id="dialog-description">
                        Deseja realmente excluir o agendamento selecionado?
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => setOpen(false)}>Não</Button>
                    <Button autoFocus onClick={() => ex()}>Sim</Button>

                </DialogActions>
            </Dialog>
        </>


    )
}