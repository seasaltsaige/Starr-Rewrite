import { Message } from "discord.js";
import Levels from "../../database/models/Levels";
import BaseCommand from "../../utils/structure/BaseCommand";
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
        const Level = await Levels.find();
        const guildLevels = Level.filter(data => data.guild === message.guild.id);
    }
}