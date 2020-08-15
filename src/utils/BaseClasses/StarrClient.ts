import { Client, Snowflake, Guild } from "discord.js"
import StarrClientInfo from "../../types/StarrClientInfo";
import GuildDoc from "../../database/models/Guild";

export default class StarrClient extends Client {
    defaultPrefix: string;
    commands: Map<string, any>; //why do the events need a map so the event name maps to the event on the but why
    owners: Array<Snowflake>;

    constructor(StarrClientInfo: StarrClientInfo) {
        super();
        this.defaultPrefix = StarrClientInfo.defaultPrefix;
        this.commands = StarrClientInfo.commands; // I gtg bye
        this.owners = StarrClientInfo.owners;
    };
    getToken (): string | undefined {
        return process.env.BOT_TOKEN;
    }
    async getGuildPrefix (guild: Guild) {
        const foundGuild = await GuildDoc.findOne({ id: guild.id });
        const guildPrefix = foundGuild.prefix;
        return guildPrefix;
    }
}