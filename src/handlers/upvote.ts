import { Request, Response } from "express";
import { ObjectId } from "mongodb";
import client from "../services/mongoDb";

export default async (req: Request, res: Response) => {
	const { id } = req.body;
	const db = await client.getDatabase("test");
	try {
		const data = await db?.collection("users").findOneAndUpdate(
			{ _id: new ObjectId(id) },
			{
				$inc: {
					upvotes: 1,
				},
			}
		);
		if (data?.ok) {
			return res.status(200).send({
				message: "User upvoted sucesfully",
				upvotes: data?.value?.upvotes + 1,
			});
		}
		return res.status(403).send({ message: "Something went wrong." });
	} catch (e) {
		return res.status(403).send({ message: "Something went wrong." });
	}
};
