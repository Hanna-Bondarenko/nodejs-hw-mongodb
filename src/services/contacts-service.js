import { ContactsCollection } from '../db/models/contacts.js';

export const getContacts = () => ContactsCollection.find();

export const getContactById = (id) => ContactsCollection.findById(id);
