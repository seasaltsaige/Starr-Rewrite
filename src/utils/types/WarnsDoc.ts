import { Document } from "mongoose";
import WarnInterface from "./InfractionInterface";
import { Snowflake } from "discord.js";

export default interface WarnsDoc extends Document {
    guild: Snowflake;
    user: Snowflake;
    warns: Array<WarnInterface>;
}