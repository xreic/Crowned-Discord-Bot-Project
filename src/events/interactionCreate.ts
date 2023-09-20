import { BaseInteraction, Events } from 'discord.js';
import { commands } from '../commands';
import { handleButtonInteractions } from './button-interactions';

export const name = Events.InteractionCreate;

export async function execute(interaction: BaseInteraction) {
	if (interaction.isCommand()) {
		const { commandName } = interaction;
		if (commands[commandName as keyof typeof commands]) {
			commands[commandName as keyof typeof commands].execute(interaction);
		}
	} else if (interaction.isButton()) {
		await handleButtonInteractions(interaction);
	}
}
