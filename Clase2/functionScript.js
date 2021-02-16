const body = document.getElementById('cuerpo');

const timer = setInterval(function(){
    DrawElement();
}, 1000);

function StopInterval(){
    clearInterval(timer);

}
function DrawElement(){
    //Creando el Elemento
    const newDiv = document.createElement("div");

    //Asignando la clase de dibujo por defecto del css
    newDiv.className = "drawElementNew";

    //Creando un arreglo de colores
    let colores = ["red","#008080", "#7b991e","blue","black", "#5a6f77", "#abca99", "#743708", "#f7347a", "#bcb9ca", "#0c0505", "#813939"];

    //Asignando un color aleatoro del arreglo de colores
    newDiv.style.backgroundColor = colores[parseInt(Math.random() * colores.length)];
    newDiv.style.opacity = Math.random();

    //Asignando un punto aleatorio desde el margen dela izquierda
    let izquierda = document.getElementById('drawArea').offsetWidth / 1.232323;
    
    newDiv.style.left = ( Math.random() * izquierda) + 'px';
    
    //Asignando un punto aleatorio desde el margen superior
    let tope = document.getElementById('drawArea').offsetTop; 
    newDiv.style.top = (Math.random() * tope) + 'px';
    
    //Creado y asignando un tamaño aleatorio
    let tamanio = (Math.random() * 500);
    newDiv.style.width = tamanio + 'px';
    newDiv.style.height = tamanio + 'px';

    //Asignando evento click al elemento creado
    newDiv.addEventListener('click', function(element){
        
        //Eliminando elemento del area
        document.getElementById('drawArea').removeChild(element.target);
    });

    //Agregando elemento creado al area
    document.getElementById('drawArea').appendChild(newDiv);

    
}

//Funcion para eliminar todos los elementos del area 
function ClearElements(){
    const area = document.getElementById("drawArea");
    while(area.firstChild){
        area.removeChild(area.lastChild);
    }


}


