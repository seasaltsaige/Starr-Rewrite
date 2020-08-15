import { Snowflake, GuildMember } from "discord.js";

export default interface OwnerGaurdInfo {
    owners: Array<Snowflake>;
    member: GuildMember;
}