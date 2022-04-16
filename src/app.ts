import express from "express";
import dotenv from "dotenv";
import { ROUTES } from "./constants/routes";
import handlers from "./handlers";
import cors from "cors";
import bodyParser from "body-parser";
import rateLimit from "express-rate-limit";
import { body, query } from "express-validator";

dotenv.config();
const corsConfig = {
	origin: "http://localhost:3000",
	optionsSuccessStatus: 200,
};

const limiter = rateLimit({
	windowMs: 15 * 60 * 1000, // 15 minutes
	max: 100,
	standardHeaders: true,
	legacyHeaders: false,
});

const PORT = process.env.PORT || 3000;
const app = express();
app.use(express.json());
app.use(cors(corsConfig));
app.use(bodyParser.json());
app.use(limiter);

app.get(ROUTES.test, handlers.test);
app.get(ROUTES.version, handlers.version);
app.get(ROUTES.users, handlers.getUsers);
app.get(
	ROUTES.user,
	query("id", "Id is required.").exists(),
	handlers.getUserById
);
app.get(
	ROUTES.userDetails,
	query("id", "Id is required.").exists(),
	handlers.userDetails
);

app.put(
	ROUTES.users,
	body("username", "Username is required.").exists(),
	body("region", "Region is required.").exists(),
	handlers.addUser
);

app.patch(
	ROUTES.upvote,
	body("id", "Id is required.").exists(),
	handlers.upvote
);
app.patch(
	ROUTES.downvote,
	body("id", "Id is required.").exists(),
	handlers.downvote
);

app.listen(PORT, () => {
	console.log(`Listening on PORT ${PORT}`);
});
