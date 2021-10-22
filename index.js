const fs = require('fs/promises')
const chalk = require('chalk')
const { listContacts, getContactById, removeContact, addContact } = require('./contacts')

const { Command } = require('commander');
const program = new Command();
program
  .option('-a, --action <type>', 'choose action')
  .option('-i, --id <type>', 'user id')
  .option('-n, --name <type>', 'user name')
  .option('-e, --email <type>', 'user email')
  .option('-p, --phone <type>', 'user phone');

program.parse(process.argv);

const argv = program.opts();

const invokeAction = async ({ action, id, name, email, phone }) => {
    try {
        switch (action) {
          case 'list':
                  await listContacts();
            break;
      
            case 'get':
                await getContactById(id)
            break;
      
          case 'add':
                addContact(name, email, phone)
                break;
      
            case 'remove':
                removeContact(id)
            break;
      
          default:
            console.warn(chalk.red('Unknown action type!'));
        }
        
    } catch (error) {
        console.error(chalk.red(error))
        
    }
}

invokeAction(argv);

