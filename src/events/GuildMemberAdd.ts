import BaseEvent from "../utils/structure/BaseEvent";
import StarrClient from "../utils/structure/StarrClient";
import { GuildMember } from "discord.js";
import Guild from "../database/models/Guild";

export default class GuildMemberAdd extends BaseEvent {
    constructor() {
        super({
            name: "guildMemberAdd",
        });
    }

    async run (client: StarrClient, member: GuildMember) {

        let guild = await Guild.findOne({ id: member.guild.id });

        if (!guild) guild = new Guild({ id: member.guild.id });

        if (guild.mutedUsers.find(ob => ob.id === member.id)) {
            await member.roles.add(guild.muteRole);
        }

    }
}