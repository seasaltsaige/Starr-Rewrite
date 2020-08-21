import StarrClient from "../utils/BaseClasses/StarrClient";
import BaseEvent from "../utils/BaseClasses/BaseEvent";
import Guild from "../database/models/Guild";
import CachePrefixes from "../utils/checks/CachePrefixes";

export default class Ready extends BaseEvent {
    constructor() {
        super({
            name: "ready",
            description: "Used to check when the bot is logged in and to cache prefixes."
        })
    }
    public async run(client: StarrClient) {

        // Initiate the prefix cache.
        const Prefix = new CachePrefixes(client);

        // Cache all prefixes that may be in the database for quicker fetch times
        for (const guild of client.guilds.cache) {
            const gId = guild[1].id;
            const foundGuild = await Guild.findOne({ id: gId });
            if (foundGuild && foundGuild.prefix) {
                Prefix.cache(guild[1], foundGuild);
            }
        }
        console.log(`${client.user.tag} has logged into ${client.guilds.cache.size} servers with ${client.commands.size} commands.`);
    }
}