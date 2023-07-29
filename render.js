
// Выводим категории задач в боковом меню
renderCategory = () => {
    
    let taskCategory = document.querySelector('.taskCategory');

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
    formCategoryAddInput.placeholder = 'Введите название новой группы'
    taskCategory.append(formCategoryAddInput)
    const addCategoryButton = document.createElement('div');
    addCategoryButton.className = "taskCategory__button";
    taskCategory.append(addCategoryButton)
    const addCategoryButtonIcon = document.createElement('img');
    addCategoryButtonIcon.className = "addCategoryButtonIcon";
    addCategoryButtonIcon.src = 'https://img.icons8.com/ios/25/add--v1.png';
    addCategoryButton.append(addCategoryButtonIcon)
    const addCategoryButtonText = document.createElement('span');
    addCategoryButtonText.innerHTML = 'Добавить группу задач';
    addCategoryButton.append(addCategoryButtonText)
    
    
    addCategoryButton.addEventListener('click', function() {
        if(formCategoryAddInput.value) {
            console.log(formCategoryAddInput.value)
            data.taskCategory.push(formCategoryAddInput.value)
            renderCategory()
            // setTimeout
        }
        else {
            formCategoryAddInput.className = "taskCategory__input input-error"
            setTimeout( () => {
                formCategoryAddInput.focus()
                formCategoryAddInput.className = "taskCategory__input input-focus"
            }, 1000)
        }

    })

    formCategoryAddInput.addEventListener('focus', function() {
        formCategoryAddInput.className = "taskCategory__input input-focus"
    })

    formCategoryAddInput.addEventListener('blur', function() {
        if(!formCategoryAddInput.value) {
        formCategoryAddInput.className = "taskCategory__input input-error"
        setTimeout( () => {
            formCategoryAddInput.className = "taskCategory__input"
        }, 2000)
        }
    })

}


// Выводим список задач в зависимости от выбранной категории
renderTask = () => {
    let tasklist = document.querySelector('.tasklist');
    let filteredData = []
    if(tasklist) {
        tasklist.remove()
    }

    // let filteredData = data.task

    tasklist = document.createElement('ul');
    tasklist.className = "tasklist";
    main.append(tasklist)

    if(data.taskCategory.includes(activeMenu)) {
        filteredData  = data.task.filter(item => item.taskCategory === activeMenu).sort((a, b) => a.dateOfCompletion < b.dateOfCompletion ? 1 : -1).sort((a, b) => a.completed > b.completed ? 1 : -1);
        // function sortfunction(a, b){
        //     return a — b
        //     }

    }
    else if(activeMenu === 'Все текущие') {
        filteredData  = data.task.filter(item => !item.completed).sort((a, b) => a.dateOfCompletion > b.dateOfCompletion ? 1 : -1)
    }
    else if(activeMenu === 'На сегодня') {
        filteredData  = data.task.filter(item => {
            const itemDate = new Date(item.dateOfCompletion).toDateString().split(' ')
            return itemDate[1] === today[1] && itemDate[2] === today[2] && itemDate[3] === today[3] 
            }).sort((a, b) => a.completed > b.completed ? 1 : -1)
    }
    else if(activeMenu === 'Выполненные задачи') {
        filteredData  = data.task.filter(item => item.completed).sort((a, b) => a.dateOfCompletion > b.dateOfCompletion ? 1 : -1)
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

        if(!item.completed) {
            img.src = 'https://img.icons8.com/ios/45/ok--v2.png';
        }
        else {
            img.src = 'https://img.icons8.com/ios/45/ok--v1.png';
        }

        tasklistStatus.append(img);

        // При нажатии на иконку запускаем функцию смены статуса задачи (смены иконки)
        img.addEventListener('click', () => changeStatusTask(item.id))
        // Рендер производим через некоторое время, чтобы иконка успела смениться
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
        tasklistDateOfCreation.innerHTML = item.dateOfCreation.split('.').reverse().join('/')
        tasklistIconWrapper.append(tasklistDateOfCreation)

        let editTascIcon = document.createElement('img');
        editTascIcon.className = "editTascIcon";
        editTascIcon.src = 'https://img.icons8.com/officel/25/edit.png'
        tasklistItem.append(editTascIcon)
        editTascIcon.addEventListener('click', openModal)
        editTascIcon.addEventListener('click', () => editTask(item))

        let deleteTascIcon = document.createElement('img');
        deleteTascIcon.className = "deleteTascIcon";
        deleteTascIcon.src = 'https://img.icons8.com/plasticine/30/filled-trash.png'
        tasklistItem.append(deleteTascIcon)

        deleteTascIcon.addEventListener('click', () =>  deletetask(item.id) )
        deleteTascIcon.addEventListener('click', renderTask )
    })
}


// Выводим название категорий в попапе
renderCategoryInPopup = () => {
    let category=  document.querySelector('.form-category__wrapper');
    
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