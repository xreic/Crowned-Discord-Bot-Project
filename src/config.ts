/* eslint-disable @typescript-eslint/ban-ts-comment */
import dotenv from 'dotenv';

dotenv.config();

interface IConfig {
	DISCORD_TOKEN: string;
	CLIENT_ID: string;
	GUILD_ID: string;
	RULES_CHANNEL_ID: string;
	APPLICATIONS_CATEGORY_ID: string;
	ARCHIVED_CATEGORY_ID: string;
	STAFF_ROLE_ID: string;
}

const {
	DISCORD_TOKEN,
	CLIENT_ID,
	GUILD_ID,
	RULES_CHANNEL_ID,
	APPLICATIONS_CATEGORY_ID,
	ARCHIVED_CATEGORY_ID,
	STAFF_ROLE_ID,
} = process.env;

const ENV_VARS = [
	DISCORD_TOKEN,
	CLIENT_ID,
	GUILD_ID,
	RULES_CHANNEL_ID,
	APPLICATIONS_CATEGORY_ID,
	ARCHIVED_CATEGORY_ID,
	STAFF_ROLE_ID,
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
	// @ts-ignore
	RULES_CHANNEL_ID,
	// @ts-ignore
	APPLICATIONS_CATEGORY_ID,
	// @ts-ignore
	ARCHIVED_CATEGORY_ID,
	// @ts-ignore
	STAFF_ROLE_ID,
};
