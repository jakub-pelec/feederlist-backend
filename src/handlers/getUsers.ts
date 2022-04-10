import { Request, Response } from "express";
import mockUsers from '../mock/users'

export default (req: Request, res: Response) => {
	return res.status(200).send(mockUsers);
};
