import { MongoClient } from "mongodb";

class MongoDB {
	connectionString: string = "mongodb://localhost:27017";
	connection: MongoClient | null = null;

	constructor() {
		this.connection = new MongoClient(this.connectionString);
	}

	async connect() {
		await this.connection?.connect();
	}

	async getDatabase(database: string) {
		const db = await this.connection?.db(database);
		return db;
	}
}

const db = new MongoDB();
db.connect();
export default db;
