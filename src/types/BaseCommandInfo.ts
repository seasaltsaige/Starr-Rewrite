import { PermissionResolvable } from "discord.js";

export default interface BaseCommandInfo {
    /**
     * The name of the command
     */
    name: string;
    /**
     * How to use the command
     */
    usage: string;
    /**
     * Any aliases the command might have
     */
    aliases?: Array<string>;
    /**
     * A short description of what the command does
     */
    description: string;
    /**
     * The Discord PermissionResovable permissions required to use the command
     */
    permissions: Array<PermissionResolvable>;
    /**
     * If the command is enabled - Requires manual change
     */
    enabled?: boolean;
    /**
     * If the command is locked to bot owners only
     */
    ownerOnly?: boolean;
} 