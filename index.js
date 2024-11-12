import { initializeApp } from "https";


const appSettings = {
    databaseURL: "https://freecodecamp-project-2f8ff-default-rtdb.firebaseio.com/"
}



const inputFieldEl = document.getElementById("input-field");
const addButtonEl = document.getElementById("add-button");




const prntToConsole = () => {
    let inputValue = inputFieldEl.value;
    console.log(inputValue);
}
addButtonEl.addEventListener("click", prntToConsole);