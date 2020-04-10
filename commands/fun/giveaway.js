const {MessageEmbed} = require('discord.js');
const ms = require('ms')
module.exports={
    name: 'giveaway',
    description: 'Creates a giveaway',
    usage: '<time><prize>',
    category: 'fun',
    run: async(bot,message,args)=>{
        if(!message.member.hasPermission("MANAGE_SERVER")) return message.reply("You need the `Manage Server` permission in order to execute a giveaway!");
        let timev = message.content.slice(bot.prefix.length+9)
        if(!timev) return message.channel.send("You didn't specify a time in ms");
        let time = parseInt(timev,10)
        if(time<= 5000){
            return message.channel.send('Your time has to be longer than 5seconds!')
        }
        let prize = message.content.split(`${time}`).join("").split(`${bot.prefix}giveaway `).join("")
        if(!prize) return message.channel.send("There isn't a prize for me to giveaway!")
        const Embed = new MessageEmbed();
        Embed.setTitle("Giveaway Time!")
        Embed.setDescription(`This giveaway was created by <@${message.author.id}>`);
        Embed.addField(`Prize`, `${prize}`)
        Embed.addField(`Time`, `This giveaway is ${ms(time)} long!`)
        Embed.setFooter(`Premium Bot Made By Mike!`)
        let msg = await message.channel.send(Embed)
        await msg.react('🎉')
        function winner(msg){
            let winner = msg.reactions.cache.get('🎉').users.cache.random().id
            return winner
            

        }
            
        function reactions(msg){
            return msg.reactions.cache.size
        }
        setTimeout(() => {
            if(reactions(msg) <= 0) return message.channel.send("I can't host a giveaway with less than 1 reaction")
            let winembed = new MessageEmbed();
            winembed.setTitle(`Congrats!`);
            winembed.setDescription(`The winner is <@${winner(msg)}> . Congrats! You won the prize:  **${prize}**!`);
            message.channel.send(winembed)
        }, time);
        
        
        
        

    }
} 