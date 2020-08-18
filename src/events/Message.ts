import StarrClient from "../utils/BaseClasses/StarrClient";
import { Message as message } from "discord.js";
import PermissionGaurd from "../utils/checks/PermissionGaurd";
import OwnerGuard from "../utils/checks/OwnerGuard";
import Pinged from "../utils/checks/Pinged";
import BaseEvent from "../utils/BaseClasses/BaseEvent";
import { BaseCommand } from "../utils/BaseClasses/BaseCommand";
import Checks from "../utils/checks/Checks";

export default class Message extends BaseEvent {
    constructor() {
        super({
            name: "message"
        })
    }

    public async run(client: StarrClient, message: message) {

        // Get the prefix for the guild.
        const prefix = client.cachedPrefixes.get(message.guild.id) || client.defaultPrefix;

        // Get the command name and args from the message.
        const args = message.content.slice(prefix.length).trim().split(/ +/g);
        const commandName = args.shift().toLowerCase();

        // Fetch the command file from the Map
        const command = client.commands.get(commandName) || client.commands.get(client.aliases.get(commandName));
        if (command) {
            // Handle all checks. If they pass the run method will be called.
            const checks = new Checks(message, client, command, args)
            checks.check(command.run)
        }
    }
}