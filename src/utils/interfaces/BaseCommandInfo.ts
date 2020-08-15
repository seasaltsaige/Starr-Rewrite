import { PermissionResolvable } from "discord.js";

export default interface BaseCommandInfo {
    name: string;
    usage: string;
    aliases: Array<string>;
    description: string;
    permissions: Array<PermissionResolvable>;
    enabled: boolean;
    ownerOnly?: boolean;
}