import { Message } from "discord.js";
import BaseCommand from "../../utils/structure/BaseCommand";
import StarrClient from "../../utils/structure/StarrClient";

export default class Draw extends BaseCommand {
    constructor() {
        super({
            category: "uno",
            description: "Draw a new card and add it to your hand.",
            name: "draw",
            permissions: ["SEND_MESSAGES"],
            usage: "draw",
        });
    }
    async run (client: StarrClient, message: Message, args: string[]) {
        await client.DiscordUNO.draw(message);
    }
}