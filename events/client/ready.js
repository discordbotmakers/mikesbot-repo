require('dotenv').config();

module.exports=bot=>{
    bot.channels.cache.get('698780336439558205').send(`${bot.user.username} has restarted and is now online.`)
    bot.user.setActivity(`${bot.users.cache.size} users | ${bot.prefix}help`, {type: "STREAMING"}, {url: "https://discord.gg/kugRv6Y"});
    console.log(`${bot.user.tag} is online and has loaded\n${bot.commands.size} commands\nBot ping is ${bot.ws.ping}ms\nRun ${bot.prefix}help for any command help`)
}