import StarrClient from "../structure/StarrClient";
import GuildDoc from "../../database/SchemaInterfaces/GuildDoc";
import { Guild } from "discord.js";

export default class CachePrefixes {
    constructor(public client: StarrClient) { }

    public cache(guild: Guild, guildDoc: GuildDoc) {
        this.client.cachedPrefixes.set(guild.id, guildDoc.prefix);
    }
}