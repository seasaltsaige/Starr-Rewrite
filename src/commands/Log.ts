import { BaseCommand } from "../utils/BaseClasses/BaseCommand";
import StarrClient from "../utils/BaseClasses/StarrClient";
import { Message } from "discord.js";
import Guild from "../database/models/Guild";

export default new class Log extends BaseCommand {
    constructor() {
        super({
            name: "log",
            usage: "?log <set/delete> <channel>",
            aliases: ["logs"],
            description: "Set up your log channel!",
            permissions: ["MANAGE_GUILD", "MANAGE_MESSAGES"],
            enabled: true,
        });
    }

    async run (client: StarrClient, message: Message, args: Array<string>) {

        let foundGuild = await Guild.findOne({ id: message.guild.id });

        if (!foundGuild) foundGuild = new Guild({
            id: message.guild.id,
        });

        const channel = message.mentions.channels.first() || message.guild.channels.cache.get(args[0]) || message.guild.channels.cache.find(chan => chan.name.toLowerCase() === args.join("-").toLowerCase());

        if (!channel) return message.channel.send("Please provide a channel!");

        try {
            await foundGuild.save();
            await Guild.findOneAndUpdate({ id: message.guild.id }, { logChannel: channel.id }, { new: true, useFindAndModify: false });
        } catch (err) {
            message.channel.send("Somethiong went wrong")
        }

        return message.channel.send(`Successfully set your log channel to ${channel}`);

    }
}