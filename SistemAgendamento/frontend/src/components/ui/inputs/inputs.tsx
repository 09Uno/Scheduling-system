import { HtmlHTMLAttributes, InputHTMLAttributes, TextareaHTMLAttributes, OptionHTMLAttributes, ReactNode } from "react";
import { clienteProps } from "../../../pages/clientes";
import styles from "./styles.module.scss"

interface InputProps extends InputHTMLAttributes<HTMLInputElement> { }
interface TextAreaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> { }
interface OptionProps extends OptionHTMLAttributes<HTMLOptGroupElement> {
    children: ReactNode;
}

export function Input({ ...rest }: InputProps) {

    return (
        <input className={styles.input}{...rest} />
    )


}

export function TextArea({ ...rest }: TextAreaProps) {
    return (
        <textarea className={styles.textArea}{...rest}></textarea>
    )
}

