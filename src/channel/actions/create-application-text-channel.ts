import dayjs from 'dayjs';
import {
	ActionRowBuilder,
	AttachmentBuilder,
	ButtonBuilder,
	ButtonInteraction,
	CategoryChannel,
	ChannelType,
	EmbedBuilder,
	GuildMember,
	Snowflake,
	TextChannel,
} from 'discord.js';
import { config } from '../../config';
import {
	approveButton,
	archiveButton,
	callButton,
} from '../buttons';
import {
	moveToApplicationsCategory,
	provideApplicantAndStaffPermsForTextChannel,
} from '../utils';

const legionGridScreenshotURL = 'https://cdn.discordapp.com/attachments/1058573962516369419/1153198266293424159/image.png';

const initMessageContent = (id: Snowflake) => `
<@${id}> please give the <#${config.RULES_CHANNEL_ID}> channel a read if you haven't already.

There are a few things that we'll need from you before we start the application process.
1. MapleRank Profile (e.g. https://mapleranks.com/u/ArkSoMoon)
2. A screenshot of your Legion Grid. Please do not change the character display ribbon page. See the example below.
3. Complete the questionnaire. (Click the copy button at the top-right of the block below.)
\`\`\`
Is this character a main or second main?


How actively are you playing/progressing this character?


What are your goals for this character and are you interested in liberation?


Were you referred by someone currently in the guild? If so, then please provide their IGN.


If you were in the guild in the past, then please provide the IGN of the character that was in the guild.
\`\`\`

Once you've completed everything, then go ahead and click on the **Call Staff** button above.
`;

export async function createApplicationTextChannel(
	interaction: ButtonInteraction,
	serverMember: GuildMember,
): Promise<TextChannel> {
	const applicationCategory: CategoryChannel =
		serverMember.guild.channels.cache.get(
			config.APPLICATIONS_CATEGORY_ID,
		) as CategoryChannel;

	const applicationTextChannel = await applicationCategory.guild.channels.create({
		name: serverMember.id,
		type: ChannelType.GuildText,
	});

	await moveToApplicationsCategory(applicationTextChannel);

	await provideApplicantAndStaffPermsForTextChannel(
		[serverMember.id, config.STAFF_ROLE_ID],
		applicationTextChannel
	);

	const userCreatedAt = dayjs(serverMember.user.createdAt).unix();

	const initMessage = new EmbedBuilder()
		.setColor(0x0099ff)
		.setTitle('Application Action Center')
		.setDescription(`Account made on <t:${userCreatedAt}:F> <t:${userCreatedAt}:R>`);

	const row = new ActionRowBuilder<ButtonBuilder>()
		.addComponents([callButton, approveButton, archiveButton]);

	await applicationTextChannel.send({ embeds: [initMessage], components: [row] });

	const file = new AttachmentBuilder(legionGridScreenshotURL);

	await applicationTextChannel.send({
		content: initMessageContent(serverMember.id),
		files: [file],
	});

	return applicationTextChannel;
}
