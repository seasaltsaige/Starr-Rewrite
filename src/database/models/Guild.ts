import { Schema, model } from "mongoose"; 
import GuildDoc from "../../types/GuildDoc";

const Guild = new Schema({
    id: { type: String, required: true },
    prefix: { type: String, requiredPaths: false, default: null },
    logChannel: { type: String, required: false, default: null },
    warnNumber: { type: Number, required: false, default: 0 },
});

export default model<GuildDoc>("guild", Guild);