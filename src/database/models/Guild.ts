import { Schema, model } from "mongoose";
import { GuildMember, SnowflakeUtil } from "discord.js";

const Guild = new Schema({
    id: { type: SnowflakeUtil, required: true },
    prefix: { type: String, requiredPaths: false, default: null },
    logChannel: { type: SnowflakeUtil, required: false, default: null },
});

export default model("guild", Guild);