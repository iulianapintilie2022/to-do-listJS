const toDosArray = [];
const toDoList = document.getElementById("task-list");
function createToDoElement(inputValue) {
    let listElement = document.createElement("li");
    listElement.className = "list-element";
    document.getElementById("task-list").appendChild(listElement);

    const checkBox = document.createElement('input');
    checkBox.setAttribute('type', 'checkbox');
    checkBox.className = "checkbox";
    listElement.appendChild(checkBox);

    const toDoSpan = document.createElement("span");
    toDoSpan.className = "task";
    listElement.appendChild(toDoSpan);

    let toDoText = document.createTextNode(inputValue);
    toDoSpan.appendChild(toDoText);

    const deleteButton = document.createElement('button');
    deleteButton.textContent = 'Delete';
    deleteButton.className = "delete-btn"
    listElement.appendChild(deleteButton);
}
function submitInput() {
    const inputValue = document.getElementById("input-task").value.trim();

    if (inputValue === ""){
        alert("You must write something!");
    } else {
        toDosArray.push(inputValue);
        saveToDosArray();
        createToDoElement(inputValue);
    }
    document.getElementById("input-task").value = "";

}

function saveToDosArray() {
    localStorage.setItem("toDos",JSON.stringify(toDosArray));
}

function getSavedToDos(){
    let savedToDos = JSON.parse(localStorage.getItem("toDos")) || [];
    for (let i = 0; i < savedToDos.length; i++){
        toDosArray.push(savedToDos[i]);
        createToDoElement(toDosArray[i]);
    }
    console.log("here is the array when you get the data from local", toDosArray);
}
getSavedToDos();


toDoList.addEventListener("click", function (e){
    if (e.target.tagName === "INPUT"){
        console.log(toDosArray);
        e.target.nextElementSibling.classList.toggle("checked");
       for (let i = 0; i <= toDosArray.length; i++){
           console.log("chrissy pissy in for loop");
           if(e.target.nextElementSibling.innerText == toDosArray[i]){
               toDosArray.splice(i, 1);
               localStorage.setItem("toDos", JSON.stringify(toDosArray));
               break;
           } else {
               console.log("didnt make it in if");
           }
       }
    } else if(e.target.tagName === "BUTTON"){
        for (let i = 0; i < toDosArray.length; i++){
            if (e.target.previousSibling.innerText == toDosArray[i]){
                e.target.closest("LI").remove();
                toDosArray.splice(i, 1);
                localStorage.setItem("toDos", JSON.stringify(toDosArray));
                break;
            } else{
                e.target.closest("LI").remove();
            }
        }
    }
}, false);

