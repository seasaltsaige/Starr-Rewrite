import { Message } from "discord.js";
import BaseCommand from "../../utils/structure/BaseCommand";
import StarrClient from "../../utils/structure/StarrClient";

export default class PlayCard extends BaseCommand {
    constructor() {
        super({
            category: "uno",
            description: "Leave the current UNO game in the said channel.",
            name: "playcard",
            permissions: ["SEND_MESSAGES"],
            usage: "playcard",
            aliases: ["pc", "unopg", "play"],
        });
    }
    async run (client: StarrClient, message: Message, args: string[]) {
        await client.DiscordUNO.playCard(message);
    }
}