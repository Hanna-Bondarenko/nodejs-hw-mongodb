import 'dotenv/config';

export const SMTP = {
  SMTP_HOST: process.env.SMTP_HOST,
  SMTP_PORT: Number(process.env.SMTP_PORT),
  SMTP_USER: process.env.SMTP_USER,
  SMTP_PASSWORD: process.env.SMTP_PASSWORD,
  SMTP_FROM: process.env.SMTP_FROM,
};

export const APP_DOMAIN = process.env.APP_DOMAIN;
export const JWT_SECRET = process.env.JWT_SECRET;
