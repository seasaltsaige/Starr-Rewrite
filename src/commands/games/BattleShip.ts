import BaseCommand from "../../utils/structure/BaseCommand";
import StarrClient from "../../utils/structure/StarrClient";
import { Message } from "discord.js";
import { DiscordBattleShip } from "discord-battleship";

export default class BattleShip extends BaseCommand {
    constructor() {
        super({
            category: "games",
            description: "Play the classic battleship game with someone!",
            name: "battleship",
            permissions: ["SEND_MESSAGES"],
            usage: "battleship <user>",
            aliases: ["battlesh", "bship"],
        });
    }
    public async run(client: StarrClient, message: Message, args: string[]) {
        if (message.mentions.members.size > 0 && message.mentions.members.first().user.bot) return message.channel.send("Stop it")
        const BattleShip = new DiscordBattleShip({
            embedColor: client.colors.noColor,
            prefix: client.cachedPrefixes.get(message.guild.id) || client.defaultPrefix,
        });
        BattleShip.createGame(message);
    }
}