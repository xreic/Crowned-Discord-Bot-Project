import { ButtonInteraction } from 'discord.js';

export async function archiveApplicationTextChannel(interaction: ButtonInteraction) {
	// Satisfy the button interaction with a response.
	await (await interaction.reply({ ephemeral: true, content: '.' })).delete();

	await interaction.message.channel.send({
		content: `<@${interaction.member?.user.id}> this feature has not been implemented yet.`,
	});
}