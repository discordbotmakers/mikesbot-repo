const {MessageEmbed} = require('discord.js')
const {stripIndents} = require('common-tags')
const ms = require("ms")
module.exports = {
    name: "help",
    category: 'info',
    usgae: "help [command]", 
    description: "Returns info on commands",
    timeout: 10000,
    run: async (bot, message, args) => {
         if(args[0]){
             return getCMD(bot,message,args[0])
          } else {
        return getAll(bot,message)
    }
}
}
function getAll(bot,message){
    const helpembed = new MessageEmbed();
    helpembed.setColor("RANDOM")
    const commands = (category) =>{
        return bot.commands.filter(cmd=>cmd.category===category).map(cmd=>`- \`${cmd.name}\``).join(" ");
        
    }
    const info = bot.categories.map(cat=>stripIndents`**${cat[0].toUpperCase()+cat.slice(1)}**\n${commands(cat)}`).reduce((string,category) => string+"\n"+category)

        helpembed.setDescription(info)
        helpembed.setFooter(`There are ${bot.commands.size} commands!`)
        message.channel.send(helpembed)
    
}
function getCMD(bot,message,input){
    const hembed = new MessageEmbed()
    const cmd = bot.commands.get(input.toLowerCase() || bot.commands.get(bot.aliases.get(input.toLowerCase())));
    let info = `No information found for: **${input.toLowerCase()}**`
    if(!cmd)return message.channel.send(hembed.setColor('RANDOM').setDescription(info));
    if(cmd.name) info = `**Command name**: ${cmd.name}`
    if(cmd.description) info += `\n**Description**: ${cmd.description}`
    if(cmd.aliases) info += `\n**Aliases**: ${cmd.aliases.map(a=>`\`${a}\``).join(", ")}`
    if(cmd.usage) info += `\n**Usage:** ${cmd.usage}`; hembed.setFooter(`Syntax: <> = required, [] = optional`);
    if(cmd.timeout) info += `\n**Timeout**: ${ms(cmd.timeout)}`
    return message.channel.send(hembed.setColor("RANDOM").setDescription(info))
}