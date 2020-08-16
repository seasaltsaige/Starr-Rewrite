import { Schema, model } from "mongoose";
import WarnsDoc from "../../types/WarnsDoc";

const Warns = new Schema({
    guild: { type: String, required: true },
    user: { type: String, required: true },

    warns: { type: Array, required: false, default: [] },
});

export default model<WarnsDoc>("warns", Warns);