/**
 * @TODO get a reference to the Firebase Database object
 */

const db = firebase.database().ref();

/**
 * @TODO get const references to the following elements:
 *      - div with id #all-messages
 *      - input with id #username
 *      - input with id #message
 *      - button with id #send-btn and the updateDB
 *        function as an onclick event handler
 */

let allMessages = document.getElementById("all-messages");
let usrnameInput = document.getElementById("username");
let messageInput = document.getElementById("message");
let button = document.getElementById("send-btn");

button.onclick=updateDB;

/**
 * @TODO create a function called updateDB which takes
 * one parameter, the event, that:
 *      - gets the values of the input elements and stores
 *        the data in a temporary object with the keys USERNAME
 *        and MESSAGE
 *      - console.logs the object above
 *      - writes this object to the database
 *      - resets the value of #message input element
 */

function updateDB(event){
    event.preventDefault();
   let usrVal = usrnameInput.value;
   let messageVal = messageInput.value;

   usrnameInput.value = "";
   messageInput.value = "";

   let value ={
        name: usrVal,
        message: messageVal
   }
   db.push(value);


}
   /**
 * @TODO add the addMessageToBoard function as an event
 * handler for the "child_added" event on the database
 * object
 */

db.on("child_added", addMessage);

/**
 * @TODO create a function called addMessageToBoard that
 * takes one parameter rowData which:
 *      - console.logs the data within rowData
 *      - creates a new HTML element for a single message
 *        containing the appropriate data
 *      - appends this HTML to the div with id
 *        #all-messages (we should have a reference already!)
 * 
 */

function addMessage(rowData){
    let row = rowData.val();
    let name = row.name;
    let message = row.message;

    let div = document.createElement("div");
    let usrP = document.createElement("p");
    let messageP = document.createElement("p");

    usrP.innerHTML = name;
    messageP.innerHTML = message;
    
    usrP.className = "single-message-username"

    div.appendChild(usrP);
    div.appendChild(messageP);

    div.className ="single-message";

    allMessages.appendChild(div);

}


/** 
 * @TODO create a function called makeSingleMessageHTML which takes
 * two parameters, usernameTxt and messageTxt, that:
 *      - creates a parent div with the class .single-message
 * 
 *      - creates a p tag with the class .single-message-username
 *      - update the innerHTML of this p to be the username 
 *        provided in the parameter object
 *      - appends this p tag to the parent div
 * 
 *      - creates a p tag
 *      - updates the innerHTML of this p to be the message
 *        text provided in the parameter object
 *      - appends this p tag to the parent div
 * 
 *      - returns the parent div
 */

/**
 * @BONUS add an onkeyup event handler to the form HTML
 * element so the user can also submit the form with the
 * Enter key
 * 
 * @BONUS use an arrow function
 */