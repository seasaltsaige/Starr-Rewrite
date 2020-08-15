import { Snowflake } from "discord.js";

export default interface SnipeKey {
    guild: Snowflake;
    channel: Snowflake;
}