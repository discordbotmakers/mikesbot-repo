const { MessageEmbed } = require('discord.js');
const { stripIndents } = require("common-tags");

module.exports = {
    name: "suggest",
    category: "fun",
    description: "Makes a suggestion",
    usage: "suggest <suggestion>",
    run: async (bot, message, args) => {
        if (message.deletable) message.delete();

       
        
        const sugchan = message.guild.channels.cache.find(c => c.name === "suggestions")
            
    
        if (!sugchan)
            return message.channel.send("Couldn't find a `#suggestions` channel. To fix this please make a channel named `#suggestions`.").then(m => m.delete(5000));
            let Str = message.content.slice(bot.prefix.length+7+1)
            let pollembed = new MessageEmbed()
            pollembed.setTitle(`Suggestion from ${message.author.tag}`)
            pollembed.setDescription(Str)
            pollembed.setColor(`RANDOM`)
            pollembed.setFooter(`Suggestion bot made by Mike H`)
            pollembed.setTimestamp()
            pollembed.setThumbnail(message.author.displayAvatarURL())
            let msg = await sugchan.send(pollembed);
            await msg.react('✅')
            await msg.react('❌') 

        

        
    }
}