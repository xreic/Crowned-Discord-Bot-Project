import { Client, CommandInteraction, EmbedBuilder, SlashCommandBuilder } from 'discord.js';

export const data = new SlashCommandBuilder()
  .setName('ping')
  .setDescription('Replies with Pong!');

export async function execute(interaction: CommandInteraction, client: Client) {
  const exampleEmbed = new EmbedBuilder()
    .setColor(0x0099FF)
    .setDescription(`
    Welcome to the Crowned Application Server!

    We are excited to that you are interested in joining our guild.
    Our community is comprised of a variety of players from casual to sweaty and from newbies to end game players.
    We are looking for potential members at nearly all stages of the game to join us.

    To get started, click the "Apply" button below.
    We will only consider applicants who have a Discord account that is at least two (2) years of age.

    Thank you.
    `)

  try {
    await interaction.channel?.send({ embeds: [exampleEmbed] });
    await interaction.reply('Pong!');
    await interaction.deleteReply();
  } catch (err) {
    await interaction.reply('Command failed.');
  }
}