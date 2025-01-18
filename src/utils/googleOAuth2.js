// src/utils/googleOAuth2.js

import { OAuth2Client } from 'google-auth-library';
import path from 'node:path';
import { readFile } from 'fs/promises';
import createHttpError from 'http-errors';
import { getEnvVar } from './getEnvVar.js';

const PATH_JSON = path.join(process.cwd(), 'google-oauth.json'); // Path to the JSON file containing the OAuth2 configuration

const oauthConfig = JSON.parse(await readFile(PATH_JSON)); // Read the JSON file containing the OAuth2 configuration

const googleOAuthClient = new OAuth2Client({
  clientId: getEnvVar('GOOGLE_AUTH_CLIENT_ID'), // Get the client ID from the environment/ Отримати ідентифікатор клієнта з змінної середовища
  clientSecret: getEnvVar('GOOGLE_AUTH_CLIENT_SECRET'), // Get the client secret from the environment/ Отримати секрет клієнта з  змінної середовища
  redirectUri: oauthConfig.web.redirect_uris[0], // Використовує перший URI зі списку redirect_uris у файлі google-oauth.json
}); // Create a new OAuth2 client / ініціалізація нового клієнта OAuth2

export const generateAuthUrl = () =>
  googleOAuthClient.generateAuthUrl({
    scope: [
      // Задає права доступу. Список дозволів, які запитуємо від користувача
      'https://www.googleapis.com/auth/userinfo.email', // отримання адреси електронної пошти користувача
      'https://www.googleapis.com/auth/userinfo.profile', // отримання інформації про профіль користувача (ім'я, фото тощо)
    ],
  });

export const validateCode = async (code) => {
  const response = await googleOAuthClient.getToken(code);
  if (!response.tokens.id_token) throw createHttpError(401, 'Unauthorized');

  const ticket = await googleOAuthClient.verifyIdToken({
    idToken: response.tokens.id_token,
  });
  return ticket;
};

export const getFullNameFromGoogleTokenPayload = (payload) => {
  let fullName = 'Guest';
  if (payload.given_name && payload.family_name) {
    fullName = `${payload.given_name} ${payload.family_name}`;
  } else if (payload.given_name) {
    fullName = payload.given_name;
  }

  return fullName;
};
