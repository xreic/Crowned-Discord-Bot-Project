import { Client } from 'discord.js';
import { config } from './config';
import { events } from './events';

const client = new Client({
	intents: ['Guilds', 'GuildMessages', 'DirectMessages'],
});

const eventKeys = Object.keys(events);
for (const key of eventKeys) {
	const event = events[key];

	if (event.once) client.once(event.name, (...args) => event.execute(...args));
	else client.on(event.name, (...args) => event.execute(...args));
}

client.login(config.DISCORD_TOKEN);
