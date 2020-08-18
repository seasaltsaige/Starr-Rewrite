import StarrClient from "../utils/BaseClasses/StarrClient";
import { Message } from "discord.js";
import BaseEvent from "../utils/BaseClasses/BaseEvent";
import GhostPing from "../utils/checks/GhostPing";

export default class MessageDelete extends BaseEvent {
    constructor() {
        super({
            name: "messageDelete"
        })
    }
    public async run(client: StarrClient, message: Message) {
        const toSet = JSON.stringify({
            guild: message.guild.id,
            channel: message.channel.id,
        });

        client.snipes.set(toSet, {
            content: message.content,
            author: message.author.id,
            timestamp: message.createdAt,
            image: message.attachments.first() ? message.attachments.first().proxyURL : null,
        });

        const ghostPing = new GhostPing(message);
        const checked = ghostPing.check();

        if (checked) return message.channel.send(checked);

    }
}