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

const updateContacts = async (data) => {
    const strData = JSON.stringify(data)
    await fs.writeFile(pathContacts, strData)
}

const listContacts = async() =>{
 return  await getAllContacts()
}

const getContactById = async (contactId) => {
    const allContacts = await getAllContacts()
    const contact = allContacts.find(item => item.id === Number(contactId))
    return contact
}

const removeContact = async(contactId) =>{
    const allContacts = await getAllContacts()
    //////// first way////////
    // const filtrContact = allContacts.filter(({ id }) => id !== Number(contactId))
    // if (allContacts.length === filtrContact.length) {
    //     console.log(chalk.red('Contact with this ID not found!'));
    //     return null
    // }
    // await updateContacts(filtrContact)
    // return filtrContact

    //////// second way////////
    const indexContact = allContacts.findIndex(item => item.id === Number(contactId))
    if (indexContact === -1) {
        console.log(chalk.red('Contact with this ID not found!'));
        return null
    }
    const removeContact = allContacts.splice(indexContact, 1)
    updateContacts(allContacts)
    return removeContact
}

const addContact = async (name, email, phone) => {
    const allContacts = await getAllContacts()
    const newContact = { id: crypto.randomUUID(), name, email, phone }
    allContacts.push(newContact)
    await updateContacts(allContacts)
    return newContact

}

module.exports = {listContacts, getContactById, removeContact, addContact};