import { Message } from "discord.js";
import BaseCommand from "../../utils/structure/BaseCommand";
import StarrClient from "../../utils/structure/StarrClient";

export default class ViewCards extends BaseCommand {
    constructor() {
        super({
            category: "uno",
            description: "View your current hand in your DM's!",
            name: "viewcards",
            permissions: ["SEND_MESSAGES"],
            usage: "viewcards",
            aliases: ["cards"],
        });
    }
    async run (client: StarrClient, message: Message, args: string[]) {
        await client.DiscordUNO.viewCards(message);
    }
}