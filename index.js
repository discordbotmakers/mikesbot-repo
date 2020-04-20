require('dotenv').config();
const {Collection, Client, Discord} = require('discord.js');
const fs = require('fs');
const db = require('quick.db')
const bot = new Client({
    disableEveryone: false
});

const prefix = process.env.PREFIX
bot.commands = new Collection();
bot.prefix = process.env.PREFIX,
Version = "v1.0.4";
bot.aliases = new Collection();
bot.categories = fs.readdirSync("./commands/");
["command"].forEach(handler=>{
    require(`./handlers/${handler}`)(bot);
});

bot.on('ready', () => {
    require('./events/client/ready')(bot)
})
bot.on('message', async message => {
    require('./events/guild/message')(bot,message)
})

bot.login(process.env.BOT_TOKEN)

