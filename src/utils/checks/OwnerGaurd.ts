import OwnerGaurdInfo from "../interfaces/OwnerGaurdInfo";
import { Snowflake, GuildMember } from "discord.js";

export default class OwnerGaurd {
    owners: Array<Snowflake>;
    member: GuildMember;

    constructor(OwnerGaurdInfo: OwnerGaurdInfo) {
        this.owners = OwnerGaurdInfo.owners;
        this.member = OwnerGaurdInfo.member;
    }

    check() {
        if (!this.owners.some(id => id === this.member.id)) return "You aren't a bot owner!";
    }
}