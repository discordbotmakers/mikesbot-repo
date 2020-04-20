require('dotenv').config();
const {Collection, Client, Discord} = require('discord.js');
const fs = require('fs');
const db = require('quick.db')
const { ErelaClient } = require('erela.js')
const bot = new Client({
    disableEveryone: false
});
const prefix = process.env.PREFIX

bot.commands = new Collection();
bot.prefix = prefix,
Version = "v1.0.4";
bot.aliases = new Collection();
bot.categories = fs.readdirSync("./commands/");
["command","event"].forEach(handler=>{
    require(`./handlers/${handler}`)(bot);
});




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


bot.login(process.env.BOT_TOKEN)

