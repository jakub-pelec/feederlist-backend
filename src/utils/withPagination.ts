import { FindCursor, WithId, Document, SortDirection } from "mongodb";

export default (
	callback: FindCursor<WithId<Document>>,
	limit: number = 0,
	offset: number = 0,
	orderBy: string = "_id",
	direction: SortDirection = "asc"
) =>
	callback
		.skip(offset * (limit || 50) || 0)
		.limit(limit || 50)
		.collation({ locale: "en" })
		.sort({ [orderBy]: direction || 1 })!;
