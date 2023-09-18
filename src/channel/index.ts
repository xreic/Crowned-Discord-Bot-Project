import { ButtonInteraction, CategoryChannel, GuildMember } from 'discord.js';
import { config } from '../config';
import { createTextChannel } from './create';
import { BUTTON_INTERACTION_IDS } from '../types';

export async function userIntendsToApply(interaction: ButtonInteraction) {
	console.log('\nuserIntendsToApply');

	const buttonId = interaction.customId;
	console.log(`buttonId: ${buttonId}`);

	const serverMember: GuildMember = interaction.member as GuildMember;

	const applicationCategory: CategoryChannel =
		serverMember.guild.channels.cache.get(
			config.APPLICATIONS_CATEGORY_ID,
		) as CategoryChannel;

	if (buttonId === BUTTON_INTERACTION_IDS.APPLY) {
		try {
			const applicationTextChannel = await createTextChannel(
				serverMember,
				applicationCategory,
			);
		} catch (err) {
			console.log(err);
		}
	} else if (buttonId === BUTTON_INTERACTION_IDS.CALL) {
		console.log(interaction);
	}
}
