import { BaseCommand } from "../../utils/BaseClasses/BaseCommand";
import StarrClient from "../../utils/BaseClasses/StarrClient";
import { Message } from "discord.js";
import Guild from "../../database/models/Guild";

export default new class EditWarn extends BaseCommand {

    constructor() {
        super({
            name: "editinfraction",
            usage: "?editinfraction <caseID> <New Reason>",
            aliases: ["editinf", "ef", "edinfraction"],
            category: "moderation",
            permissions: ["MANAGE_MESSAGES"],
            description: "Edit a infraction reason based of of infraction ID",
        });
    }
    async run(client: StarrClient, message: Message, args: string[]) {

        const foundGuild = await Guild.findOne({ id: message.guild.id });

        const caseId = args[0];

        if (!caseId || !parseInt(caseId)) return message.channel.send("Please provide a valid case ID");

        const newReason = args.slice(1).join(" ");
        if (!newReason) return message.channel.send("Please provide a valid new reason!");

        
        const CASE = foundGuild.infractions.find(infraction => infraction.caseId === caseId);
        
        if (!CASE) return message.channel.send("That case doesn't exist in the database!");

        foundGuild.infractions.find(infraction => infraction.caseId === caseId).description = newReason;

        try {
            await foundGuild.updateOne(foundGuild);
        } catch (err) {
            return message.channel.send("Something went wrong while updating that users warn.");
        }
        return message.channel.send(`Successfully updated case **#${caseId}** to ${newReason}`);
    }
}