import { Snowflake, ClientOptions } from "discord.js";
import SnipeData from "./SnipeData";
export default interface StarrClientInfo {
    defaultPrefix: string;
    commands: Map<string, object>;
    owners: Array<Snowflake>;
    snipes: Map<string, SnipeData>;
    baseOptions?: ClientOptions;
    // cachedPrefixes: Map<string, string>;
}