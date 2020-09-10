import { BaseCommand } from "../../utils/structure/BaseCommand";
import StarrClient from "../../utils/structure/StarrClient";
import { Message } from "discord.js";

export default class Ping extends BaseCommand {
    constructor() {
        super({
            name: "ping",
            usage: "ping",
            aliases: ["pong"],
            category: "miscellaneous",
            description: "Ping Pong",
            permissions: ["SEND_MESSAGES"],
            enabled: true
        });
    }

    public async run(client: StarrClient, message: Message, args: Array<string>) {
        message.channel.send(client.ws.ping + "ms API Ping");
    }
}