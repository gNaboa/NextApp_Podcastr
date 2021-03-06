import {createContext} from 'react'


type Episode = {
   title:string,
   members:string,
   thumbnail:string,
   duration:String,
   url:string,
  
}

type PlayerContextData={
    episodeList:Episode[],
    currentEpisode:number,
    play: (episode:Episode) => void
}

export const PlayerContext = createContext({} as PlayerContextData);