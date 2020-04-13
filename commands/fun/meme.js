const {MessageEmbed} = require('discord.js')
const api = require("imageapi.js")
module.exports={
    name: "meme",
    description: "Get a meme from a reddit",
    category: "fun",
    run: async(bot,message,args)=>{
        if(!args[0]) return message.channel.send("You need to specify a subreddit!.\nList of subreddits:\n```\nmeme\nmemes\ndank\ndankmeme\ncomedyheaven\n```")


        let subreddits = [
            "comedyheaven",
            "dank",
            "meme",
            "memes",
            "blacktwitter"
            
        ]
        let subreddit = subreddits[Math.floor(Math.random()*(subreddits.length)-1)]
        let img = await api(subreddit)
        const Embed = new MessageEmbed()
        .setTitle(`Enjoy this meme from r/${subreddit}`)
        .setURL(`https://reddit.com/r/${subreddit}`)
        .setColor('RANDOM')
        .setImage(img)
        message.channel.send(Embed)
    }
}