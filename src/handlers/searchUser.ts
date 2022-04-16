import { Request, Response } from "express";
import client from "../services/mongoDb";
import { validationResult } from "express-validator";
import getProjection from "../constants/getProjection";

export default async (req: Request, res: Response) => {
	const errors = validationResult(req);
	if (!errors.isEmpty()) {
		return res.status(400).send({ message: errors.array() });
	}
	const { username } = req.query;
	const db = await client.getDatabase();
	try {
		const data = await db
			?.collection("users")
			.find({ username: decodeURIComponent(username as string) }, { projection: getProjection })
			.toArray();
		if (data?.length) {
			return res.status(200).send({
				message: "User found",
				data,
			});
		}
		return res.status(403).send({ message: "Something went wrong." });
	} catch (e) {
		return res.status(403).send({ message: "Something went wrong." });
	}
};
