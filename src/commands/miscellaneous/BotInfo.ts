import { BaseCommand } from "../../utils/structure/BaseCommand";
import StarrClient from "../../utils/structure/StarrClient";
import { Message } from "discord.js";

export default class BotInfo extends BaseCommand {
    constructor() {
        super({
            category: "miscellaneous",
            description: "Get some info on the bot instance",
            name: "botinfo",
            permissions: ["SEND_MESSAGES"],
            usage: "botinfo"
        });
    }
    public async run (client: StarrClient, message: Message, args: string[]) {

    }
}