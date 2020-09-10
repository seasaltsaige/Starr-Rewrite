import { Message } from "discord.js";
import StarrClient from "../structure/StarrClient";

export default interface PingedInfo {
    message: Message;
    type: "start" | "includes" | "equals";
    client: StarrClient;
}