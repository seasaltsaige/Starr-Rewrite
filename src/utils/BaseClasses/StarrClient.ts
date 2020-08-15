import { Client, Snowflake } from "discord.js"
import StarrClientInfo from "../../types/StarrClientInfo";
import BaseEvent from './BaseEvent'

export default class StarrClient extends Client {
    defaultPrefix: string;
    commands: Map<string, any>; //why do the events need a map so the event name maps to the event on the but why
    owners: Array<Snowflake>;
    public events: Map<string, BaseEvent>
    constructor(StarrClientInfo: StarrClientInfo) {
        super();
        this.defaultPrefix = StarrClientInfo.defaultPrefix;
        this.commands = StarrClientInfo.commands; // I gtg bye
        this.owners = StarrClientInfo.owners;
    };
    getToken (): string | undefined {
        return process.env.BOT_TOKEN;
    }
}