const {MessageEmbed} = require('discord.js')

module.exports = {
    name: "avatar",
    description: "Get a users or your avatar!",
    usage: "avatar | avatar <Mention | ID>",
    run: async(bot, message, args) =>{
        var User = message.guild.members.find(u => u.tag === `${args[0]}`) || message.mentions.members.first() || message.guild.members.cache.get(args[0]) || message.member;

        var embed = new MessageEmbed()
        embed.setTitle(`Avatar for ${User.user.tag}`)
        embed.setColor("RANDOM")
        embed.setImage(User.user.displayAvatarURL())
        embed.setFooter(`Avatar Command Powered by Mike H.`, User.user.displayAvatarURL())
        message.channel.send(embed)
    }
}