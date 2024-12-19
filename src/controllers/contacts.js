import * as contactServices from '../services/contacts-service.js';
import createError from 'http-errors';

export const getContactsController = async (req, res) => {
  const data = await contactServices.getContacts();
  res.json({
    status: 200,
    message: 'Successfully found contacts',
    data,
  });
};

export const getContactById = async (req, res) => {
  const { id } = req.params;
  const data = await contactServices.getContactById(id);

  if (!data) {
    throw createError(404, `Contact with id=${id} not found`);
    // const error = new Error(`Contact with id=${id} not found`);
    // error.status = 404;
    // throw error;
  }

  res.json({
    status: 200,
    message: `Successesfullt find Contact with id=${id}`,
    data,
  });
};
