import StarrClient from "../utils/BaseClasses/StarrClient";
import readdir from "readdir-plus";

export default new class EventHandler {
    load (path: string, client: StarrClient) {
        readdir(path, (err, files) => {
            for (const file of files) {
                if (err) throw err;

                const eventName = file.basename;

                try {
                    const eventFile = require(file.path);
                    client.on(eventName, eventFile.default.run.bind(null, client));
                } catch (err) {
                    console.log(err);
                }
            }
        });
    }    
}