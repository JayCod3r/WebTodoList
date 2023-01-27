console.log("Loading localDB");
var toDos = new LDB.Collection("ToDos");

//Adds Todo object to local database
function CreateToDo(name, filler) {

    var todo = {
        name: name = document.getElementById('InputTodo').value,
        filler: filler = document.getElementById('todoDescription').value,
        done: false,
        id: GetLastId() + 1
    }


    toDos.save(todo, function (_items) {

    });
    DisplayCards();
}
function DebugCreateToDo(name, filler) {

    var todo = {
        name: name,
        filler: filler,
        done: false,
        id: GetLastId() + 1
    }


    toDos.save(todo, function (_items) {

    });
    DisplayCards();
}
//Helper function. Gets id of last todo item
function GetLastId() {
    if (toDos.items.length == 0) {
        return 0;
    }
    return toDos.items[toDos.items.length - 1].id;
}
//Drops all records from Todos
function PurgeDatabase() {
    toDos.drop();
}
//Edits todo @ Id
function EditToDo(lookUpId, name, filler) {
    toDos.find({ id: lookUpId }, function (results) {
        if (results[0]) {
            results[0].name = name;
            results[0].filler = filler;
            results[0].save();
        }
    });
}
//Returns array of all todo items in database. For you jacobius!
function GetAllToDos() {
    return toDos.items;
}
//Toggles todo done state @ Id
function ToggleDone(lookUpId) {
    toDos.find({ id: lookUpId }, function (results) {
        if (results[0]) {
            results[0].done = !results[0].done;
            results[0].save();
        }
    });
    toDos.find({ id: lookUpId }, function (results) {
        if (results[0]) {
            results[0].done = results[0].done;
            results[0].save();
        }
    });
    DisplayCards();
}
//Drops record @ Id
function DeleteToDo(lookUpId) {
    toDos.find({ id: lookUpId }, function (items) {
        for (var i in items) {
            items[i].delete();
        }
    });
    toDos.find({ id: lookUpId }, function (items) {
        for (var i in items) {
            items[i].delete();
        }
    });
    DisplayCards();
}
//Debug function to prepopulate database
function DebugPrepopulate() {
    PurgeDatabase();
    DebugCreateToDo("Wash T-Shirt", "Get all shirts and wash");
    DebugCreateToDo("Gather lumber", "chop down trees and place lumber in mill area");
    DebugCreateToDo("Jump Start Car", "Steal battery from sam and jump leads from jaqi. Then jump start car");
    DebugCreateToDo("Water garden", "Get pale and water the garden");
    DebugCreateToDo("Add ham to broth", "Place handful of ham to broth");
    DisplayCards();
}
//Clears all cards from html
function ClearCards() {
    document.getElementById("toDoHolder").innerHTML = "";
}
//Injects html code to display all toDos in localDB
function DisplayCards() {
    ClearCards();
    let listings = GetAllToDos();
    for (let i = 0; i < listings.length; i++) {
        DisplayCard(listings[i].name, listings[i].filler, listings[i].id, listings[i].done);
    }
}



function DisplayCard(name, filler, id, done) {

    document.getElementById("toDoHolder").innerHTML = document.getElementById("toDoHolder").innerHTML + '\n<!-- CardStart -->\n<div class="">\n<div class="col-sm">\n<div class="card" style="width: 18rem;">\n<img class="card-img-top" src="https://i.imgur.com/RXIshnn.jpeg" alt="Card image cap">\n<div class="card-body">\n<div class="row">\n<h5 class="card-title">' + name + '</h5>\n<h5 class="" id="' + id + '"></h5>\n</div>\n\n<p class="card-text">' + filler + '</p>\n<button onclick="ToggleDone(' + id + ')">' + ((done == true) ? ' Done' : ' Not Done') + '</button>\n<button onclick = "DeleteToDo(' + id + ')">Delete</button>\n</div>\n</div>\n</div>\n<!-- CardEnd -->';

}


