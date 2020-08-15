import { Snowflake } from "discord.js";

export default interface StarrClientInfo {
    defaultPrefix: string;
    commands: Map<string, object>;
    owners: Array<Snowflake>;
}