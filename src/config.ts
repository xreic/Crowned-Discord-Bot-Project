/* eslint-disable @typescript-eslint/ban-ts-comment */
import dotenv from 'dotenv';

dotenv.config();

interface IConfig {
	DISCORD_TOKEN: string;
	CLIENT_ID: string;
	GUILD_ID: string;
}

const {
	DISCORD_TOKEN,
	CLIENT_ID,
	GUILD_ID,
} = process.env;

const ENV_VARS = [
	DISCORD_TOKEN,
	CLIENT_ID,
	GUILD_ID,
];

if (ENV_VARS.some((e) => !e)) {
	throw new Error('Missing environment variables');
}

export const config: IConfig = {
	// @ts-ignore
	DISCORD_TOKEN,
	// @ts-ignore
	CLIENT_ID,
	// @ts-ignore
	GUILD_ID,
};
