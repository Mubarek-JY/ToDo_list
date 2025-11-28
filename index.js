const todoLists = document.getElementById("todoLists")
const addTaskBtn = document.getElementById("addTaskBtn")
let taskNumber = 0

addTaskBtn.onclick = function() {
    taskNumber++

    // create and append task container
    const task = document.createElement("div")
    task.classList.add("task")
    todoLists.append(task)

    // create task content
    const taskTitle = document.createElement("h3")
    const taskDescription = document.createElement("p")
    const saveBtn = document.createElement("button")
    saveBtn.textContent = "Save task"
    const deleteBtn = document.createElement("button")
    deleteBtn.textContent = "Delete task"
    const editBtn = document.createElement("button")
    editBtn.textContent = "Edit task"

    // read the title and the description
    const readTitle = document.createElement("input")
    readTitle.placeholder = "Enter the title of the task..."
    const readDescription = document.createElement("textarea")
    readDescription.placeholder = "Enter the Description of the task..."

    task.append(readTitle)
    task.append(readDescription)
    task.append(saveBtn)

    // saving...
    saveBtn.onclick = function() {
        saveBtn.remove()
        taskTitle.textContent = "Task #" + taskNumber + ": " + readTitle.value
        taskDescription.textContent = readDescription.value

        readTitle.replaceWith(taskTitle)
        readDescription.replaceWith(taskDescription)

        task.append(deleteBtn)
        task.append(editBtn)

       // edit button will be added here
    }
    
    
    // delete task
    deleteBtn.onclick = function() {
        deleteBtn.parentElement.remove()
    }
    // edit task
    editBtn.onclick = function() {
        editBtn.remove()
        task.append(saveBtn)
        taskTitle.replaceWith(readTitle)
        taskDescription.replaceWith(readDescription)
    }
}