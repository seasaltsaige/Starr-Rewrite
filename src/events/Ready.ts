import StarrClient from "../utils/structure/StarrClient";
import BaseEvent from "../utils/structure/BaseEvent";
import Guild from "../database/models/Guild";
import { CachePrefixes } from "../utils/checks/index";

export default class Ready extends BaseEvent {
    constructor() {
        super({
            name: "ready",
            description: "Used to check when the bot is logged in and to cache prefixes."
        })
    }
    public async run(client: StarrClient) {

        // Initiate the prefix cacher
        const Prefix = new CachePrefixes(client);

        // Cache all prefixes that may be in the database for quicker fetch times
        for (const [_, guild] of client.guilds.cache) {
            const gId = guild.id;
            const foundGuild = await Guild.findOne({ id: gId });
            if (foundGuild && foundGuild.prefix) {
                Prefix.cache(guild, foundGuild);
            }
        }
        console.log(`${client.user.tag} has logged into ${client.guilds.cache.size} servers with ${client.commands.size} commands.`);
    }
}