module.exports = {
    name: "webhook",
    description: "Send a webhhook message to a channel",
    run: async(bot, message, args)=>{
        
        const webhooks = await message.channel.fetchWebhooks()
        
        var webhook = webhooks.first();
        if(webhook === null){
            message.channel.createWebhook(`${message.author.username}`, message.author.displayAvatarURL())
             webhook = webhooks.first()
        }
        await webhook.send(`${args.join(" ")}`, {
            username: `${message.author.username}`,
            avatarURL: `${message.author.displayAvatarURL()}`,
            
        }).then(()=> {
            message.delete()
        }) 
    }
}