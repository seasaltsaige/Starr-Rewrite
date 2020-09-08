import { BaseCommand } from "../../utils/BaseClasses/BaseCommand";
import StarrClient from "../../utils/BaseClasses/StarrClient";
import { Message, MessageReaction, User, GuildMember } from "discord.js";
import battleShipPlayer from "../../utils/types/battleShipPlayer";

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

        if (!opponent) return message.channel.send("Please mention a member to battle!");
        if (challenger.id === opponent.id) return message.channel.send("Please challenge someone other than yourself!");
        
        const accept = await message.channel.send(`Hey ${opponent}, ${challenger} just challenged you to a game of Battle Ship. Do you accept?`);
        await Promise.all([accept.react("✅"), accept.react("❌")]);

        const acceptFilter = (reaction: MessageReaction, user: User) => user.id === opponent.id && ["✅", "❌"].includes(reaction.emoji.name);
        const acceptedData = await accept.awaitReactions(acceptFilter, { max: 1, time: 30000 });

        if (acceptedData.size < 1) return accept.edit("They didn't react in time, looks like they declined.");
        if (acceptedData.first().emoji.name === "✅") {

            const players: battleShipPlayer[] = [
                { collector: null, member: challenger, playerHitBoard: this.genBoard(10, 10), playerShipBoard: this.genBoard(10, 10), gameChannel: "", placedBoats: [], gameMessages: { start: "", hits: "", boats: "" }, ready: false },
                { collector: null, member: opponent , playerHitBoard: this.genBoard(10, 10), playerShipBoard: this.genBoard(10, 10), gameChannel: "", placedBoats: [], gameMessages: { start: "", hits: "", boats: "" }, ready: false },
            ];

            
            

            let player = 0;

            for (const play of players) {

                const startMsg = await play.member.send(`Here is your starting Attack and Ship board! To add your boat pieces to the Ship board, please use the following command format. \`${prefix}add <ship> <Board Cords> <dirrection>\`. An example of this would be, \`${prefix}add destroyer D5 down\`\n\nAvailable Ships:\ncarrier (5)\nbattleship (4)\ndestroyer (3)\nsubmarine (3)\npatrolboat (2)`);
                const hitBoard = await play.member.send(`Attack Board:\n${this.displayHitBoard(play.playerHitBoard)}`);
                const dmBoard = await play.member.send(`Ship Board:\n${this.displayShipBoard(play.playerShipBoard)}`);

                play.gameMessages.start = startMsg.id;
                play.gameMessages.hits = hitBoard.id;
                play.gameMessages.boats = dmBoard.id;

                const filter = (msg: Message) => msg.author.id === play.member.id && [`${prefix}add`, `${prefix}attack`].includes(msg.content.split(" ")[0]);
                const dmCollector = dmBoard.channel.createMessageCollector(filter);

                play.collector = dmCollector;

                play.gameChannel = dmBoard.channel.id;

                const validBoats = [ { name: "carrier", length: 5, hits: 0, sunk: false }, { name: "battleship", length: 4,hits: 0, sunk: false }, { name: "destroyer", length: 3, hits: 0, sunk: false }, { name: "submarine", length: 3, hits: 0, sunk: false }, { name: "patrolboat", length: 2, hits: 0, sunk: false } ];
                const validDirrections = [ "up", "down", "right", "left" ];

                dmCollector.on("collect", async (msg: Message) => {
                    const argument = msg.content.slice(prefix.length).trim().split(/ +/g);
                    const cmd = argument.shift();

                    if (!players.find(plr => plr.member.id === msg.author.id).ready) {
                        if (cmd === "add") {
                            const boatType = argument[0];
                            if (!boatType) return msg.channel.send("Please provide a boat to place.");
                            if (!validBoats.some(value => value.name === boatType.toLowerCase())) return msg.channel.send("Please provide a valid boat type to place.");
                            if (players.find(plyr => plyr.member.id === msg.author.id).placedBoats.some(data => data.name === boatType.toLowerCase())) return msg.channel.send("You already placed that boat. Please try a different one.")

                            const cords = argument[1];
                            if (!cords) return msg.channel.send("Please enter cords for your ship. Ex: `D5`").then(m => m.delete({ timeout: 15000 }));
                            const directionRegex = /[a-z]([1-9]|10)/i;
                            if (!cords.match(directionRegex)) return msg.channel.send("Please enter valid cords for your ship. Ex: `D5`").then(m => m.delete({ timeout: 15000 }));

                            const dirrection = argument[2];
                            if (!dirrection) return msg.channel.send("Please provide a direction to position your boat!");
                            if (!validDirrections.some(value => value === dirrection.toLowerCase())) return msg.channel.send(`Please provide a valid dirrection. Valid Choices: ${validDirrections.join(", ")}`).then(m => m.delete({ timeout: 15000 }));

                            const checked = this.checkBoatPos(play.playerShipBoard, validBoats.find(data => data.name === boatType.toLowerCase()), { letter: cords[0], number: parseInt(cords.slice(1)), cord: cords }, dirrection);
                            if (!checked) return msg.channel.send(`You can't put the ${boatType} at ${cords} facing ${dirrection}`).then(m => m.delete({ timeout: 15000 }));

                            players.find(plyr => plyr.member.id === msg.author.id).placedBoats.push(validBoats.find(data => data.name === boatType.toLowerCase()));

                            const reRender = this.renderBoat(players.find(plyr => plyr.member.id === msg.author.id).playerShipBoard, validBoats.find(boat => boat.name === boatType.toLowerCase()), { letter: cords[0], number: parseInt(cords.slice(1)), cord: cords }, dirrection);
                            const currPlayer = players.find(plr => plr.member.id === msg.author.id);
                            currPlayer.playerShipBoard = reRender.board
                            //@ts-ignore 
                            client.channels.cache.get(currPlayer.gameChannel).messages.cache.get(currPlayer.gameMessages.boats).edit(`Ship Board:\n${this.displayShipBoard(reRender.board)}`);
                            let oldBoat = players.find(p => p.member.id === msg.author.id).placedBoats.find(b => b.name.toLowerCase() === reRender.boat.name.toLowerCase());
                            oldBoat = reRender.boat;
                            // @ts-ignore
                            const editMe = client.channels.cache.get(currPlayer.gameChannel).messages.cache.get(currPlayer.gameMessages.start);
                            editMe.edit(editMe.content.replace(boatType.toLowerCase(), `~~${boatType}~~`));

                            if (currPlayer.placedBoats.length === 5) {
                                currPlayer.ready = true;
                                if (players[0].ready && players[1].ready) {
                                    for (const playr of players) {
                                        //@ts-ignore
                                        client.channels.cache.get(playr.gameChannel).messages.cache.get(playr.gameMessages.start).edit(`You have both now finished the setup phase of the game! It is ${players[player].member.user.tag}'s turn to attack! Use \`${prefix}attack <cords>\` to call an attack on that spot!\n\nLegend:\n- Attack Board:\n--- ◻️ = Empty Spot\n--- ⚪ = Missed Attack\n--- 🔴 = Hit Attack\n- Ship Board:\n--- 🔲 = Empty Spot\n--- 🟩 = Unhit Ship\n--- 🟥 = Hit Ship\n--- ⚪ = Missed Opponent Shot`);
                                        playr.member.send(`${playr.member.user}`).then(m => m.delete());
                                    }
                                } else return msg.channel.send("It looks like your opponent hasn't placed all of their ships yet! Please wait for them to finish. Once they finish you will get a DM.").then(m => m.delete({ timeout: 15000 }));
                            }
                        }
                    } else if (players[0].ready && players[1].ready) {
                        if (players[player].member.id === msg.author.id) {
                            if (cmd === "attack") {
                                const cords = argument[0];
                                if (!cords) return msg.channel.send("Please enter cords for your attack. Ex: `D5`").then(m => m.delete({ timeout: 15000 }));
                                const directionRegex = /[a-z]([1-9]|10)/;
                                if (!cords.match(directionRegex)) return msg.channel.send("Please enter valid cords for your attack. Ex: `D5`").then(m => m.delete({ timeout: 15000 }));

                                const returnData = this.attack(players[player].playerHitBoard, players[(player + 1) % players.length].playerShipBoard, { letter: cords[0], number: parseInt(cords.slice(1)), cord: cords });
                                if (!returnData) return msg.channel.send("You can't attack there, please try somewhere else!").then(m => m.delete({ timeout: 15000 }));

                                //@ts-ignore
                                client.channels.cache.get(players[player].gameChannel).messages.cache.get(players[player].gameMessages.hits).edit(`Attack Board:\n${this.displayHitBoard(returnData.attackBoard)}`);
                                players[player].playerHitBoard = returnData.attackBoard;
                                //@ts-ignore
                                client.channels.cache.get(players[(player + 1) % players.length].gameChannel).messages.cache.get(players[(player + 1) % players.length].gameMessages.boats).edit(`Ship Board:\n${this.displayShipBoard(returnData.shipBoard)}`);
                                players[(player + 1) % 2].playerShipBoard = returnData.shipBoard;

                                const shipToHit = players[(player + 1) % players.length].placedBoats.find(s => s.name.toLowerCase() === returnData.data.shipName.toLowerCase());
                                if (shipToHit) {
                                    shipToHit.hits++;
                                    if (shipToHit.hits === shipToHit.length) {
                                        shipToHit.sunk = true;
                                        players[player].member.send(`You sunk ${players[(player + 1) % players.length].member.user.tag}'s ${shipToHit.name}!`);
                                        players[(player + 1) % players.length].member.send(`Your ${returnData.data.shipName} was sunk!`);
                                        message.channel.send(`${players[(player + 1) % players.length].member.user.tag}'s ${returnData.data.shipName} has been sunk! They have ${players[(player + 1) % players.length].placedBoats.filter(ship => !ship.sunk).length} more ship(s) remaining!`);
                                    }
                                }

                                if (this.winCondition(players[(player + 1) % players.length].placedBoats)) {
                                    for (const p of players) {
                                        p.collector.stop();
                                        p.member.send(`${players[player].member.user} won the game!`);
                                    }
                                    message.channel.send(`${players[player].member.user} won the game!`);
                                }

                                //@ts-ignore
                                client.channels.cache.get(players[player].gameChannel).messages.cache.get(players[player].gameMessages.start).edit(`It is now ${players[(player + 1) % players.length].member.user.tag}'s turn! Use \`${prefix}attack <cords>\` to call an attack on that spot!\n\nLegend:\n- Attack Board:\n--- ◻️ = Empty Spot\n--- ⚪ = Missed Attack\n--- 🔴 = Hit Attack\n- Ship Board:\n--- 🔲 = Empty Spot\n--- 🟩 = Unhit Ship\n--- 🟥 = Hit Ship\n--- ⚪ = Missed Opponent Shot`);
                                //@ts-ignore
                                client.channels.cache.get(players[(player + 1) % players.length].gameChannel).messages.cache.get(players[(player + 1) % players.length].gameMessages.start).edit(`It is now ${players[(player + 1) % players.length].member.user.tag}'s turn! Use \`${prefix}attack <cords>\` to call an attack on that spot!\n\nLegend:\n- Attack Board:\n--- ◻️ = Empty Spot\n--- ⚪ = Missed Attack\n--- 🔴 = Hit Attack\n- Ship Board:\n--- 🔲 = Empty Spot\n--- 🟩 = Unhit Ship\n--- 🟥 = Hit Ship\n--- ⚪ = Missed Opponent Shot`);

                                player = (player + 1) % players.length;

                                players[player].member.send(`${players[player].member.user}`).then(m => m.delete());

                            }
                        } else return msg.channel.send("It isn't your turn yet. Please wait for the opponent to attack.").then(m => m.delete({ timeout: 10000 }));

                    } else return msg.channel.send("It looks like the opponent/you hasn't/haven't placed all their/your ships. Please either finish placing your ships or wait for your opponent to finish!").then(m => m.delete({ timeout: 10000 }));
                });
            }

        } else return accept.edit("Looks like they declined.");
    }

    private winCondition (boats: { name: string, length: number, hits: number, sunk: boolean }[]) {
        for (const playerBoat of boats) {
            if (!playerBoat.sunk) return false;
        }
        return true;
    }

    private attack(attackBoard: { data: string, ship: string, cords: { letter: string, number: number, cord: string } }[][], shipBoard: { data: string, ship: string, cords: { letter: string, number: number, cord: string } }[][], spot: { letter: string, number: number, cord: string }) {
        let d: { shipName: string } = {
            shipName: ""
        };
        for (let i = 0; i < shipBoard.length; i++) {
            if (shipBoard[i].find(data => data.cords.cord.toLowerCase() === spot.cord.toLowerCase())) {
                // Missed attack
                if (shipBoard[i][shipBoard[i].findIndex(data => data.cords.cord.toLowerCase() === spot.cord.toLowerCase())].data === "0") {
                    shipBoard[i][shipBoard[i].findIndex(data => data.cords.cord.toLowerCase() === spot.cord.toLowerCase())].data = "3";
                    attackBoard[i][attackBoard[i].findIndex(data => data.cords.cord.toLowerCase() === spot.cord.toLowerCase())].data = "1";
                // Successful attack
                } else if (shipBoard[i][shipBoard[i].findIndex(data => data.cords.cord.toLowerCase() === spot.cord.toLowerCase())].data === "1") {
                    shipBoard[i][shipBoard[i].findIndex(data => data.cords.cord.toLowerCase() === spot.cord.toLowerCase())].data = "2";
                    attackBoard[i][attackBoard[i].findIndex(data => data.cords.cord.toLowerCase() === spot.cord.toLowerCase())].data = "2";
                    d.shipName = shipBoard[i][shipBoard[i].findIndex(data => data.cords.cord.toLowerCase() === spot.cord.toLowerCase())].ship;
                } else return false;
            }
        }
        return {
            shipBoard,
            attackBoard,
            data: d,
        };
    }

    private checkBoatPos(board: { data: string, ship: string, cords: { letter: string, number: number, cord: string } }[][], boat: { name: string, length: number, hits: number }, cords: { letter: string, number: number, cord: string }, dirrection: string) {
        for (let i = 0; i < board.length; i++) {
            if (board[i].find(data => data.cords.cord.toLowerCase() === cords.cord.toLowerCase())) {
                switch (dirrection) {
                    case "up":
                        let countUp = 0;
                        let startPosUp = i;
                        do {
                            if (board[startPosUp] === undefined) return false;
                            if (board[startPosUp][cords.number - 1].data === "1") return false;
                            countUp++;
                            startPosUp--;
                        } while (countUp < boat.length);
                    break;
                    case "down":
                        let countDown = 0;
                        let startPosDown = i;
                        do {
                            if (board[startPosDown] === undefined) return false;
                            if (board[startPosDown][cords.number - 1].data === "1") return false;
                            countDown++
                            startPosDown++;
                        } while (countDown < boat.length);
                    break;
                    case "left":
                        let countLeft = 0;
                        let currIndexLeft = board[i].findIndex(data => data.cords.cord.toLowerCase() === cords.cord.toLowerCase());
                        do {
                            currIndexLeft--;
                            if (board[i][currIndexLeft] === undefined) return false;
                            if (board[i][currIndexLeft].data === "1") return false;
                            countLeft++;
                        } while (countLeft < boat.length);
                    break;
                    case "right":
                        let countRight = 0;
                        let currIndexRight = board[i].findIndex(data => data.cords.cord.toLowerCase() === cords.cord.toLowerCase());
                        do {
                            currIndexRight++;
                            if (board[i][currIndexRight] === undefined) return false;
                            if (board[i][currIndexRight].data === "1") return false;
                            countRight++;
                        } while (countRight < boat.length);
                    break;
                }
            }
        }
        return true;
    }

    private renderBoat(board: { data: string, ship: string, cords: { letter: string, number: number, cord: string } }[][], boat: { name: string, length: number, hits: number, sunk: boolean  }, cords: { letter: string, number: number, cord: string }, dirrection: string) {
        for (let i = 0; i < board.length; i++) {
            if (board[i].find(data => data.cords.cord.toLowerCase() === cords.cord.toLowerCase())) {
                switch (dirrection) {
                    case "up":
                        let countUp = 0;
                        do {
                            board[i][cords.number - 1].data = "1";
                            board[i][cords.number - 1].ship = boat.name;

                            countUp++;
                            i--;
                        } while (countUp < boat.length);
                    break;
                    case "down":
                        let countDown = 0;
                        do {
                            board[i][cords.number - 1].data = "1";
                            board[i][cords.number - 1].ship = boat.name;

                            countDown++
                            i++;
                        } while (countDown < boat.length);
                    break;
                    case "left":
                        let countLeft = 0;
                        let currIndexLeft = board[i].findIndex(data => data.cords.cord.toLowerCase() === cords.cord.toLowerCase());
                        do {
                            board[i][currIndexLeft].data = "1";

                            board[i][currIndexLeft].ship = boat.name;

                            currIndexLeft--;
                            countLeft++;
                        } while (countLeft < boat.length);
                    break;
                    case "right":
                        let countRight = 0;
                        let currIndexRight = board[i].findIndex(data => data.cords.cord.toLowerCase() === cords.cord.toLowerCase());
                        do {
                            board[i][currIndexRight].data = "1";
                            
                            board[i][currIndexRight].ship = boat.name;

                            currIndexRight++;
                            countRight++;
                        } while (countRight < boat.length);
                    break;
                }
                return {
                    board,
                    boat,
                };
            }
        }
    }

    private genBoard(hor: number, ver: number) {
        let whileCounter = 0;
        const boardLetter = [ { i: 0, letter: "A" }, { i: 1, letter: "B" }, { i: 2, letter: "C" }, { i: 3, letter: "D" }, { i: 4, letter: "E" }, { i: 5, letter: "F" }, { i: 6, letter: "G" }, { i: 7, letter: "H" }, { i: 8, letter: "I" }, { i: 9, letter: "J" } ];
        const doneData: { data: string, ship: string, cords: { letter: string, number: number, cord: string } }[][] = [];
        do {
            const temp: { data: string, ship: string, cords: { letter: string, number: number, cord: string } }[] = [];
            for (let i = 0; i < ver; i++) {
                const boardLttr = boardLetter.find(data => data.i === whileCounter).letter;
                temp.push({ data: "0", ship: "", cords: { letter: boardLttr, number: i + 1, cord: boardLttr + (i + 1) } });
            }
            doneData.push(temp);
            whileCounter++;
        } while (whileCounter < hor);
        return doneData;
    }

    private displayHitBoard(board: { data: string, ship: string, cords: { letter: string, number: number, cord: string } }[][]) {
        let returnData = "";
        returnData = returnData.concat("⬛1️⃣2️⃣3️⃣4️⃣5️⃣6️⃣7️⃣8️⃣9️⃣🔟\n");
        for (let i = 0; i < board.length; i++) {
            let temp = "";

            const leftEmoji = [ { i: 0, emoji: ":regional_indicator_a:" }, { i: 1, emoji: ":regional_indicator_b:" }, { i: 2, emoji: ":regional_indicator_c:" }, { i: 3, emoji: ":regional_indicator_d:" }, { i: 4, emoji: ":regional_indicator_e:" }, { i: 5, emoji: ":regional_indicator_f:" }, { i: 6, emoji: ":regional_indicator_g:" }, { i: 7, emoji: ":regional_indicator_h:" }, { i: 8, emoji: ":regional_indicator_i:" }, { i: 9, emoji: ":regional_indicator_j:" } ]

            for (let j = 0; j < board[i].length; j++) {
                // "0" is an empty space, "1" is a missed shot, "2" is a hit shot
                temp += `${board[i][j].data === "0" ? "◻️" : board[i][j].data === "1" ? "⚪" : "🔴" }`;
            }
            returnData += leftEmoji.find(object => object.i === i).emoji + temp + "\n";
        }
        return returnData;
    }

    private displayShipBoard(board: { data: string, ship: string, cords: { letter: string, number: number, cord: string } }[][]) {
        let returnData = "";
        returnData = returnData.concat("⬛1️⃣2️⃣3️⃣4️⃣5️⃣6️⃣7️⃣8️⃣9️⃣🔟\n");

        const leftEmoji = [ { i: 0, emoji: ":regional_indicator_a:" }, { i: 1, emoji: ":regional_indicator_b:" }, { i: 2, emoji: ":regional_indicator_c:" }, { i: 3, emoji: ":regional_indicator_d:" }, { i: 4, emoji: ":regional_indicator_e:" }, { i: 5, emoji: ":regional_indicator_f:" }, { i: 6, emoji: ":regional_indicator_g:" }, { i: 7, emoji: ":regional_indicator_h:" }, { i: 8, emoji: ":regional_indicator_i:" }, { i: 9, emoji: ":regional_indicator_j:" } ]

        for (let i = 0; i < board.length; i++) {
            let temp = "";
            for (let j = 0; j < board[i].length; j++) {
                // "0" is an empty space, "1" is a unhit ship piece, "2" is a hit ship piece, "3" is a missed shot from opponent
                temp += `${board[i][j].data === "0" ? "◻️" : board[i][j].data === "1" ? "🟩" : board[i][j].data === "2" ? "🟥" : "⚪" }`;
            }
            returnData += leftEmoji.find(object => object.i === i).emoji + temp + "\n";
        }
        return returnData;
    }
}