import { Request, Response } from "express";
import { ObjectId } from "mongodb";
import client from "../services/mongoDb";
import getProjection from "../constants/getProjection";

import { validationResult } from "express-validator";

export default async (req: Request, res: Response) => {
	const errors = validationResult(req);
	if (!errors.isEmpty()) {
		return res.status(400).send({ message: errors.array() });
	}
	const { id } = req.body;
	const db = await client.getDatabase();
	const user = await db
		?.collection("users")
		.find({ _id: new ObjectId(id) }, { projection: getProjection }).toArray()
	return res.status(200).send({ user });
};
