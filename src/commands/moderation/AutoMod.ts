import { BaseCommand } from "../../utils/BaseClasses/BaseCommand";
import StarrClient from "../../utils/BaseClasses/StarrClient";
import { Message } from "discord.js";

export default class AutoMod extends BaseCommand {
    constructor() {
        super({
            category: "moderation",
            description: "Setup AutoModerator for your Discord Server!",
            name: "automod",
            permissions: ["MANAGE_GUILD"],
            usage: "automod",
            aliases: ["autom"],
        });
    }
    async run (client: StarrClient, message: Message, args: string[]) {

    }
}