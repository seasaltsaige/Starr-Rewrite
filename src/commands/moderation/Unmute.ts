import BaseCommand from "../../utils/structure/BaseCommand";
import StarrClient from "../../utils/structure/StarrClient";
import { Message } from "discord.js";
import Guild from "../../database/models/Guild";

export default class Unmute extends BaseCommand {
    constructor() {
        super({
            name: "unmute",
            category: "moderation",
            description: "Unmute a user",
            permissions: ["MANAGE_ROLES"],
            usage: "unmute <user>",
        });
    }
    public async run (client: StarrClient, message: Message, args: string[]) {

        let guild = await Guild.findOne({ id: message.guild.id });

        if (!guild) guild = new Guild({ id: message.guild.id });

        const member = message.mentions.members.first() || message.guild.members.cache.get(args[0]);

        const oldRoles = guild.mutedUsers.find(ob => ob.id === member.id).oldRoles;

        try {
            await member.roles.remove(guild.muteRole);
            for (const role of oldRoles) {
                await member.roles.add(role);
            }


            guild.mutedUsers.splice(guild.mutedUsers.findIndex(ob => ob.id === member.id), 1);

            await guild.updateOne(guild);


        } catch (err) {
            return message.channel.send(`Something went wrong while unmuting ${member.user.tag}`);
        }

        return message.channel.send(`Successfully unmuted ${member.user.tag}`);

    }
}