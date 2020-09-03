import { Message, PermissionResolvable, GuildMember } from "discord.js";
import BaseCommandInfo from "../types/BaseCommandInfo";
import StarrClient from "./StarrClient";
import { CategoryResolvable } from "../resolvables/Resolvables";

export abstract class BaseCommand {
    name: string;
    usage: string;
    aliases: Array<string>;
    category: CategoryResolvable;
    description: string;
    permissions: Array<PermissionResolvable>;
    enabled: boolean;
    ownerOnly: boolean;
    g_owner_only?: boolean;

    constructor(BaseCommandInfo: BaseCommandInfo) {
        this.name = BaseCommandInfo.name;
        this.usage = BaseCommandInfo.usage;
        this.aliases = BaseCommandInfo.aliases;
        this.description = BaseCommandInfo.description;
        this.permissions = BaseCommandInfo.permissions;
        this.enabled = BaseCommandInfo.enabled;
        this.category = BaseCommandInfo.category;
        this.ownerOnly = BaseCommandInfo.ownerOnly;
        this.g_owner_only = BaseCommandInfo.g_owner_only;
    };

    abstract async run(client: StarrClient, message: Message, args: Array<string>): Promise<any>;

}