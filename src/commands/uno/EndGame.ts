import { Message } from "discord.js";
import BaseCommand from "../../utils/structure/BaseCommand";
import StarrClient from "../../utils/structure/StarrClient";

export default class EndGame extends BaseCommand {
    constructor() {
        super({
            category: "uno",
            description: "End the current game. (Only the game creator may end the game). This does calculate winners.",
            name: "endgame",
            permissions: ["SEND_MESSAGES"],
            usage: "endgame",
            aliases: ["end"],
        });
    }
    async run (client: StarrClient, message: Message, args: string[]) {
        await client.DiscordUNO.endGame(message);
    }
}