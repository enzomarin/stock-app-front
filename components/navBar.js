
import styles from '../styles/Home.module.css'
import axios from 'axios'
import cookieCutter from 'cookie-cutter'
import { useState } from 'react'
import { useRouter } from 'next/router'

const NavBar = () => {

    const router = useRouter()
  

    const logOut = () =>{
        const token =cookieCutter.get('jwtCookie')
        console.log(token)
        // Delete a cookie
        cookieCutter.set('jwtCookie', '', { expires: new Date(0) })
        router.push('/')
    }
    const handleClickCrearProducto = ()=>{
        router.push('/products/create')
    }
    const handleClickEdit = ()=>{
        router.push('/products/edit')
    }
    return(
        <nav className={styles.mainnav}>
            <ul className={styles.ul}>
                <a className={styles.headera}> 
                    <li className={styles.li}>
                        Bienvenido
                    
                    </li>
                </a>
                <a className={styles.headera}> 
                    <li className={styles.li} onClick={handleClickCrearProducto}>Crear Producto </li>
                </a>
                <a className={styles.headera}> 
                    <li className={styles.li} onClick= {handleClickEdit}>Editar Producto </li>
                </a>
                <a className={styles.headera}> 
                    <li className={styles.liButton} onClick={logOut}>
                        Log out    
                    </li>
                </a>


                
            </ul>
        </nav>
    )
}

export default NavBar