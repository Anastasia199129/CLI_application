const fs = require('fs/promises')
const chalk = require('chalk')
const crypto = require('crypto')
const path = require('path')
const pathContacts = path.join(__dirname, "db/contacts.json")

const getAllContacts = async () => {
    const data = await fs.readFile(pathContacts, 'utf8')
    const contacts = JSON.parse(data)
    return contacts
}

const listContacts = async() =>{
 return  await getAllContacts()
}

const getContactById = async (contactId) => {
    const allContacts = await getAllContacts()
    const contact = allContacts.find(item => item.id === Number(contactId))
  
    if (!contact) {
        console.log(chalk.red('contact not found'))
        return null
    }
    console.log(chalk.blue('contact found'))
    console.log(contact);
    return contact
}

const removeContact = async(contactId) =>{
    const allContacts = await getAllContacts()
    const updatedContacts = allContacts.filter(({ id }) => id !== Number(contactId))
    console.log(updatedContacts)
    return updatedContacts
}

const addContact = async (name, email, phone) => {
    const allContacts = await getAllContacts()
    const newContact = { id: crypto.randomUUID(), name, email, phone }
    allContacts.push(newContact)
     const strNewContacts = JSON.stringify(allContacts)
     await fs.writeFile(pathContacts, strNewContacts)
    console.log(newContact);
    return newContact

}

module.exports = {listContacts, getContactById, removeContact,addContact};
