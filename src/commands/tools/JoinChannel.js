const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');
const { joinVoiceChannel, createAudioPlayer, createAudioResource, AudioPlayerStatus,VoiceConnectionStatus,getVoiceConnection,entersState } = require('@discordjs/voice');
module.exports = {
    data: new SlashCommandBuilder()
        .setName('join')
        .setDescription('Joins a voice channel'),
    async execute(interaction) {
        if (!interaction.member.voice.channel) {
            await interaction.reply('You need to be in a voice channel to use this command.');
            return;
        }
        const connection = joinVoiceChannel({
            channelId: interaction.member.voice.channel.id,
            guildId: interaction.guildId,
            adapterCreator: interaction.guild.voiceAdapterCreator
        })
        const player = createAudioPlayer();
        const resource = createAudioResource(`./src/assets/notification.mp3`);
        try {
            await entersState(connection, VoiceConnectionStatus.Ready, 5000);
            const exampleEmbed = new EmbedBuilder()
            .setColor(0x0099FF)
            .setTitle('Song title')
            .setDescription('Song playing')
            interaction.reply({ embeds: [exampleEmbed] });
        } catch (error) {
            return null;
        }
        connection.subscribe(player)
        player.play(resource)

        player.on(AudioPlayerStatus.Playing, () => {
        });


    },
};