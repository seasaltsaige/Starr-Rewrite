import { BaseCommand } from "../../utils/BaseClasses/BaseCommand";
import StarrClient from "../../utils/BaseClasses/StarrClient";
import { Message } from "discord.js";
import Guild from "../../database/models/Guild";

export default class Prefix extends BaseCommand {
    constructor() {
        super({
            name: "prefix",
            usage: "?prefix [default]",
            aliases: ["p"],
            category: "moderation",
            description: "Set a new prefix for the current guild",
            permissions: ["MANAGE_GUILD"],
            enabled: true,
        });
    }
    public async run(client: StarrClient, message: Message, args: Array<string>) {
        let foundGuild = await Guild.findOne({ id: message.guild.id });

        if (!foundGuild) foundGuild = new Guild({
            id: message.guild.id,
        });

        if (args.length < 1) return message.channel.send("Please provide a prefix to set to!");

        if (foundGuild.prefix === args.join(" ")) return message.channel.send("Please set the prefix to something *new*...");

        foundGuild.prefix = args.join(" ");
        

        try {
            await foundGuild.save();
            client.cachedPrefixes.set(message.guild.id, args.join(" "));
        } catch (err) {
            return message.channel.send("Something went wrong while setting the new prefix!");
        }

        return message.channel.send(`Successfully set ${message.guild.name}'s prefix to ${args.join(" ")}`);
    }
}