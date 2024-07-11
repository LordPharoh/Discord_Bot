const { EmbedBuilder, Guild } = require('discord.js');
const { guildId, welcomeChannel, welcomeMsgToggle, welcomeRoleToggle, welcomeRole } = require('../../../config.json');

module.exports = client => {
	client.on('guildMemberAdd', async (member) => {
		if (member.guild.id !== guildId) { return; }

		console.log('someone joined our discord :o');
		if (welcomeMsgToggle) {
			const welcomeMsg = new EmbedBuilder()
				.setColor('000000')
				.setDescription(`### Welcome to the Sb Eternals server!\n### ${member}`)
				.setThumbnail(member.user.displayAvatarURL());

			const channel = member.guild.channels.cache.get(welcomeChannel);
			await channel.send({ embeds: [welcomeMsg] });
		}

		if (welcomeRoleToggle) {
			await member.roles.add(welcomeRole);
            await member.roles.add('1241230124129452154');
			await member.roles.add('1233593801621245952');
		}
	});
};