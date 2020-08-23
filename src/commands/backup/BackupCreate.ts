import { BaseCommand } from "../../utils/BaseClasses/BaseCommand";
import StarrClient from "../../utils/BaseClasses/StarrClient";
import { Message, TextChannel } from "discord.js";
import createCode from "../../functions/createBackupCode";
import Backups from "../../database/models/Backups";
import { ConnectionBase } from "mongoose";

export default new class BackupCreate extends BaseCommand {
    constructor() {
        super({
            category: "backup",
            description: "Create a backup of everything on your server like roles and channels",
            name: "cbackup",
            permissions: ["ADMINISTRATOR"],
            usage: "?cbackup <private/public>",
            aliases: ["createbackup", "create-backup", "backupcreate", "backupc"],
            g_owner_only: true,
        });
    }
    async run (client: StarrClient, message: Message, args: string[]) {

        const private_public = args[0];
        if (!private_public) return message.channel.send("Please specify if you would like to make this backup private or public");
        if (private_public !== "private" && private_public !== "public") return message.channel.send("Please specify if you would like to make this backup private or public. " + `\`${await client.getGuildPrefix(message.guild)}cbackup <public | private>\``);

        const waitMsg = await message.channel.send("<a:loading3:709992480757776405> Your server backup is being created. This can take some time, please wait...")

        const Backup = new Backups({
            code: createCode(),
            icon: message.guild.iconURL({ format: "png" }),
            name: message.guild.name,
            settings: {
                banner: message.guild.banner ? message.guild.banner : null,
                defaultMsgNotis: message.guild.defaultMessageNotifications,
                description: message.guild.description,
                discoverySplash: message.guild.discoverySplashURL({ format: "png" }),
                mfaLevel: message.guild.mfaLevel,
                preferredLocale: message.guild.preferredLocale,
                region: message.guild.region,
                splash: message.guild.splash,
                verificationLevel: message.guild.verificationLevel,
                afkChannel: message.guild.afkChannel ? message.guild.afkChannel.name : null,
                afkTimeout: message.guild.afkTimeout,
                vanityURL: message.guild.vanityURLCode ? message.guild.vanityURLCode : null,
            },
            private: private_public === "private" ? true : false,
            owner: message.author.id,
        });

        // Backup all channels in the server
        for (const [__, channel] of message.guild.channels.cache) {

            Backup.data.channels.push({
                name: channel.name,
                // @ts-ignore
                nsfw: channel.type === "text" ? channel.nsfw : undefined,
                parent: channel.type !== "category" ? channel.parent !== null ? channel.parent.name : undefined : undefined,
                position: channel.position,
                type: channel.type,
                //@ts-ignore
                rateLimit: channel.type === "text" ? channel.rateLimitPerUser : undefined,
                //@ts-ignore
                topic: channel.type === "text" ? channel.topic : undefined,
                //@ts-ignore
                userLimit: channel.type === "voice" ? channel.userLimit : undefined,
                //@ts-ignore
                bitrate: channel.type === "voice" ? channel.bitrate : undefined,
                rolePermissions: [],
                messages: [],
            });

            // Push that channels permissions to the array
            for (const [_, perm] of channel.permissionOverwrites) {
                const role_member = message.guild.roles.cache.get(perm.id) == undefined ? undefined : message.guild.roles.cache.get(perm.id).name

                Backup.data.channels.find(cc => cc.name === channel.name).rolePermissions.push({
                    permission: {
                        allow: perm.allow,
                        deny: perm.deny,
                    },
                    roleName: role_member,
                });
            }


            // If its a text or news channel, backup the last 100 messages
            if (channel.type === "text" || channel.type === "news") {
                // @ts-ignore
                const ch: TextChannel = channel;
                const msgs = (await ch.messages.fetch({ limit: 100 })).array().reverse();

                for (const msg of msgs) {
                    Backup.data.channels.find(c => c.name === ch.name).messages.push({
                        authr: msg.author.username,
                        avatar: msg.author.displayAvatarURL({ format: "png" }),
                        content: msg.content,
                        embed: msg.embeds.length > 0 ? msg.embeds : null,
                        attachment: msg.attachments.size > 0 ? msg.attachments.array() : null,
                    });
                }
            }
        }

        // Backup each role and its permissions
        for (const [__, role] of message.guild.roles.cache) {
            Backup.data.roles.push({
                name: role.name,
                permission: role.permissions,
                position: role.position,
                color: role.hexColor,
                hoist: role.hoist,
                mentionable: role.mentionable,
            });
        };

        
        // Push each emoji to an array to restore
        for (const [__, emoji] of message.guild.emojis.cache) {
            Backup.data.emojis.push({
                name: emoji.name,
                url: emoji.url,
            });
        }

        //@ts-ignore
        Backup.data.channels.sort((a, b) => {
            if (a.type < b.type) {
                return -1;
            } else if (a.type > b.type) {
                return 1;
            } else {
                return 0;
            }
        });

        Backup.data.roles.sort((a, b) => b.position - a.position);


        try {
            await Backup.save();
        } catch (err) {
            return message.channel.send("Something went wrong while saving your server backup! Please try again later.");
        }

        message.author.send(`Your backup code is \`${Backup.code}\` for \`${message.guild.name}\``);

        return waitMsg.edit("Successfully backed up your Server! Please check your DM's for your backup code.");

    }
}