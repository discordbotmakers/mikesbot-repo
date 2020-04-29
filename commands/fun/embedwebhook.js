const {MessageEmbed} = require('discord.js')


module.exports = {
    name: 'embedwebhook',
    description: 'Send an embed webhook to the channel',
    usage: 'embedwebhook <Webhookname> (color) <message>',
    run: async(bot, message, args)=>{
       
           const webhooks = await message.channel.fetchWebhooks()
           let rColor;
           args.forEach(arg=>{
               if(arg.startsWith("#")){
                   rColor=arg
               }
           })
               if(args[1] === "None"){
                   rColor = null
               }
               if(!rColor) rColor = "RANDOM"
           var webhook = webhooks.first();
           if(!webhook) return message.channel.send(`There isn\'t a webhook created in this channel!`)
            var embed = new MessageEmbed()
                .setDescription(args.slice(2).join(" "))
                .setColor(rColor)
           await webhook.send({
               username: args[0],
               avatarURL: message.author.displayAvatarURL(),
               embeds: [embed]
           })
    


}
}