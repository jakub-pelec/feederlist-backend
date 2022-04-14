import { Request, Response } from "express";
import { ObjectId } from "mongodb";
import client from "../services/mongoDb";

export default async (req: Request, res: Response) => {
	const { id } = req.body;
	const db = await client.getDatabase("local");
	const user = await db
		?.collection("users")
		.findOne({ _id: new ObjectId(id) });
	return res.status(200).send({ user });
};
