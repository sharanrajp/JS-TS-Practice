const inputBox = document.getElementById("input-box");
const listContainer = document.getElementById("list-container");
const dateInput = document.getElementById("dateinput");

function addTask() {
  if (inputBox.value.trim() === '') {
    alert("Write something!");
    return;
  }
  if (dateInput.value === '') {
    alert("Select date and time!");
    return;
  }

const task = inputBox.value.trim();
const today = new Date();
today.setHours(0, 0, 0, 0); 

const date = new Date(dateInput.value); 
console.log(date, "date");

if (date < today) {
  alert("You cannot select a past date.");
  dateInput.value = ""; 
  return; 
}
  console.log("Valid date selected",);

  const formattedDate = date.toLocaleString();  // Format it for display
  
  const taskObj = {
    text: task,
    datetime: formattedDate,
    checked: false
  
}


  const taskList = JSON.parse(localStorage.getItem("taskList")) || [];
  console.log(taskList,"tasklists");

  taskList.push(taskObj);

  localStorage.setItem("taskList", JSON.stringify(taskList));

  inputBox.value = "";
  dateInput.value = "";

  showTasks();
}

// function showTasks() {
//   const taskList = JSON.parse(localStorage.getItem("taskList")) ? JSON.parse(localStorage.getItem("taskList")) :  [];
// //   listContainer.innerHTML = "";

//   taskList.forEach((taskObj, index) => {
//     let li = document.createElement("li");
//     li.innerHTML = `
//       ${taskObj.text} <br>
//       <span class="dateandtime">${taskObj.datetime}</span>
//       <span class="close">\u00d7</span>
//     `;

//     if (taskObj.checked) {
//       li.classList.add("checked");
//     }

//     Toggle checked status on clicking li but NOT the close button
//     li.addEventListener("click", (e) => {
//       if (e.target.classList.contains("close")) return;

//       taskList[index].checked = !taskList[index].checked;
//       localStorage.setItem("taskList", JSON.stringify(taskList));
//       showTasks();
//     });

//     Remove task on clicking close button
//     li.querySelector(".close").addEventListener("click", () => {
//       taskList.splice(index, 1);
//       localStorage.setItem("taskList", JSON.stringify(taskList));
//       showTasks();
//     });

//     listContainer.appendChild(li);
//   });
// }

listContainer.addEventListener("click", function(e){
    if (e.target.tagName === "LI"){
        e.target.classList.toggle("checked");
        saveData();
    }
    else if(e.target.tagName === "SPAN"){
        e.target.parentElement.remove();
        saveData();
    }
}, false);

function showTasks() {
  const taskList = JSON.parse(localStorage.getItem("taskList")) || [];
  
  listContainer.innerHTML = "";  // Clear existing tasks

  taskList.forEach((taskObj, index) => {
    let li = document.createElement("li");
    li.innerHTML = `
      ${taskObj.text} <br>
      <span class="dateandtime">${taskObj.datetime}</span>
      <span class="close">\u00d7</span>
    `;

    li.querySelector(".close").addEventListener("click", () => {
      taskList.splice(index, 1);                  
      localStorage.setItem("taskList", JSON.stringify(taskList));  
      showTasks();                               
    });

    listContainer.appendChild(li);
  });
}

window.addEventListener("load", showTasks);
