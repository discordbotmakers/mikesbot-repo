const {MessageEmbed} = require("discord.js") //677340869233344514 < channel id
module.exports={
    name: "announce",
    category: "fun",
    description: "Use this command to announce messages to a current channel!",

    usage: ".announce <announcement>",

    run: async(bot,message,args)=>{
        if(message.deleteable) message.delete();
        if(!message.member.hasPermission("MANAGE_SERVER")) return message.reply("You need the `Manage Server` permission in order to make an announcement");
        let Str = message.content.slice(bot.prefix.length+8+1)
      if(!args[0])return message.channel.send("You didn't specify your advertisement!")
        
           message.channel.send(Str)
          
          
          
         
          
          
          
          
        }

}




























