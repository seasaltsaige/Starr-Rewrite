import { BaseCommand } from "../../utils/BaseClasses/BaseCommand";
import StarrClient from "../../utils/BaseClasses/StarrClient";
import { Message, MessageEmbed } from "discord.js";

export default class Snipe extends BaseCommand {
    constructor() {
        super({
            name: "snipe",
            usage: "?snipe <channel>",
            aliases: ["sniper"],
            category: "fun",
            description: "Snipe the last sent message of the channel",
            permissions: ["SEND_MESSAGES"],
            enabled: true,
        });
    }
    async run(client: StarrClient, message: Message, args: Array<string>) {

        const channel = message.mentions.channels.first() || message.channel;

        const snipeData = client.getSnipe(client, message.guild, channel);

        const messageAuthor = message.guild.members.cache.get(snipeData.author);

        const embed = new MessageEmbed()
            .setAuthor(messageAuthor.user.tag, messageAuthor.user.displayAvatarURL({ format: "png" }))
            .setDescription(`${snipeData.content}`)
            .setTimestamp(snipeData.timestamp);
        return message.channel.send(embed);

    }
}