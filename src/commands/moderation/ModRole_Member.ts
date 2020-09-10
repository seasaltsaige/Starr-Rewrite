import { BaseCommand } from "../../utils/structure/BaseCommand";
import StarrClient from "../../utils/structure/StarrClient";
import { Message, Role } from "discord.js";
import Guild from "../../database/models/Guild";

export default class Mod extends BaseCommand {
    constructor() {
        super({
            category: "moderation",
            description: "Add or remove mod roles or members",
            name: "mod",
            permissions: ["ADMINISTRATOR"],
            usage: "?mod <add/remove> <member/role>",
        });
    }

    public async run (client: StarrClient, message: Message, args: string[]) {
        let guild = await Guild.findOne({ id: message.guild.id });

        if (!guild) guild = new Guild({ id: message.guild.id });

        // gotta finish this later, just testing rn

        const member_role = message.mentions.roles.first() || message.mentions.members.first() || message.guild.roles.cache.get(args[1]) || message.guild.members.cache.get(args[1]);
        const add_remove = args[0];

        if (add_remove !== "add" && add_remove !== "remove") return message.channel.send("Please specify if you would like to add or remove a member or role from the un-moderated category");

        if (!member_role) return message.channel.send("Please provide member or role to add or remove from the un-moderated category");

        switch (add_remove) {
            case "add": 
                // @ts-ignore
                if (guild.modRoles_Users.find(m => m === member_role.id)) return message.channel.send(`That ${member_role instanceof Role ? "role" : "member"} has already been added to the ignored list!`);

                guild.modRoles_Users.push(member_role);

            break;
            case "remove":
                // @ts-ignore
                if (!guild.modRoles_Users.find(m => m === member_role.id)) return message.channel.send(`That ${member_role instanceof Role ? "role" : "member"} doesn't exist in the the ignored list!`);
                guild.modRoles_Users.splice(guild.modRoles_Users.indexOf(member_role), 1);

            break;
        };


        try {
            await guild.updateOne(guild);
        } catch (err) {
            return message.channel.send(`Something went wrong while ${add_remove === "add" ? "adding" : "removing"} that ${member_role instanceof Role ? "role" : "member"} from the database`);
        };

        return message.channel.send(`Successfully ${add_remove === "add" ? "added" : "removed"} ${member_role instanceof Role ? member_role.name : member_role.user.tag} ${add_remove === "add" ? "to" : "from"} the ignored auto-mod list`);
    }
}