import { BaseInteraction, Events } from 'discord.js';
import { userIntendsToApply } from '../channel';
import { commands } from '../commands';
import { config } from '../config';
import { BUTTON_INTERACTION_IDS } from '../types';
import { approveApplication } from '../channel/actions/approve-application';

export const name = Events.InteractionCreate;

export async function execute(interaction: BaseInteraction) {
	if (interaction.isCommand()) {
		const { commandName } = interaction;
		if (commands[commandName as keyof typeof commands]) {
			commands[commandName as keyof typeof commands].execute(interaction);
		}
	} else if (interaction.isButton()) {
		console.log('\nButton interaction');
		const buttonId = interaction.customId;

		if (buttonId === BUTTON_INTERACTION_IDS.APPLY) {
			/**
			 * Handle user applying to the guild.
			 */
			try {
				await interaction.reply({ ephemeral: true, content: 'Give us a second as we setup for your application.' });
				await userIntendsToApply(interaction);

			} catch (err) {
				console.error('\n\nBUTTON_INTERACTION_IDS.APPLY');
				console.error(err);
			}
		} else if (buttonId === BUTTON_INTERACTION_IDS.CALL) {
			/**
			 * Handle user requesting for a staff member.
			 */
			try {
				await interaction.reply(`Calling <@&${config.STAFF_ROLE_ID}>`);
			} catch (err) {
				console.error('\n\nBUTTON_INTERACTION_IDS.CALL');
				console.error(err);
			}
		} else if (buttonId === BUTTON_INTERACTION_IDS.APPROVE) {
			/**
			 * Handle staff approving an application.
			 */
			try {
				await approveApplication(interaction);
			} catch (err) {
				console.error('\n\nBUTTON_INTERACTION_IDS.APPROVE');
				console.error(err);
			}
		}
	}
}
