import OwnerGaurdInfo from "../types/OwnerGuardInfo";
import { Snowflake, GuildMember } from "discord.js";

export default class OwnerGaurd {
    constructor(private OwnerGaurdInfo: OwnerGaurdInfo) { }

    public get owners(): Array<Snowflake> { return this.OwnerGaurdInfo.owners }
    public get member(): GuildMember { return this.OwnerGaurdInfo.member }

    public check(): string {
        if (!this.owners.some(id => id === this.member.id)) return "You aren't a bot owner!";
    }
}