import { Message, MessageEmbed } from "discord.js";

export default class GhostPing {
    message: Message;
    constructor(msg: Message) {
        this.message = msg;
    };

    check() {
        if (this.message.mentions.members && this.message.mentions.members.size > 0) {

            const Embed = new MessageEmbed()
                .setAuthor("Ghost Ping Detected", this.message.author.displayAvatarURL({ format: "png" }))
                .setDescription(`${this.message.author} ghost pinged ${this.message.mentions.members.map(mem => mem).join(", ")}`);

            return Embed;
        }
    }

}