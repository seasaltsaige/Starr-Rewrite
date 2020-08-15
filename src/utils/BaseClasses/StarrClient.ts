import { Client, Snowflake, Guild, Channel } from "discord.js"
import StarrClientInfo from "../../types/StarrClientInfo";
import GuildDoc from "../../database/models/Guild";
import SnipeKey from "../../types/SnipeKey";
import SnipeData from "../../types/SnipeData";

export default class StarrClient extends Client {
    defaultPrefix: string;
    commands: Map<string, any>; 
    owners: Array<Snowflake>;
    snipes: Map<SnipeKey, SnipeData>;

    constructor(StarrClientInfo: StarrClientInfo) {
        super();
        this.defaultPrefix = StarrClientInfo.defaultPrefix;
        this.commands = StarrClientInfo.commands; 
        this.owners = StarrClientInfo.owners;
        this.snipes = StarrClientInfo.snipes;

    };
    getToken (): string | undefined {
        return process.env.BOT_TOKEN;
    }
    async getGuildPrefix (guild: Guild) {
        const foundGuild = await GuildDoc.findOne({ id: guild.id });
        const guildPrefix = foundGuild.prefix;
        return guildPrefix;
    }
    getSnipe (client: StarrClient, guild: Guild, channel: Channel) {
        const snipedata = client.snipes.get({ 
            guild: guild.id,
            channel: channel.id,
        });
        return snipedata;
    }
}