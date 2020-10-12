import BaseCommand from "../../utils/structure/BaseCommand";
import StarrClient from "../../utils/structure/StarrClient";
import { Message, MessageEmbed, version } from "discord.js";
import osu from "node-os-utils";
import os from "os";

export default class BotInfo extends BaseCommand {
    constructor() {
        super({
            category: "miscellaneous",
            description: "Get some info on the bot instance",
            name: "botinfo",
            permissions: ["SEND_MESSAGES"],
            usage: "botinfo"
        });
    }
    public async run (client: StarrClient, message: Message, args: string[]) {


        var d = Math.abs(client.uptime) / 1000;
        var r: { year?: number, month?: number, week?: number, day?: number, hour?: number, minute?: number, second?: number } = { };
        var s = { year: 31536000, month: 2592000, week: 604800, day: 86400, hour: 3600, minute: 60, second: 1 };

        Object.keys(s).forEach((key) => {
            r[key] = Math.floor(d / s[key]);
            d -= r[key] * s[key];
        });
        
        const newUptime = `Uptime: ${r.week} week(s), ${r.day} day(s), ${r.hour} hour(s), ${r.minute} minute(s), ${r.second} second(s)`
        const cpu = osu.cpu
        const ostyp = "OS Type\n" + `${os.type().toUpperCase()}`;
        const pltfrm = "Platform\n" + `${os.platform().toUpperCase()}`;
        const ttlmem = "Total Memory - " + `${(os.totalmem() / 1000000000).toFixed(1)} GB`;
        const freemem = "Free Memory - " + `${(os.freemem() / 1000000000).toFixed(1)} GB`;
        const Threads = `${os.cpus().length} Threads`;
        const Cores = `${os.cpus().length / 2} Cores`;
        const cpumdl = os.cpus().map(c => c.model).pop();
        const raminuse = `${(process.memoryUsage().heapUsed / 1000000).toFixed(3)} MB` + " in use";
        const cpuspeed = `${(os.cpus().map(cpu => cpu.speed).pop())}` + " MHz";
        const djsversion = `Discord.js Version\n${version}`
        const NodeJSversion = `Node.js Version\n${process.versions.node}`
        cpu.usage().then(c => {
            const embed = new MessageEmbed() 
                .setAuthor("Client Information", client.user.displayAvatarURL({ format: "png" }))
                .addField('Operating Sys Info', `\`\`\`yaml\n${ostyp}\n${pltfrm}\n${djsversion}\n${NodeJSversion}\n\`\`\``, true)
                .addField('CPU Info', `\`\`\`js\n${cpumdl}\n${Cores}\n${Threads}\nCPU Speed - ${cpuspeed}\n${c.toFixed(2)}% CPU Usage\n\`\`\``, true)
                .addField("RAM Info", `\`\`\`js\n${ttlmem}\n${freemem}\n${raminuse}\n\`\`\``, true)
                .addField('Bot Stats', `\`\`\`js\nI am in ${client.guilds.cache.size} guilds!\nI am watching over ${client.users.cache.size} members!\nLooking over ${client.channels.cache.size} channels\nI have been online for ${newUptime}\n\`\`\``)
                .setColor(client.colors.noColor);
            message.channel.send(embed);
        });
    }
}