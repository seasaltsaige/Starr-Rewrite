import { Document } from "mongoose";
import Infraction from "../../types/InfractionInterface";
import { Snowflake, GuildMember, Role } from "discord.js";
import Mute from "../../types/MuteInterface";

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
    /**
     * Roles and Members to ignore for auto moderation actions
     */
    modRoles_Users: Array<GuildMember | Role>;
    /**
     * An array of the currently muted members in the server. Updates ONLY after a users mute time passes, or is manually unmuted
     */
    mutedUsers: Array<Mute>;
    /**
     * The ID of the current Mute Role
     */
    muteRole: Snowflake;
}
