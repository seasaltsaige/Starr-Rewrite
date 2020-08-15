import PermissionGaurdInfo from "../../types/PermissionGaurdInfo";
import { GuildMember, Message } from "discord.js";

export default class PermissionGaurd {
    member: GuildMember;
    command: any;

    constructor(PermissionGaurdInfo: PermissionGaurdInfo) {
        this.command = PermissionGaurdInfo.command;
        this.member = PermissionGaurdInfo.member;
    };

    check() {
        for (const permission of this.command.default.permissions) {
            if (!this.member.permissions.has(permission)) return "You don't have permission to use that command!";
        }
    }
}