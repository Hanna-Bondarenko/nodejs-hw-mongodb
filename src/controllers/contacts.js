import * as contactServices from '../services/contacts-service.js';
import createError from 'http-errors';
import { parsePaginationParams } from '../utils/parsePaginationParams.js';
import { parseSortParams } from '../utils/parseSortParams.js';
import { parseContactFilterParams } from '../utils/filters/parseContactFilterParams.js';
import { sortByList } from '../db/models/contacts.js';
import { saveFileToUploadDir } from '../utils/saveFileToUploadDir.js';

export const getContactsController = async (req, res) => {
  const { page, perPage } = parsePaginationParams(req.query);
  const { sortBy, sortOrder } = parseSortParams(req.query, sortByList);
  const filter = parseContactFilterParams(req.query);
  filter.userId = req.user._id;

  const data = await contactServices.getContacts({
    page,
    perPage,
    sortBy,
    sortOrder,
    filter,
  });

  res.json({
    status: 200,
    message: 'Successfully found contacts',
    data,
  });
};

export const getContactByIdController = async (req, res) => {
  const { _id: userId } = req.user;
  const { id: _id } = req.params;

  const data = await contactServices.getContact({ _id, userId });

  if (!data) {
    throw createError(404, 'Contact not found');
  }

  res.json({
    status: 200,
    message: `Successesfullt find Contact with id=${_id}`,
    data,
  });
};

export const addContactController = async (req, res) => {
  const { _id: userId } = req.user;
  const photo = req.file; // Отримуємо файл із запиту

  let photoUrl;

  // Якщо є файл, зберігаємо його та отримуємо URL
  if (photo) {
    photoUrl = await saveFileToUploadDir(photo);
  }

  const data = await contactServices.addContact({
    ...req.body,
    userId,
    photo: photoUrl,
  });

  res.status(201).json({
    status: 201,
    message: 'Successesfully add contact',
    data,
  });
};

export const upsertContactController = async (req, res) => {
  const { id: _id } = req.params; // ID контакта з параметрів запиту
  const { _id: userId } = req.user; // ID користувача з авторизації

  // Використовуємо { _id, userId } для пошуку контакта
  const { isNew, data } = await contactServices.updateContact(
    { _id, userId },
    { ...req.body, userId }, // Додаємо userId до тіла оновлення
    { upsert: true },
  );

  const status = isNew ? 201 : 200;

  res.status(status).json({
    status,
    message: 'Successfully upsert contact',
    data,
  });
};

export const patchContactController = async (req, res) => {
  const { id: _id } = req.params;
  const { _id: userId } = req.user;
  const photo = req.file; // Отримуємо файл із запиту

  let photoUrl;

  // Якщо є файл, зберігаємо його та отримуємо URL
  if (photo) {
    photoUrl = await saveFileToUploadDir(photo);
  }

  const result = await contactServices.updateContact(
    { _id, userId },
    { ...req.body, photo: photoUrl },
  );

  if (!result) {
    throw createError(404, `Contact with id=${_id} not found`);
  }

  res.json({
    status: 200,
    message: 'Successesfully upsert contact',
    data: result.data,
  });
};

export const deleteContactController = async (req, res) => {
  const { id: _id } = req.params;
  const { _id: userId } = req.user;
  const data = await contactServices.deleteContact({ _id, userId });

  if (!data) {
    throw createError(404, `Contact with id=${_id} not found`);
  }

  res.status(204).send();
};
