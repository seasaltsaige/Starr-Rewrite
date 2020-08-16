import { Snowflake, ClientOptions } from "discord.js";
import SnipeData from "./SnipeData";
export default interface StarrClientInfo {
    defaultPrefix: string;
    owners: Array<Snowflake>;
    baseOptions?: ClientOptions;
}