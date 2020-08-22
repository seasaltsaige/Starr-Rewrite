import { BaseCommand } from "../../utils/BaseClasses/BaseCommand";
import StarrClient from "../../utils/BaseClasses/StarrClient";
import { Message } from "discord.js";
import { CategoryResolvable } from "../../resolvables/Resolvables";

export default new class TicTacToe extends BaseCommand {
    constructor() {
        super({
            name: "tictactoe",
            usage: "?tictactoe",
            aliases: ["ttt"],
            category: "games",
            description: "Help command",
            permissions: ["SEND_MESSAGES"],
            
        });
    }
    async run(client: StarrClient, message: Message, args: Array<string>) {

        
    }
}