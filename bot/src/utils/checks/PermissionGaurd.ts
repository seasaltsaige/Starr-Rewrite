import PermissionGaurdInfo from "../../types/PermissionGaurdInfo";
import { GuildMember, Message } from "discord.js";
import { BaseCommand } from "../BaseClasses/BaseCommand";

export default class PermissionGaurd {
    member: GuildMember;
    // command: BaseCommand;
    constructor(private PermissionGaurdInfo: PermissionGaurdInfo) { 
        this.member = PermissionGaurdInfo.member;
        // this.command = PermissionGaurdInfo.command;
    };

    // public get command(): BaseCommand { return this.PermissionGaurdInfo.command }
    // public get member(): GuildMember { return this.PermissionGaurdInfo.member }

    check(command: BaseCommand) {
        for (const permission of command.permissions) {
            if (!this.member.permissions.has(permission)) return "You don't have permission to use that command!";
        }
    }
}