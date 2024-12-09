import { startServer } from './server.js';
import { initMongoDB } from './db/initMongoDB.js';

const boostrap = async () => {
  await initMongoDB(); //підключаємося до бази
  startServer(); // запускаємо вебсервер
};

boostrap();
