import express from "express";
import dotenv from 'dotenv';
import { ROUTES } from './constants/routes';
import handlers from './handlers';
import cors from 'cors';

dotenv.config()
const corsConfig = {
    origin: 'http://localhost:3000',
    optionsSuccessStatus: 200
  }

const PORT = process.env.PORT || 3000;
const app = express();
app.use(cors(corsConfig));

app.get(ROUTES.test, handlers.test);
app.get(ROUTES.version, handlers.version);
app.get(ROUTES.users, handlers.getUsers);

app.listen(PORT, () => {
	console.log(`Listening on PORT ${PORT}`);
});