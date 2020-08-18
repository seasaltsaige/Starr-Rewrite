import { Document } from "mongoose";
import Infraction from "./InfractionInterface";
import { Snowflake } from "discord.js";

export default interface GuildDoc extends Document {
    /**
     * The discordId of the guild.
     */
    id: Snowflake;
    /**
     * The prefix of the guild.
     */
    prefix: string | null;
     /**
     * The logChannel of the guild.
     */
    logChannel: string | null;
    /**
     * The current warn number the guild is on
     */
    infractionNumber: number;
    /**
     * The array of warned users and they're coresponding reasons and ID's
     */
    infractions: Array<Infraction>;
}
