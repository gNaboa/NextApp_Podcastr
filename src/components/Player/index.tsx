import React from 'react'
import styles from './style.module.scss'
import {useContext} from 'react'
import {PlayerContext} from '../../contexts/PlayerContext'
export default function index() {


    const {episodeList,currentEpisode} = useContext(PlayerContext)

    const playing = episodeList[currentEpisode]
    
    return (
        <div className={styles.playerContainer}>
            <header>
                <img src="./playing.svg" alt="Tocando agora"/>
                <strong>Tocando agora {playing?.title}</strong>
            </header>


            <div className={styles.emptyPlayer}>

                 <strong>Selecione um podcast para ouvir</strong>
            </div>

            <footer>
                <div className={styles.progress}>
                       <span>00:00</span>
                      <div className={styles.slider}>
                         <div className={styles.emptySlider}></div>
                      </div>
                       <span>00:00</span>
                </div>
                <div className={styles.buttons}>
                     <button type="button">
                         <img src="./shuffle.svg" alt="Embaralhar"/>
                     </button>
                     <button type="button">
                         <img src="./play-previous.svg" alt="Tocar anterior"/>
                     </button>
                     <button type="button" className={styles.tocar}>
                         <img src="./play.svg" alt="Tocar"/>
                     </button>
                     <button type="button">
                         <img src="./play-next.svg" alt="Tocar proximo"/>
                     </button>
                     <button type="button">
                         <img src="./repeat.svg" alt="Voltar"/>
                     </button>
                </div>
            </footer>
        </div>
    )
}
