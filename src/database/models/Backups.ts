import { Schema, model } from "mongoose";
import BackupDoc from "../SchemaInterfaces/BackupDoc";

const Backup = new Schema({
    code: { type: String, required: true },
    private: { type: Boolean, required: true },
    data: { type: Object, default: { channels: [], roles: [], emojis: [] } },
    name: { type: String, required: true },
    icon: { type: String, required: true },
    settings: { type: Object, required: true },
    owner: { type: String, required: true },
});

export default model<BackupDoc>("backups", Backup);