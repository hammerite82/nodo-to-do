const yargs = require('./config/yargs').yargs;
const colors = require('colors');

const { insertTask, listTasks, updateTask, deleteTask } = require('./todo/todo');

let command = yargs._[0];

switch (command) {

    case 'add':
        {
            let task = {
                id: (Date.now() * 1000).toString(),
                description: yargs.description,
                completed: false
            };

            insertTask(task)
            .then(message => console.log(`Task has been added. Task ID: ${task.id}`))
            .catch(err => console.log(err));

            break;
        }

    case 'list':
        {
            listTasks()
            .then(tasks => {

                let taskList = tasks;

                console.log('===============TO-DO==============='.green);

                for (let task of taskList) {
                    console.log(`Task (${task.id}) "${task.description}" is ${(task.completed ? 'completed' : 'not completed')} `);
                }

                console.log('==================================='.green);

            })
            .catch(err => console.log(err));

            break;
        }

    case 'update':
        {
            updateTask(yargs.id, yargs.completed)
            .then(message => console.log(message))
            .catch(err => console.log(err.message));

            break;
        }

    case 'delete':
        {
            deleteTask(yargs.id)
            .then(message => console.log(message))
            .catch(err => console.log(err.message))

            break;
        }

    default:
        console.log('Invalid command.');

}