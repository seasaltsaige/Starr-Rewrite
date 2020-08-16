import StarrClient from "../utils/BaseClasses/StarrClient";
import readdir from "readdir-plus";

export default new class CommandHandler {
    load(path: string, client: StarrClient): void {
        readdir(path, (err, files) => {
            if (err) throw err;

            for (const file of files) {
                const command = require(file.path);
                if (command.default.aliases) {
                    command.default.aliases.forEach(alias => client.aliases.set(alias, file.basename.toLowerCase()));
                }
                client.commands.set(file.basename.toLowerCase(), command);
            }
        });
    }
}