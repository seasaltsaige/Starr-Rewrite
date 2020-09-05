import { Message, GuildMember, Role } from "discord.js";

export default class IgnoreBypass {
    constructor(public message: Message, public ignored: Array<GuildMember | Role>) { }
    public check() {
        if (!this.ignored.includes(this.message.member)) {
            for (const [_, _role] of this.message.member.roles.cache) {
                if (this.ignored.includes(_role)) return true;
            };
        } else return true;
    }
}