require('dotenv').config();
const {prefix} = process.env.PREFIX
module.exports=bot=>{
    bot.user.setActivity(`${bot.users.cache.size} users | ${bot.prefix}help`, {type: "WATCHING"}, {url: "https://discord.gg/kugRv6Y"});
    console.log(`${bot.user.tag} is online and has loaded\n${bot.commands.size} commands\nBot ping is ${bot.ws.ping}ms\nRun ${bot.prefix}help for any command help`)
}