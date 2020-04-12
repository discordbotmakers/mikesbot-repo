const {Collection, Client, Discord} = require('discord.js');
const fs = require('fs');
const bot = new Client({
    disableEveryone: false
});

const prefix = prefix
const token = token
bot.commands = new Collection();
bot.prefix = config.prefix,
bot.aliases = new Collection();
bot.categories = fs.readdirSync("./commands/");
["command"].forEach(handler=>{
    require(`./handlers/${handler}`)(bot);
});
bot.on('ready',()=>{
    bot.user.setActivity(`${bot.prefix}help`, {type: "WATCHING"}, {url: "https://discord.gg/kugRv6Y"});
    console.log(`${bot.user.username} is now online! Run ${bot.prefix}help for any help!`)

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
    if(command) command.run(bot, message,args)
})
bot.login(token)