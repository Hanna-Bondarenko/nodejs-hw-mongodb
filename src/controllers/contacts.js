import createError from 'http-errors';
import * as contactsServices from '../services/contacts-service.js';

export const getAllContacts = async (req, res) => {
  const contacts = await contactsServices.getAll();
  res.json({
    status: 200,
    message: 'Successfully found contacts!',
    data: contacts,
  });
};

export const getContactById = async (req, res) => {
  const { contactId } = req.params;
  const contact = await contactsServices.getById(contactId);
  if (!contact) {
    throw createError(404, 'Contact not found');
  }
  res.json({
    status: 200,
    message: `Successfully found contact with id=${contactId}`,
    data: contact,
  });
};

export const createContact = async (req, res) => {
  const newContact = await contactsServices.create(req.body);
  res.status(201).json({
    status: 201,
    message: 'Successfully created a contact!',
    data: newContact,
  });
};

export const updateContact = async (req, res) => {
  const { contactId } = req.params;
  const updatedContact = await contactsServices.update(contactId, req.body);
  if (!updatedContact) {
    throw createError(404, 'Contact not found');
  }
  res.json({
    status: 200,
    message: 'Successfully updated a contact!',
    data: updatedContact,
  });
};

export const deleteContact = async (req, res) => {
  const { contactId } = req.params;
  const deletedContact = await contactsServices.deleteOne(contactId);
  if (!deletedContact) {
    throw createError(404, 'Contact not found');
  }
  res.status(204).send();
};
