import StarrClient from "../BaseClasses/StarrClient";
import GuildDoc from "../../types/GuildDoc";
import { Guild } from "discord.js";

export default class CachePrefixes {
    constructor(public client: StarrClient) { }

    cache(guild: Guild, guildDoc: GuildDoc) {
        this.client.cachedPrefixes.set(guild.id, guildDoc.prefix);
    }
}