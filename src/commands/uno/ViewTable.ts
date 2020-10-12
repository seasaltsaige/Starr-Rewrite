import { Message } from "discord.js";
import BaseCommand from "../../utils/structure/BaseCommand";
import StarrClient from "../../utils/structure/StarrClient";

export default class ViewTable extends BaseCommand {
    constructor() {
        super({
            category: "uno",
            description: "View the current standings of the game table.",
            name: "viewtable",
            permissions: ["SEND_MESSAGES"],
            usage: "viewtable",
            aliases: ["table", "unovt", "vt"],
        });
    }
    async run (client: StarrClient, message: Message, args: string[]) {
        await client.DiscordUNO.viewTable(message);
    }
}