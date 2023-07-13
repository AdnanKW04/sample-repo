const todoContainer = document.querySelector('ul');
const input = document.querySelector('input');
const addbutton = document.querySelector('#add');
const editbutton = document.querySelector('#edit');

editbutton.style = 'display: none;'

let idOfElementTOEdit = null;

const todos = [];

const showEdit = (id) => {
    
    const element = todos.find((todo) => todo.id == id);
    console.log(element)
    input.value = element.text;
    addbutton.style = "display: none;"
    editbutton.style = "display: inline;"
    idOfElementTOEdit = id;
}


const renderList = () => {
    todoContainer.innerHTML = '';
    todos.forEach((todo) => {
        const li = document.createElement('li');
        const deletebutton = document.createElement('button');
        const editbutton = document.createElement('button')

        

        deletebutton.addEventListener('click',(e) => {
            li.remove();
            const id = todo.id
            const index = todos.findIndex((todo) => todo.id == id)
            todos.splice(index,1)
        })

        editbutton.addEventListener('click',(e) => {
            showEdit(todo.id)
        })

        editbutton.style = 'margin-left: 6px; border-radius: 20px;  width: 50px; height: 20px; padding:auto;'
        deletebutton.style = 'margin-left: 6px; border-radius: 20px; width: 50px; height: 20px; padding:auto;'
        li.style = 'color: white; margin-top: 6px; font-size: 20px;'

        deletebutton.innerHTML = 'Delete';
        editbutton.innerHTML = 'Edit'
        li.innerHTML = todo.text
        li.appendChild(deletebutton);
        li.appendChild(editbutton)       
        todoContainer.appendChild(li);
    })
    console.log(todos)
}

const handleAdd = (e) => {
        const itemToAdd = input.value;
        if (itemToAdd !== null && itemToAdd !==''){
            todos.push({
                text: itemToAdd,
                completed: false,
                id: Date.now()
            })
            input.value = ''
            renderList()
            return
        }else{
            window.alert('Adding an Empty Item is not Possible.');
        }      
}

const handleEdit = (e) => {
         const newValue = input.value;
         const element = todos.find((todo) => todo.id == idOfElementTOEdit);
         element.text = newValue;
         renderList();
         editbutton.style = 'display: none;'
         addbutton.style = 'display: inline;'
         input.value = '';
}

addbutton.addEventListener('click',handleAdd);
editbutton.addEventListener('click',handleEdit);