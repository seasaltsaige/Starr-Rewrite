import BaseCommand from "../../utils/structure/BaseCommand";
import StarrClient from "../../utils/structure/StarrClient";
import { Message } from "discord.js";

export default class TicTacToe extends BaseCommand {
    constructor() {
        super({
            name: "tictactoe",
            usage: "tictactoe",
            aliases: ["ttt"],
            category: "games",
            description: "Help command",
            permissions: ["SEND_MESSAGES"],
            
        });
    }
    public async run(client: StarrClient, message: Message, args: Array<string>) {

        
    }
}