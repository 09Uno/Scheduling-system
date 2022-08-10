import styles from './styles.module.scss'
import Link from 'next/link'
import {FiLogOut} from 'react-icons/fi'
import { useContext } from 'react'
import { userAgent } from 'next/server'
import { AuthContext } from '../../contexts/AuthContext'
import logo from '../../imgs/logo.png'
import Image from 'next/image'

export function Header(){

    const {singOut} = useContext(AuthContext)

    return(
        <header className={styles.headerContainer}>
            <div className={styles.headerContent}>
                <Link href='/dashboard'>
                <Image src={logo} width={100} height={100} alt="" />
                </Link>
                 
                <nav>
                    <Link href='/clientes'>
                    <a>Clientes</a>
                    </Link>

                    <Link href='/agendamentos'>
                        <a>Agendar</a>
                    </Link>

                    <button onClick={singOut} >
                        <FiLogOut color='#FFF' size={30} />
                        
                    </button>
                </nav>
              
            </div>
        </header>
    )

}