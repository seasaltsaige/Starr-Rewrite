import { BaseCommand } from "../../utils/BaseClasses/BaseCommand";
import StarrClient from "../../utils/BaseClasses/StarrClient";
import { Message } from "discord.js";
import Guild from "../../database/models/Guild";

export default new class Mute extends BaseCommand {
    constructor() {
        super({
            name: "mute",
            category: "moderation",
            description: "Mute a user",
            permissions: ["MANAGE_ROLES"],
            usage: "?mute <user> <reason>",
        });
    }
    async run (client: StarrClient, message: Message, args: string[]) {


    }
}