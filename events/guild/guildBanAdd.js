const {MessageEmbed} = require('discord.js')

module.exports = async(bot, guild, user)=>{
    const channel = guild.channels.cache.find(c => c.name === "logs")
    var embed = new MessageEmbed()
    channel.createWebhook(`${bot.user.username}-logging`, `${bot.user.displayAvatarURL()}`)
    const webhooks = await channel.fetchWebhooks();
    const webhook = webhooks.first()

    embed.setTitle(`${user.tag} was banned`)
    embed.setDescription(`${user.tag} was banned from ${guild.name}`)
    embed.setFooter(`User ID: ${user.id}`)
    embed.setTimestamp()
    embed.setColor("RANDOM")
    embed.setThumbnail(user.displayAvatarURL())

    await webhook.send('Member Banned', {
        username: `Mike\'s-Bot-logging`,
        avatarURL: bot.user.displayAvatarURL(),
        embeds: [embed]
    })

}