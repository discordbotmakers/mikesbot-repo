require('dotenv').config();
const {Collection, Client, Discord} = require('discord.js');
const {MessageEmbed} = require('discord.js')
const fs = require('fs');
const db = require('quick.db')
const {stripIndents} = require('common-tags')

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




bot.login(process.env.BOT_TOKEN)

