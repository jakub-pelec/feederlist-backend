import { Request, Response } from "express";
import { MongoServerError } from "mongodb";
import client from "../services/mongoDb";
import RiotApi from "../services/riot";

export default async (req: Request, res: Response) => {
	const { username } = req.body;
	const summonerExists = await RiotApi.checkUsername(username);
	if (!summonerExists) {
		return res.status(404).send({ message: "User doesn't exist" });
	}
	const payload = {
		username,
		upvotes: 0,
		downvotes: 0,
	};
	const db = await client.getDatabase("local");
	try {
		const data = await db?.collection("users").insertOne(payload);
		return res
			.status(200)
			.send({ message: "User inserted", id: data?.insertedId });
	} catch (e) {
		if (e instanceof MongoServerError) {
			console.log("Erorr inserting user", e);
		}
		return res
			.status(403)
			.send({ message: "Cannot insert user into database." });
	}
};
