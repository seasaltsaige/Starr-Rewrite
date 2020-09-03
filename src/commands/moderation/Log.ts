import { BaseCommand } from "../../utils/BaseClasses/BaseCommand";
import StarrClient from "../../utils/BaseClasses/StarrClient";
import { Message, GuildMember } from "discord.js";
import Guild from "../../database/models/Guild";

export default class Log extends BaseCommand {
    constructor() {
        super({
            name: "log",
            usage: "?log <set/delete> <channel>",
            aliases: ["logs"],
            category: "moderation",
            description: "Set up your log channel!",
            permissions: ["MANAGE_GUILD", "MANAGE_MESSAGES"],
            enabled: true,
        });
    }

    async run(client: StarrClient, message: Message, args: Array<string>) {

        let foundGuild = await Guild.findOne({ id: message.guild.id });

        if (!foundGuild) foundGuild = new Guild({
            id: message.guild.id,
        });

        let set_delete = args[0];


        switch (set_delete) {
            case "set":
                const channel = message.mentions.channels.first() || message.guild.channels.cache.get(args[1]) || message.guild.channels.cache.find(chan => chan.name.toLowerCase() === args.slice(1, args.length).join("-").toLowerCase());
                if (!channel) return message.channel.send("Please provide a channel!");

                try {
                    foundGuild.logChannel = channel.id;
                    await foundGuild.save();
                } catch (err) {
                    message.channel.send("Something went wrong")
                }

                message.channel.send(`Successfully set your log channel to ${channel}`);
                break;
            case "delete":
                try {
                    foundGuild.logChannel = null;
                    await foundGuild.save();
                } catch (err) {
                    message.channel.send("Something went wrong");
                }

                message.channel.send("Successfully deleted your guilds log channel from the database.");
                break;
            default:
                message.channel.send("Please specify if you would like to set or delete your log channel.");
                break;
        }
    }
}