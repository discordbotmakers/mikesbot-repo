const {MessageEmbed} = require('discord.js')
module.exports={
    name: "role",
    description: "Create/delete a role with this command!",
    category: "utility",
    run: async(bot,message,args)=>{
        if(!message.member.permissions.has("MANAGE_ROLES")) return message.channel.send(`You don't have the manage roles permission ticked on your role in order for you to execute this command. Error`)

        if(args[0].toLowerCase()=='create'){
            let rName = message.content.split(`${bot.prefix}role create `).join("")
            let rColor;
            args.forEach(arg=>{
                if(arg.startsWith("#")){
                    rColor=arg
                }
            })
            if(!rName){
                return message.channel.send("You didn't guve me a role name :sad:")
            }
            if(!rColor){
                return message.channel.send(`You didn't give me a role color`)
            }
            
        if(rColor>=16777215)return message.channel.send(`exceeding the maximum color #. Keep it between 0 and 1677214`)
        rName=rName.replace(`${rColor}`,``)
        if(rColor<=0)return message.channel.send(`That color range was too small! Sorry but keep it between 0 and 1677214`)
        rName=rName.replace(`${rColor}`,``)
        let rNew = await message.guild.roles.create({
            data:{
                name: rName,
                color: rColor,
            }

        })
        const Embed = new MessageEmbed();
        Embed.setTitle(`New Role Created!`)
        Embed.setDescription(`${message.author.tag} has created a role`)
        Embed.addField(`Role Name`, `"**${rName}**"`)
        Embed.addField(`Role Color`, `Hex Code: ${rColor}`)
        Embed.addField(`Role ID`, `${rNew.id}`)
        Embed.setColor(rColor)
        Embed.setFooter(`Role Created At`)
        Embed.setTimestamp();
        Embed.setThumbnail(message.author.displayAvatarURL())
        message.channel.send(Embed)
    }else if(args[0].toLowerCase()=='delete'){
        let roleDelete = message.guild.roles.cache.get(args[1])||message.guild.roles.cache.find(r=>r.name==args[1])
        if(!roleDelete)return message.channel.send(`Error while trying to delete the role. If the error keeps continuing, make sure to check for valid spelling,caps,formatting,gramatical errors. Otherwise restart the client.`)
        roleDelete.delete()
        const deleteembed = new MessageEmbed();
        deleteembed.setTitle("Role Deleted")
        deleteembed.setDescription(`${message.author.tag} deleted the role "**${roleDelete.name}**"`)
        deleteembed.addField(`Deleted Role ID`, `${roleDelete.id}`)
        deleteembed.addField(`Deleted Role Color`, `${roleDelete.color}`)
        deleteembed.setColor(roleDelete.color)
        deleteembed.setFooter(`Role deleted at`)
        deleteembed.setThumbnail(message.author.displayAvatarURL())
        deleteembed.setTimestamp();
        message.channel.send(deleteembed)
        message.author.send(`Deleted Role ID: ${roleDelete.id}`)
    }
}}