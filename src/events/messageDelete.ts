import StarrClient from "../utils/BaseClasses/StarrClient";
import { Message } from "discord.js";
import BaseEvent from "../utils/BaseClasses/BaseEvent";

export default class messageDelete extends BaseEvent {
    constructor() {
        super({
            name: "messageDelete",
            description: "Event used to make the snipe feature work."
        })
    }
    public async run(client: StarrClient, message: Message) {

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