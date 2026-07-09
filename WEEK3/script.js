import { GoogleGenAI } from "https://esm.run/@google/genai";

const API_KEY = "....";

const ai = new GoogleGenAI({
    apiKey: API_KEY
});

console.log(document.getElementById("generateBtn"));
document.getElementById("generateBtn").onclick = generatePlan;
async function generatePlan(){
    console.log("clicked");
    const goal = document.getElementById("goalInput").value;
    try{
        const response = await ai.models.generateContent({
        model: "gemini-2.5-flash-lite",
        contents: `Generate exactly 3 tasks for the following goal.

                Goal: ${goal}

                For each task include:
                - task_name
                - priority (High, Medium, or Low)
                - estimated_time

                Return ONLY valid JSON matching the provided schema.
                `, // This is where your prompt goes
        config: {
            responseMimeType: "application/json",

            responseSchema: {
                type: "OBJECT",
                properties: {
                    tasks: {
                        type: "ARRAY",
                        items: {
                            type: "OBJECT",
                            properties: {
                                task_name: { type: "STRING" },
                                priority: { type: "STRING" },
                                estimated_time: { type: "STRING" }
                            },
                            required: [
                            "task_name",
                            "priority",
                            "estimated_time"
                        ]
                        }
                    }
                }
            }
        }
        });
        console.log(goal);
        // Convert the structured JSON string into a live JavaScript Object
        const data = JSON.parse(response.text);
        console.log(data);
        console.log(data.tasks);

        // Now you can easily loop through the array or access indices natively!
        const output = document.getElementById("plannerOutput");

        output.innerHTML = "";

        data.tasks.forEach(task => {

            output.innerHTML += `
                <div class="task-card">
                    <h3>${task.task_name}</h3>
                    <p><strong>Priority:</strong> ${task.priority}</p>
                    <p><strong>Estimated Time:</strong> ${task.estimated_time}</p>
                </div>
            `;

        });
    }
    catch(error){
        console.error(error);
    }


}


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
