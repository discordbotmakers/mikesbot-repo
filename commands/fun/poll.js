const {MessageEmbed} = require('discord.js')
module.exports={
    name: 'poll',
    description: 'Create a simple yes or no poll',
    category: 'fun',
    run: async(bot,message,args)=>{
        if(!message.member.permission.has("MANAGE_SERVER")) return message.channel.send("You don't have the `Mange Servers` permmission ticked on your role :sad: . Sorry");

        const channel = message.mentions.channels.first()||message.guild.channels.cache.get(args[0])
        if(!channel){
            return message.reply("But what channel do I post the poll on Sir/Madam? :thinking:")
        }
    }
}