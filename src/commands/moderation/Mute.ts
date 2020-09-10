import { BaseCommand } from "../../utils/structure/BaseCommand";
import StarrClient from "../../utils/structure/StarrClient";
import { Message } from "discord.js";
import Guild from "../../database/models/Guild";

export default class Mute extends BaseCommand {
    constructor() {
        super({
            name: "mute",
            category: "moderation",
            description: "Mute a user",
            permissions: ["MANAGE_ROLES"],
            usage: "mute <user> <reason>",
        });
    }
    public async run (client: StarrClient, message: Message, args: string[]) {

        let guild = await Guild.findOne({ id: message.guild.id });

        if (!guild) guild = new Guild({ id: message.guild.id });

        let muteID = guild.muteRole;

        if (!muteID) {
            const createdRole = await message.guild.roles.create({
                data: {
                    name: "Muted",
                    color: "#514f48",
                    permissions: [],
                },
                reason: "Create Mute Role",
            });

            guild.muteRole = createdRole.id;
            muteID = createdRole.id;

            try {
                await guild.updateOne(guild);
            } catch (err) {
                return message.channel.send("Something went wrong while saving the new muted role to the database");
            }
        };

        guild = await Guild.findOne({ id: message.guild.id });


        const member = message.mentions.members.first() || message.guild.members.cache.get(args[0]);

        if (member.roles.cache.has(muteID)) return message.channel.send(`${member.user.tag} is already muted`);

        const caseId = guild.infractionNumber.toString().padStart(5, "0");

        let reason = args.slice(1).join(" ");
        if (!reason) reason = `\`No Reason Provided\` - Use \`${client.cachedPrefixes.get(message.guild.id)}editinfraction ${caseId} <New Reason>\` to set a new reason.`;

        guild.infractions.push({
            caseId,
            date: new Date(),
            description: reason,
            infractionType: "mute",
            user: member.id,
        });

        guild.mutedUsers.push({ 
            id: member.id, 
            unmute: "none",
            oldRoles: member.roles.cache.map(role => role.id).filter(role => role !== message.guild.id),
        });

        guild.infractionNumber++;

        try {

            for (const [__, role] of member.roles.cache.filter(role => role.id !== message.guild.id)) {
                await member.roles.remove(role);
            }

            await member.roles.add(muteID);
        } catch (err) {
            return message.channel.send("Something went wrong while adding the mute role to this member. Do they have a higher role than me?");
        };

        try {
            await guild.updateOne(guild);
        } catch (err) {
            for (const role of guild.mutedUsers.find(ob => ob.id === member.id).oldRoles) {
                await member.roles.add(role);
            }
            await member.roles.remove(muteID);
            return message.channel.send("Something went wrong while saving mute data to the database. The mute role has been removed, please try again.");
        }

        return message.channel.send(`Successfully muted ${member.user.tag} for the reason, **${reason}**`);

    }
}