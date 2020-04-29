const {MessageEmbed} = require('discord.js');
const ms = require('ms')
module.exports={
    name: 'gcreate',
    aliases: ['giveaway'],
    description: 'Creates a giveaway',
    usage: '<time><prize>', //🎉
    category: 'fun',
    run: async(bot,message,args)=>{
       if(!args[0]) return message.channel.send(`No time specified!`)
        
        if(!args[0].endsWith("d")&&!args[0].endsWith("w")&&!args[0].endsWith("s")&&!args[0].endsWith("h")&&!args[0].endsWith("m")) return message.channel.send(`Incorrect Format. Make sure the time ends with s/d/m/h/w for the respective time`)
        if(isNaN(args[0][0])) return message.channel.send(`The time is not a number. Please try again.`)
        var giveRole = message.guild.roles.cache.find(r => r.name === "Giveaways")
        if(!message.member.roles.cache.has(giveRole.id) && !message.member.permissions.has("MANAGE_GUILD")){
             return message.channel.send(`You need a role called **Giveaways** or be able to manage the guild in order to start a giveaway!`)
        }
        let channel = message.mentions.channels.first() || message.guild.channels.cache.get(args[1]) || message.guild.channels.cache.find(c => c.name === `${args[1]}`)
        if(args[1] === "here") channel = message.channel
        if(!channel) return message.channel.send(`No channel specified`)
        
        let prize = args.slice(2).join(" ")
        if(!prize) return message.channel.send(`No prize specified`)
        message.channel.send(`Succesfully started a giveaway in <#${channel.name}>`)
        let Embed = new MessageEmbed()
        Embed.setTitle(`${prize}`)
        Embed.setDescription(`React with 🎉 to enter.\n\nEnds in ${args[0]}`)
        Embed.setFooter(`Giveaway ends at`)
        Embed.setTimestamp(Date.now()+ms(args[0]))
        Embed.setColor(`RANDOM`)
        let m = await channel.send("🎉 **GIVEAWAY TIME** 🎉", Embed)
        m.react('🎉')
        setTimeout(() => {
             
            if(m.reactions.cache.size<=0) return channel.send(`No one reacted to the giveaway in order for me to pick a winner.`)
            let winner = m.reactions.cache.get('🎉').users.cache.filter(u=>!u.bot).random()
            channel.send(`Congrats ${winner}, you won the **${prize}**!`)
            var bed = new MessageEmbed()
            bed.setTitle(prize.toUpperCase())
            bed.setDescription(`**Host:** <@${message.author.id}>\n**Winner:** ${winner}\n**Total Entries:** ${m.reactions.cache.get('🎉').users.cache.filter(u => !u.bot).size}`)
            bed.setColor(`RANDOM`)
            bed.setTimestamp(Date.now())
            bed.setFooter(`Giveaway ended at`)
            m.edit("🎉 **GIVEAWAY ENDED** 🎉", bed)

        }, ms(args[0]))

    }
} 
