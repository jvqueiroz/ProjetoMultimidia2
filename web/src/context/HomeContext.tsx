import { green } from "@material-ui/core/colors";
import { createContext, MutableRefObject, ReactNode, useEffect, useRef, useState } from "react";

interface HomeContextData{
    videoRef: MutableRefObject<HTMLVideoElement>;
    canvasRef: MutableRefObject<HTMLCanvasElement>;
    imgRef: MutableRefObject<HTMLDivElement>;
    video: string;
    isMute: boolean;
    isPlaying: boolean;
    isFiltro: boolean;
    volume: number;
    currentTime: number;
    totalTime: number;
    tooglePlayPause: ()=>void;
    configMute: ()=>void;
    configVolume: (voluSme: number) =>void;
    configCurrentTime: (time: number) => void;
    configFiltro: () => void;
   
}

export const HomeContext = createContext({} as HomeContextData);

interface HomeContextProviderProps {
    children: ReactNode;
}

interface Pixel{
    red: number;
    green: number;
    bluee: number;
}

interface filtro{
    execute (red: number, green: number, bluee: number):Pixel;
}

class ImplementaFiltro implements filtro {
    execute (red: number, green: number, bluee: number): Pixel {
    const media = (red + green + bluee)/3;
        const pixel:Pixel = {red: media, green: media, bluee: media};
        return pixel;
    }
}

class videoNormal implements filtro {
    execute (red: number, green: number, bluee: number): Pixel {
    return {red, green, bluee};
    }
}

export const HomeContextProvider = ({children}:HomeContextProviderProps) => {
    const videoRef = useRef<HTMLVideoElement>(null);
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const imgRef = useRef < HTMLDivElement>(null);
    const [video, setVideo] = useState<string>("");
    const [volume, setVolume] = useState<number> (1);
    const [currentTime, setCurrentTime] = useState(0);
    const [totalTime, setTotalTime] = useState(1); 
    const [volumeAtual, setVolumeAtual] = useState<number> (1);
    const [isPlaying, setIsPlaying] = useState<boolean>(false);
    const [isMute, setIsMute] = useState<boolean>(false);
    const [filtro, setFiltro] = useState<filtro>(new videoNormal());
    const [isFiltro, setIsFiltro] = useState<boolean>(false);
    useEffect(()=>{
        configVideo("./video/filme.mp4");
    }, []);
     
    var cont =0;
    const draw = () =>{
        const playingvideo = videoRef.current;
        if (playingvideo.paused || playingvideo.ended) return;

        const canvas = canvasRef.current;
        const context = canvas.getContext("2d");
        const x = 0;
        const y = 0;
        context.drawImage(playingvideo, x, y, canvas.width, canvas.height);
        const imageData = context.getImageData(x,y, canvas.width, canvas.height);
        const data = imageData.data;
        
            for(var i =0 ; i<data.length; i+=4){
                const red = data[i];
                const green = data[i+1];
                const bluee = data[i+2];
    
                const pixel: Pixel = filtro.execute(red, green, bluee);
    
    
                data[i] = pixel.red;
                data[i+1] = pixel.green;
                data[i+2] = pixel.bluee;
            }
        
        context.putImageData(imageData, x, y);

        if(cont++ % 100 == 0 && cont > 10){
            const image = new Image();
            const imgUrl = canvas.toDataURL('images/png');
            image.src= imgUrl;
            imgRef.current.appendChild(image);
        }
        requestAnimationFrame(draw);
    }

    const configVideo = (videUrl: string) =>{
        setVideo(videUrl);

        const video = videoRef.current;
        
        video.onloadedmetadata = () =>{
            setTotalTime(video.duration);
        }

        video.ontimeupdate =() =>{
            setCurrentTime(video.currentTime);
        }

    }
    const tooglePlayPause =() =>{
        const updateIsPlaying = !isPlaying;
        if (isPlaying){
            pause();
        }
        else{
            play();
        }
        setIsPlaying(updateIsPlaying);
    }

    const configMute =() => {
        const updateMute = !isMute;
        const video =videoRef.current;
        video.muted = updateMute;
        setIsMute(updateMute);
        if(updateMute === true){
            setVolumeAtual (volume);
            video.volume = 0;
            setVolume(0);
        }
        else{
            video.volume = volumeAtual;
            setVolume(volumeAtual);
        }
    }

    const configCurrentTime = (time: number) =>{
        const video= videoRef.current;
        setCurrentTime(time);
        video.currentTime = time;
    }

    const configVolume =(value: number) =>{
        const video = videoRef.current;
        video.volume = value;
        setVolume(value);
        if(value === 0){
            video.muted = true;
            setIsMute(true);
        }
        else{
            video.muted = false;
            setIsMute(false);
        }
    }
    const configFiltro =() =>{

        const updateIsFiltro = !isFiltro;
        if (isFiltro){
            setFiltro(new ImplementaFiltro());
            draw();
        }
        else{
            setFiltro(new videoNormal());
            draw();
        }
        setIsFiltro(updateIsFiltro);

    }

    const play =() =>{
        const video = videoRef.current;
        video.play();
        draw();
    }

    const pause =() =>{
        const video = videoRef.current;
        video.pause();
    }


    return (
        <HomeContext.Provider value={
            {
                videoRef,
                video,
                isPlaying,
                isMute,
                volume,
                currentTime,
                totalTime,
                canvasRef,
                imgRef,
                isFiltro,
                tooglePlayPause,
                configMute,
                configVolume,
                configCurrentTime,
                configFiltro
            }
        }>
        {children}

        </HomeContext.Provider>
    )
}