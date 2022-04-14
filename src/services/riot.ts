import axios from "axios";
import dotenv from "dotenv";

dotenv.config();

class RiotApi {
	urlBase: string = "https://eun1.api.riotgames.com";
	API_KEY: string = "";

	constructor(apiKey: string) {
		this.API_KEY = apiKey;
	}

	async getPuuid(username: string) {
		try {
			const resp = await axios.get(
				`${this.urlBase}/lol/summoner/v4/summoners/by-name/${username}`,
				{
					headers: {
						"X-Riot-Token": this.API_KEY,
					},
				}
			);
			if (resp.status === 200 && resp.data.puuid) {
				return resp.data.puuid;
			}
		} catch (e) {
			return null;
		}
		return null;
	}

	async checkUsername(username: string) {
		return !!this.getPuuid(username);
	}
}

const apiKey = process.env.RIOT_API_KEY;

export default new RiotApi(apiKey!);
