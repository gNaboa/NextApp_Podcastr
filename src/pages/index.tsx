
import {GetStaticProps} from 'next'
import {format,parseISO} from 'date-fns'
import ptBR from 'date-fns/locale/pt-BR'
import Link from 'next/link'
import {convertDurationToTimeString} from '../utils/converDurationToTImeString'
import {api} from '../services/api'
import styles from './home.module.scss'
import Image from 'next/image'
import { useContext } from 'react'
import { PlayerContext } from '../contexts/PlayerContext'

type Episodes = {
  id:string,
  title:string,
  thumbnail:string,
  description:string,
  members:string,
  duration:string,
  durationAsString:string,
  url:string
  published_at:string
}

type HomeProps = {
  lastEpisodes:Array<Episodes>,
  allEpisodes:Array<Episodes>
}

export default function Home({lastEpisodes,allEpisodes} : HomeProps) {
  
  const {play} = useContext(PlayerContext)
   
 return (
  <div>
   <div className={styles.homePage}>
      <section className={styles.latestEpisodes}>
              <h2>Ultimos lançamentos</h2>

              <ul>
                  {lastEpisodes.map(ep=>{
                    return(
                      <li key={ep.id}>
                       <Image
                        height={192}
                         width={192} 
                         src={ep.thumbnail} 
                         alt={ep.title}
                         objectFit="cover"
                         />

                       <div className={styles.details}>
                         <Link href={`/episodes/${ep.id}`}>
                         
                         <a>{ep.title}</a>
                         </Link>
                        
                        
                         <p>{ep.members}</p>
                         <span>{ep.published_at}</span>
                         <span>{ep.durationAsString}</span>
                       </div>

                       <button type="button" onClick= {()=>{play(ep)}}>
                         <img src="play-green.svg" alt="Tocar audio"/>
                       </button>
                      </li>
                    )
                  })}
              </ul>
     </section>

     <section className={styles.allEpisodes}>
                    <h2>Todos episódios</h2>
                    <table>
                      <thead>

                        <th></th>
                        <th>Podcast</th>
                        <th>Integrantes</th>
                        <th>Data</th>
                        <th>Duração</th>
                        <th></th>
                      </thead>
                      <tbody>
                        {allEpisodes.map(ep=>{
                         return(
                           <tr key={ep.id}>
                              <td style={{width:100}}>
                                <Image
                                width={120}
                                 height={120}
                                 src={ep.thumbnail}
                                 alt={ep.title}
                                />
                                
                                </td>
                                <td>
                                  <Link href={`/episodes/${ep.id}`}>
                                  <a >{ep.title}</a>
                                  </Link>
                                 
                                </td>
                                <td>
                                  <p>{ep.members}</p>
                                </td>
                                <td style={{width:100}}>
                                  <span>{ep.published_at}</span>
                                </td>
                                <td><span>{ep.durationAsString}</span></td>
                                <td>
                                  <button>
                                  <img src="play-green.svg" alt="Tocar audio"/>
                                  </button>
                                  </td>

                           </tr>
                         )
                      })}</tbody>
                    </table>

     </section>
     </div>
   </div>  
  )
}


export  const getStaticProps: GetStaticProps = async () =>{
 
  const {data} = await api.get("episodes",{

     params:{
       _limit:12,
       _sort:'published_at',
       _order:'desc'
     }
  })
 
  const episodes = data.map(episode=>{
    return(
      {
        id:episode.id,
        title:episode.title,
        thumbnail:episode.thumbnail,
        members:episode.members,
        description:episode.description,
        published_at:format(parseISO(episode.published_at),'d MMM yy',{locale:ptBR}),
        url:episode.file.url,
        durationAsString: convertDurationToTimeString(Number(episode.file.duration)),
        duration:Number(episode.file.duration)
      }
    )
  })
   
  const lastEpisodes = episodes.slice(0,2)
  const allEpisodes = episodes.slice(2,episodes.length)
   
  return{
    props:{
      lastEpisodes,
      allEpisodes
    },
    revalidate:60*60*8   // de quanto em quanto tempo quero gerar uma nova versao da pagina
  }
}