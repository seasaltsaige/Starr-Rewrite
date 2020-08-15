import { Message, PermissionResolvable, GuildMember } from "discord.js";
import BaseCommandInfo from "../interfaces/BaseCommandInfo";
import StarrClient from "./StarrClient";

export abstract class BaseCommand {
    name: string;
    usage: string;
    aliases: Array<string>;
    description: string;
    permissions: Array<PermissionResolvable>;
    enabled: boolean;
    ownerOnly: boolean;

    constructor(BaseCommandInfo: BaseCommandInfo) {
        this.name = BaseCommandInfo.name;
        this.usage = BaseCommandInfo.usage;
        this.aliases = BaseCommandInfo.aliases;
        this.description = BaseCommandInfo.description;
        this.permissions = BaseCommandInfo.permissions;
        this.enabled = BaseCommandInfo.enabled;
        this.ownerOnly = BaseCommandInfo.ownerOnly;
    };

    abstract async run(client: StarrClient, message: Message, args: Array<string>): Promise<void>;

}