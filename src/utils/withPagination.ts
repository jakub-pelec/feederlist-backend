import { FindCursor, WithId, Document } from "mongodb";

export default (
	callback: FindCursor<WithId<Document>>,
	limit: number = 0,
	offset: number = 0
) => callback.skip(offset || 0).limit(limit || 50);
