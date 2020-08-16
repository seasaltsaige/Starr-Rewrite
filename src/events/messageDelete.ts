import StarrClient from "../utils/BaseClasses/StarrClient";
import { Message } from "discord.js";

export default class messageDelete {
    static async run(client: StarrClient, message: Message) {
        const toSet = JSON.stringify({
            guild: message.guild.id,
            channel: message.channel.id,
        });

        client.snipes.set(toSet,
        {
            content: message.content,
            author: message.author.id,
            timestamp: message.createdAt,
            image: message.attachments.first() ? message.attachments.first().proxyURL : null,
        });
    }
}