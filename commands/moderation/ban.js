const {MessageEmbed} = require('discord.js')

module.exports={
    name: "ban",
    description: "ban a mentioned user or their id",
    category: "moderation",
    usage: `ban <User ID> (reason)`,
    run: async(bot,message,args)=>{
       if(!args[0])return message.channel.send(`Invalid Command Usage: Try\n  ${bot.prefix}ban <User ID> (reason)`) 
       let User = message.guild.members.cache.get(args[0])
       if(!User)return message.channel.send("Error while trying to find the user/user id. Please try again.")
       let Reason = message.content.split(`${bot.prefix}ban ${User.id} `)
       if(!args[1]) Reason = "No reason specified";
      // if(!User.banable)return message.channel.send("Error while trying to ban the user. Check to see if it's a valid user id, if the user is in the guild, or if the user has a higher role.")
       if(!message.member.permissions.has("BAN_MEMBERS"))return message.channel.send("Invalid permissions. Requires\n ```CSS\n ban members\n ```")
       User.ban(Reason)
       const banembed = new MessageEmbed()
       banembed.setTitle("Member Banned")
       banembed.setDescription(`<@${message.author.id}> has banned ${bot.users.cache.get(User.id).username}`)
       banembed.addField(`Moderator`, `${message.author.tag}`)
       banembed.addField(`Moderator ID`, `${message.author.id}`)
       banembed.addField(`Member Banned`, `${bot.users.cache.get(User.id).tag}`)
       banembed.addField(`Banned member ID`, `${bot.users.cache.get(User.id).id}`)
       banembed.setColor("RANDOM")
       banembed.addField(`Reason`, `${Reason}`)
       banembed.setFooter("Moderation bot made by Mike H.")
       banembed.setTimestamp()
       message.channel.send(banembed)
       let dmban = new MessageEmbed()
       
       dmban.setTitle(`You have been banned!`)
       dmban.setDescription(`You have been banned from\n** ${message.guild.name}**`)
       dmban.addField(`Moderator`, `Moderator: ${message.author.tag}\n Moderator ID: ${message.author.id}`)
       dmban.addField(`Reason`, `${Reason}`)
       dmban.setTimestamp()
       dmban.setFooter(`Moderation bot by Mike`)
       dmban.setColor("RANDOM")//if you'd like a hex code paste it here otherwise there will be a random color on the embed
       User.send(dmban)
       //You can customize this as much as you'd like
}}