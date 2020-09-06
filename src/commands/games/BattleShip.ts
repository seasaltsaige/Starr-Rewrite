import { BaseCommand } from "../../utils/BaseClasses/BaseCommand";
import StarrClient from "../../utils/BaseClasses/StarrClient";
import { Message, MessageReaction, User } from "discord.js";

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

        const prefix = client.cachedPrefixes.get(message.guild.id);

        const challenger = message.member;
        const opponent = message.mentions.members.first() || message.guild.members.cache.get(args[0]);

        if (challenger.id === opponent.id) return message.channel.send("Please challenge someone other than yourself!");

        if (!opponent) return message.channel.send("Please mention a member to battle!");
        
        const accept = await message.channel.send(`Hey ${opponent}, ${challenger} just challenged you to a game of Battle Ship. Do you accept?`);
        await Promise.all([accept.react("✅"), accept.react("❌")]);

        const acceptFilter = (reaction: MessageReaction, user: User) => user.id === opponent.id && ["✅", "❌"].includes(reaction.emoji.name);
        const acceptedData = await accept.awaitReactions(acceptFilter, { max: 1, time: 30000 });

        if (acceptedData.size < 1) return accept.edit("They didn't react in time, looks like they declined.");
        if (acceptedData.first().emoji.name === "✅") {

            const players = [
                { member: challenger, playerHitBoard: this.genBoard(10, 10), playerShipBoard: this.genBoard(10, 10), gameChannel: "", placedBoats: [], gameMessages: { start: "", hits: "", boats: "" }, ready: false },
                { member: opponent , playerHitBoard: this.genBoard(10, 10), playerShipBoard: this.genBoard(10, 10), gameChannel: "", placedBoats: [], gameMessages: { start: "", hits: "", boats: "" }, ready: false },
            ];

            let player = 0;

            for (const play of players) {

                const startMsg = await play.member.send(`Here is your starting Attack and Ship board! To add your boat pieces to the Ship board, please use the following command format. \`${prefix}add <ship> <Board Cords> <dirrection>\`. An example of this would be, \`${prefix}add destroyer D5 down\`\n\nAvailable Ships:\ncarrier (5)\nbattleship (4)\ndestroyer (3)\nsubmarine (3)\npatrolboat (2)`);
                const hitBoard = await play.member.send(this.displayHitBoard(play.playerHitBoard));
                const dmBoard = await play.member.send(this.displayShipBoard(play.playerShipBoard));

                play.gameMessages.start = startMsg.id;
                play.gameMessages.hits = hitBoard.id;
                play.gameMessages.boats = dmBoard.id;

                const filter = (msg: Message) => msg.author.id === play.member.id && [`${prefix}add`].includes(msg.content.split(" ")[0]);
                const dmCollector = dmBoard.channel.createMessageCollector(filter);

                play.gameChannel = dmBoard.channel.id;

                const validBoats = [ { name: "carrier", length: 5 }, { name: "battleship", length: 4 }, { name: "destroyer", length: 3 }, { name: "submarine", length: 3 }, { name: "patrolboat", length: 2 } ];
                const validDirrections = [ "up", "down", "right", "left" ];

                dmCollector.on("collect", async (msg: Message) => {
                    if (!players.find(plr => plr.member.id === msg.author.id).ready) {
                        const argument = msg.content.slice(prefix.length).trim().split(/ +/g);
                        argument.shift();

                        const boatType = argument[0];
                        if (!boatType) return msg.channel.send("Please provide a boat to place.");
                        if (!validBoats.some(value => value.name === boatType.toLowerCase())) return msg.channel.send("Please provide a valid boat type to place.");
                        if (players.find(plyr => plyr.member.id === msg.author.id).placedBoats.some(data => data.name === boatType.toLowerCase())) return msg.channel.send("You already placed that boat. Please try a different one.")

                        const cords = argument[1];
                        if (!cords) return msg.channel.send("Please enter cords for your ship. Ex: `D5`");
                        const directionRegex = /[a-z]([1-9]|10)/;
                        if (!cords.match(directionRegex)) return msg.channel.send("Please enter valid cords for your ship. Ex: `D5`");

                        const dirrection = argument[2];
                        if (!dirrection) return msg.channel.send("Please provide a direction to position your boat!");
                        if (!validDirrections.some(value => value === dirrection.toLowerCase())) return msg.channel.send(`Please provide a valid dirrection. Valid Choices: ${validDirrections.join(", ")}`);

                        const checked = this.checkBoatPos(play.playerShipBoard, validBoats.find(data => data.name === boatType.toLowerCase()), { letter: cords[0], number: parseInt(cords.slice(1)), cord: cords }, dirrection);
                        if (!checked) return msg.channel.send(`You can't put the ${boatType} at ${cords} facing ${dirrection}`).then(m => m.delete({ timeout: 10000 }));

                        players.find(plyr => plyr.member.id === msg.author.id).placedBoats.push(validBoats.find(data => data.name === boatType.toLowerCase()));

                        const reRender = this.renderBoat(players.find(plyr => plyr.member.id === msg.author.id).playerShipBoard, validBoats.find(boat => boat.name === boatType.toLowerCase()), { letter: cords[0], number: parseInt(cords.slice(1)), cord: cords }, dirrection);
                        const currPlayer = players.find(plr => plr.member.id === msg.author.id);
                        //@ts-ignore 
                        client.channels.cache.get(currPlayer.gameChannel).messages.cache.get(currPlayer.gameMessages.boats).edit(this.displayShipBoard(reRender));
                        //@ts-ignore
                        const editMe = client.channels.cache.get(currPlayer.gameChannel).messages.cache.get(currPlayer.gameMessages.start);
                        editMe.edit(editMe.content.replace(boatType.toLowerCase(), `~~${boatType}~~`));
                    } else if (players[0].ready && players[1].ready) {
                        
                    }
                });

            }


        } else return accept.edit("Looks like they declined.");
    }

    private checkBoatPos(board: { data: string, cords: { letter: string, number: number, cord: string } }[][], boat: { name: string, length: number }, cords: { letter: string, number: number, cord: string }, dirrection: string) {
        for (let i = 0; i < board.length; i++) {
            if (board[i].find(data => data.cords.cord.toLowerCase() === cords.cord.toLowerCase())) {
                switch (dirrection) {
                    case "up":
                        let countUp = 0;
                        let startPosUp = i;
                        do {
                            console.log(i)
                            if (board[startPosUp] === undefined) return false;
                            countUp++;
                            startPosUp--;
                        } while (countUp < boat.length);
                    break;
                    case "down":
                        let countDown = 0;
                        let startPosDown = i;
                        do {
                            if (board[startPosDown] === undefined) return false;
                            countDown++
                            startPosDown++;
                        } while (countDown < boat.length);
                    break;
                    case "left":
                        let countLeft = 0;
                        let currIndexLeft = board[i].findIndex(data => data.cords.cord.toLowerCase() === cords.cord.toLowerCase());
                        do {
                            currIndexLeft--;
                            if (board[currIndexLeft] === undefined) return false;
                            countLeft++;
                        } while (countLeft < boat.length);
                    break;
                    case "right":
                        let countRight = 0;
                        let currIndexRight = board[i].findIndex(data => data.cords.cord.toLowerCase() === cords.cord.toLowerCase());
                        do {
                            currIndexRight++;
                            if (board[currIndexRight] === undefined) return false;
                            countRight++;
                        } while (countRight < boat.length);
                    break;
                }
            }
        }
        return true;
    }

    private renderBoat(board: { data: string, cords: { letter: string, number: number, cord: string } }[][], boat: { name: string, length: number }, cords: { letter: string, number: number, cord: string }, dirrection: string) {
        for (let i = 0; i < board.length; i++) {
            if (board[i].find(data => data.cords.cord.toLowerCase() === cords.cord.toLowerCase())) {
                switch (dirrection) {
                    case "up":
                        let countUp = 0;
                        do {
                            console.log(i, cords.number - 1)
                            board[i][cords.number - 1].data = "1";
                            countUp++;
                            i--;
                        } while (countUp < boat.length);
                    break;
                    case "down":
                        let countDown = 0;
                        do {
                            board[i][cords.number - 1].data = "1";
                            countDown++
                            i++;
                        } while (countDown < boat.length);
                    break;
                    case "left":
                        let countLeft = 0;
                        let currIndexLeft = board[i].findIndex(data => data.cords.cord.toLowerCase() === cords.cord.toLowerCase());
                        do {
                            board[i][currIndexLeft].data = "1";
                            currIndexLeft--;
                            countLeft++;
                        } while (countLeft < boat.length);
                    break;
                    case "right":
                        let countRight = 0;
                        let currIndexRight = board[i].findIndex(data => data.cords.cord.toLowerCase() === cords.cord.toLowerCase());
                        do {
                            board[i][currIndexRight].data = "1";
                            currIndexRight++;
                            countRight++;
                        } while (countRight < boat.length);
                    break;
                }
                return board;
            }
        }
    }

    private genBoard(hor: number, ver: number) {
        let whileCounter = 0;
        const boardLetter = [ { i: 0, letter: "A" }, { i: 1, letter: "B" }, { i: 2, letter: "C" }, { i: 3, letter: "D" }, { i: 4, letter: "E" }, { i: 5, letter: "F" }, { i: 6, letter: "G" }, { i: 7, letter: "H" }, { i: 8, letter: "I" }, { i: 9, letter: "J" } ];
        const doneData: { data: string, cords: { letter: string, number: number, cord: string } }[][] = [];
        do {
            const temp: { data: string, cords: { letter: string, number: number, cord: string } }[] = [];
            for (let i = 0; i < ver; i++) {
                const boardLttr = boardLetter.find(data => data.i === whileCounter).letter;
                temp.push({ data: "0", cords: { letter: boardLttr, number: i + 1, cord: boardLttr + (i + 1) } });
            }
            doneData.push(temp);
            whileCounter++;
        } while (whileCounter < hor);
        return doneData;
    }
    private displayHitBoard(board: { data: string, cords: { letter: string, number: number, cord: string } }[][]) {
        let returnData = "";
        returnData = returnData.concat("⬛1️⃣2️⃣3️⃣4️⃣5️⃣6️⃣7️⃣8️⃣9️⃣🔟\n");
        for (let i = 0; i < board.length; i++) {
            let temp = "";

            const leftEmoji = [ { i: 0, emoji: ":regional_indicator_a:" }, { i: 1, emoji: ":regional_indicator_b:" }, { i: 2, emoji: ":regional_indicator_c:" }, { i: 3, emoji: ":regional_indicator_d:" }, { i: 4, emoji: ":regional_indicator_e:" }, { i: 5, emoji: ":regional_indicator_f:" }, { i: 6, emoji: ":regional_indicator_g:" }, { i: 7, emoji: ":regional_indicator_h:" }, { i: 8, emoji: ":regional_indicator_i:" }, { i: 9, emoji: ":regional_indicator_j:" } ]

            for (let j = 0; j < board[i].length; j++) {
                // "0" is an empty space, "1" is a missed shot, "2" is a hit shot
                temp += `${board[i][j].data === "0" ? "⬜" : board[i][j].data === "1" ? "⚪" : "🔴" }`;
            }
            returnData += leftEmoji.find(object => object.i === i).emoji + temp + "\n";
        }
        return returnData;
    }
    private displayShipBoard(board: { data: string, cords: { letter: string, number: number, cord: string } }[][]) {
        let returnData = "";
        returnData = returnData.concat("⬛1️⃣2️⃣3️⃣4️⃣5️⃣6️⃣7️⃣8️⃣9️⃣🔟\n");

        const leftEmoji = [ { i: 0, emoji: ":regional_indicator_a:" }, { i: 1, emoji: ":regional_indicator_b:" }, { i: 2, emoji: ":regional_indicator_c:" }, { i: 3, emoji: ":regional_indicator_d:" }, { i: 4, emoji: ":regional_indicator_e:" }, { i: 5, emoji: ":regional_indicator_f:" }, { i: 6, emoji: ":regional_indicator_g:" }, { i: 7, emoji: ":regional_indicator_h:" }, { i: 8, emoji: ":regional_indicator_i:" }, { i: 9, emoji: ":regional_indicator_j:" } ]

        for (let i = 0; i < board.length; i++) {
            let temp = "";
            for (let j = 0; j < board[i].length; j++) {
                // "0" is an empty space, "1" is a unhit ship piece, "2" is a hit ship piece, "3" is a missed shot from opponent
                temp += `${board[i][j].data === "0" ? "⬜" : board[i][j].data === "1" ? "🟩" : board[i][j].data === "2" ? "🟥" : "🔳" }`;
            }
            returnData += leftEmoji.find(object => object.i === i).emoji + temp + "\n";
        }
        return returnData;
    }
}

//, shipCords?: { letter: string, number: number, direction: "up" | "down" | "left" | "right" }[]