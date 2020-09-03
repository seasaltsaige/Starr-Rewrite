import { GuildMember, Message } from "discord.js";
import { BaseCommand } from "../BaseClasses/BaseCommand";

export default interface PermissionGaurdInfo {
    member: GuildMember;
    // command: BaseCommand;
}