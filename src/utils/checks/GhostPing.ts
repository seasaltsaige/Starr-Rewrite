import { Message, MessageEmbed, Role, GuildMember } from "discord.js";
import IgnoreBypass from "./IgnoreBypass";
import Guild from "../../database/models/Guild";

export default class GhostPing {

    constructor(public message: Message ) { };

    public async check() {
        if (this.message.mentions.members && this.message.mentions.members.size > 0 ) {

            const guild = await Guild.findOne({ id: this.message.guild.id });

            const ignored = new IgnoreBypass(this.message, guild.modRoles_Users);

            const value = ignored.check();

            if (value) return;

            const Embed = new MessageEmbed()
                .setAuthor("Ghost Ping Detected", this.message.author.displayAvatarURL({ format: "png" }))
                .setDescription(`${this.message.author} ghost pinged ${this.message.mentions.members.map(mem => mem).join(", ")}`);
            return Embed;
        }
    }

}