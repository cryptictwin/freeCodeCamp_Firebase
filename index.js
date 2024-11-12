const inputFieldEl = document.getElementById("input-field");
const addButtonEl = document.getElementById("add-button");




const prntToConsole = () => {
    let inputValue = inputFieldEl.value;
    console.log(inputValue);
}
addButtonEl.addEventListener("click", prntToConsole);