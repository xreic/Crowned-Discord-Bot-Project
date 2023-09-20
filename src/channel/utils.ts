import { ButtonInteraction, GuildMember, PermissionOverwriteOptions, Snowflake, TextChannel } from 'discord.js';
import { config } from '../config';

export async function moveToApplicationsCategory(textChannel: TextChannel) {
	await textChannel.setParent(config.APPLICATIONS_CATEGORY_ID);
	await textChannel.setPosition(0);
}

export async function archiveApplicationChannel(textChannel: TextChannel) {
	const nonStaffUsers: Snowflake[] = textChannel.members.filter((member) => {
		return member.roles.cache.get(config.STAFF_ROLE_ID);
	}).map((member) => member.id);

	for (const user of nonStaffUsers) {
		await provideMemberOrRolePermsForChannel(user, textChannel, { SendMessages: false });
	}

	await textChannel.setParent(config.ARCHIVED_CATEGORY_ID);
	await textChannel.setPosition(0);
}

export async function provideMemberOrRolePermsForChannel(
	id: Snowflake,
	textChannel: TextChannel,
	permissionOverwrites?: PermissionOverwriteOptions,
) {
	await textChannel.permissionOverwrites.edit(id, {
		ViewChannel: true,
		SendMessages: true,
		...permissionOverwrites,
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

export function checkUserIsStaff(user: GuildMember) {
	return user.roles.cache.some((role) => role.id === config.STAFF_ROLE_ID);
}

export async function satisfyButtonInteraction(interaction: ButtonInteraction) {
	return await (await interaction.reply({ ephemeral: true, content: '.' })).delete();
}
