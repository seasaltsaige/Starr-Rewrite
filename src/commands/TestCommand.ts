import { BaseCommand } from "../utils/BaseClasses/BaseCommand";
import StarrClient from "../utils/BaseClasses/StarrClient";
import { Message, GuildMember } from "discord.js";

export default new class TestCommand extends BaseCommand {
    constructor() {
        super({
            name: "testcommand", 
            usage: "?testcommand",
            aliases: ["testing", "testy"],
            description: "Test Command",
            permissions: ["SEND_MESSAGES"],
            enabled: true,
            ownerOnly: true,
        });
    }

    async run (client: StarrClient, message: Message, args: Array<string>): Promise<void> {
        message.channel.send("Testing worked!");
    }

}