require('dotenv').config();
const {Collection, Client, Discord} = require('discord.js');
const fs = require('fs');
const db = require('quick.db')
const bot = new Client({
    disableEveryone: false
});
const prefix = process.env.PREFIX

bot.commands = new Collection();
bot.prefix = prefix,
bot.aliases = new Collection();
bot.categories = fs.readdirSync("./commands/");
["command"].forEach(handler=>{
    require(`./handlers/${handler}`)(bot);
});
bot.on('ready',()=>{
    bot.user.setActivity(`${bot.prefix}help`, {type: "WATCHING"}, {url: "https://discord.gg/kugRv6Y"});
    console.log(`${bot.user.tag} is online and has loaded\n${bot.commands.size} commands\nBot ping is ${bot.ws.ping}ms\nRun ${bot.prefix}help for any command help`)

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
bot.login(process.env.BOT_TOKEN)
