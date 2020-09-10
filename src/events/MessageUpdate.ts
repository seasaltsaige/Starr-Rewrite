import BaseEvent from "../utils/structure/BaseEvent";
import StarrClient from "../utils/structure/StarrClient";
import { Message } from "discord.js";
import GhostPing from "../utils/checks/GhostPing";

export default class MessageUpdate extends BaseEvent {
    constructor() {
        super({
            name: "messageUpdate",
        });
    }
    public async run (client: StarrClient, oldMessage: Message, newMessage: Message) {
        if (!oldMessage.guild) return;
        if (oldMessage.author.bot) return;
        if (oldMessage.mentions.members.map(m => m).join(" ") !== newMessage.mentions.members.map(m => m).join(" ")) {
            const ghostPing = new GhostPing(oldMessage);
            const checked = await ghostPing.check();

            if (checked) return oldMessage.channel.send(checked);
        }
    }
}