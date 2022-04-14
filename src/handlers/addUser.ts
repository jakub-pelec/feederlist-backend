import { Request, Response } from "express";
import { MongoServerError } from "mongodb";
import client from "../services/mongoDb";
import RiotApi from "../services/riot";

export default async (req: Request, res: Response) => {
	const db = await client.getDatabase("local");
	const { username } = req.body;
	const puuid = await RiotApi.checkUsername(username);
	if (!puuid) {
		return res.status(404).send({ message: "User doesn't exist" });
	}
	const currentUser = await db?.collection("users").findOne({ puuid });
	if (currentUser?.username !== username) {
		await db?.collection("users").findOneAndUpdate(
			{ puuid },
			{ $set: { username } }
		);
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
