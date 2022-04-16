import { Request, Response } from "express";
import { ObjectId } from "mongodb";
import client from "../services/mongoDb";
import RiotApi from "../services/riot";
import { validationResult } from "express-validator";

export default async (req: Request, res: Response) => {
	const errors = validationResult(req);
	if (!errors.isEmpty()) {
		return res.status(400).send({ message: errors.array() });
	}
	const { id } = req.query;
	const db = await client.getDatabase();
	const user = await db
		?.collection("users")
		.find(
			{ _id: new ObjectId(id as string) },
			{ projection: { puuid: 1, region: 1 } }
		)
		.toArray();
	const puuid = user![0].puuid;
	const region = user![0].region;
	const accountDetails = await RiotApi.getDetailsByPuuid(puuid, region);
	if (accountDetails) {
		const userDetails = await RiotApi.getDetailsBySummonerId(
			accountDetails.id,
			region
		);
		return res.status(200).send({ details: userDetails });
	}
	return res.status(403).send({ message: "Something went wrong." });
};
