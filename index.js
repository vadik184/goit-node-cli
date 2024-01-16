const contacts = require("./contacts");
const { Command } = require("commander");
const program = new Command();
program
  .option("-a, --action <type>", "choose action")
  .option("-i, --id <type>", "user id")
  .option("-n, --name <type>", "user name")
  .option("-e, --email <type>", "user email")
  .option("-p, --phone <type>", "user phone");

program.parse();

const options = program.opts();

async function invokeAction({ action, id, name, email, phone }) {
  switch (action) {
    case "list":
      const contactList = await contacts.listContacts();
      return console.table(contactList);
      break;

    case "get":
      const findContact = await contacts.getContactById(id);
      console.log(findContact);
      break;

    case "add":
      const addNewContact = await contacts.addContact(name, email, phone);
      console.log(addNewContact);
      break;

    case "remove":
      const deletContact = await contacts.removeContact(id);
      console.log(deletContact);
      break;

    default:
      console.warn("\x1B[31m Unknown action type!");
  }
}

invokeAction(options);
