import { Message } from "discord.js";
import StarrClient from "../utils/BaseClasses/StarrClient";

export default interface PingedInfo {
    message: Message;
    type: "start" | "includes";
    client: StarrClient;
}