import { Message } from "discord.js";
import BaseCommand from "../../utils/structure/BaseCommand";
import StarrClient from "../../utils/structure/StarrClient";

export default class CloseGame extends BaseCommand {
    constructor() {
        super({
            category: "uno",
            description: "Close the current game. (Only the game creator may close the game). This does not calculate winners.",
            name: "closegame",
            permissions: ["SEND_MESSAGES"],
            usage: "closegame",
            aliases: ["close"],
        });
    }
    async run (client: StarrClient, message: Message, args: string[]) {
        await client.DiscordUNO.closeGame(message);
    }
}