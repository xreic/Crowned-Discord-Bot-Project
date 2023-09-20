import { ButtonInteraction, GuildMember, Snowflake } from 'discord.js';
import { config } from '../../config';

const approvalMessage = (id: Snowflake) => `
<@${id}> application has been approved.
You can join the main server through this link: ${config.DISCORD_SERVER_LINK} 
**Please do not share the server invite.**
`;

export async function approveApplication(interaction: ButtonInteraction) {
	console.log('\n\napproveApplication');

	const serverMember: GuildMember = interaction.member as GuildMember;
	const serverMemberIsStaff = serverMember.roles.cache.some((role) => role.id === config.STAFF_ROLE_ID);

	if (!serverMemberIsStaff) {
		return await interaction.reply({
			ephemeral: true,
			content: `<@${serverMember.id}> only staff members can approve applications.`,
		});
	}

	// Satisfy the button interaction with a response.
	await (await interaction.reply({ ephemeral: true, content: '.' })).delete();

	await interaction.message.channel.send({
		content: approvalMessage(serverMember.id),
	});
}
