const taskLists = document.querySelectorAll('.task-list')
const backlogTasks = document.querySelector('#backlog .task-list')

let tasks = [
    {
        id: 0,
        title: "Fix submit button",
        description: "The submit button stop working, since the last release."
    },
    {
        id : 1,
        title : "Change text in C and T's",
        description : "Needs to be updating as per the i m p o r t a n t buisness meeting."
    },
    {
        id : 2,
        title : "Change banner picture",
        description : "Marketing has requested a new banner to be added for the website."
    },
]

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
    
    taskDescriptionContainer.append(taskDescription)
    taskHeader.append(taskTitle, deleteIcon)
    taskCard.append(taskHeader, taskDescriptionContainer)
    backlogTasks.append(taskCard)
}

function addTasks() {
    tasks.forEach( task => createTask(task.id, task.title, task.description))
}

addTasks()