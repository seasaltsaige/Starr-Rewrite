import { Schema, model } from "mongoose";
import { GuildMember, SnowflakeUtil } from "discord.js";

const Guild = new Schema({
    id: { type: String, required: true },
    prefix: { type: String, requiredPaths: false, default: null },
    logChannel: { type: String, required: false, default: null },
});

export default model("guild", Guild);