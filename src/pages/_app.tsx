import '../../styles/globals.scss'
import Header from '../components/header/index'
import styles from '../../styles/app.module.scss'
import Player from '../components/Player/index'
import {PlayerContext} from '../contexts/PlayerContext'
import { useState } from 'react'
function MyApp({ Component, pageProps }) {


   const [episodeList,setEpisodeList] = useState([])
   const [currentEpisode,setCurrentEpisode] = useState(0)
   

   function play(episode){
        
    setEpisodeList(episode);
    setCurrentEpisode(0);
   }

  return(
    <PlayerContext.Provider value={{episodeList, currentEpisode,play}} >
    <div className={styles.wrapper}>
      <main>
        <Header/>
      <Component {...pageProps} />

    </main>
    <Player/>
    </div>
    </PlayerContext.Provider>
    )
}

export default MyApp
