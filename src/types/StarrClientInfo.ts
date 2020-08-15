import { Snowflake } from "discord.js";
import SnipeKey from "./SnipeKey";
import SnipeData from "./SnipeData";
export default interface StarrClientInfo {
    defaultPrefix: string;
    commands: Map<string, object>;
    owners: Array<Snowflake>;
    snipes: Map<SnipeKey, SnipeData>;
}