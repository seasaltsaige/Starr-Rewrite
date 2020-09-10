import { GuildMember, Message } from "discord.js";
import { BaseCommand } from "../structure/BaseCommand";

export default class PermissionGaurd {
    constructor(public member: GuildMember) { };

    check(command: BaseCommand) {
        for (const permission of command.permissions) {
            if (!this.member.permissions.has(permission)) return "You don't have permission to use that command!";
        }
    }
}