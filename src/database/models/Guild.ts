import { Schema, model } from "mongoose"; 
import GuildDoc from "../SchemaInterfaces/GuildDoc";

const Guild = new Schema({
    id: { type: String, required: true },
    prefix: { type: String, default: null },
    logChannel: { type: String,  default: null },
    infractionNumber: { type: Number,  default: 1 },
    infractions: { type: Array,  default: [] },
    modRoles_Users: { type: Array, default: [] },
    muteRole: { type: String, default: "" },
    mutedUsers: { type: Array, default: [] },
});

export default model<GuildDoc>("guild", Guild);