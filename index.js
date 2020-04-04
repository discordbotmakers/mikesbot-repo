const {Collection, Client, Discord} = require('discord.js');
const fs = require('fs');
const bot = new Client({
    disableEveryone: true
});
const config = require('./config.json')
const prefix = config.prefix
const token = config.token
bot.commands = new Collection();
bot.prefix = config.prefix,
bot.aliases = new Collection();
bot.categories = fs.readdirSync("./commands/");
["command"].forEach(handler=>{
    require(`./handlers/${handler}`)(bot);
});
bot.on('ready',()=>{
    bot.user.setActivity(`Premium Bot for Mike!`, {type: "WATCHING"});
    console.log(`${bot.user.username} is working ggs my guy`)

})
bot.on('message', async message=>{
    if(message.author.bot) return;
    if(!message.content.startsWith(prefix)) return;
    if(!message.guild) return;
    if(!message.member) message.member = await message.guild.fetchMember(message);
    const args = message.content.slice(prefix.length).trim().split(/ +/g);
    const cmd = args.shift().toLowerCase();
    if(cmd.length == 0 ) return;
    const command = bot.commands.get(cmd)
    if(!command) command = bot.commands.get(bot.aliases.get(cmd));
    if(command) command.run(bot,message,args)
})
bot.login(token)