import { Snowflake } from "discord.js";

export default interface WarnInterface {
    warn: string,
    caseId: string,
    user: Snowflake,
}