import { ButtonInteraction, GuildMember, TextChannel } from 'discord.js';
import { archiveApplicationChannel, checkUserIsStaff } from '../utils';
import { config } from '../../config';

export async function archiveApplicationTextChannel(interaction: ButtonInteraction) {
	const serverMember: GuildMember = interaction.member as GuildMember;
	const serverMemberIsStaff = checkUserIsStaff(serverMember);

	if (!serverMemberIsStaff) {
		return await interaction.reply({
			ephemeral: true,
			content: `<@${serverMember.id}> only staff members can archive applications.`,
		});
	}

	const textChannel = interaction.channel as TextChannel;

	if (textChannel.parentId === config.ARCHIVED_CATEGORY_ID) {
		await interaction.message.channel.send('This channel has already been archived.');
	} else {
		await archiveApplicationChannel(interaction.channel as TextChannel);
	}
}
