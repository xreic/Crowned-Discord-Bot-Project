import dayjs from 'dayjs';
import { ButtonInteraction, GuildMember } from 'discord.js';
import { approveApplication } from '../../channel/actions/approve-application';
import { createApplicationTextChannel } from '../../channel/actions/create-application-text-channel';
import { config } from '../../config';
import { BUTTON_INTERACTION_IDS } from '../../types';
import { archiveApplicationTextChannel } from '../../channel/actions/archive-application-text-channel';
import { satisfyButtonInteraction } from '../../channel/utils';

async function reportError(interaction: ButtonInteraction, message: string, err: unknown) {
	const errorTimestamp = dayjs().unix();
	await interaction.reply(`<@${config.BOT_MANAGER_ID}> ${message}. Timestamp: ${errorTimestamp}`);

	console.error(`Timestamp: ${errorTimestamp}`);
	console.error(err);
}

export async function handleButtonInteractions(interaction: ButtonInteraction) {
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
			await reportError(interaction, 'Failed to create new application.', err);
		}
	} else if (buttonId === BUTTON_INTERACTION_IDS.CALL) {
		/**
		 * Handle user requesting for a staff member.
		 */
		try {
			await interaction.reply(`Calling <@&${config.STAFF_ROLE_ID}>`);
		} catch (err) {
			await reportError(interaction, 'Failed to call for a staff member.', err);
		}
	} else if (buttonId === BUTTON_INTERACTION_IDS.APPROVE) {
		/**
		 * Handle staff approving an application.
		 */
		try {
			await satisfyButtonInteraction(interaction);
			await approveApplication(interaction);
		} catch (err) {
			await reportError(interaction, 'Failed to approve application.', err);
		}
	} else if (buttonId === BUTTON_INTERACTION_IDS.ARCHIVE) {
		/**
		 * Handle staff archiving an application.
		*/
		try {
			await satisfyButtonInteraction(interaction);
			await archiveApplicationTextChannel(interaction);
		} catch (err) {
			await reportError(interaction, 'Failed to archive application.', err);
		}
	}
}
