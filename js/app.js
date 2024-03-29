const taskLists = document.querySelectorAll('.task-list')
const backlogTasks = document.querySelector('#backlog .task-list')
const titleInput = document.querySelector('#title')
const descriptionInput = document.querySelector('#description')
const submitButton = document.querySelector('#submit-button')
const errorContainer = document.querySelector('.error-container')

let tasks = [
    // {
    //     id: 0,
    //     title: "Fix submit button",
    //     description: "The submit button stop working, since the last release."
    // },
    // {
    //     id: 1,
    //     title: "Change text in C and T's",
    //     description: "Needs to be updating as per the i m p o r t a n t buisness meeting."
    // },
    // {
    //     id: 2,
    //     title: "Change banner picture",
    //     description: "Marketing has requested a new banner to be added for the website."
    // },
]

taskLists.forEach((taskList) => {
    taskList.addEventListener('dragover', dragOver)
    taskList.addEventListener('drop', dragDrop)
})

function createTask(taskId, title, description) {
    const taskCard = document.createElement('div')
    const taskHeader = document.createElement('div')
    const deleteIcon = document.createElement('p')
    const taskTitle = document.createElement('p')
    const taskDescriptionContainer = document.createElement('div')
    const taskDescription = document.createElement('p')

    taskHeader.classList.add('task-header')
    taskDescriptionContainer.classList.add('task-description-container')
    taskCard.classList.add('task-container')

    taskTitle.textContent = title
    taskDescription.textContent = description
    deleteIcon.textContent = '☓'

    taskCard.setAttribute('draggable', true)
    taskCard.setAttribute('task-id', taskId)

    taskCard.addEventListener('dragstart', dragStart)
    deleteIcon.addEventListener('click', deleteTask)

    taskDescriptionContainer.append(taskDescription)
    taskHeader.append(taskTitle, deleteIcon)
    taskCard.append(taskHeader, taskDescriptionContainer)
    backlogTasks.append(taskCard)
}

function addTasks() {
    tasks.forEach((task) => createTask(task.id, task.title, task.description))
}

function addColor(column) {
    let color
    switch (column) {
        case 'backlog':
            color = 'rgb(255, 180, 184)'
            break
        case 'doing':
            color = 'rgb(255, 165, 0)'
            break
        case 'done':
            color = 'rgb(50, 222, 132)'
            break
        case 'discard':
            color = 'rgb(192,192,192)'
        default:
            color = 'rgb(232, 232, 232)'
    }
    return color
}

function showError(message) {
    const errorMessage = document.createElement('p')
    errorMessage.textContent = message
    errorContainer.append(errorMessage)
    setTimeout(() => {
        errorContainer.textContent = ''
    }, 2000)
}

addTasks()

let elementBeingDragged

function dragStart() {
    elementBeingDragged = this
}

function dragOver(e) {
    e.preventDefault()
}

function dragDrop() {
    let columnId = this.parentNode.id
    elementBeingDragged.firstChild.style.backgroundColor = addColor(columnId)
    this.append(elementBeingDragged)
}

function addTask(e) {
    e.preventDefault()
    const filteredTitles = tasks.filter(task => {
        return task.title === titleInput.value
    })

    console.log(filteredTitles)

    if (!filteredTitles.length) {
        const newId = tasks.length
        tasks.push({
            id: newId,
            title: titleInput.value,
            description: descriptionInput.value
        })
        createTask(newId.value, titleInput.value, descriptionInput.value)
        titleInput.value = ''
        descriptionInput.value = ''
    } else {
        console.log('error')
        showError('The title must be unique !')
    }
}

submitButton.addEventListener('click', addTask)

function deleteTask() {
    const headerTitle = this.parentNode.firstChild.textContent
    // teraz wybieramy jedno zadanie thx to filter
    const filterTask = tasks.filter(task => {
        return headerTitle === task.title
    })
    // [0] to dlatego, żeby wyświelić pierwsze zadanie w zadaiu - co jak sama widzisz oznacza, że zawsze jest jego ( możesz to zobaczyc dając console.log(filterTask))
    const newTask = tasks.filter(task => {
        return task !== filterTask[0]
    })
    // nadpisanie istenijących zadań, jak tego nie zrobimy to zobaczysz w konsoli - zadania "tasks" będą niezmienne 
    tasks = newTask
    this.parentNode.parentNode.remove()
}


