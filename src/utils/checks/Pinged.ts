import PingedInfo from "../../types/PingedInfo";
import { Message } from "discord.js";
import StarrClient from "../BaseClasses/StarrClient";

export default class Pinged {
    message: Message;
    client: StarrClient;
    type: "start" | "includes" | "equals";


    constructor(PingedInfo: PingedInfo) {
        this.message = PingedInfo.message;
        this.type = PingedInfo.type;
        this.client = PingedInfo.client;
    }
    async check() {
        switch (this.type) {
            case "includes":
                if (this.message.content.includes(`<@${this.client.user.id}>`) || this.message.content.includes(`<@!${this.client.user.id}>`)) {
                    const customPrefix = this.client.cachedPrefixes.get(this.message.guild.id);
                    return `My prefix is ${customPrefix ? customPrefix : this.client.defaultPrefix}`;
                }
            break;
            case "start":
                if (this.message.content.startsWith(`<@${this.client.user.id}>`) || this.message.content.startsWith(`<@!${this.client.user.id}>`)) {
                    const customPrefix = this.client.cachedPrefixes.get(this.message.guild.id);
                    return `My prefix is ${customPrefix ? customPrefix : this.client.defaultPrefix}`;
                }
            break;
            case "equals":
                if (this.message.content === (`<@${this.client.user.id}>`) || this.message.content === (`<@!${this.client.user.id}>`)) {
                    const customPrefix = this.client.cachedPrefixes.get(this.message.guild.id);
                    return `My prefix is ${customPrefix ? customPrefix : this.client.defaultPrefix}`;
                }
            break;
        }
    }
}