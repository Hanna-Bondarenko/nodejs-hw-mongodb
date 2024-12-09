import { ContactsCollection } from '../db/models/Contacts.js';

export const getContacts = () => ContactsCollection.find();

export const getContactById = (id) => ContactsCollection.findById(id);
