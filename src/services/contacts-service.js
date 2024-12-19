import { ContactsCollection } from '../db/models/contacts.js';
import createError from 'http-errors';

export const getAll = async () => {
  return await ContactsCollection.find();
};

export const getById = async (id) => {
  const contact = await ContactsCollection.findById(id);
  if (!contact) {
    throw createError(404, 'Contact not found');
  }
  return contact;
};

export const create = async (data) => {
  return await ContactsCollection.create(data);
};

export const update = async (id, data) => {
  const updatedContact = await ContactsCollection.findByIdAndUpdate(id, data, {
    new: true,
  });
  if (!updatedContact) {
    throw createError(404, 'Contact not found');
  }
  return updatedContact;
};

export const deleteOne = async (id) => {
  const deletedContact = await ContactsCollection.findByIdAndDelete(id);
  if (!deletedContact) {
    throw createError(404, 'Contact not found');
  }
  return deletedContact;
};
