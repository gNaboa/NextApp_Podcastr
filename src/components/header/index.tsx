import React from 'react'

import format from 'date-fns/format'

import ptBR from 'date-fns/locale/pt-BR'
import styles from './style.module.scss'

export default function index() {


   const currentDate = format(new Date(),'EEEEEE, d MMMM',{

   locale:ptBR

   })

    return (
        <div className={styles.headerContainer}>
            <img src="./logo.svg" alt="Podcastr"/>

            <p>O melhor para você ouvir, sempre</p>

            <span>{currentDate}</span>
        </div>
    )
}
