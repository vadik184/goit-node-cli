const fs = require("fs").promises;
const path = require("path");

const contactsPath = path.join(__dirname, "db", "contacts.json");

async function listContacts() {
  try {
    const data = await fs.readFile(contactsPath);
    return JSON.parse(data);
  } catch (error) {
    console.log("error");
  }
}

async function getContactById(contactId) {
  const contacts = await listContacts();
  const result = contacts.find((contact) => contact.id === contactId);
  return result || null;
}

async function removeContact(contactId) {
  try {
    const contacts = await listContacts();
    const contactIndex = contacts.findIndex(
      (contact) => contact.id === contactId
    );
    if (contactIndex === -1) {
      console.log("Sorry, we can not find this contact");
      return null;
    }
    const [result] = contacts.splice(contactIndex, 1);
    await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));
    console.log("Contact deleted successfully");
    return result;
  } catch (error) {
    console.error("Error when deleting contact", error.massage);
  }
}

async function addContact(name, email, phone) {
  try {
    const contacts = await listContacts();
    const { nanoid } = await import("nanoid");
    const newContacts = {
      id: nanoid(),
      name,
      email,
      phone,
    };
    const existingContact = contacts.find(
      (contacts) => contacts.id === newContacts.id
    );
    if (existingContact) {
      console.log("contact is already exist");
      return null;
    }
    contacts.push(newContacts);
    await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));
    console.log("Contact added successfully");
    return newContacts;
  } catch (error) {
    console.error("Error adding contact", error.massage);
  }
}

module.exports = {
  listContacts,
  getContactById,
  addContact,
  removeContact,
};
