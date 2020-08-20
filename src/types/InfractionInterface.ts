import { Snowflake } from "discord.js";

export default interface Infraction {
    infractionType: "warn" | "strike" | "mute" | "kick" | "ban";
    caseId: string;
    user: Snowflake;
    description: string;
    date: Date;
}