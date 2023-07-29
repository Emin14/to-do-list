const main = document.querySelector('.main');
const categoryTitle  = document.querySelector('.form-category__title')
// let filteredData = data.task


const filterAll = document.querySelector('.filter')
renderCategory()


// Категория "На сегодня" автоматически выбирается  при первом рендеринге
let filterItem = document.querySelectorAll('.filter__item')
let activeMenu = 'На сегодня'
filterItem[0].classList.toggle('active');


// Выводим сегодняшнюю дату
const today = new Date().toDateString().split(' ');
let newToday = [today[2], today[1], today[3], today[0]]
newToday[3] = `(${newToday[3]})`
newToday = newToday.join(" ")
const date = document.querySelector('.todaysDate')
date.innerHTML = newToday

renderTask()

// Функция для удаления определенной задачи 
const deletetask = (id) => {
    const newData = data.task.filter(item => item.id !== id);
    data.task = newData
  }

// Функция для смены статуса задачи (галочка перед задачей)
const changeStatusTask = (id) => {
const currentStatus = data.task[id-1].completed
data.task[id-1].completed = !currentStatus
const img = document.querySelector(`[data-id="${id}"]`)

if(currentStatus) {
    img.src = 'https://img.icons8.com/ios/45/ok--v2.png';
}
else {
    img.src = 'https://img.icons8.com/ios/45/ok--v1.png';
}
  }



// Обработчик который добавляет класс active на нажатый элемент
clickHandlerCategory = (event) => {
    event.stopPropagation()
    let filterItem = document.querySelectorAll('.filter__item')
    for(const key of filterItem) {
        key.classList.remove("active");
    }
    if(event.target.nodeName === 'LI') {
        event.target.classList.toggle('active');
        activeMenu = event.target.innerHTML
    }
}

// Ловим клик по категориям сбоку и вызываем функцию обработчик 
filterAll.addEventListener('click', clickHandlerCategory)
// Ловим клик по категориям сбоку и вызываем функцию, которая рендерит список задач
filterAll.addEventListener('click', renderTask)



const btn  = document.querySelector('.add-task') 
const modal = document.querySelector('.modal')
const darken = document.querySelector('.darken')

btn.addEventListener('click', openModal)
btn.addEventListener('click', addTask)
darken.addEventListener('click', closeModal)
darken.addEventListener('click', clearingInput)


// Находим элементы Popup, чтобы в дальнешем читать их value
const title = document.querySelector('#title')
const description = document.querySelector('#description')
const dateOfCompletion = document.querySelector('#date')
let itemcategory = document.querySelectorAll('.form-category__item')


const formTitle  = document.querySelector('.form__title')
const formButton   = document.querySelector('.form__btn')

// Функция для открытия модального окна
function openModal() {
    renderCategoryInPopup()
    darken.classList.add('darken-show')
    btn.classList.add('btn-hide')
    modal.classList.add('modal-show')
}
// Функция для закрытия модального окна
function closeModal() {
    darken.classList.remove('darken-show')
    btn.classList.remove('btn-hide')
    modal.classList.remove('modal-show')
  }

// Нужно для фиксации ID элемента на которой произошел клик для смены значений
let editElementID = null
// Функция смены текста модального окна  при изменении задачи 
function editTask(item) {
        formTitle.innerHTML = 'Изменить задачу'
        formButton.innerHTML = 'Изменить задачу'
    
        title.value = item.title
        description.value = item.description
        dateOfCompletion.value = item.dateOfCompletion.split('.').join('-')
        editElementID = item.id
        const formcategory = document.querySelectorAll('.form-category__item')
        for(const key of formcategory) {
            if(key.innerHTML === item.taskCategory) {
                key.classList.add("selected");
            }
        }
}

// Функция смены текста модального окна при добавлении задачи 
function addTask() {
    formTitle.innerHTML = 'Добавить задачу' 
    formButton.innerHTML = 'Добавить задачу' 
}


// Функция очистки инпутов
function clearingInput() {
    title.value = ''
    description.value = ''
    dateOfCompletion.value = ''
    editElementID = null
    if(group) {
        group.classList.remove("selected");
    }
}


// Функция для обработки Form при добавлении/изменении задачи
submitForm = (event) => {
    event.preventDefault()

    const titleForm = event.target.children[0].innerHTML
    const title = document.querySelector('#title').value
    const description = document.querySelector('#description').value
    const dateOfCompletion = document.querySelector('#date').value.split('-').join('.')

    let dateOfCreation = new Date()
    dateOfCreation = `${dateOfCreation.getFullYear()}.${dateOfCreation.getMonth()+1}.${dateOfCreation.getDate()}
    `
    const group = document.querySelector('.form-category__item.selected')
    let taskCategory = ''
    if(group && group.innerHTML !== 'Без категории') {
        taskCategory = group.innerHTML
    }

    const findIndex = data.task.findIndex(item => item.id === editElementID)

    const lastId = data.task[data.task.length-1].id

    const task = {
        title,
        description,
        dateOfCreation,
        dateOfCompletion,
        taskCategory,
        completed: false
    }

    if(titleForm === 'Изменить задачу') {
        data.task[findIndex] = {
            id: editElementID,
            ...task}
    }
    else {
        data.task.push({
            id: lastId+1, 
            ...task,
        })
    }
}

const formTaskAdd = document.querySelector('.form')
formTaskAdd.addEventListener('submit', submitForm)
formTaskAdd.addEventListener('submit', closeModal)
formTaskAdd.addEventListener('submit', clearingInput)
formTaskAdd.addEventListener('submit', renderTask)
