import { Request, Response } from "express";
import { ObjectId } from "mongodb";
import client from "../services/mongoDb";

export default async (req: Request, res: Response) => {
	const { id } = req.body;
	if(!id) {
		return res.status(403).send({message: 'Missing argument: id'});
	}
	const db = await client.getDatabase();
	try {
		const data = await db?.collection("users").findOneAndUpdate(
			{ _id: new ObjectId(id) },
			{
				$inc: {
					downvotes: 1,
				},
			}
		);
		if (data?.ok) {
			return res.status(200).send({
				message: "User downvoted sucesfully",
				upvotes: data?.value?.downvotes + 1,
			});
		}
		return res.status(403).send({ message: "Something went wrong." });
	} catch (e) {
		return res.status(403).send({ message: "Something went wrong." });
	}
};
