import { Snowflake } from "discord.js";

export default interface Mute {
    id: Snowflake;
    unmute: Date | "none";
    oldRoles: Array<Snowflake>;
}