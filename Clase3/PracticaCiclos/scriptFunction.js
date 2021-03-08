
function DrawNewCard(name) {

    const Titulo = document.createElement('h5');
    Titulo.className = 'card-title';
    Titulo.innerHTML = 'TARJETA';

    const negrita = document.createElement('strong');
    negrita.innerHTML = GetCardNumber() + ' ' + GetCardNumber() + ' ' + GetCardNumber() + ' ' + GetCardNumber();
    
    const cardNumber = document.createElement('p');
    cardNumber.className = 'card-text';
    cardNumber.append(negrita);
    
    const cardName = document.createElement('p');
    cardName.className = 'card-text';
    cardName.innerHTML = name;
    
    const ButtonState = document.createElement('button');
    ButtonState.type = 'button';
    ButtonState.classList.add('btn', 'btn-success');
    ButtonState.innerHTML = 'ACTIVADA';
    
    const cardBody = document.createElement('div');
    cardBody.className = 'card-body';
    cardBody.appendChild(Titulo);
    cardBody.appendChild(cardNumber);
    cardBody.appendChild(cardName);
    cardBody.appendChild(ButtonState);
    
    const ButtonClose = document.createElement('button');
    ButtonClose.type = 'button';
    ButtonClose.classList.add('btn-close', 'position-absolute', 'top-0', 'end-0');
    ButtonClose.setAttribute('aria-label', 'Close');
    
    const InnerFrame = document.createElement('div');
    InnerFrame.classList.add('card', 'shadow', 'p-3', 'mb-5', 'bg-body', 'rounded');
    InnerFrame.appendChild(ButtonClose);
    InnerFrame.appendChild(cardBody);
    
    const ExternalFrame = document.createElement('div');
    ExternalFrame.classList.add('col-md-3');
    ExternalFrame.id = negrita.innerHTML;
    ExternalFrame.appendChild(InnerFrame);
    ButtonClose.addEventListener('click', RemoveTarjeta);
    ButtonState.addEventListener('click', ChangeStatus);
    return ExternalFrame;
}
function GetCardNumber() {
    
    let number = parseInt(Math.random() * 9999);
    let zeros = number.toString();
    return zeros.padStart(4, '0');

}
const SetInfoForm = function (formulario) {
    formulario.preventDefault();
    let cant = formulario.target.Cantidad.value;
    let nombre = formulario.target.Nombre.value;

    for (i = 0; i < cant; i++) {
        panel.appendChild(DrawNewCard(nombre));

    }

    formulario.target.Nombre.value = null;
    formulario.target.Cantidad.value = 1;
}
const ClearPanelDraw = function () {
    panel.innerHTML = '';
}
const RemoveTarjeta = function(element){
    const eliminar = document.getElementById(element.path[2].id);
    document.getElementById('panelDraw').removeChild(eliminar);
    
    

   
    
}
const ChangeStatus = function(element){
    const result = element.target;

    if(result.innerHTML == "ACTIVADA"){
        result.innerHTML = 'DESACTIVADA';
        result.classList.remove('btn-success');
        result.classList.add('btn', 'btn-danger');

    }else{
        result.classList.remove('btn-danger');
        result.classList.add('btn', 'btn-success');
        result.innerHTML = 'ACTIVADA';

    }

}

const panel = document.getElementById('panelDraw');
const myForm = document.getElementById("myForm");

myForm.addEventListener('submit', SetInfoForm);
myForm.addEventListener('reset', ClearPanelDraw);

