const fs = require("fs");
const path = require("path");

if (!fs.existsSync(path.join(__dirname, './data.json'))) {
    fs.writeFileSync(path.join(__dirname, './data.json'), JSON.stringify([], null, 2));
}

exports.readJSON = () => JSON.parse(fs.readFileSync(path.join(__dirname, './data.json')));

exports.writeJSON = (tasks) => {
    fs.writeFileSync(path.join(__dirname, './data.json'), JSON.stringify(tasks, null, 2));
};

exports.prettyPrint = el => {
    const coloring = 
    el.profile === "not done" ? "\x1b[31m%s\x1b[0m" :
    el.profile === "in progress" ? "\x1b[33m%s\x1b[0m" : "\x1b[32m%s\x1b[0m";
    console.log(`${el.ID}: ${el.name} - ${coloring}`, el.profile);
};