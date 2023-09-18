import dayjs from 'dayjs';
import {
	BaseInteraction,
	Events,
} from 'discord.js';
import { commands } from '../commands';
import { userIntendsToApply } from '../channel';

export const name = Events.InteractionCreate;

export async function execute(interaction: BaseInteraction) {
	if (interaction.isCommand()) {
		const { commandName } = interaction;
		if (commands[commandName as keyof typeof commands]) {
			commands[commandName as keyof typeof commands].execute(interaction);
		}
	} else if (interaction.isButton()) {
		console.log('\nButton interaction');

		await userIntendsToApply(interaction);

		const userCreatedAt = dayjs(interaction.user.createdAt).unix();
		await interaction.reply(`<t:${userCreatedAt}:F> <t:${userCreatedAt}:R>`);
		await interaction.deleteReply();
	}
}
