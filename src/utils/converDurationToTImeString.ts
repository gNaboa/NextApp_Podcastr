export function convertDurationToTimeString(duration:number):String{

 const horas = Math.floor(duration/3600)
  const minutos = Math.floor((duration % 3600) / 60) 
  const segundos = duration % 60

 const finalResult = [horas,minutos,segundos]
 .map(unit=>String(unit).padStart(2,'0')).join(':') // se retornar 1 caractere coloca um 0 na frente, 2 digitos sempre
    

 return finalResult;
}