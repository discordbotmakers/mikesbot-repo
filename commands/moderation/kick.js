const {MessageEmbed} = require('discord.js')
module.exports={
    name: "kick",
    description: "Kick a mentioned user or their id",
    category: "moderation",
    usage: ".kick <User ID> (reason)",
    aliases: ['k'],
    run: async(bot,message,args)=>{
       if(!args[0])return message.channel.send(`Invalid Command Usage: Try\n "``${bot.prefix}kick <User ID> (reason)\n``" `) 
       let User = message.mentions.members.first() || message.guild.members.cache.get(args[0]);
       if(!User)return message.channel.send("Error while trying to find the user/user id. Please try again.")
       let Reason = message.content.split(`${bot.prefix}kick ${User} `) 
       if(!args[1]) Reason = "No reason specified";
       if(!User.kickable)return message.channel.send("Error while trying to kick the user. Check to see if it's a valid user id, if the user is in the guild, or if the user has a higher role.")
       if(!message.member.permissions.has("KICK_MEMBERS"))return message.channel.send("Invalid permissions. Requires\n ```CSS\n kick members\n ```")
       User.kick(Reason)
       const kickembed = new MessageEmbed()
       kickembed.setTitle("Member Kicked")
       kickembed.setDescription(`<@${message.author.id}> has kicked ${bot.users.cache.get(User.id).username}`)
       kickembed.addField(`Moderator`, `${message.author.tag}`)
       kickembed.addField(`Moderator ID`, `${message.author.id}`)
       kickembed.addField(`Member Kicked`, `${bot.users.cache.get(User.id).tag}`)
       kickembed.addField(`Kicked member ID`, `${bot.users.cache.get(User.id).id}`)
       kickembed.setColor("RANDOM")
       kickembed.addField(`Reason`, `${Reason}`)
       kickembed.setFooter("Moderation bot made by Mike H.")
       kickembed.setTimestamp()
       message.channel.send(kickembed)
       var dmkick = new MessageEmbed()
       dmkick.setTitle(`You have been kicked!`)
       dmkick.setColor("RANDOM")
       dmkick.setDescription(`You have been kicked from\n ${message.guild.name}`)
       dmkick.setFooter(`Moderation bot by Mike H.`)
       dmkick.addField(`Reason`, `${Reason}`)
       dmkick.addField(`Moderator`, `Moderator Tag: ${message.author.tag}\n Moderator Username: ${message.author.username}\n Moderator ID: ${message.author.id}`)
       dmkick.setTimestamp()
       User.send(dmkick)
    }
}