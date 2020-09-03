import PingedInfo from "../types/PingedInfo";
import { Message } from "discord.js";
import StarrClient from "../BaseClasses/StarrClient";

export default class Pinged {
    constructor(private pingedInfo: PingedInfo) { }

    public get message(): Message { return this.pingedInfo.message }
    public get client(): StarrClient { return this.pingedInfo.client }
    public get type(): string { return this.pingedInfo.type }

    public check() {
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