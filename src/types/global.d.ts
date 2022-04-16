import regions from "../constants/regions";

export {};

declare global {
	interface UserData {
		name: string;
		downvotes: number;
		upvotes: number;
	}
	interface RiotSummonerDetails {
		leagueId: string;
		queueType: string;
		tier: string;
		rank: string;
		summonerId: string;
		summonerName: string;
		leaguePoints: number;
		wins: number;
		losses: number;
		veteran: boolean;
		inactive: boolean;
		freshBlood: boolean;
		hotStreak: boolean;
	}
	interface RiotAccountDetails {
		id: string;
		accountId: string;
		puuid: string;
		name: string;
		profileIconId: number;
		revisionDate: number;
		summonerLevel: number;
	}

	interface Config {
		mongoDbUrl: string,
		database: string,
		riotApiKey: string,
	}

	type Region = keyof typeof regions
}
