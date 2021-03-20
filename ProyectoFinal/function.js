const SetInfoForm = function (formulario) {
    formulario.preventDefault();
    let titulo = formulario.target.titulo.value;
    let detalle = formulario.target.descripcion.value;


    listItems.append(AddNewItems(titulo, detalle));

    formulario.target.titulo.value = null;
    formulario.target.descripcion.value = null;

    formulario.target.titulo.focus();
}
const ChangeStatus = function (inputCheck) {


    const element = inputCheck.path[2];
    if (inputCheck.target.checked == true) {
        inputCheck.path[3].lastChild.value = true;
        element.classList.remove('inner-tittleRaw');
        element.classList.add('inner-tittleAct');
    } else {
        inputCheck.path[3].lastChild.value = false;
        element.classList.remove('inner-tittleAct');
        element.classList.add('inner-tittleRaw');
    }
}
const DeleteItems = function (closeButton) {

    const element = closeButton.path[1];
    let closeValue = closeButton.target.value;

    if (closeValue == 'false') {
        listItems.removeChild(element);
    }
}
const listItems = document.getElementById('listIntems');
const myForm = document.getElementById("myForm");
myForm.addEventListener('submit', SetInfoForm);

function AddNewItems(titulo, detalle) {

    const divInner = document.createElement('div');
    divInner.classList.add('form-check', 'form-switch');

    const inputCheck = document.createElement('input');
    inputCheck.className = 'form-check-input';
    inputCheck.type = 'checkbox';
    inputCheck.addEventListener('click', ChangeStatus);

    const label = document.createElement('label');
    label.className = 'form-check-label';
    label.innerText = titulo;

    divInner.appendChild(inputCheck);
    divInner.appendChild(label);

    const divOuter = document.createElement('div');
    divOuter.classList.add('col-md-12', 'inner-tittleRaw');
    divOuter.appendChild(divInner);

    const p = document.createElement('p');
    p.className = 'listDetail';
    p.innerText = detalle;

    const buttonClose = document.createElement('button');
    buttonClose.type = 'button';
    buttonClose.classList.add('btn-close', 'position-absolute', 'top-0', 'end-0');
    buttonClose.setAttribute('aria-label', 'Close');
    buttonClose.value = false;
    buttonClose.addEventListener('click', DeleteItems);

    const li = document.createElement('li');
    li.classList.add('list-group-item');
    li.appendChild(divOuter);
    li.appendChild(p);
    li.appendChild(buttonClose);

    return li;
}
