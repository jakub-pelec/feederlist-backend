import { MongoClient } from "mongodb";
import dotenv from 'dotenv';
dotenv.config();

class MongoDB {
	connectionString: string =
		process.env.MONGODB_URL || "mongodb://localhost:27017";
	connection: MongoClient | null = null;

	constructor() {
		console.log(this.connectionString);
		this.connection = new MongoClient(this.connectionString);
	}

	async connect() {
		const client = await this.connection?.connect();
		const databasesList = await client!.db().admin().listDatabases();

		console.log("Databases:");
		databasesList.databases.forEach(db => console.log(` - ${db.name}`));
		return client;
	}

	async getDatabase(database: string) {
		const db = await this.connection?.db(database);
		return db;
	}
}

const db = new MongoDB();
db.connect();
export default db;
