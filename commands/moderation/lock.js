const validateFlag = f => f === 'true' || f === 'false' || f === 'null'

module.exports = {
    name: "lockdown",
    description: "locksdown a server",
    usage: ".lockdown <role id or server id> (true/false/null)",
    run: async(bot, message, args) => {
        if(args.split(' ').length !== 2) return message.channel.send(`${bot.prefix}lock <Role ID | Server ID true,false,null`);
        let [ roleId, flag ] = args.split(' ');
        if(!isNaN(roleId) && validateFlag(flag.toLowerCase())) {
            flag = flag.toLowerCase() === 'true' ? true : (flag.toLowerCase() === 'false' ? false : null);
         const channels =   message.guild.channels.cache.filter(ch => ch.type !== 'category')
         
        }
    }
} 