const { MessageEmbed } = require('discord.js');
const { stripIndents } = require("common-tags");

module.exports = {
    name: "report",
    category: "moderation",
    description: "Reports a member",
    usage: "<mention, id>",
    run: async (bot, message, args) => {
        if (message.deletable) message.delete();

        let rMember = message.mentions.members.first() || message.guild.members.cache.get(args[0]);

        if (!rMember)
            return message.reply("Couldn't find that person?").then(m => m.delete(5000));

      //  if (rMember.hasPermission("BAN_MEMBERS") || rMember.user.bot)
          //  return message.channel.send("Sorry i can't report that member, as they may have higher power than me.").then(m => m.delete(5000));

        if (!args[1])
            return message.channel.send("Please provide a reason for the report").then(m => m.delete(5000));
        
        const channel = message.guild.channels.cache.find(c => c.name === "reports")
            
    
        if (!channel)
            return message.channel.send("Couldn't find a `#reports` channel. To fix this please make a channel named `#reports`.").then(m => m.delete(5000));

        const embed = new MessageEmbed()
            .setColor("#ff0000")
            .setTimestamp()
            .setTitle("Report")
            .addField('Member:' , `> ${rMember}`)
            .addField('Members ID:' , `> \`${rMember.user.id}\``)
            .addField('Reported by:' , `> ${message.member}`)
            .addField('Reason:' , `> ${args.slice(1).join(" ")}`)
            .addField('Reported in:' , `> ${message.channel}`)
            .setFooter(message.guild.name, message.guild.iconURL)
            .setThumbnail(rMember.user.displayAvatarURL)

        

        return channel.send(embed);
    }
}