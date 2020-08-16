import { BaseCommand } from "../utils/BaseClasses/BaseCommand";
import StarrClient from "../utils/BaseClasses/StarrClient";
import { Message } from "discord.js";

export default new class EditWarn extends BaseCommand {

    constructor() {
        super({
            name: "editwarn",
            usage: "?editwarn <warnId> <New Reason>",
            aliases: [],
            category: "moderation",
            permissions: ["MANAGE_MESSAGES"],
            description: "Edit a warn",
        });
    }
    async run(client: StarrClient, message: Message, args: string[]) {
        
    }
}