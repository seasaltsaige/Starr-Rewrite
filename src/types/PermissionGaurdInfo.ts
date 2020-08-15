import { GuildMember, Message } from "discord.js";

export default interface PermissionGaurdInfo {
    member: GuildMember;
    command: any;
}