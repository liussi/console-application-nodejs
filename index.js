const { Command } = require("commander");
const program = new Command();
program
  .option("-a, --action <type>", "choose action")
  .option("-i, --id <type>", "user id")
  .option("-n, --name <type>", "user name")
  .option("-e, --email <type>", "user email")
  .option("-p, --phone <type>", "user phone");

program.parse(process.argv);

const argv = program.opts();
const contact = require("./contacts");

async function invokeAction({ action, id, name, email, phone }) {
  switch (action) {
    case "list":
      const allContacts = await contact.listContacts();
      return console.table(allContacts);

    case "get":
      const oneContact = await contact.getContactById(id);
      return console.log(oneContact);

    case "add":
      const addContact = await contact.addContact(name, email, phone);
      return console.log(addContact);
    case "remove":
      const deleteContact = await contact.removeContact(id);
      return console.log(deleteContact);
    default:
      console.warn("\x1B[31m Unknown action type!");
  }
}

invokeAction(argv);
