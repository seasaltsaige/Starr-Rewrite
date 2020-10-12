import { Message } from "discord.js";
import BaseCommand from "../../utils/structure/BaseCommand";
import StarrClient from "../../utils/structure/StarrClient";

export default class LeaveGame extends BaseCommand {
    constructor() {
        super({
            category: "uno",
            description: "Leave the current UNO game in the said channel.",
            name: "leavegame",
            permissions: ["SEND_MESSAGES"],
            usage: "leavegame",
            aliases: ["lg", "unolg", "leave"],
        });
    }
    async run (client: StarrClient, message: Message, args: string[]) {
        await client.DiscordUNO.removeUser(message);
    }
}