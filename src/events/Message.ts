import StarrClient from "../utils/structure/StarrClient";
import { Collection, Message as message, Snowflake } from "discord.js";
import BaseEvent from "../utils/structure/BaseEvent";
import BaseCommand from "../utils/structure/BaseCommand";
import { GuildOwner, HandleXp, OwnerGuard, PermissionGaurd, Pinged } from "../utils/checks/index";

let cooldown = new Collection<Snowflake, number>();

export default class Message extends BaseEvent {
    constructor() {
        super({
            name: "message"
        })
    }

    public async run(client: StarrClient, message: message) {
        if (!message.guild) return;
        if (message.author.bot) return;
        
        const prefix = client.cachedPrefixes.get(message.guild.id) || client.defaultPrefix;

        const Leveling = new HandleXp(message, cooldown);
        const handled = await Leveling.handle();
        if (handled) {
            cooldown = handled.cooldown;
            if (handled.msg) message.channel.send(handled.msg);
            setTimeout(() => {
                cooldown.delete(message.author.id);
            }, 1000 * 60);
        }
        // Check if the bot was pinged
        const Ping = new Pinged({ message, type: "equals", client });
        const pingMess = Ping.check();

        // If it was, send the response
        if (pingMess) return message.channel.send(pingMess);

        // If a user DMs the bot, return
        if (!message.guild) return;
        // If the message doesn't start with the prefix, return
        if (!message.content.startsWith(prefix)) return;

        const args = message.content.slice(prefix.length).trim().split(/ +/g);
        const commandName = args.shift().toLowerCase();

        // Fetch the command file from the Map
        const commandFile: BaseCommand = client.commands.get(commandName) || client.commands.get(client.aliases.get(commandName));

        if (commandFile) {
            // Define all our permission checks
            const permissionCheck = new PermissionGaurd(message.member);
            const ownerCheck = new OwnerGuard({ owners: client.owners, member: message.member });
            const guildOwner = new GuildOwner(message, message.guild, commandFile);

            if (client.owners.some(id => id === message.author.id)) return commandFile.run(client, message, args);

            if (!guildOwner.check()) return message.channel.send(`${commandFile.name} is locked to guild owner only!`);

            // Check if the command is disabled and if the member is an owner or not
            if (commandFile.enabled !== undefined && !commandFile.enabled && ownerCheck.check() !== undefined) {
                return message.channel.send("This command is disabled for non bot owners!");
            }

            // Check if the command is set to bot owners only
            if (commandFile.ownerOnly) {
                // Check if the member is a bot owner
                const ownMess = ownerCheck.check();
                if (ownMess) return message.channel.send(ownMess);
            }

            // Check if the member has the required permissions
            const permMess = permissionCheck.check(commandFile);
            if (permMess) return message.channel.send(permMess);

            // If all checks pass, run the command
            return commandFile.run(client, message, args);
        };

    }
}