const AplicarCambios = function(event){
    event.preventDefault();

    let tamanio = event.target.SizeLetra.value;
    let color = event.target.SetColor.value;
    let ancho = event.target.SizeAncho.value;
    let alto = event.target.SizeAlto.value;

    const objeto = document.getElementById('objeto');
    objeto.style.transition = '0.9s';
    objeto.style.fontSize = tamanio + 'px';
    objeto.style.backgroundColor = color;
    objeto.style.width = ancho + 'px';
    objeto.style.height = alto + 'px';

    
}

const Formulario = document.getElementById('Formulario');

Formulario.addEventListener("submit", AplicarCambios);
