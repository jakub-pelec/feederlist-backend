import { Request, Response } from "express";
import { ObjectId } from "mongodb";
import client from "../services/mongoDb";
import RiotApi from "../services/riot";

export default async (req: Request, res: Response) => {
	const { id } = req.body;
	if(!id) {
		return res.status(403).send({message: 'Missing argument: id'});
	}
	const db = await client.getDatabase();
	const user = await db
		?.collection("users")
		.find({ _id: new ObjectId(id) }, { projection: { puuid: 1 } })
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
