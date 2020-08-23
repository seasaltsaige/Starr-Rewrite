import { Message, Guild } from "discord.js";
import { BaseCommand } from "../BaseClasses/BaseCommand";

export default class OwnerOnly {
    message: Message;
    guild: Guild;
    command: BaseCommand;
    constructor(message: Message, guild: Guild, command: BaseCommand) {
        this.message = message;
        this.guild = guild;
        this.command = command;
    };
    check() {
        if ((this.message.author.id !== this.guild.ownerID) && this.command.g_owner_only) return false;
        else return true;
    }
}