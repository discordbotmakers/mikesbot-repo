const db = require('quick.db')
module.exports={
    name: 'setprefix',
    description: 'Sets a prefix for your guild!',
    category: 'misc',
    run: async(bot,message,args)=>{
        if(!message.member.hasPermission('MANAGE_GUILD')) return message.channel.send('You must be able to manage the server in order to change the prefix!')
        if (!args[0]) return message.channel.send('No prefix defined.')

        await db.set(`prefix_${message.guild.id}`, args[0])

        const Embed = new MessageEmbed()
        .setTitle('Prefix Changed!')
        .setDescription(`New Prefix\n**${args[0]}**`)
        .setColor('RANDOM')

        message.channel.send(Embed);
    }
}