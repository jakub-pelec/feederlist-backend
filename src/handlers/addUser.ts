import { Request, Response } from "express";
import { MongoServerError } from "mongodb";
import client from "../services/mongoDb";
import RiotApi from "../services/riot";
import { validationResult } from "express-validator";

export default async (req: Request, res: Response) => {
	const errors = validationResult(req);
	if (!errors.isEmpty()) {
		return res.status(400).send({ message: errors.array() });
	}
	const db = await client.getDatabase();
	const { username, region } = req.body;

	let puuid: string | false;
	try {
		puuid = await RiotApi.checkUsername(username, region);
	} catch (e) {
		return res
			.status(403)
			.send({ message: (e as { message: string }).message });
	}
	if (!puuid) {
		return res.status(404).send({ message: "User doesn't exist" });
	}
	const currentUser = await db?.collection("users").findOne({ puuid });
	if (currentUser?.username !== username) {
		await db
			?.collection("users")
			.findOneAndUpdate({ puuid }, { $set: { username } });
	}
	if (currentUser) {
		return res
			.status(403)
			.send({ message: "User alredy exists in database" });
	}
	const payload = {
		username,
		upvotes: 0,
		downvotes: 0,
		puuid,
		createdAt: Date.now(),
		region,
	};
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
