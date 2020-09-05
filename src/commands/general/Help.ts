import { BaseCommand } from "../../utils/BaseClasses/BaseCommand";
import StarrClient from "../../utils/BaseClasses/StarrClient";
import { Message } from "discord.js";
import { CategoryResolvable } from "../../utils/resolvables/Resolvables";

export default class Help extends BaseCommand {
    constructor() {
        super({
            name: "help",
            usage: "?help [category/command]",
            aliases: ["halp", "cmds", "commands"],
            category: "general",
            description: "Help command",
            permissions: ["SEND_MESSAGES"],
            
        });
    }
    public async run(client: StarrClient, message: Message, args: Array<string>) {

        
    }
}