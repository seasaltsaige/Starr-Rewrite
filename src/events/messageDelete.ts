import StarrClient from "../utils/BaseClasses/StarrClient";
import { Message } from "discord.js";

export default class messageDelete {
    static async run(client: StarrClient, message: Message) {

        client.snipes.set({
            guild: message.guild.id,
            channel: message.channel.id,
        },
        {
            content: message.content,
            author: message.author.id,
            image: message.attachments.first() ? message.attachments.first().proxyURL : null,
        });
    }
}