import Pinged from "./Pinged";
import { Message } from "discord.js";
import StarrClient from "../BaseClasses/StarrClient";
import { BaseCommand } from "../BaseClasses/BaseCommand";
import PermissionGuard from "./PermissionGaurd";
import OwnerGuard from "./OwnerGuard";
import BaseEvent from "../BaseClasses/BaseEvent";

export default class Checks {

    private prefix = this.client.cachedPrefixes.get(this.message.guild.id) || this.client.defaultPrefix;
    private permissionCheck = new PermissionGuard({ member: this.message.member });
    private ownerCheck = new OwnerGuard({ owners: this.client.owners, member: this.message.member });

    constructor(
        private message: Message,
        private client: StarrClient,
        private command: BaseCommand,
        private args: Array<string>
    ) { }

    /**
     * Checks if command can run.
     * @param next The method that should run if the checks pass. Should be the command's run method.
     */
    public check(next: BaseCommand["run"]): void {
        if (this.wasDm()) return
        if (!this.doesStartWithPrefix()) return
        if (this.isCommandDisabled()) return
        if (this.isCommandOwnerOnly()) return
        if (!this.doesHavePermissions()) return
        if (!this.isOnCooldown()) return
        console.log("calling...")
        next(this.client, this.message, this.args)
    }

    /**
     * Check if the message was a dm.
     */
    private wasDm(): boolean {
        if (this.message.guild) return false;
        return true
    }

    /**
     * Check if the message start with the prefix
     */
    private doesStartWithPrefix(): boolean {
        if (!this.message.content.startsWith(this.prefix)) return false;
        return true
    }

    /**
     * Check if the member has the required permissions.
     */
    private doesHavePermissions(): boolean {
        const permMess = this.permissionCheck.check(this.command);
        if (permMess) {
            this.message.channel.send(permMess)
            return false
        }
        return true
    }

    /**
     * Check if the command is disabled.
     */
    private isCommandDisabled(): boolean {
        if (this.command.enabled !== undefined && !this.command.enabled && this.ownerCheck.check() !== undefined) {
            this.message.channel.send("This command is disabled for non bot owners!");
            return true
        }
        return false
    }

    /**
     * Check if the command is set to bot owners only.
     */
    private isCommandOwnerOnly(): boolean {
        if (this.command.ownerOnly) {
            const ownMess = this.ownerCheck.check();
            if (ownMess) {
                this.message.channel.send(ownMess);
                return true
            }
        }
        return false
    }

    /**
     * Check if the user is on cooldown.
     */
    private isOnCooldown(): boolean {
        if (this.command.cooldown && !this.command.cooldown.check(this.message, this.command, this.client) === true) return false
        return true
    }
}