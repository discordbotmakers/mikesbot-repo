const {MessageEmbed} = require("discord.js") //677340869233344514 < channel id
module.exports={
    name: "ad",
    category: "fun",
    description: "Use this command to advertise your medias!",
    usage: ".ad <advertisement> <link>",
    run: async(bot,message,args)=>{
        let Str = message.content.slice(bot.prefix.length+2+1)
        if(!args[0])return message.channel.send("You didn't specify your advertisement!")
        let linkad
            args.forEach(arg=>{
                if(arg.startsWith("https://")){
                    linkad=arg
                }
            })
        bot.channels.cache.get("697271860756480070").send(new MessageEmbed().setThumbnail(message.author.displayAvatarURL()).setTitle(`New advertisement by ${message.author.tag}`).setFooter("Advertisement Bot Made by Mike H.").setTimestamp().setDescription(Str).addField(`Link`, `${linkad}`).addField(`Author`, `${message.author.username}`).setColor("RANDOM"))
    }
}




























