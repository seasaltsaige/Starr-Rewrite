import { BaseCommand } from "../../utils/BaseClasses/BaseCommand";
import StarrClient from "../../utils/BaseClasses/StarrClient";
import { Message } from "discord.js";

export default new class Ping extends BaseCommand {
    constructor() {
        super({
            name: "ping",
            usage: "?ping",
            aliases: ["pong"],
            category: "miscellaneous",
            description: "Ping Pong",
            permissions: ["SEND_MESSAGES"],
            enabled: true,
            cooldown: 10000
        });
    }

    async run(client: StarrClient, message: Message, args: Array<string>) {
        message.channel.send(client.ws.ping + "ms API Ping");
    }
}