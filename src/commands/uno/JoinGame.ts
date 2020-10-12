import { Message } from "discord.js";
import BaseCommand from "../../utils/structure/BaseCommand";
import StarrClient from "../../utils/structure/StarrClient";

export default class JoinGame extends BaseCommand {
    constructor() {
        super({
            category: "uno",
            description: "Join the current UNO game in the said channel.",
            name: "joingame",
            permissions: ["SEND_MESSAGES"],
            usage: "joingame",
            aliases: ["jg", "unojg", "join"],
        });
    }
    async run (client: StarrClient, message: Message, args: string[]) {
        await client.DiscordUNO.addUser(message);
    }
}