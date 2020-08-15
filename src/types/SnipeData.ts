import { Snowflake } from "discord.js";

export default interface SnipeData {
    content: string;
    author: Snowflake;
    image?: string;
}