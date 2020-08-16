import { Document } from "mongoose";
import WarnInterface from "./WarnObjectInterface";
import { Snowflake } from "discord.js";

export default interface WarnsDoc extends Document {
    guild: Snowflake;
    user: Snowflake;
    warns: Array<WarnInterface>;
}