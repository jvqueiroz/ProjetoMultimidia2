import { useContext } from 'react'
import { HomeContext } from '../context/HomeContext'
import styles from '../styles/Home.module.css'
import Icon from '@material-ui/core/Icon'
import { config } from 'process';
import {convertSegundosToStrig} from '../utils/Conversor'

export default function Home() {
  const {
    videoRef,
    canvasRef,
    imgRef,
    video,
    isPlaying,
    isMute,
    volume,
    currentTime,
    totalTime,
    tooglePlayPause,
    configMute,
    configVolume,
    configCurrentTime,
    configFiltro

  } = useContext (HomeContext);

  return (      
      <article className={styles.container}>
        <section className={styles.navBar}>
          <Icon>menu</Icon>
          <div className={styles.iconsRS}>
            <img src="../imagens/face.png"/>
            <img src="../imagens/tt.png"/>
          </div>
        </section>
        <section className={styles.areaVideo}>
          <div className={styles.imagens} ref={imgRef}></div>
          <canvas className={styles.canvas} ref={canvasRef} onClick={tooglePlayPause}></canvas>
          <video className={styles.video}  src={video} ref={videoRef} hidden onClick={tooglePlayPause}></video>
          <div className={styles.areaControles}>
            
            {
              isPlaying ? 
              (<Icon className={styles.iconPlay} onClick={tooglePlayPause}>pause</Icon>)
              :
              (<Icon className={styles.iconPlay} onClick={tooglePlayPause}>play_arrow</Icon>)
            }

            <samp className={styles.iconPlay}>{convertSegundosToStrig(currentTime)}</samp>
            <input className={styles.barraplay} type="range" min='0' max={totalTime} step="0.01" value={currentTime} onChange ={e=> configCurrentTime(Number(e.target.value))}></input>
            <samp className={styles.iconPlay}>{convertSegundosToStrig(totalTime)}</samp>
            <Icon className={styles.iconPlay} onClick={configFiltro}>invert_colors</Icon>
           
            {
              isMute ? 
              <Icon onClick={configMute}>volume_off</Icon>
              :
              <Icon onClick={configMute}>volume_up</Icon>
            }
           
            <input className={styles.barravolume} type="range" min="0" max="1" step="0.01" value={volume} onChange ={e=> configVolume(Number(e.target.value))}></input>
            <Icon>zoom_out_map</Icon>
          </div>
        </section>
        <section className={styles.areaInfoVideo}>
          <div className={styles.areatitulo}>
            <div className={styles.p}>Warner Brothers</div>
            <div className={styles.titulo}>Harry Potter e a Pedra Filosofal</div>
            <div className={styles.p2}>Harry Potter (Daniel Radcliffe) é um garoto órfão de 10 anos que vive infeliz com seus tios, os Dursley. Até que, repentinamente, ele recebe uma carta contendo um convite para ingressar em Hogwarts, uma famosa escola especializada em formar jovens bruxos.</div>
          </div>
          <div className={styles.areaLike}>
          <Icon className={styles.iconInfo}>thumb_up_off_alt</Icon> <div className={styles.p3}>2.345</div>
          <Icon className={styles.iconInfo}>thumb_down_off_alt</Icon> <div className={styles.p3}>345</div>
          <Icon className={styles.iconInfo}>visibility</Icon> <div className={styles.p3}>345</div>
          </div>
        </section>
      </article>
  )
}
