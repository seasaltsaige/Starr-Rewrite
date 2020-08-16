import PermissionGaurdInfo from "../../types/PermissionGaurdInfo";
import { GuildMember, Message } from "discord.js";
import { BaseCommand } from "../BaseClasses/BaseCommand";

export default class PermissionGaurd {

    constructor(private PermissionGaurdInfo: PermissionGaurdInfo) { };

    public get command(): BaseCommand { return this.PermissionGaurdInfo.command }
    public get member(): GuildMember { return this.PermissionGaurdInfo.member }

    check() {
        for (const permission of this.command.permissions) {
            if (!this.member.permissions.has(permission)) return "You don't have permission to use that command!";
        }
    }
}