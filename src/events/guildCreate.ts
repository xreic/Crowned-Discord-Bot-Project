import { Events, Guild, REST, Routes } from 'discord.js';
import { commands } from '../commands';
import { config } from '../config';

const commandsData = Object.values(commands).map((command) => command.data);

const rest = new REST({ version: '10' }).setToken(config.DISCORD_TOKEN);

type DeployCommandsProps = {
	guildId: string;
};

async function deployCommands({ guildId }: DeployCommandsProps) {
	try {
		console.log('Started refreshing application (/) commands.');

		await rest.put(Routes.applicationGuildCommands(config.CLIENT_ID, guildId), {
			body: commandsData,
		});

		console.log('Successfully reloaded application (/) commands.');
	} catch (error) {
		console.error(error);
	}
}

export const name = Events.GuildCreate;

export async function execute(guild: Guild) {
	/**
	 * Deploy slash commands upon joining a server.
	 */
	await deployCommands({ guildId: guild.id });
}
