import { Message } from "discord.js";
import { BaseCommand } from "../../utils/structure/BaseCommand";
import StarrClient from "../../utils/structure/StarrClient";

export default class Rank extends BaseCommand {
    constructor() {
        super({
            category: "leveling",
            description: "Check your current rank",
            name: "rank",
            permissions: ["SEND_MESSAGES"],
            usage: "rank [user]",
            aliases: ["level", "checklevel", "checkrank"],
        });
    }
    public async run (client: StarrClient, message: Message, args: string[]) {
        
    }
}