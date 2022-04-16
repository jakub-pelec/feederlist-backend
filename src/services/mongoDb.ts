import { MongoClient } from "mongodb";
import config from "../config";

class MongoDB {
	connectionString: string = config.mongoDbUrl;
	database: string = config.database;
	connection: MongoClient | null = null;

	constructor() {
		this.connection = new MongoClient(this.connectionString);
	}

	async connect() {
		await this.connection?.connect();
	}

	async getDatabase() {
		const db = await this.connection?.db(this.database);
		return db;
	}
}

const db = new MongoDB();
db.connect();
export default db;
