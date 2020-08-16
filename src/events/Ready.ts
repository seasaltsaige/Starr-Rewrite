import StarrClient from "../utils/BaseClasses/StarrClient";
import Guild from "../database/models/Guild";

export default class Ready {
    static async run(client: StarrClient) {

        // Cache all prefixes that may be in the database for quicker fetch times
        for (const guild of client.guilds.cache) {
            const gId = guild[1].id;
            const foundGuild = await Guild.findOne({ id: gId });
            if (foundGuild && foundGuild.prefix) {
                client.cachedPrefixes.set(gId, foundGuild.prefix);
            }
        }
        console.log(`${client.user.tag} has logged into ${client.guilds.cache.size} with ${client.commands.size} commands.`);
    }
}