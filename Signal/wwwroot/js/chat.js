"use strict"



var connection = new signalR.HubConnectionBuilder().withUrl("/chatHub").build();

document.getElementById("sendButton").disable = true;

connection.on("ReceiveMessage", function (user, message) {
    var li = document.createElement("li");

    document.getElementById("messagesList").appendChild(li);

    li.textContent = `${user} says ${message}`;

});

connection.on("Connect", function (info) {

    var li = document.createElement("li");
    document.getElementById("messagesList").appendChild(li);
    li.innerHTML = `<span style='color:#00bfff;' > ${info}</span>`;

});


connection.on("DisConnect", function (info) {

    var li = document.createElement("li");
    document.getElementById("messagesList").appendChild(li);
    li.innerHTML = `<span style='color:red;' > ${info}</span>`;

});



connection.start().then(function () {
    document.getElementById("sendButton").disabled = false;
}).catch(function (err) {
    return console.error(err.toString());
});


document.getElementById("sendButton").addEventListener("click", function (event) {
    var user = document.getElementById("userInput").value;
    var message = document.getElementById("messageInput").value;

    connection.invoke("SendMessage", user, message)
        .catch(function (err) {
            return console.error(err.toString());
        });

    event.preventDefault();
});