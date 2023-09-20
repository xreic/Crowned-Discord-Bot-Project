import { ButtonInteraction, GuildMember, Snowflake } from 'discord.js';
import { config } from '../../config';
import { checkUserIsStaff } from '../utils';

const approvalMessage = (id: Snowflake) => `
<@${id}> application has been approved.
You can join the main server through this link: ${config.DISCORD_SERVER_LINK} 
**Please do not share the server invite.**
`;

export async function approveApplication(interaction: ButtonInteraction) {
	const serverMember: GuildMember = interaction.member as GuildMember;
	const serverMemberIsStaff = checkUserIsStaff(serverMember);

	if (!serverMemberIsStaff) {
		return await interaction.reply({
			ephemeral: true,
			content: `<@${serverMember.id}> only staff members can approve applications.`,
		});
	}

	await interaction.message.channel.send({
		content: approvalMessage(serverMember.id),
	});
}
