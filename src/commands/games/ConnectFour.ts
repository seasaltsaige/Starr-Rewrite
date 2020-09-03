import { BaseCommand } from "../../utils/BaseClasses/BaseCommand";
import StarrClient from "../../utils/BaseClasses/StarrClient";
import { Message } from "discord.js";

export default class ConnectFour extends BaseCommand {
    constructor() {
        super({
            category: "games",
            description: "Challenge someone to a game of the classic game, Connect 4!",
            name: "connectfour",
            permissions: ["SEND_MESSAGES", "ADD_REACTIONS"],
            usage: "connectfour <user>",
            aliases: ["c4", "cfour", "connect4"],
        });
    }
    async run (client: StarrClient, message: Message, args: string[]) {
        const opponent = message.mentions.members.first() || message.guild.members.cache.get(args[0]);
        if (!opponent) return message.channel.send("Please mention someone that you would like to challenge!");

        const board = [
            ['⚪', '⚪', '⚪', '⚪', '⚪', '⚪', '⚪'], 
            ['⚪', '⚪', '⚪', '⚪', '⚪', '⚪', '⚪'], 
            ['⚪', '⚪', '⚪', '⚪', '⚪', '⚪', '⚪'], 
            ['⚪', '⚪', '⚪', '⚪', '⚪', '⚪', '⚪'], 
            ['⚪', '⚪', '⚪', '⚪', '⚪', '⚪', '⚪'], 
            ['⚪', '⚪', '⚪', '⚪', '⚪', '⚪', '⚪']
        ];

        const displayBoard = (board: string[][]) => {
            let newBoard = "";
            for (const section of board) {
                newBoard += `${section.join("")}\n`;
            };
            return newBoard;
        }

        console.log(displayBoard);

    }
}