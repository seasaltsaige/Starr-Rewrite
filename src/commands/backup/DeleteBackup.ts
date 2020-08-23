import { BaseCommand } from "../../utils/BaseClasses/BaseCommand";
import StarrClient from "../../utils/BaseClasses/StarrClient";
import { Message } from "discord.js";

export default new class DeleteBackup extends BaseCommand {
    constructor() {
        super({
            category: "backup",
            description: "Delete a backup of a server stored in the database",
            name: "dbackup",
            permissions: ["ADMINISTRATOR"],
            usage: "?dbackup <code>",
            aliases: ["deletebackup", "backupdelete", "backupd"],
            g_owner_only: true,
        });
    }
    async run (client: StarrClient, message: Message, args: string[]) {
        
    }
}