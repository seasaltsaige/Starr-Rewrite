import { BaseCommand } from "../../utils/structure/BaseCommand";
import StarrClient from "../../utils/structure/StarrClient";
import { Message } from "discord.js";

import Guild from "../../database/models/Guild";

export default class Warn extends BaseCommand {
    constructor() {
        super({
            name: "warn",
            usage: "warn <user> <reason>",
            aliases: [],
            category: "moderation",
            permissions: ["MANAGE_MESSAGES"],
            description: "Warn users",
        });
    }
    public async run(client: StarrClient, message: Message, args: Array<string>) {
        const warnedMember = message.mentions.members.first() || message.guild.members.cache.get(args[0]);

        if (!warnedMember) return message.channel.send("Please mention someone to warn!");

        let foundGuild = await Guild.findOne({ id: message.guild.id });

        if (!foundGuild) foundGuild = new Guild({ id: message.guild.id });

        let caseId = foundGuild.infractionNumber.toString();

        caseId = caseId.padStart(5, "0");

        let reason = args.slice(1, args.length).join(" ");

        if (!reason) reason = `\`No Reason Provided\` - Use \`${client.cachedPrefixes.get(message.guild.id)}editinfraction ${caseId} <New Reason>\` to set a new reason.`;

        foundGuild.infractions.push({
            user: warnedMember.id,
            description: reason,
            caseId,
            infractionType: "warn",
            date: new Date(),
        });

        foundGuild.infractionNumber++;


        try {
            await foundGuild.save();
        } catch (err) {
            return message.channel.send("Something went wrong while warning that user");
        }

        return message.channel.send(`Successfully warned **${warnedMember.user.tag}** for ${reason} with a infraction ID of #${caseId}`);

    }
}