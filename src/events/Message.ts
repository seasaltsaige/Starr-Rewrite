import StarrClient from "../utils/BaseClasses/StarrClient";
import { Message as message } from "discord.js";
import PermissionGaurd from "../utils/checks/PermissionGaurd";
import OwnerGuard from "../utils/checks/OwnerGuard";
import Pinged from "../utils/checks/Pinged";
import BaseEvent from "../utils/BaseClasses/BaseEvent";

export default class Message extends BaseEvent {
    constructor() {
        super({
            name: "message",
            description: "The event that lets to bot listen to messages."
        })
    }
    public async run(client: StarrClient, message: message) {
        const prefix = await client.getGuildPrefix(message.guild) || client.defaultPrefix;

        const Ping = new Pinged({ message, type: "equals", client });
        const pingMess = await Ping.check();

        if (pingMess) return message.channel.send(pingMess);


        if (!message.guild) return;
        if (!message.content.startsWith(prefix)) return;

        const args = message.content.slice(prefix.length).trim().split(/ +/g);
        const commandName = args.shift().toLowerCase();

        const commandFile = client.commands.get(commandName);

        if (commandFile) {
            // Define all our permission checks
            const permissionCheck = new PermissionGaurd({ member: message.member, command: commandFile });
            const ownerCheck = new OwnerGuard({ owners: client.owners, member: message.member });

            // Check if the command is disabled and if the member is an owner or not
            if (!commandFile.default.enabled && ownerCheck.check() !== undefined) {
                return message.channel.send("This command is disabled for non bot owners!");
            }

            // Check if the command is set to bot owners only
            if (commandFile.default.ownerOnly) {
                // Check if the member is a bot owner
                const ownMess = ownerCheck.check();
                if (ownMess) return message.channel.send(ownMess);
            }

            // Check if the member has the required permissions
            const permMess = permissionCheck.check();
            if (permMess) return message.channel.send(permMess);

            // If all checks pass, run the command
            return commandFile.default.run(client, message, args);
        };

    }
}