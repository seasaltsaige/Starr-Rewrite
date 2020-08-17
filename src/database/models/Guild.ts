import { Schema, model } from "mongoose"; 
import GuildDoc from "../../types/GuildDoc";

const Guild = new Schema({
    id: { type: String, required: true },
    prefix: { type: String, default: null },
    logChannel: { type: String,  default: null },
    warnNumber: { type: Number,  default: 1 },
    warns: { type: Array,  default: [] },
});

export default model<GuildDoc>("guild", Guild);