import StarrClient from "../utils/BaseClasses/StarrClient";
import readdir from "readdir-plus";
import { BaseCommand } from "../utils/BaseClasses/BaseCommand";

export default new class CommandHandler {
    load(path: string, client: StarrClient): void {
        readdir(path, async (err, files) => {
            if (err) throw err;

            for (const file of files) {
                // Import the command.
                const { default: Command } = await import(file.path);

                const command = Command;
                
                // Set the client to use that command.
                client.commands.set(command.name, command);
                console.log(`Successfully loaded ` + `${file.basename.toLowerCase()}`);

                if (command.aliases) {
                    command.aliases.forEach((alias: string) => client.aliases.set(alias, file.basename.toLowerCase()));
                }
                client.commands.set(file.basename.toLowerCase(), command);
            }
        });
    }
}