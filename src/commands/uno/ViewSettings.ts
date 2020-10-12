import { Message } from "discord.js";
import BaseCommand from "../../utils/structure/BaseCommand";
import StarrClient from "../../utils/structure/StarrClient";

export default class ViewSettings extends BaseCommand {
    constructor() {
        super({
            category: "uno",
            description: "View the current game channels game settings.",
            name: "viewsettings",
            permissions: ["SEND_MESSAGES"],
            usage: "viewsettings",
            aliases: ["vs", "settings"],
        });
    }
    async run (client: StarrClient, message: Message, args: string[]) {
        await client.DiscordUNO.viewSettings(message);
    }
}