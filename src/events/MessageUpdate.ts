import BaseEvent from "../utils/BaseClasses/BaseEvent";
import StarrClient from "../utils/BaseClasses/StarrClient";
import { Message } from "discord.js";
import GhostPing from "../utils/checks/GhostPing";

export default class MessageUpdate extends BaseEvent {
    constructor() {
        super({
            name: "messageUpdate",
        });
    }
    async run (client: StarrClient, oldMessage: Message, newMessage: Message) {
        const ghostPing = new GhostPing(oldMessage);
        const checked = ghostPing.check();

        if (checked) return oldMessage.channel.send(checked);
    }
}