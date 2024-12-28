import { UserCollection } from '../db/models/user.js';
import createHttpError from 'http-errors';

export const register = async (payload) => {
  const { email } = payload;
  const user = await UserCollection.findOne({ email });
  if (user) {
    throw createHttpError(409, 'Email in use');
  }

  const newUser = await UserCollection.create(payload);

  return newUser;
};
