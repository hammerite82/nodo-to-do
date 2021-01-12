const fs = require('fs');

let tasks = [];

let loadData = () => {

    try {
        tasks = require('../data/data.json');
    } catch (error) {
        tasks = [];
    }

}

let writeData = () => {

    return new Promise((resolve, reject) => {
        let data = JSON.stringify(tasks);

        fs.writeFile('./data/data.json', data, (err) => {

            if (err)
                reject(err);
            else
                resolve();
        });
    });

}

let insertTask = (task) => {

    return new Promise((resolve, reject) => {

        loadData();

        tasks.push(task);

        let data = JSON.stringify(tasks);

        writeData();

    });

}

let listTasks = (isCompleted = false) => {

    return new Promise((resolve, reject) => {

        loadData();

        if (tasks.length > 0)
            resolve(tasks);
        else
            reject('No pending tasks');

    });

}

let updateTask = async(id, completed = true) => {

    loadData();

    let index = tasks.findIndex(task => {
        return task.id === id.toString();
    });

    if (index < 0) {
        throw new Error(`Could not find task ID ${id}.`);
    } else {

        let task = tasks[index];
        task.completed = completed;

        await writeData();

        return `Task (${task.id}) "${task.description} has been updated."`;
    }
}

let deleteTask = async(id) => {

    loadData();

    let index = tasks.findIndex(task => {
        return task.id === id.toString();
    });

    if (index < 0) {
        throw new Error(`Could not find task ID ${id}.`);
    } else {

        tasks = tasks.filter(task => {
            return task.id != id;
        });

        await writeData();

        return `Task (${id}) has been deleted."`;
    }


}

module.exports = {
    insertTask,
    listTasks,
    updateTask,
    deleteTask
}