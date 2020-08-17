import { BaseCommand } from "../utils/BaseClasses/BaseCommand";
import StarrClient from "../utils/BaseClasses/StarrClient";
import { Message, MessageEmbed } from "discord.js";
import Guild from "../database/models/Guild";

export default new class ViewWarns extends BaseCommand {
    constructor() {
        super({
            name: "viewwarns",
            usage: "?viewwarns <user>",
            aliases: ["warns", "vwarns"],
            category: "moderation",
            permissions: ["MANAGE_MESSAGES"],
            description: "Check warns of a given user",
        });
    }

    async run(client: StarrClient, message: Message, args: Array<string>) {
        let foundGuild = await Guild.findOne({ id: message.guild.id });
        if (!foundGuild) foundGuild = new Guild({ id: message.guild.id });
        
        const member = message.mentions.members.first() || message.guild.members.cache.get(args[0]);

        if (!member) return message.channel.send("Please mention someone to view their warn history.");

        const Warns_Exist = foundGuild.warns.find(warn => warn.user === member.id);

        if (!Warns_Exist) return message.channel.send("That member has no warns!");

        const warns = foundGuild.warns.filter(warn => warn.user === member.id);




        const embed = new MessageEmbed()
            .setAuthor(`${member.user.tag}'s warns`, member.user.displayAvatarURL({ format: "png" }));
            // warns.forEach(warn => { embed.addField(`Infraction #${warn.caseId}`, warn.warn) });
            embed.addField(`Case #${warns[0].caseId}`, warns[0].warn);
            embed.setFooter(`Page: 1/${warns.length}`);
        const msg = await message.channel.send(embed);

        if (warns.length > 1) {
            msg.react("⏪").then(r => msg.react("◀️").then(r => msg.react("▶️").then(r => msg.react("⏩"))));
        
            
        
        }

    }
}