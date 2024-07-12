const { SlashCommandBuilder, PermissionFlagsBits, EmbedBuilder } = require('discord.js');
const { exec } = require('child_process');
const { LordPharoh } = require('../../../../auth.json');

const restart = new EmbedBuilder().setColor('000000').setDescription('**Restarting...**');

const notPharoh = (interaction) => 
{
	const notPharoh = new EmbedBuilder().setColor('FF0000').setDescription('**Only <@297354613143764994> can use this command!**'); 

	if (interaction.user.id !== LordPharoh) 
	{
		interaction.reply({ embeds: [notPharoh] });
		return true;
	}
	return false;
};

const errors = (error, stderr) => 
{
	if (error) { console.log(`Error: ${error.message}`); return; }
	if (stderr) { console.log(`STD Error: ${stderr}`); return; }
};

module.exports = 
{
	type: 'slash',
	data: new SlashCommandBuilder()
		.setName('restart')
		.setDescription('Restart the bot')
		.setDefaultMemberPermissions(PermissionFlagsBits.Administrator),

	async execute(interaction) 
	{
		if (notPharoh(interaction)) { return; };

		exec('git pull && pm2 restart Discord', errors);
		
		interaction.reply({ embeds: [restart] });
	}
};