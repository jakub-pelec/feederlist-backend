import { Request, Response } from "express";

export default (req: Request, res: Response) => {
	return res.status(200).send({ version: process.env.npm_package_version });
};
