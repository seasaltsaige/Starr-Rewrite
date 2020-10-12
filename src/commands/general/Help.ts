import BaseCommand from "../../utils/structure/BaseCommand";
import StarrClient from "../../utils/structure/StarrClient";
import { Message, MessageEmbed } from "discord.js";
import { Categories } from "../../utils/resolvables/Resolvables";

export default class Help extends BaseCommand {
    constructor() {
        super({
            name: "help",
            usage: "help [category/command]",
            aliases: ["halp", "cmds", "commands"],
            category: "general",
            description: "Help command",
            permissions: ["SEND_MESSAGES"],
            
        });
    }
    public async run(client: StarrClient, message: Message, args: Array<string>) {

        const category_command = args[0];

        const Embed = new MessageEmbed();

        if (!category_command) {
            
            Embed.setAuthor("General Help", client.user.displayAvatarURL({ format: "png" }))
                .setColor(client.colors.noColor)
                for (const category of Categories) {
                    const categoryCmds = client.commands.filter((c) => c.category === category);

                    Embed.addField(`${client.cachedPrefixes.get(message.guild.id)}help ${category}`, categoryCmds.map(c => c.name).join(", "), true)

                }
            message.channel.send(Embed);

        } else if (Categories.includes(category_command.toLowerCase())) {
            const category = category_command.toLowerCase();

            const categoryCmds = client.commands.filter((c) => c.category === category);

            Embed.setDescription(categoryCmds.map(c => c.name).join(", "))
                .setColor(client.colors.noColor)
                .setAuthor(`${category_command.toProperCase()} Help`, client.user.displayAvatarURL({ format: "png" }));

            message.channel.send(Embed);

        } else if (client.commands.has(category_command.toLowerCase())) {
            const command = category_command.toLowerCase();
            
            const commandCmd = client.commands.get(command);

            Embed.setColor(client.colors.noColor)
                .setDescription(`Name: ${commandCmd.name}\nAliases: ${commandCmd.aliases ? commandCmd.aliases.join(", ") : "None"}`)
                .setAuthor(`${command.toProperCase()} Help`, client.user.displayAvatarURL({ format: "png" }));
            message.channel.send(Embed);

        }

    }
}