import StarrClient from "../utils/structure/StarrClient";
import { Message } from "discord.js";
import BaseEvent from "../utils/structure/BaseEvent";
import { GhostPing } from "../utils/checks/index";

export default class MessageDelete extends BaseEvent {
    constructor() {
        super({
            name: "messageDelete"
        })
    }
    public async run(client: StarrClient, message: Message) {
        if (!message.guild) return;
        if (message.author.bot) return;
        
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

        // const ghostPing = new GhostPing(message);
        // const checked = await ghostPing.check();

        // console.log(checked);

        // if (checked) return message.channel.send(checked);

    }
}