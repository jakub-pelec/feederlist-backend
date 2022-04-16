import axios from "axios";
import config from "../config";

class RiotApi {
	urlBase: string = "https://eun1.api.riotgames.com";
	API_KEY: string = config.riotApiKey;

	async getPuuid(username: string): Promise<string | false> {
		try {
			const resp = await axios.get(
				`${
					this.urlBase
				}/lol/summoner/v4/summoners/by-name/${encodeURIComponent(
					username
				)}`,
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
			return false;
		}
		return false;
	}

	async getDetailsByPuuid(puuid: string): Promise<RiotAccountDetails | null> {
		try {
			const resp = await axios.get(
				`${this.urlBase}/lol/summoner/v4/summoners/by-puuid/${puuid}`,
				{
					headers: {
						"X-Riot-Token": this.API_KEY,
					},
				}
			);
			if (resp.status === 200) {
				return resp.data;
			}
		} catch (e) {
			console.log(e);
		}
		return null;
	}

	async getDetailsBySummonerId(
		id: string
	): Promise<RiotSummonerDetails | null> {
		try {
			const resp = await axios.get(
				`${this.urlBase}/lol/league/v4/entries/by-summoner/${id}`,
				{
					headers: {
						"X-Riot-Token": this.API_KEY,
					},
				}
			);
			if (resp.status === 200) {
				return resp.data;
			}
		} catch (e) {
			console.log(e);
		}
		return null;
	}

	async checkUsername(username: string) {
		return this.getPuuid(username);
	}
}

export default new RiotApi();
