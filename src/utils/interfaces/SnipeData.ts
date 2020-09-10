import { Snowflake } from "discord.js";

export default interface SnipeData {
    content: string;
    author: Snowflake;
    timestamp: Date;
    image?: string;
}