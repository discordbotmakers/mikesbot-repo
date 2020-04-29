module.exports = {
    name: "webhook",
    description: "Send a webhhook message to a channel",
    run: async(bot, message, args)=>{
        
        const webhooks = await message.channel.fetchWebhooks()
        
        var webhook = webhooks.first();
        if(!webhook) return message.channel.send(`There isn\'t a webhook created in this channel!`)
        await webhook.send(`${args.join(" ")}`, {
            username: `${message.author.username}`,
            avatarURL: `${message.author.displayAvatarURL()}`,
            
        }) 
    }
}