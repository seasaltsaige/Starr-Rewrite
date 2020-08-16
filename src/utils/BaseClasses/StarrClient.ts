import { Client, Snowflake, Guild, Channel, ClientOptions } from "discord.js"
import StarrClientInfo from "../../types/StarrClientInfo";
import GuildDoc from "../../database/models/Guild";
import SnipeData from "../../types/SnipeData";

export default class StarrClient extends Client {
    defaultPrefix: string;
    commands: Map<string, any>; 
    owners: Array<Snowflake>;
    snipes: Map<string, SnipeData>;
    baseOptions: ClientOptions;
    cachedPrefixes: Map<string, string>;

    constructor(StarrClientInfo: StarrClientInfo) {
        super();
        this.defaultPrefix = StarrClientInfo.defaultPrefix;
        this.commands = StarrClientInfo.commands; 
        this.owners = StarrClientInfo.owners;
        this.snipes = StarrClientInfo.snipes;
        this.baseOptions = StarrClientInfo.baseOptions;
        this.cachedPrefixes = new Map();
    };
    getToken (): string | undefined {
        return process.env.BOT_TOKEN;
    }
    async getGuildPrefix (guild: Guild) {
        const foundGuild = await GuildDoc.findOne({ id: guild.id });
        if (!foundGuild) return null;
        const guildPrefix = foundGuild.prefix;
        return guildPrefix;
    }
    getSnipe (client: StarrClient, guild: Guild, channel: Channel) {
        const toget = JSON.stringify({ guild: guild.id, channel: channel.id });
        const snipedata = client.snipes.get(toget);
        return snipedata;
    }
}