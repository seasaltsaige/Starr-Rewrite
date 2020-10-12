import { Message } from "discord.js";
import BaseCommand from "../../utils/structure/BaseCommand";
import StarrClient from "../../utils/structure/StarrClient";

export default class UpdateSettings extends BaseCommand {
    constructor() {
        super({
            category: "uno",
            description: "Update the current game channel settings.",
            name: "updatesettings",
            permissions: ["SEND_MESSAGES"],
            usage: "updatesettings",
            aliases: ["updates", "us"],
        });
    }
    async run (client: StarrClient, message: Message, args: string[]) {
        if (!client.owners.includes(message.author.id)) return message.channel.send("Not you.");
        await client.DiscordUNO.updateSettings(message);
    }
}