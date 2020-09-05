import { Client, Snowflake, Guild, Channel, ClientOptions, Constants } from "discord.js"
import StarrClientInfo from "../types/StarrClientInfo";
import GuildDoc from "../../database/models/Guild";
import SnipeData from "../types/SnipeData";
import CommandHandler from "../../handlers/CommandHandler"; // Import the command handler
import EventHandler from "../../handlers/EventHandler"; // Import the event handler
import { Categories } from "../../utils/resolvables/Resolvables"; // Import the categories for the command handler
import { config } from "dotenv"; // Import config for environment variables

export default class StarrClient extends Client {
    defaultPrefix: string;
    commands: Map<string, any>;
    aliases: Map<string, string>;
    owners: Array<Snowflake>;
    snipes: Map<string, SnipeData>;
    baseOptions: ClientOptions;
    cachedPrefixes: Map<string, string>;
    colors: {
        noColor: "#2F3136",
    }

    constructor(StarrClientInfo: StarrClientInfo) {
        super();
        this.defaultPrefix = StarrClientInfo.defaultPrefix;
        this.commands = new Map();
        this.aliases = new Map();
        this.owners = StarrClientInfo.owners;
        this.snipes = new Map();
        this.baseOptions = StarrClientInfo.baseOptions;
        this.cachedPrefixes = new Map();
        this.colors = {
            noColor: "#2F3136",
        }
    };

    private getToken(): string | undefined {
        return process.env.BOT_TOKEN;
    }

    async getGuildPrefix(guild: Guild): Promise<string> {
        const foundGuild = await GuildDoc.findOne({ id: guild.id });
        if (!foundGuild) return null;
        const guildPrefix = foundGuild.prefix;
        return guildPrefix;
    }
    getSnipe(client: StarrClient, guild: Guild, channel: Channel): SnipeData {
        const toget = JSON.stringify({ guild: guild.id, channel: channel.id });
        const snipedata = client.snipes.get(toget);
        return snipedata;
    }
    start(): void {
        config(); // Execute the config to bind env to the process
        Constants.DefaultOptions.ws.properties.$browser = "Discord iOS";
        this.login(this.getToken());
        import("../../database/database"); // Startup the database connection
        CommandHandler.load("./src/commands", Categories, this); // Execute both to initialize the commands and events
        EventHandler.load("./src/events", this);
    }
}