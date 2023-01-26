console.log("Loading localDB");
var toDos = new LDB.Collection("ToDos");
function CreateToDo(name, filler) {
    var todo = {
        name: name,
        filler: filler,
        done: false,
        id: GetLastId() + 1
    }
    toDos.save(todo, function (_items) {

    });
}

function GetLastId() {
    if (toDos.items.length == 0) {
        return 0;
    }
    return toDos.items[toDos.items.length - 1].id;
}

function PurgeDatabase() {
    toDos.drop();
}


function DeleteToDo(lookUpId) {
    toDos.find({ id: lookUpId }, function (items) {
        for (var i in items) {
            items[i].delete();
        }
    });
}


