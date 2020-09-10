import { Message, Guild } from "discord.js";
import { BaseCommand } from "../structure/BaseCommand";

export default class OwnerOnly {

    constructor(public message: Message, public guild: Guild, public command: BaseCommand) { };
    public check() {
        if ((this.message.author.id !== this.guild.ownerID) && this.command.g_owner_only) return false;
        else return true;
    }
}