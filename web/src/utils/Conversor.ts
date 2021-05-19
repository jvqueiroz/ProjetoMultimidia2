export const convertSegundosToStrig = (time: number)=>{
    const minutos = Math.trunc(time /60);
    const segundos = Math.trunc(time % 60);

    return `${('0'+minutos).slice(-2)}: ${('0'+segundos).slice(-2)}`;
}