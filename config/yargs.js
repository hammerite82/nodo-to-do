const yargs = require('yargs')
    .command('add', 'Add a task', {
        description: {
            alias: 'd',
            demand: true
        }
    })
    .command('list', 'List tasks', {
        completed: {
            alias: 'c',
            default: true
        }
    })
    .command('update', 'Update a task', {
        id: {
            alias: 'i',
            demand: true
        },
        completed: {
            alias: 'c',
            default: true
        }
    })
    .command('delete', 'Delete a task', {
        id: {
            alias: 'i',
            demand: true
        }
    })
    .help()
    .argv;

module.exports = {
    yargs
}