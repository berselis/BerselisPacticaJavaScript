let diametro = window.prompt("Inserte el valor del diametro");
let grosor = window.prompt("Inserte el valor del grosor");

if(diametro > 1.4){
    console.log("la rueda es para un vehiculo grande")
}else if(diametro <= 1.4 || diametro > 0.8){
    console.log("La rueda es para un vehiculo mediano");

}else{
    console.log("La rueda es para un vehiculo pequeño")
}


