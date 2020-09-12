import { Snowflake } from "discord.js";
import { Document } from "mongoose";

export default interface LevelsDoc extends Document {
    guild: Snowflake;

    user: Snowflake;
    stats: {
        level: number;
        currXp: number;
        reqXp: number;
    };
}