import { BaseCommand } from "../utils/BaseClasses/BaseCommand";
import StarrClient from "../utils/BaseClasses/StarrClient";
import { Message } from "discord.js";

export default new class Warn extends BaseCommand {
    constructor() {
        super({
            name: "warn",
            usage: "?warn <user> <reason>",
            aliases: [],
            category: "moderation",
            permissions: ["MANAGE_MESSAGES"],
            description: "",
        });
    }
    async run(client: StarrClient, message: Message, args: Array<string>) {

    }
}