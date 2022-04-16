import dotenv from "dotenv";
dotenv.config();
import prod from "./prod";
import local from "./local";

const APP_STAGE = process.env.APP_STAGE;
let config;


switch (APP_STAGE) {
	case "LOCAL":
		config = local;
		break;
	case "PROD":
		config = prod;
		break;
	default:
		config = local;
}

export default config as Config;
