import { ButtonInteraction, CategoryChannel, GuildMember } from 'discord.js';
import { config } from '../config';
import { createTextChannel } from './create';

export async function userIntendsToApply(interaction: ButtonInteraction) {
	const serverMember: GuildMember = interaction.member as GuildMember;

	const applicationCategory: CategoryChannel =
		serverMember.guild.channels.cache.get(
			config.APPLICATIONS_CATEGORY_ID,
		) as CategoryChannel;

	try {
		await createTextChannel(serverMember, applicationCategory);
	} catch (err) {
		await interaction.reply(`Failed to create new application. <@&${config.STAFF_ROLE_ID}>`);
		console.error('\n\nuserIntendsToApply');
		console.error(err);
	}
}
