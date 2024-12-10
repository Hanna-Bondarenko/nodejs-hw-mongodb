import express from 'express';
import cors from 'cors';
// import pino from 'pino-http';

import * as contactServices from './services/contacts-service.js';
import { getEnvVar } from './utils/getEnvVar.js';

export const startServer = () => {
  const app = express();

  app.use(cors());
  app.use(express.json());
  // app.use(pino({
  //     transport: {
  //         target: "pino-pretty"
  //     }
  // }));

  app.get('/Contacts', async (req, res) => {
    const data = await contactServices.getContacts();
    res.json({
      status: 200,
      message: 'Successfully found contacts',
      data,
    });
  });

  app.get('/Contacts/:id', async (req, res) => {
    const { id } = req.params;
    const data = await contactServices.getContactById(id);

    if (!data) {
      return res.status(404).json({
        status: 404,
        message: `Contact with id=${id} not found`,
      });
    }

    res.json({
      status: 200,
      message: `Successesfullt find Contact with id=${id}`,
      data,
    });
  });

  app.use((req, res) => {
    res.status(404).json({
      message: `${req.url} not found`,
    });
  });

  app.use((error, res, next) => {
    res.status(500).json({
      message: 'Server error',
      error: error.message,
    });
  });

  const port = Number(getEnvVar('PORT', 3000));

  app.listen(port, () => console.log(`Server running on ${port} port`));
};
