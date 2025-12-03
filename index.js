const todoLists = document.getElementById("todoLists")
const addTaskBtn = document.getElementById("addTaskBtn")

// create and append task container
function createTaskContainer(){
    const task = document.createElement("div")
    task.classList.add("task")
    todoLists.append(task)
    // create task container's content
    let btns = document.createElement("div")
    btns.classList.add("btns")
    let mainContent = document.createElement("div")
    mainContent.classList.add("mainContent")

    // create mainContent's elements

    // inputs
    const readTitle = document.createElement("input")
    readTitle.placeholder = "Enter the title of the task here..."
    const readDescription = document.createElement("textarea")
    readDescription.placeholder = "Enter the Description of the task here..."
    // results
    const taskTitle = document.createElement("h3")
    const taskDescription = document.createElement("p")
    // append mainContent's input elements
    mainContent.append(readTitle, readDescription)

    // crete btns' elements
    const saveBtn = document.createElement("button")
    saveBtn.textContent = "Save task"
    saveBtn.id = "saveBtn"

    const deleteBtn = document.createElement("button")
    deleteBtn.textContent = "Delete task"
    deleteBtn.id = "deleteBtn"

    const editBtn = document.createElement("button")
    editBtn.textContent = "Edit task"
    editBtn.id = "editBtn"
    
    const updateBtn = document.createElement("button")
    updateBtn.textContent = "Update"
    updateBtn.id = "updateBtn"
    btns.append(saveBtn)

    // append task container's content
    task.append(mainContent, btns)

    return {updateBtn, editBtn, deleteBtn, saveBtn, taskDescription, taskTitle, readDescription, readTitle, btns, task}
}
function saveHandler(taskElements, taskNumber) {
    taskElements.saveBtn.remove()    
    taskElements.taskTitle.textContent = "Task #" + taskNumber + ": " + taskElements.readTitle.value
    taskElements.taskDescription.textContent = taskElements.readDescription.value

    taskElements.readTitle.replaceWith(taskElements.taskTitle)
    taskElements.readDescription.replaceWith(taskElements.taskDescription)

    taskElements.btns.append(taskElements.deleteBtn)
    taskElements.btns.append(taskElements.editBtn)
}
function deleteHandler(taskElements){
        taskElements.task.remove()
}
function editHandler(taskElements){
    taskElements.editBtn.remove()
    taskElements.btns.append(taskElements.updateBtn)
    taskElements.readTitle.value = taskElements.taskTitle.textContent
    taskElements.readDescription.value = taskElements.taskDescription.textContent
    taskElements.taskTitle.replaceWith(taskElements.readTitle)
    taskElements.taskDescription.replaceWith(taskElements.readDescription)
}
function updateHandler(taskElements){
    taskElements.updateBtn.remove()
    taskElements.btns.append(taskElements.editBtn)
    taskElements.taskTitle.textContent = taskElements.readTitle.value
    taskElements.taskDescription.textContent = taskElements.readDescription.value

    taskElements.readTitle.replaceWith(taskElements.taskTitle)
    taskElements.readDescription.replaceWith(taskElements.taskDescription)
}
addTaskBtn.onclick = function() {
    let taskNumber = document.querySelectorAll(".task").length + 1
    let taskElements = createTaskContainer()

    // saving...
    taskElements.saveBtn.addEventListener("click", () => saveHandler(taskElements, taskNumber))
    // delete task
    taskElements.deleteBtn.addEventListener("click", () => deleteHandler(taskElements))
    // edit task
    taskElements.editBtn.addEventListener("click", () => editHandler(taskElements))
    
    taskElements.updateBtn.addEventListener("click", () => updateHandler(taskElements))
}