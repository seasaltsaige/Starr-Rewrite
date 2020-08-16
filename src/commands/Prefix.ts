import { BaseCommand } from "../utils/BaseClasses/BaseCommand";
import StarrClient from "../utils/BaseClasses/StarrClient";
import { Message } from "discord.js";
import Guild from "../database/models/Guild";

export default new class Prefix extends BaseCommand {
    constructor() {
        super({
            name: "prefix",
            usage: "?prefix",
            aliases: ["p"],
            description: "Set a new prefix for the current guild",
            permissions: ["MANAGE_GUILD"],
            enabled: true,
        });
    }
    async run (client: StarrClient, message: Message, args: Array<string>) {
        let foundGuild = await Guild.findOne({ id: message.guild.id });

        if (!foundGuild) foundGuild = new Guild({
            id: message.guild.id,
        });

        foundGuild.prefix = args.join(" ");

        try {
            await foundGuild.save();
        } catch (err) {
            return message.channel.send("Something went wrong");
        }

        return message.channel.send(`Successfully set ${message.guild.name}'s prefix to ${args.join(" ")}`);
    }
}