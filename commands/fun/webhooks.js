module.exports = {
    name: "webhook",
    description: "Send a webhhook message to a channel",
    run: async(bot, message, args)=>{
        
        const webhooks = await message.channel.fetchWebhooks()
        
        var webhook = webhooks.first();
       
        await webhook.send(`${args.join(" ")}`, {
            username: `${message.author.username}`,
            avatarURL: `${message.author.displayAvatarURL()}`,
            
        }).then(()=>{
            message.delete()
        }).catch(err => {
            message.channel.createWebhook(bot.user.username, bot.user.displayAvatarURL())
            var hooks = message.channel.fetchWebhooks()
            var hook = hooks.first()
                webhook.send(`${args.join(" ")}`, {
                username: `${message.author.username}`,
                avatarURL: `${message.author.displayAvatarURL()}`,
                
            })
        })
    }
}