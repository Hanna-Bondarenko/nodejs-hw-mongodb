import { readContacts } from '../utils/readContacts.js';

const countContacts = async () => {
  const contacts = await readContacts();
  return contacts.length;
};

console.log(await countContacts());
