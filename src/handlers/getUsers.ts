import { Request, Response } from "express";
import getProjection from "../constants/getProjection";
import client from "../services/mongoDb";
import withPagination from "../utils/withPagination";

export default async (req: Request, res: Response) => {
	const { offset, limit } = req.body;
	const db = await client.getDatabase("local");
	const query = await withPagination(
		db
			?.collection("users")
			.find({}, { projection: getProjection })
			.sort({ username: 1 }, "asc")!,
		limit,
		offset
	);
	const users = await query?.toArray();
	return res.status(200).send({ users });
};
