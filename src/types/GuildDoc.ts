import { Document } from "mongoose";

export default interface GuildDoc extends Document {
    /**
     * The discordId of the guild.
     */
    id: string
    /**
     * The prefix of the guild.
     */
    prefix: string | null;
     /**
     * The logChannel of the guild.
     */
    logChannel: string | null
}
