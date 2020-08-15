import { Schema, model } from "mongoose"; 
import GuildDoc from "../../types/GuildDoc";

const Guild = new Schema({
    id: { type: String, required: true },
    prefix: { type: String, requiredPaths: false, default: null },
    logChannel: { type: String, required: false, default: null },
});

export default model<GuildDoc>("guild", Guild);