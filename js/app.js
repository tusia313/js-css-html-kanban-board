const taskLists = document.querySelectorAll('.task-list')
const backlogTasks = document.querySelector('#backlog .task-list')

let tasks = [
    {
        id : 0,
        title : "Fix submit button",
        description : "The submit button stop working, since the last release."
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

function createTask() {
    const taskCard = document.createElement('div')
    taskCard.classList.add('task-container')
}