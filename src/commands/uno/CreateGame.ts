import { Message } from "discord.js";
import BaseCommand from "../../utils/structure/BaseCommand";
import StarrClient from "../../utils/structure/StarrClient";

export default class CreateGame extends BaseCommand {
    constructor() {
        super({
            category: "uno",
            description: "Create a new UNO game in the current channel!",
            name: "creategame",
            permissions: ["SEND_MESSAGES"],
            usage: "creategame",
            aliases: ["cg", "unocg"],
        });
    }
    async run (client: StarrClient, message: Message, args: string[]) {
        console.log(`Created an UNO game in ${message.guild.name}`);
        await client.DiscordUNO.createGame(message);
    }
}