const todoLists = document.getElementById("todoLists")
const addTaskBtn = document.getElementById("addTaskBtn")
let taskNumber = 0

addTaskBtn.onclick = function() {
    taskNumber++

    // create and append task container
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

    // saving...
    saveBtn.onclick = function() {
        saveBtn.remove()
        taskTitle.textContent = "Task #" + taskNumber + ": " + readTitle.value
        taskDescription.textContent = readDescription.value

        readTitle.replaceWith(taskTitle)
        readDescription.replaceWith(taskDescription)

        btns.append(deleteBtn)
        btns.append(editBtn)
    }
    
    // delete task
    deleteBtn.onclick = function() {
        let parent = deleteBtn.parentElement
        parent.parentElement.remove()
    }
    // edit task
    editBtn.onclick = function() {
        editBtn.remove()
        btns.append(updateBtn)
        readTitle.value = taskTitle.textContent
        readDescription.value = taskDescription.textContent
        taskTitle.replaceWith(readTitle)
        taskDescription.replaceWith(readDescription)
    }
    updateBtn.onclick = function() {
        updateBtn.remove()
        btns.append(editBtn)
        taskTitle.textContent = readTitle.value
        taskDescription.textContent = readDescription.value

        readTitle.replaceWith(taskTitle)
        readDescription.replaceWith(taskDescription)
    }
}