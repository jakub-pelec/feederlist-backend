import { Request, Response } from "express";
import { SortDirection } from "mongodb";
import getProjection from "../constants/getProjection";
import client from "../services/mongoDb";
import withPagination from "../utils/withPagination";

export default async (req: Request, res: Response) => {
	const { offset, limit, orderBy, direction } = req.query;
	const db = await client.getDatabase();
	const query = await withPagination(
		db?.collection("users").find({}, { projection: getProjection })!,
		limit ? parseInt(limit as string) : undefined,
		offset ? parseInt(offset as string) : undefined,
		orderBy as string,
		direction as SortDirection
	);
	const users = await query?.toArray();
	return res.status(200).send({ users });
};
