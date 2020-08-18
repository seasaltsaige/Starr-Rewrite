import { BaseCommand } from "../../utils/BaseClasses/BaseCommand";
import StarrClient from "../../utils/BaseClasses/StarrClient";
import { Message } from "discord.js";
import Guild from "../../database/models/Guild";

export default new class Unmute extends BaseCommand {
    constructor() {
        super({
            name: "unmute",
            category: "moderation",
            description: "Unmute a user",
            permissions: ["MANAGE_ROLES"],
            usage: "?unmute <user>",
        });
    }
    async run (client: StarrClient, message: Message, args: string[]) {


    }
}