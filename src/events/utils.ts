import { Snowflake, TextChannel } from 'discord.js';
import { config } from '../config';

export async function moveToApplicationsCategory(textChannl: TextChannel) {
	await textChannl.setParent(config.APPLICATIONS_CATEGORY_ID);
	await textChannl.setPosition(0);
}

export async function provideMemberOrRolePermsForChannel(
	id: Snowflake,
	textChannel: TextChannel,
) {
	await textChannel.permissionOverwrites.edit(id, {
		ViewChannel: true,
		SendMessages: true,
	});
}

export async function provideApplicantAndStaffPermsForTextChannel(
	people: Snowflake[],
	textChannel: TextChannel
) {
	for (const person of people) {
		await provideMemberOrRolePermsForChannel(person, textChannel);
	}
}
