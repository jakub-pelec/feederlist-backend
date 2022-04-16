import axios from "axios";
import config from "../config";
import regions from "../constants/regions";

class RiotApi {
	urlBase: string = "https://eun1.api.riotgames.com";
	API_KEY: string = config.riotApiKey;

	async getPuuid(
		username: string,
		region: Region
	): Promise<string | false> {
		try {
			this.setUrlBase(region);
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

	async getDetailsByPuuid(
		puuid: string,
		region: Region
	): Promise<RiotAccountDetails | null> {
		try {
			this.setUrlBase(region);
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
		id: string,
		region: Region
	): Promise<RiotSummonerDetails | null> {
		try {
			this.setUrlBase(region);
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

	async checkUsername(username: string, region: Region) {
		this.setUrlBase(region);
		return this.getPuuid(username, region);
	}

	setUrlBase(region: Region) {
		if (Object.keys(regions).indexOf(region) > -1) {
			this.urlBase = regions[region];
		} else {
			throw new Error("Invalid REGION.");
		}
	}
}

export default new RiotApi();
