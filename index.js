let todoLists = document.getElementById("todoLists")
let addTaskBtn = document.getElementById("addTaskBtn")
let tasks = []
let forIdList = ["a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m", "n", "o", "p", "q", "r", "s", "t", "u", "v", "w", "x", "y", "z"]
function saveTasksToLocalStorage(){
    localStorage.setItem("savedTasks", JSON.stringify(tasks))
}
function loadTasksFromLocalStorage(){
    todoLists.innerHTML = ""
    if(localStorage.getItem("savedTasks") != null){
        tasks = JSON.parse(localStorage.getItem("savedTasks"))
        tasks.forEach((taskObject, taskObjectIndex) => {
            loadOnScreen(taskObject,taskObjectIndex)
        })
    }
}
function loadOnScreen(taskObject, taskObjectIndex){
    let task = document.createElement("div")
    task.classList.add("task")
    task.id = taskObject.identity

    let btns = document.createElement("div")
    btns.classList.add("btns")

    let mainContent = document.createElement("div")
    mainContent.classList.add("mainContent")

    let taskTitle = document.createElement("h3")
    taskTitle.textContent = `Task #${taskObjectIndex + 1}: ${taskObject.title}`
    let taskDescription = document.createElement("p")
    taskDescription.textContent = taskObject.description
    mainContent.append(taskTitle, taskDescription)

    // crete btns' elements
    let editBtn = document.createElement("button")
    editBtn.textContent = "Edit"
    editBtn.classList.add("editBtn")

    let deleteBtn = document.createElement("button")
    deleteBtn.textContent = "Delete"
    deleteBtn.classList.add("deleteBtn")

    let updateBtn = document.createElement("button")
    updateBtn.textContent = "Update"
    updateBtn.classList.add("updateBtn")
    
    updateBtn.addEventListener("click", () => updateHandler(task.id, editBtn))
    deleteBtn.addEventListener("click", () => deleteHandler(task.id))
    editBtn.addEventListener("click", () => editHandler(task.id, updateBtn))

    btns.append(deleteBtn, editBtn)

    task.append(mainContent, btns)
    todoLists.append(task)
}
function addTaskToTasksList(taskElements){
    let title = taskElements.readTitle.value
    let description = taskElements.readDescription.value
    let id = ""
    for(let i = 1; i < 8; i++){
        let index
        index = Math.floor(Math.random()*26)
        id += forIdList[index]
    }
    let task = {title: title, description: description, identity: id}
    tasks.push(task)
}
function loadAddedTask(){
    todoLists.lastChild.remove()
    let taskObjectIndex = tasks.length - 1
    let taskObject = tasks[taskObjectIndex]
    loadOnScreen(taskObject, taskObjectIndex)
}
function createTaskContainer(){
    let task = document.createElement("div")
    task.classList.add("task")
    todoLists.append(task)
    // create task container's content
    let btns = document.createElement("div")
    btns.classList.add("btns")
    let mainContent = document.createElement("div")
    mainContent.classList.add("mainContent")
    // create mainContent's elements
    // inputs
    let readTitle = document.createElement("input")
    readTitle.placeholder = "Enter the title of the task here..."
    let readDescription = document.createElement("textarea")
    readDescription.placeholder = "Enter the Description of the task here..."
    // results
    let taskTitle = document.createElement("h3")
    let taskDescription = document.createElement("p")
    // append mainContent's input elements
    mainContent.append(readTitle, readDescription)

    let saveBtn = document.createElement("button")
    saveBtn.textContent = "Save task"
    saveBtn.id = "saveBtn"
    btns.append(saveBtn)
    // append task container's content
    task.append(mainContent, btns)
    let taskElements = {saveBtn, taskDescription, taskTitle, readDescription, readTitle, btns, task}
    return taskElements
}
function saveHandler(taskElements){
    if(taskElements.readDescription.value !== "" && taskElements.readTitle.value !== ""){
        addTaskToTasksList(taskElements)
        saveTasksToLocalStorage()
        loadAddedTask()
    } else {
        window.alert("Empty title or description!")
    }
}
function deleteHandler(idToBeDeleted){
    document.getElementById(idToBeDeleted).remove()
    tasks.forEach((taskObject, taskIndex) => 
        {if(taskObject.identity === idToBeDeleted){
        tasks.splice(taskIndex, 1)
        }}
    )
    saveTasksToLocalStorage()
    loadTasksFromLocalStorage()
}
function editHandler(idToBeEdited, updateBtn){
    let taskToBeEdited = document.getElementById(idToBeEdited)

    taskToBeEdited.querySelector(".editBtn").replaceWith(updateBtn)

    let oldTitle = taskToBeEdited.querySelector("h3")
    let oldDescription = taskToBeEdited.querySelector("p")

    let splitTitle = oldTitle.textContent.split(": ")

    let readTitle = document.createElement("input")
    readTitle.value = splitTitle[1]
    let readDescription = document.createElement("textarea")
    readDescription.value = oldDescription.textContent

    oldTitle.replaceWith(readTitle)
    oldDescription.replaceWith(readDescription)
}
function updateHandler(idToBeUpdated, editBtn){
    let taskToBeUpdated = document.getElementById(idToBeUpdated)
    taskToBeUpdated.querySelector(".updateBtn").replaceWith(editBtn)
    let taskObjectIndex

    tasks.forEach((taskObject, index) => 
        {if(taskObject.identity === idToBeUpdated){
            taskObject.title = taskToBeUpdated.querySelector("input").value
            taskObject.description = taskToBeUpdated.querySelector("textarea").value
            taskObjectIndex = index
        }}
    )
    let taskTitle = document.createElement("h3")
    taskTitle.textContent = `Task #${taskObjectIndex + 1}: ${taskToBeUpdated.querySelector("input").value}`
    let taskDescription = document.createElement("p")
    taskDescription.textContent = taskToBeUpdated.querySelector("textarea").value

    taskToBeUpdated.querySelector("input").replaceWith(taskTitle)
    taskToBeUpdated.querySelector("textarea").replaceWith(taskDescription)
    
    saveTasksToLocalStorage()
}
addTaskBtn.onclick = function(){
    let taskElements = createTaskContainer()
    taskElements.saveBtn.addEventListener("click", () => saveHandler(taskElements))
}
loadTasksFromLocalStorage()