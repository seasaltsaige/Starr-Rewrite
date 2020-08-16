import { BaseCommand } from "../utils/BaseClasses/BaseCommand";
import StarrClient from "../utils/BaseClasses/StarrClient";
import { Message } from "discord.js";
import Warns from "../database/models/Warns";
import Guild from "../database/models/Guild";

export default new class Warn extends BaseCommand {
    constructor() {
        super({
            name: "warn",
            usage: "?warn <user> <reason>",
            aliases: [],
            category: "moderation",
            permissions: ["MANAGE_MESSAGES"],
            description: "Warn users",
        });
    }
    async run(client: StarrClient, message: Message, args: Array<string>) {
        const warnedMember = message.mentions.members.first();

        if (!warnedMember) return message.channel.send("Please mention someone to warn!");

        let foundGuild = await Guild.findOne({ id: message.guild.id });

        if (!foundGuild) foundGuild = new Guild({ id: message.guild.id });

        let userWarns = await Warns.findOne({ guild: message.guild.id, user: warnedMember.id });

        if (!userWarns) userWarns = new Warns({ guild: message.guild.id, user: warnedMember.id });

        let warnId = foundGuild.warnNumber.toString();

        warnId = warnId.padStart(5, "0");

        let reason = args.slice(1, args.length).join(" ");

        if (!reason) reason = `\`No Reason Provided\` - Use \`${await client.getGuildPrefix(message.guild)}editwarn ${warnId} <New Reason>\` to set a new reason.`;

        userWarns.warns.push({
            warn: reason,
            warnId,
        });

        foundGuild.warnNumber++;

        try {
            await userWarns.save();
            await foundGuild.save();
        } catch (err) {
            return message.channel.send("Something went wrong while warning that user");
        }

        return message.channel.send(`Successfully warned **${warnedMember.user.tag}** for ${reason} with a warn ID of ${warnId}`);

    }
}