import { Schema, model } from "mongoose";
import LevelsDoc from "../SchemaInterfaces/LevelsDoc";

const Levels = new Schema({
    guild: { type: String, required: true },
    user: { type: String, required: true },

    stats: { type: Object, default: { level: 1, currXp: 0, reqXp: 500 } },
});

export default model<LevelsDoc>("levels", Levels);