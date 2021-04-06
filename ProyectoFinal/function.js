
function ReemplaceLocalDataBase() {
    Tareas = [];
    for (let x = 0; x < listItems.children.length; x++) {
        let Tarea = {
            Titulo: listItems.children[x].firstChild.firstChild.lastChild.innerText,
            Detalle: listItems.children[x].firstChild.nextSibling.innerText,
            IsSelected: listItems.children[x].firstChild.firstChild.children[0].checked
        };
        
        Tareas.push(Tarea);
    }
    localStorage.setItem(DBKey, JSON.stringify(Tareas));

}
function AddNewItems(titulo, detalle, IsSelected) {
    let classSelected = 'inner-tittleRaw';
    if(IsSelected){
        classSelected = 'inner-tittleAct';
    }

    const divInner = document.createElement('div');
    divInner.classList.add('form-check', 'form-switch');

    const inputCheck = document.createElement('input');
    inputCheck.className = 'form-check-input';
    inputCheck.type = 'checkbox';
    inputCheck.checked = IsSelected;
    inputCheck.addEventListener('click', ChangeStatus);

    const label = document.createElement('label');
    label.className = 'form-check-label';
    label.innerText = titulo;

    divInner.appendChild(inputCheck);
    divInner.appendChild(label);

    const divOuter = document.createElement('div');
    divOuter.classList.add('col-md-12', classSelected);
    divOuter.appendChild(divInner);

    const p = document.createElement('p');
    p.className = 'listDetail';
    p.innerText = detalle;

    const buttonClose = document.createElement('button');
    buttonClose.type = 'button';
    buttonClose.classList.add('btn-close', 'position-absolute', 'top-0', 'end-0');
    buttonClose.setAttribute('aria-label', 'Close');
    buttonClose.value = IsSelected;
    buttonClose.addEventListener('click', DeleteItems);


    const buttonEdit = document.createElement('button');
    buttonEdit.type = 'button';
    buttonEdit.classList.add('btn', 'btn-outline-success', 'btn-sm');
    buttonEdit.innerText = 'Editar Tarea';
    buttonEdit.addEventListener('click', EditElement);


    const li = document.createElement('li');
    li.classList.add('list-group-item', 'user-select-none');
    li.appendChild(divOuter);
    li.appendChild(p);
    li.appendChild(buttonClose);
    li.appendChild(buttonEdit);
    return li;
}
function GetNewToastDraw(texto) {
    const div0 = document.createElement('div');
    div0.classList.add('toast', 'fade', 'hide', 'text-white', 'bg-primary');
    div0.setAttribute('role', 'alert');
    div0.setAttribute('aria-live', 'assertive');
    div0.setAttribute('aria-atomic', 'true');

    const div1 = document.createElement('div');
    div1.className = 'toast-header';

    const strong = document.createElement('strong');
    strong.className = 'me-auto';
    strong.innerText = 'Seleccionado, no podrá ser eliminado de la lista';

    const button = document.createElement('button');
    button.type = 'button';
    button.className = 'btn-close';
    button.setAttribute('data-bs-dismiss', 'toast');
    button.setAttribute('aria-label', 'Close');

    div1.appendChild(strong);
    div1.appendChild(button);

    const div2 = document.createElement('div');
    div2.className = 'toast-body';
    div2.innerText = texto;

    div0.appendChild(div1);
    div0.appendChild(div2);

    return div0;
}
const ClosedToast = function (elemt) {
    listToast.removeChild(elemt.target);
}
const SetInfoForm = function (formulario) {
    formulario.preventDefault();
    let titulo = formulario.target.titulo.value;
    let detalle = formulario.target.descripcion.value;
    let accion = formulario.target.AddEditButton.innerText;


    if (accion == "Agregar") {
        listItems.append(AddNewItems(titulo, detalle, false));
        formulario.target.titulo.value = null;
        formulario.target.descripcion.value = null;
        formulario.target.titulo.focus();


        let Tarea = {
            Titulo: titulo,
            Detalle: detalle,
            IsSelected: false
        };

        ListaDB001 = localStorage.getItem(DBKey);
        if (ListaDB001 !== null) {
            Tareas = JSON.parse(ListaDB001);
        }

        Tareas.push(Tarea);
        localStorage.setItem(DBKey, JSON.stringify(Tareas));
    } else if (accion == "Editar") {
        for (let x = 0; x < listItems.children.length; x++) {
            if (listItems.children[x].lastChild.classList[3] == 'edit') {
                listItems.children[x].firstChild.firstChild.lastChild.innerText = titulo;
                listItems.children[x].firstChild.nextSibling.innerText = detalle;
                listItems.children[x].lastChild.classList.remove('edit');
                formulario.target.AddEditButton.innerText = 'Agregar';
                formulario.target.AddEditButton.classList.remove('btn-outline-success');
                formulario.target.AddEditButton.classList.add('btn-primary');

                formulario.target.titulo.value = null;
                formulario.target.descripcion.value = null;
                formulario.target.titulo.focus();
                formulario.path[0].firstChild.remove();
                break;
            }
        }
        ReemplaceLocalDataBase();
    }
}
const ChangeStatus = function (inputCheck) {
    const element = inputCheck.path[2];
    if (inputCheck.target.checked == true) {
        inputCheck.path[3].lastChild.previousSibling.value = true;
        element.classList.remove('inner-tittleRaw');
        element.classList.add('inner-tittleAct');
        let texto = inputCheck.path[3].firstChild.lastChild.lastChild.innerText;
        const newLi = GetNewToastDraw(texto);
        newLi.addEventListener('hidden.bs.toast', ClosedToast);
        listToast.append(newLi);

        const toast = new bootstrap.Toast(
            newLi,
            {
                animation: true,
                autohide: true,
                delay: 10000
            }
        );
        toast.show();


    } else {
        inputCheck.path[3].lastChild.previousSibling.value = false;
        element.classList.remove('inner-tittleAct');
        element.classList.add('inner-tittleRaw');
    }
    ReemplaceLocalDataBase();
}
const DeleteItems = function (closeButton) {
    if (closeButton.target.value == 'false') {
        const myModal = new bootstrap.Modal(document.getElementById('modalDeleteTarea'), {
            backdrop: 'static',
            keyboard: false,
            focus: true
        });
        document.getElementById('modalTitleTarea').innerText = closeButton.path[1].firstChild.firstChild.lastChild.innerText;
        myModal.show();
        const buttonYes = myModal._element.lastElementChild.lastElementChild.lastElementChild.lastElementChild;
        buttonYes.addEventListener('click', () => {
            const element = closeButton.path[1];
            element.remove();
            myModal.hide();
            ReemplaceLocalDataBase();
        });
    }
}
const EditElement = function (editButton) {
    for (let x = 0; x < listItems.children.length; x++) {
        if (listItems.children[x].lastChild.classList[3] == 'edit') {
            listItems.children[x].lastChild.classList.remove('edit');
        }
    }
    editButton.target.classList.add('edit');
    const element = editButton.path[1];
    let titulo = editButton.path[1].firstChild.innerText;
    let detalle = editButton.path[1].firstChild.nextSibling.innerText
    document.getElementById('titulo').value = titulo;
    document.getElementById('descripcion').value = detalle;
    const btnAddEdit = document.getElementById('AddEditButton');
    btnAddEdit.innerText = 'Editar';
    btnAddEdit.classList.remove('btn-primary');
    btnAddEdit.classList.add('btn-outline-success');

    const cancelEdit = document.createElement('button');
    cancelEdit.type = 'button';
    cancelEdit.className = 'btn btn-secondary top-0 end-0';
    cancelEdit.innerText = 'Cancelar Editar';
    cancelEdit.addEventListener('click', (eL) => {
        for (let x = 0; x < listItems.children.length; x++) {
            if (listItems.children[x].lastChild.classList[3] == 'edit') {
                listItems.children[x].lastChild.classList.remove('edit');
                eL.target.remove();

                document.getElementById('titulo').value = null;
                document.getElementById('descripcion').value = null;
                document.getElementById('titulo').focus();

                document.getElementById('AddEditButton').innerText = 'Agregar';
                document.getElementById('AddEditButton').classList.remove('btn-outline-success');
                document.getElementById('AddEditButton').classList.add('btn-primary');
                break;
            }
        }


    });

    myForm.prepend(cancelEdit);

}

const DBKey = 'ListadoDB001';
let ListaDB001;
const myForm = document.getElementById("myForm");
myForm.addEventListener('submit', SetInfoForm);
const listItems = document.getElementById('listIntems');
const listToast = document.getElementById('listToast');
let Tareas = new Array();

window.onload = () => {
    ListaDB001 = localStorage.getItem(DBKey);
    if (ListaDB001 !== null) {
        Tareas = JSON.parse(ListaDB001);
        Tareas.forEach((tarea) => {
            listItems.append(AddNewItems(tarea.Titulo, tarea.Detalle, tarea.IsSelected));
        });
    }
}
