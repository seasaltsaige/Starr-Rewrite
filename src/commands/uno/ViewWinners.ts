import { Message } from "discord.js";
import BaseCommand from "../../utils/structure/BaseCommand";
import StarrClient from "../../utils/structure/StarrClient";

export default class ViewWinners extends BaseCommand {
    constructor() {
        super({
            category: "uno",
            description: "View the winners of the game.",
            name: "viewwinners",
            permissions: ["SEND_MESSAGES"],
            usage: "viewwinners",
            aliases: ["winners"],
        });
    }
    async run (client: StarrClient, message: Message, args: string[]) {
        await client.DiscordUNO.closeGame(message);
    }
}