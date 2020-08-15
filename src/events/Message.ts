import StarrClient from "../utils/BaseClasses/StarrClient";
import { Message as message } from "discord.js";
import PermissionGaurd from "../utils/checks/PermissionGaurd";
import OwnerGaurd from "../utils/checks/OwnerGaurd";

export default class Message {
    static async run(client: StarrClient, message: message) {
        const prefix = client.defaultPrefix;

        if (!message.guild) return;
        if (!message.content.startsWith(prefix)) return;

        const args = message.content.slice(prefix.length).trim().split(/ +/g);
        const commandName = args.shift().toLowerCase();

        const commandFile = client.commands.get(commandName);

        if (commandFile) {
            // Define all our permission checks
            const permissionCheck = new PermissionGaurd({ member: message.member, command: commandFile });
            const ownerCheck = new OwnerGaurd({ owners: client.owners, member: message.member });

            // Check if the command is set to bot owners only
            if (commandFile.default.ownerOnly) {
                // Check if the member is a bot owner
                const ownMess = ownerCheck.check();
                if (ownMess) return message.channel.send(ownMess);
            }

            // Check if the member has the required permissions
            const permMess = permissionCheck.check();
            if (permMess) return message.channel.send(permMess);

            return commandFile.default.run(client, message, args);
        };

    }
}