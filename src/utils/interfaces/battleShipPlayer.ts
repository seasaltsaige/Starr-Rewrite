import { GuildMember, MessageCollector } from "discord.js";

export default interface battleShipPlayer {
    collector: MessageCollector;
    member: GuildMember;
    playerHitBoard: { 
        data: string;
        ship: string;
        cords: { 
            letter: string;
            number: number;
            cord: string;
        };
    }[][];
    playerShipBoard: { 
        data: string;
        ship: string;
        cords: { 
            letter: string;
            number: number;
            cord: string;
        };
    }[][];
    gameChannel: string;
    placedBoats: {
        name: string;
        length: number;
        hits: number;
        sunk: boolean;
    }[];
    gameMessages: { 
        start: string; 
        hits: string; 
        boats: string ;
    };
    ready: boolean;
    
};