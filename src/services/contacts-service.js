import { ContactsCollection } from '../db/models/contacts.js';
import { calculatePaginationData } from '../utils/calculatePaginationData.js';

export const getContacts = async ({
  page = 1,
  perPage = 10,
  sortBy = '_id',
  sortOrder = 'asc',
  filter = {},
}) => {
  const limit = perPage;
  const skip = (page - 1) * perPage;

  const contactsQuery = ContactsCollection.find();

  if (filter.contactType) {
    contactsQuery.where('contactType').equals(filter.contactType);
  }
  if (filter.isFavourite) {
    contactsQuery.where('isFavourite').equals(filter.isFavourite);
  }
  if (filter.userId) {
    contactsQuery.where('userId').equals(filter.userId);
  }

  const data = await contactsQuery
    .find()
    .skip(skip)
    .limit(limit)
    .sort({ [sortBy]: sortOrder });

  const total = await ContactsCollection.find()
    .merge(contactsQuery)
    .countDocuments();

  const paginationData = calculatePaginationData({ total, page, perPage });

  return {
    data,
    total,
    ...paginationData,
  };
};

export const getContactById = (id) => ContactsCollection.findById(id);

export const getContact = (filter) => ContactsCollection.findOne(filter);

export const addContact = (payload) => ContactsCollection.create(payload);

export const updateContact = async (filter, payload, options = {}) => {
  const { upsert } = options;
  const result = await ContactsCollection.findOneAndUpdate(filter, payload, {
    // new: true,
    upsert,
    // runValidators: true,
    includeResultMetadata: true,
  });

  if (!result || !result.value) return null;

  const isNew = Boolean(result.lastErrorObject.upserted);

  return {
    isNew,
    data: result.value,
  };
};

export const deleteContact = (filter) =>
  ContactsCollection.findOneAndDelete(filter);
