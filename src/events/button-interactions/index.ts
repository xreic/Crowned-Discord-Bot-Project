import dayjs from 'dayjs';
import { ButtonInteraction, GuildMember } from 'discord.js';
import { approveApplication } from '../../channel/actions/approve-application';
import { createApplicationTextChannel } from '../../channel/actions/create-application-text-channel';
import { config } from '../../config';
import { BUTTON_INTERACTION_IDS } from '../../types';
import { archiveApplicationTextChannel } from '../../channel/actions/archive-application-text-channel';

export async function handleButtonInteractions(interaction: ButtonInteraction) {
	console.log('\nButton interaction');
	const buttonId = interaction.customId;
	const serverMember: GuildMember = interaction.member as GuildMember;

	if (buttonId === BUTTON_INTERACTION_IDS.APPLY) {
		/**
		 * Handle user applying to the guild.
		 */
		try {
			await interaction.reply({ ephemeral: true, content: 'Give us a second as we setup for your application.' });
			await createApplicationTextChannel(interaction, serverMember);

		} catch (err) {
			const errorTimestamp = dayjs().unix();
			await interaction.reply(`<@${config.BOT_MANAGER_ID}> Failed to create new application. Timestamp: ${errorTimestamp}`);

			console.error(`Timestamp: ${errorTimestamp}`);
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
	} else if (buttonId === BUTTON_INTERACTION_IDS.ARCHIVE) {
		/**
		 * Handle staff archiving an application.
		 */
		try {
			await archiveApplicationTextChannel(interaction);
		} catch (err) {
			console.error('\n\nBUTTON_INTERACTION_IDS.ARCHIVE');
			console.error(err);
		}
	}
}
