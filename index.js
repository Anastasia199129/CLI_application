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
            const contacts = await listContacts();
            console.table(contacts);
            break;
      
          case 'get':
            const contactById = await getContactById(id)
              if (!contactById) {
                  console.log(chalk.red('contact not found:'))
                  return null
               }
                  console.log(chalk.blue('contact found!'))
                  console.log(contactById);
            break;
      
          case 'add':
            const contact = await addContact(name, email, phone)
            console.log(chalk.blue('Add new contact'));
            console.log(contact);
            break;
      
          case 'remove':
            const updatedContacts = await removeContact(id)
            console.table(updatedContacts)
            break;
      
          default:
            console.warn(chalk.red('Unknown action type!'));
        }
        
    } catch (error) {
        console.error(chalk.red(error))
        
    }
}

invokeAction(argv);


