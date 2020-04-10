const {MessageEmbed} = require("discord.js") //677340869233344514 < channel id
module.exports={
    name: "say",
    category: "fun",
    description: "Use this command to announce messages to a current channel!",
    usage: ".say <announcement>",
    run: async(bot,message,args)=>{
        if(message.deleteable) message.delete();
        if(!message.member.hasPermission("MANAGE_SERVER")) return message.reply("You need the `Manage Server` permission in order to make an announcement");
        let Str = message.content.slice(bot.prefix.length+3+1)
        if(!args[0])return message.channel.send("You didn't specify your advertisement!")
        
           let announcement = new MessageEmbed();
          announcement.setThumbnail(message.author.displayAvatarURL())
          announcement.setTitle(`New announcement by ${message.author.tag}`)
          announcement.setFooter("Announcement Bot Made by Mike H.")
          announcement.setTimestamp()
          announcement.setDescription(Str)
          announcement.addField(`Author`, `${message.author.username}`)
          announcement.setColor("RANDOM")
          message.channel.send(announcement)

        }
}




























