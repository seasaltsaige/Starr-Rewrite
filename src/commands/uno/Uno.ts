import { Message } from "discord.js";
import BaseCommand from "../../utils/structure/BaseCommand";
import StarrClient from "../../utils/structure/StarrClient";

export default class Uno extends BaseCommand {
    constructor() {
        super({
            category: "uno",
            description: "Call out the specified user for having one card left, or protect yourself from callouts.",
            name: "uno",
            permissions: ["SEND_MESSAGES"],
            usage: "uno [user]",
        });
    }
    async run (client: StarrClient, message: Message, args: string[]) {
        await client.DiscordUNO.UNO(message);
    }
}