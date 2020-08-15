import { Client, Snowflake } from "discord.js"
import StarrClientInfo from "../interfaces/StarrClientInfo";

export default class StarrClient extends Client {
    defaultPrefix: string;
    commands: Map<string, any>;
    owners: Array<Snowflake>;
    constructor(StarrClientInfo: StarrClientInfo) {
        super();
        this.defaultPrefix = StarrClientInfo.defaultPrefix;
        this.commands = StarrClientInfo.commands;
        this.owners = StarrClientInfo.owners;
    };
    getToken (): string | undefined {
        return process.env.BOT_TOKEN;
    }
}