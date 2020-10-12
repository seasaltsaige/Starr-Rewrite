import { Message } from "discord.js";
import BaseCommand from "../../utils/structure/BaseCommand";
import StarrClient from "../../utils/structure/StarrClient";

export default class StartGame extends BaseCommand {
    constructor() {
        super({
            category: "uno",
            description: "Start the current UNO game in the said channel.",
            name: "startgame",
            permissions: ["SEND_MESSAGES"],
            usage: "startgame",
            aliases: ["sg", "unosg", "start"],
        });
    }
    async run (client: StarrClient, message: Message, args: string[]) {
        await client.DiscordUNO.startGame(message);
    }
}