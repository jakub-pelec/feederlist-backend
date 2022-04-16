import { Request, Response } from "express";
import { ObjectId } from "mongodb";
import client from "../services/mongoDb";
import getProjection from "../constants/getProjection";

export default async (req: Request, res: Response) => {
	const { id } = req.body;
	if(!id) {
		return res.status(403).send({message: 'Missing argument: id'});
	}
	const db = await client.getDatabase();
	const user = await db
		?.collection("users")
		.find({ _id: new ObjectId(id) }, { projection: getProjection }).toArray()
	return res.status(200).send({ user });
};
