import { Message, GuildMember, Role } from "discord.js";

export default class IgnoreBypass {
    message: Message;
    ignored: Array<GuildMember | Role>;
    constructor(message: Message, ignored: Array<GuildMember | Role>) {
        this.message = message;
        this.ignored = ignored;
    }

    public check() {
        if (!this.ignored.includes(this.message.member)) {
            for (const [_, _role] of this.message.member.roles.cache) {
                if (this.ignored.includes(_role)) return true;
            };
        } else return true;
    }

}