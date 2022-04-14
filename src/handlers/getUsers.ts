import { Request, Response } from "express";
import client from "../services/mongoDb";

export default async (req: Request, res: Response) => {
	const db = await client.getDatabase("local");
	const users = await db?.collection("users").find().toArray();
	return res.status(200).send({ users });
};
