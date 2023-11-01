import React from 'react'
import './header.css'
interface Props{
    children: React.ReactNode
}

export function Header({children}:Props){
    return(
        <>
        <header className='header'>
            <section className='header-content'>
                <h5>Edubo</h5>
                <h5>Iniciar Sesion</h5>
            </section>

        </header>   
        {children}
        </>
    )
}