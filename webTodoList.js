console.log("Loading localDB");
var toDos = new LDB.Collection("ToDos");
//Adds Todo object to local database
function CreateToDo(name, filler) {
    var todo = {
        name: name,
        filler: filler,
        done: false,
        id: GetLastId() + 1
    }
    toDos.save(todo, function (_items) {
        console.log("ToDo Added @ id :" + _items[0].id);
    });
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
}
//Drops record @ Id
function DeleteToDo(lookUpId) {
    toDos.find({ id: lookUpId }, function (items) {
        for (var i in items) {
            items[i].delete();
        }
    });
}


