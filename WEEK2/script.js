const button = document.getElementById("btn");
let tasks = JSON.parse(localStorage.getItem("tasks")) || [];

const taskInput = document.getElementById("taskInput");

taskInput.addEventListener("keydown", function(event){

    if(event.key === "Enter"){

        event.preventDefault();

        button.click();
    }
});

tasks.forEach(function(task){

    const li = document.createElement("li");
    const deleteBtn = document.createElement("button");
    const checkBox = document.createElement("input");

    checkBox.type = "checkbox";
    deleteBtn.textContent = "Delete";
    deleteBtn.classList.add("delete-btn");

    deleteBtn.onclick = function(){
        li.remove();

        tasks = tasks.filter(t => t !== task);

        localStorage.setItem("tasks", JSON.stringify(tasks));
    };

    checkBox.onchange = function(){
        li.classList.toggle("completed");
    };

    li.textContent = task;
    li.prepend(checkBox);
    li.appendChild(deleteBtn);

    document.getElementById("taskList").appendChild(li);
});

button.onclick = function() {
    const task = document.getElementById("taskInput").value; 

    if(task==""){
        message.textContent = "Please enter a task!";
        message.style.color = "red";
        setTimeout(function(){
            message.textContent = "";
        }, 2000);
        return;
    }
    tasks.push(task);
    localStorage.setItem("tasks", JSON.stringify(tasks));
    const li = document.createElement("li");
    const deleteBtn = document.createElement("button");
    const checkBox = document.createElement("input");

    checkBox.type = "checkbox";
    deleteBtn.textContent = "Delete";
    deleteBtn.classList.add("delete-btn");

    deleteBtn.onclick = function(){
        li.remove();
        tasks = tasks.filter(t => t !== task);
        localStorage.setItem("tasks", JSON.stringify(tasks));
    };

    checkBox.onchange = function() {
    li.classList.toggle("completed");
    };

    li.textContent = task;
    li.prepend(checkBox);
    li.appendChild(deleteBtn);
    
    message.textContent = "Task added successfully!";
    message.style.color = "green";
    setTimeout(function(){
        message.textContent = "";
    }, 2000);
    document.getElementById("taskList").appendChild(li);

    document.getElementById("taskInput").value = "";
}
