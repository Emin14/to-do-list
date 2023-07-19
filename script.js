const data = {
    taskCategory: ["Продукты", "Javascript", "Работа"],
    task: [
        {
            id: 1,
            title: "Купить",
            description: "Купить арбуз у дома",
            dateOfCreation: "2023.07.14",
            dateOfCompletion: "2023.08.17",
            taskCategory: 'Продукты',
            completed: false
        },
        {
            id: 2,
            title: "Ремонт",
            description: "Отремонтировать велосипед",
            dateOfCreation: "2023.07.14",
            dateOfCompletion: "2023.07.19",
            taskCategory: '',
            completed: false
        },
        {
            id: 3,
            title: "Продать телевизор",
            description: "Продать свой домашний телевизор",
            dateOfCreation: "2023.07.15",
            dateOfCompletion: "2023.08.20",
            taskCategory: '',
            completed: false
        },
        {
            id: 4,
            title: "Выучить react",
            description: "Выучить хуки и состояние компонента",
            dateOfCreation: "2023.07.22",
            dateOfCompletion: "2023.08.26",
            taskCategory: 'Javascript',
            completed: false
        },
        {
            id: 5,
            title: "Выучить redux",
            description: "Redux toolkit",
            dateOfCreation: "2023.07.16",
            dateOfCompletion: "2023.08.30",
            taskCategory: 'Javascript',
            completed: true
        },
    ]
}


const main = document.querySelector('.main');




const categoryTitle  = document.querySelector('.form-category__title')
let category = null

// Выводим название категории в попапе
renderCategoryInPopup = () => {
    
    if(category) {
        category.remove()
    }

    category = document.createElement('div');
    category.className = "form-category__wrapper";
    categoryTitle.after(category)

    let spanNocategory = document.createElement('span');
    spanNocategory.className = "form-category__item";
    spanNocategory.innerHTML = "Без названия"
    category.append(spanNocategory)

    for(let i = 0; i < data.taskCategory.length; i++) {
        let span = document.createElement('span');
        span.className = "form-category__item";
        span.innerHTML = data.taskCategory[i]
        category.append(span)
    
        let und = ''
        let itemcategory = document.querySelectorAll('.form-category__item')
        category.addEventListener('click', function (event) {
            und = event.target.innerHTML
            for(const key of itemcategory) {
                key.classList.remove("selected");
            }
                event.target.classList.toggle('selected');
    
        })
}

}

renderCategoryInPopup()



const filterAll = document.querySelector('.filter')
let taskCategory = null
// Выводим категории задач в боковом меню
renderCategory = () => {
    if(taskCategory) {
        taskCategory.remove()
    }
    taskCategory = document.createElement('ul');
    taskCategory.className = "taskCategory";
    filterAll.append(taskCategory)

    data.taskCategory.forEach(item => {
        let categoryListItem = document.createElement('li');
        categoryListItem.innerHTML = item;
        taskCategory.append(categoryListItem)
        categoryListItem.className = "filter__item";
    })

    const formCategoryAddInput = document.createElement('input');
    formCategoryAddInput.className = "taskCategory__input";
    formCategoryAddInput.placeholder = 'Введите название группы'
    taskCategory.append(formCategoryAddInput)
    const addCategoryButton = document.createElement('div');
    addCategoryButton.className = "taskCategory__button";
    taskCategory.append(addCategoryButton)
    const addCategoryButtonIcon = document.createElement('img');
    addCategoryButtonIcon.className = "addCategoryButtonIcon";
    addCategoryButtonIcon.src = 'https://img.icons8.com/ios/25/add--v1.png';
    addCategoryButton.append(addCategoryButtonIcon)
    const addCategoryButtonText = document.createElement('span');
    addCategoryButtonText.innerHTML = 'Добавить группу задачу';
    addCategoryButton.append(addCategoryButtonText)
    
    
    addCategoryButton.addEventListener('click', function() {
        console.log('здесь')
        console.log(formCategoryAddInput.value)
        data.taskCategory.push(formCategoryAddInput.value)
        renderCategory()
    })
}
renderCategory()



let filterItem = document.querySelectorAll('.filter__item')
filterItem = Array.from(filterItem)
let activeMenu = 'На сегодня'
filterItem[0].classList.toggle('active');



// Выводим сегодняшнюю дату
const today = new Date().toDateString().split(' ');
let newToday = [today[2], today[1], today[3], today[0]]
newToday[3] = `(${newToday[3]})`
newToday = newToday.join(" ")
const date = document.querySelector('.todaysDate')
date.innerHTML = newToday


// Находим элементы Popup, чтобы в дальнешем читать их value
const title = document.querySelector('#title')
const description = document.querySelector('#description')
const dateOfCompletion = document.querySelector('#date')
let itemcategory = document.querySelectorAll('.form-category__item')

// Функция для редактирования определенной задачи 
const edittask = (item) => {
    openModal('edit', item)
  }

// Функция для удаления определенной задачи 
const deletetask = (id) => {
    const newData = data.task.filter(item => item.id !== id);
    data.task = newData
  }

// Функция для смены статуса задачи (галочка перед задачей), а также меняем иконку пока не запустилась функция рендер
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


// Выводим задачи

let tasklist = null

let filteredData = []

let editElementID = null

renderTask = () => {

    console.log(data.task)

    if(tasklist) {
        tasklist.remove()
    }

    tasklist = document.createElement('ul');
    tasklist.className = "tasklist";
    main.append(tasklist)

    if(data.taskCategory.includes(activeMenu)) {
        filteredData  = data.task.filter(item => item.taskCategory === activeMenu)
    }
    else if(activeMenu === 'Все текущие') {
        filteredData  = data.task.filter(item => !item.completed)
    }
    else if(activeMenu === 'На сегодня') {
        filteredData  = data.task.filter(item => {
            const itemDate = new Date(item.dateOfCompletion).toDateString().split(' ')
            return itemDate[1] === today[1] && itemDate[2] === today[2] && itemDate[3] === today[3] 
            })
    }
    else if(activeMenu === 'Выполненные задачи') {
        filteredData  = data.task.filter(item => item.completed)
    }else {
        filteredData  = data.task
    }


    filteredData.forEach(item => {
        let tasklistItem = document.createElement('li');
        tasklistItem.className = "tasklist__item";
        tasklist.append(tasklistItem)
    
    
        let tasklistStatus = document.createElement('span');
        tasklistStatus.className = "tasklist__status";
        tasklistItem.append(tasklistStatus)
    
        const img = document.createElement('img');
        img.className = "imgCompleted";
        img.dataset.id = item.id
        console.log(item.completed)
        if(!item.completed) {
            img.src = 'https://img.icons8.com/ios/45/ok--v2.png';
        }
        else {
            img.src = 'https://img.icons8.com/ios/45/ok--v1.png';
        }
    
    tasklistStatus.append(img);

        img.addEventListener('click', () => changeStatusTask(item.id))
        img.addEventListener('click', () => setTimeout(renderTask, 1000))


    
        let tasklistDateOfCompletion = document.createElement('span');
        tasklistDateOfCompletion.className = "tasklist__dateOfCompletion";
        tasklistItem.append(tasklistDateOfCompletion)
        tasklistDateOfCompletion.innerHTML = item.dateOfCompletion.split('.').reverse().join('/')
        if(!item.dateOfCompletion) {
            tasklistDateOfCompletion.innerHTML = '---------'
        }

    
        let div = document.createElement('div');
        div.className = "tasklist__middle-wrapper";
        tasklistItem.append(div)
    
        let spanTitle = document.createElement('h3');
        spanTitle.innerHTML = item.title
        div.append(spanTitle)
    
        let spanDescription = document.createElement('p');
        spanDescription.innerHTML = item.description
        div.append(spanDescription)

        let tasklistIconWrapper = document.createElement('div');
        tasklistIconWrapper.className = "tasklist__icon-wrapper";
        tasklistItem.append(tasklistIconWrapper)

        let spantaskCategory = document.createElement('p');

        if(item.taskCategory) {
            spantaskCategory.innerHTML = item.taskCategory
            spantaskCategory.className = "spantaskCategory";
        }
        tasklistIconWrapper.append(spantaskCategory)

        let tasklistDateOfCreation = document.createElement('p');
        tasklistDateOfCreation.className = "tasklist__dateOfCreation";
        tasklistDateOfCreation.innerHTML = item.dateOfCreation.split('.').join('/')
        tasklistIconWrapper.append(tasklistDateOfCreation)

        let editTascIcon = document.createElement('img');
        editTascIcon.className = "editTascIcon";
        editTascIcon.src = 'https://img.icons8.com/officel/25/edit.png'
        tasklistItem.append(editTascIcon)
        editTascIcon.addEventListener('click', () => edittask(item))


          let deleteTascIcon = document.createElement('img');
          deleteTascIcon.className = "deleteTascIcon";
          deleteTascIcon.src = 'https://img.icons8.com/plasticine/30/filled-trash.png'
          tasklistItem.append(deleteTascIcon)

          deleteTascIcon.addEventListener('click', () =>  deletetask(item.id) )
          deleteTascIcon.addEventListener('click', renderTask )
    })

    console.log(data.task)
}

renderTask()



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
        renderTask()
    }
}

// Ловим клик по категориям сбоку и вызываем функцию обработчик 
filterAll.addEventListener('click', clickHandlerCategory)
// Ловим клик по категориям сбоку и вызываем функцию, которая рендерит список задач
filterAll.addEventListener('click', renderTask())



const btn  = document.querySelector('.add-task') 

const modal = document.querySelector('.modal')
const darken = document.querySelector('.darken')

btn.addEventListener('click', openModal, 'add')
darken.addEventListener('click', closeModal)



function openModal(type, item) {
    console.log(item)
    console.log(taskCategory)
    renderCategoryInPopup()
  darken.classList.add('darken-show')
  btn.classList.add('btn-hide')
  modal.classList.add('modal-show')
  const formTitle  = document.querySelector('.form__title')
  const formButton   = document.querySelector('.form__btn')
  if(type === 'add') {
    formTitle.innerHTML = 'Добавить задачу' 
    formButton.innerHTML = 'Добавить задачу' 
  }
  if(type === 'edit') {
    formTitle.innerHTML = 'Изменить задачу'
    formButton.innerHTML = 'Изменить задачу'

    title.value = item.title
    description.value = item.description
    dateOfCompletion.value = item.dateOfCompletion.split('.').join('-')
    editElementID = item.id
    const formcategory = document.querySelectorAll('.form-category__item')
    for(const key of formcategory) {
        console.log(key.innerHTML)
        console.log(item.taskCategory)
        if(key.innerHTML === item.taskCategory) {
            key.classList.add("selected");
        }
    }
  }
}


function closeModal() {
  darken.classList.remove('darken-show')
  btn.classList.remove('btn-hide')
  modal.classList.remove('modal-show')

  title.value = ''
  description.value = ''
  dateOfCompletion.value = ''
  editElementID = null
  if(group) {
      group.classList.remove("selected");
  }
}


// Функция для обработки при добавлении/изменении задачи
submitForm = (event) => {
    event.preventDefault()
    console.log(event.target.children[0].innerHTML)
    const titleForm = event.target.children[0].innerHTML
    const title = document.querySelector('#title').value
    const description = document.querySelector('#description').value
    const dateOfCompletion = document.querySelector('#date').value.split('-').join('.')
    let dateOfCreation = new Date()
    dateOfCreation = `${dateOfCreation.getFullYear()}.${dateOfCreation.getMonth()}.${dateOfCreation.getDate()}`
    const group = document.querySelector('.form-category__item.selected')
    let taskCategory = ''
    if(group && group.innerHTML !== 'Без категории') {
        taskCategory = group.innerHTML
    }

    const findIndex = data.task.findIndex(item => item.id === editElementID)

    const lastId = data.task[data.task.length-1].id

    const lok = {
        title,
        description,
        dateOfCreation,
        dateOfCompletion,
        taskCategory,
        completed: false
    }

    if(titleForm === 'Изменить задачу') {
        console.log('редактирую')
        data.task[findIndex] = {
            id: editElementID,
            ...lok}
    }
    else {
        console.log('добавляю')
        data.task.push({
            id: lastId+1, 
            ...lok,
        })
    }
}

const formTaskAdd = document.querySelector('.form')
formTaskAdd.addEventListener('submit', submitForm)
formTaskAdd.addEventListener('submit', closeModal)
formTaskAdd.addEventListener('submit', renderTask)
