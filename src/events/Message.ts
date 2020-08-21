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
        const prefix = client.cachedPrefixes.get(message.guild.id) || client.defaultPrefix;

        // Check if the bot was pinged
        const Ping = new Pinged({ message, type: "equals", client });
        const pingMess = Ping.check();

        // If it was, send the response
        if (pingMess) return message.channel.send(pingMess);

        // Get the prefix for the guild.

        // Get the command name and args from the message.
        const args = message.content.slice(prefix.length).trim().split(/ +/g);
        const commandName = args.shift().toLowerCase();

        // Fetch the command file from the Map
        const command = client.commands.get(commandName) || client.commands.get(client.aliases.get(commandName));
        if (command) {
            // Handle all checks. If they pass the run method will be called.
            const checks = new Checks(message, client, command, args)
            console.log("checkings..")
            checks.check(command.run)
        }
    }
}