const utils = require("./utils");
// tasks = [{ID: 0, name: "meow", profile: "done"}, {ID: 1, name: "woof", profile: "in progress"}];

function _add(taskName) {
    try {
        tasks = utils.readJSON();
        tasks.push({
            ID: tasks.length,
            name: taskName,
            profile: "not done"
        });
        utils.writeJSON(tasks);
        console.log(`Task ${taskName} added successfully!`);
    }
    catch (a) {
        console.log(`There was an error while adding ${taskName}!\n${a.message}`);
    }
}

function _list(mode) {
    try {
        if (!["done", "in progress", "not done", ""].includes(mode)) {
            console.log("invalid mode!");
            return;
        }
        tasks = utils.readJSON();
        if (mode) tasks.filter(el => el.profile === mode).forEach(task => utils.prettyPrint(task));
        else tasks.forEach(task => utils.prettyPrint(task));
    }
    catch (a) {
        console.log(`There was an error while listing the tasks!\n${a.message}`);
    }
    
}

function _update(taskId, newProfile) {
    try {
        tasks = utils.readJSON();
        let found = false;
        for (let i = 0; i < tasks.length; i++) {
            if (tasks[i].ID == Number(taskId)) {
                tasks[i].profile = newProfile;
                console.log(`Task ${taskId} updated successfully!`);
                found = true;
                break;
            }
        }
        if (!found) console.log(`Error 404, Task ${taskId} not found!`);
        utils.writeJSON(tasks);
    } 
    catch (a) {
        console.log(`There was an error while updating the ${taskId} task!\n${a.message}`);
    }
}

function _delete(taskId) {
    try {
        tasks = utils.readJSON();
        let found = false;
        for (let i = 0; i < tasks.length; i++) {
            if (tasks[i].ID == Number(taskId)) {
                tasks.splice(i, 1);
                console.log(`Task ${taskId} deleted successfully!`);
                found = true;
                break;
            }
        }
        if (!found) console.log(`Error 404, Task ${taskId} not found!`);
        utils.writeJSON(tasks);
    }
    catch (a) {
        console.log(`There was an error while deleting ${taskId} task!\n${a.message}`);
    }
}

function handleCommand() {
    const args = process.argv.slice(2);
    const command = args[0];
    if (command === "add") _add(args.slice(1, args.length).join(" "));
    else if (command === "list") _list(args.slice(1, args.length).join(" "));
    else if (command === "update") _update(args[1], args.slice(2, args.length).join(" "));
    else if (command === "delete") _delete(args[1]);
    else console.log("Invalid command!");
}

// add("new")
// add("another")
// console.log(tasks);

// list()
// console.log(tasks);

handleCommand();
