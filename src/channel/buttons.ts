import { ButtonBuilder, ButtonStyle } from 'discord.js';
import { BUTTON_INTERACTION_IDS } from '../types';

export const callButton = new ButtonBuilder()
	.setStyle(ButtonStyle.Primary)
	.setCustomId(BUTTON_INTERACTION_IDS.CALL)
	.setLabel('Call Staff');

export const approveButton = new ButtonBuilder()
	.setStyle(ButtonStyle.Success)
	.setCustomId(BUTTON_INTERACTION_IDS.APPROVE)
	.setLabel('Approve');

export const rejectButton = new ButtonBuilder()
	.setStyle(ButtonStyle.Danger)
	.setCustomId(BUTTON_INTERACTION_IDS.REJECT)
	.setLabel('Reject');

export const archiveButton = new ButtonBuilder()
	.setStyle(ButtonStyle.Primary)
	.setCustomId(BUTTON_INTERACTION_IDS.ARCHIVE)
	.setLabel('Archive');
