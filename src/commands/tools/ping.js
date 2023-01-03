const { SlashCommandBuilder } = require('discord.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('ping')
		.setDescription('Replies with Pong!'),
	async execute(interaction, client) {
		const message = await interaction.deferReply({
			fetchReply: true
		});
		const newMessage = `ApiLatency: ${client.ws.ping}\nClientPing: ${message.createdTimestamp - interaction.createdTimestamp}`
		await interaction.editReply({
			content: newMessage
		});
	},
};