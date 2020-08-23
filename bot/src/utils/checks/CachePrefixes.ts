import StarrClient from "../BaseClasses/StarrClient";
import GuildDoc from "../../database/SchemaInterfaces/GuildDoc";
import { Guild, TextChannel } from "discord.js";
import { socket } from "../../ws"

export default class CachePrefixes {
    constructor(public client: StarrClient) {
        socket.on("prefix-update", (guild: GuildDoc) => {
            // @ts-ignore
            // Sets the cache for the prefix. the emited guild has an id and a prefix (guild.id, guild.prefix)
            this.client.cachedPrefixes.set(guild.id, guild.prefix);
            this.sendUpdateMessage(guild)
        })
    }

    public cache(guild: Guild, guildDoc: GuildDoc) {
        this.client.cachedPrefixes.set(guild.id, guildDoc.prefix);
    }

    private sendUpdateMessage(guild: GuildDoc): void {
        const g = this.client.guilds.cache.get(guild.id)
        const c = <TextChannel>g.channels.cache.find(c => c.name === "general")

        c.send(`My prefix was updated to ${guild.prefix.replace(" ", "<space>")}`)
    }
}