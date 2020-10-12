import StarrClient from "../utils/structure/StarrClient";
import readdir from "readdir-plus";
import BaseCommand from "../utils/structure/BaseCommand";
import("colors");


export default new class CommandHandler {
    load(mainPath: string, subPaths: Array<string>, client: StarrClient): void {

        for (const path of subPaths) {
            readdir(`${mainPath}/${path}`, async (err, files) => { 
                if (err) throw err;

                for (const file of files) {
                    // Import the command.
                    const { default: Command } = await import(file.path);

                    const command: BaseCommand = new Command();

                    if (command.category !== path) throw new ReferenceError("Command category must be the same as file path");

                    // Set the client to use that command.
                    client.commands.set(command.name.toLowerCase(), command);

                    if (command.aliases) {
                        command.aliases.forEach((alias: string) => client.aliases.set(alias, command.name.toLowerCase()));
                    }
                }
                console.log(`Successfully loaded ` + `${files.length} `.red + "command(s) in the " + path + " category");
            });
        } 
    }
}