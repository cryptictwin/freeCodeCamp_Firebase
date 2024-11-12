// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getDatabase, ref, push, onValue, remove } from "firebase/database";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCeqWNXLLOTWBai10-jpoS10qszlX3NIec",
  authDomain: "freecodecamp-project-2f8ff.firebaseapp.com",
  databaseURL: "https://freecodecamp-project-2f8ff-default-rtdb.firebaseio.com",
  projectId: "freecodecamp-project-2f8ff",
  storageBucket: "freecodecamp-project-2f8ff.firebasestorage.app",
  messagingSenderId: "234818821570",
  appId: "1:234818821570:web:69dfd60a0ccc5825ea4a5b"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const database = getDatabase(app);
const shoppingListInDB = ref(database, "shoppingList");





const inputFieldEl = document.getElementById("input-field");
const addButtonEl = document.getElementById("add-button");
const shoppingListEl = document.getElementById("shopping-list");
const addItem = () => {
    let inputValue = inputFieldEl.value;
    if (inputValue !== "") {
        push(shoppingListInDB, inputValue);
        clearInputFieldEl();
    }
}
addButtonEl.addEventListener("click", addItem);

const addToCartOnEnter = (action) => {
    if (action.key === "Enter") {
        addButtonEl.click();
    }
};



inputFieldEl.addEventListener("keydown", addToCartOnEnter);

onValue(shoppingListInDB, function(snapshot) {
    if (snapshot.exists()) {
        let itemsArray = Object.entries(snapshot.val());
        clearItemShoppingListEl();
        for(let item of itemsArray) {
            let currentItem = item;
            let currentItemID = currentItem[0];
            let currentItemValue = currentItem[1];
            appendItemShoppingListEl(currentItem)
        }
    } else {
        // This block will run when there are no items left
        clearItemShoppingListEl();
        textNoItems();
    }
})

function textNoItems() {
    let noItemsText = document.createElement("p");
    noItemsText.textContent = "No items in shopping list";
    shoppingListEl.append(noItemsText);
}

function clearItemShoppingListEl() {
    shoppingListEl.innerHTML = "";
}

function clearInputFieldEl() {
    inputFieldEl.value = "";
}

function appendItemShoppingListEl(item) {
    let itemID = item[0]
    let itemValue = item[1]
    let newEl = document.createElement("li")
    newEl.textContent = itemValue
    newEl.addEventListener("dblclick", function () {
            let locationItemToRemove = ref(database, `shoppingList/${itemID}`)
            remove(locationItemToRemove)
    })
    shoppingListEl.append(newEl)
}

document.addEventListener('touchstart', function (event) {
    if (event.touches.length > 1) {
        event.preventDefault(); // Prevents pinch-to-zoom
    }
}, { passive: false });
