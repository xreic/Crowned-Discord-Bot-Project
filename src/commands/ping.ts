import {
	ActionRowBuilder,
	ButtonBuilder,
	ButtonStyle,
	CommandInteraction,
	EmbedBuilder,
	PermissionFlagsBits,
	SlashCommandBuilder,
} from 'discord.js';
import { BUTTON_INTERACTION_IDS } from '../types';

export const data = new SlashCommandBuilder()
	.setName('ping')
	.setDescription('Replies with Pong!');

export async function execute(interaction: CommandInteraction) {
	console.log('\ninteraction');

	const isUserAdmin = interaction.memberPermissions?.has(
		PermissionFlagsBits.Administrator,
		true,
	);

	if (!isUserAdmin) {
		return await interaction.reply(
			'You do not have the permissions to use this command',
		);
	}

	const welcomeEmbed = new EmbedBuilder()
		.setColor(0x0099ff)
		.setDescription(`
		Welcome to the Crowned Application Server!

		We are excited to that you are interested in joining our guild.
		Our community is comprised of a variety of players from casual to sweaty and from newbies to end game players.
		We are looking for potential members at nearly all stages of the game to join us.

		To get started, click the "Apply" button below.
		We will only consider applicants who have a Discord account that is at least two (2) years of age.

		Thank you.
		`);

	const applyButton = new ButtonBuilder()
		.setStyle(ButtonStyle.Primary)
		.setCustomId(BUTTON_INTERACTION_IDS.APPLY)
		.setLabel('Apply')
		.setEmoji('📝');

	const row = new ActionRowBuilder<ButtonBuilder>()
		.addComponents([applyButton]);

	try {
		await interaction.channel?.send({ embeds: [welcomeEmbed], components: [row] });
		await interaction.reply('Pong!');
		await interaction.deleteReply();
	} catch (err) {
		console.error('\n\nPing');
		console.error(err);
	}
}
