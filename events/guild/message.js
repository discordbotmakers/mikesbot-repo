require('dotenv').config();
const Timeout = new Set();
const {prefix} = process.env.PREFIX
const ms = require("ms")
module.exports=async(bot,message)=>{
    bot.on('message', async message=>{
        if(message.author.bot) return;
        if(!message.content.startsWith(prefix)) return;
        if(!message.guild) return;
        if(!message.member) message.member = await message.guild.fetchMember(message);
        const args = message.content.slice(prefix.length).trim().split(/ +/g);
        const cmd = args.shift().toLowerCase();
        if(cmd.length == 0 ) return;
        var command = bot.commands.get(cmd)
        if(!command) command = bot.commands.get(bot.aliases.get(cmd));
        if(command) command.run(bot, message,args)
    })
}