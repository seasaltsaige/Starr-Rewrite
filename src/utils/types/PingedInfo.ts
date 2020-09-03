import { Message } from "discord.js";
import StarrClient from "../BaseClasses/StarrClient";

export default interface PingedInfo {
    message: Message;
    type: "start" | "includes" | "equals";
    client: StarrClient;
}