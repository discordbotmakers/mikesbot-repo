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
})/*
bot.on('guildCreate', async(guild) => {
    var embed = new MessageEmbed()
    embed.setTitle(`Thank you for inviting ${bot.user.username}!`)
    emnbed.setColor("RANDOM")
     const commands = (category) =>{
        return bot.commands.filter(cmd=>cmd.category===category).map(cmd=>`- \`${cmd.name}\``).join(" ");
        
    }
    const info = bot.categories.map(cat=>stripIndents`**${cat[0].toUpperCase()+cat.slice(1)}**\n${commands(cat)}`).reduce((string,category) => string+"\n"+category)

      
    embed.setDescription(`${bot.user.username} was created and coded by Mike Harrison, The owner of Mike\'s Bots and codehub! I have all sorts of commands and features!!\nI was made to insure the security of one\'s guild. Not only that but I have loads of commands that are fun aswell! If you ever need help simply type ${bot.prefix}help and a list of commands will show!`)
    embed.setFooter(`Join our support server if you need any help with the bot!`)
    embed.addField(`Bot Commands`, info)
    embed.addField(`Support Server`, `https://invite.gg/codehub`)
    var channel = guild.channels.random()
    channel.send(embed)


})*/

bot.on('messageUpdate', async(oldMessage,newMessage) => {
    let embed = new MessageEmbed()
    embed.setTitle(`Message Updated`)
    embed.setDescription(`**Author:** ${oldMessage.author.tag}\n**Channel:** <#${oldMessage.channel.id}>`)
    embed.addField(`Old Message`, oldMessage.content, true)
    embed.addField(`New Message`, newMessage.content, true)
    embed.setColor("WHITE")
    embed.setFooter(`Logging Bot Made by Mike H. | Message Edited at`)
    embed.setTimestamp()
    let channel = oldMessage.guild.channels.cache.find(c => c.name === "logs")
    if(!channel) return;
    channel.send(embed)
})

bot.on('messageDelete', async(message)=>{
    let embed = new MessageEmbed()
    embed.setColor("WHITE")
    embed.setTitle(`Message Deleted`)
    embed.setFooter(`Logging Bot Made by Mike H. | Message Deleted at`)
    embed.setTimestamp()

    embed.setDescription(`**Author: ${message.author.tag}**\n**Channel:** <#${message.channel.id}>\n\n**Content:** ${message.content}`)
    let channel = message.guild.channels.cache.find(c => c.name === "logs")
    if(!channel) return;
    channel.send(embed)
})



bot.login(process.env.BOT_TOKEN)

