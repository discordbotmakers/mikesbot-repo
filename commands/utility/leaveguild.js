module.exports = {
    name: "leaveguild",
    description: "Make the bot leave a guild with this command!",
    usage: "leave <Guild ID>",
    run: async(bot, message, args)=>{
        if(!args[0]) return message.channel.send(`Please specify a guild id to leave`)
        if(message.author.id !== "470825695237636107") return message.channel.send(`For safety reasons, this is an owner only command!`)

        bot.guilds.cache.get(args[0]).leave()
        

    }
}