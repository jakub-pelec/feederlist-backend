import express from "express";
import { ROUTES } from './constants/routes';
import handlers from './handlers';

const PORT = process.env.PORT || 3000;
const app = express();

app.get(ROUTES.test, handlers.test)

app.listen(PORT, () => {
	console.log(`Listening on PORT ${PORT}`);
});