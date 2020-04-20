const Discord = require('discord.js');

module.exports={
    name: 'clear',
    category: 'moderation',
    aliases: ['c', 'purge'],
    run: async(bot,message, args)=>{
    if(!message.member.permissions.has("MANAGE_MESSAGES")) return message.reply('Looks like you can\'t use this command! You need to have the `Manage Messages` permission ticked on your role!');
    if(!args[0] > [100]) return message.channel.send('Woah there buddy! I can only purge **100** messages. Come on now.')
    if(!args[0]) return message.channel.send("Bruh, I'm not blind but I can\'t see a number.");
    message.channel.bulkDelete(args[0]).then(() => {
         message.channel.send(`Cleared **${args[0]}** messages.`)
    });
}}