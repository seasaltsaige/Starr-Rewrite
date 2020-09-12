import { Collection, Message, Snowflake } from "discord.js";
import Levels from "../../database/models/Levels";

export default class HandleXp {
    constructor(public message: Message, public cooldown: Collection<Snowflake, number>) {};

    public async handle () {

        if (!this.cooldown.has(this.message.author.id)) {

            this.cooldown.set(this.message.author.id, Date.now());

            let msg: string;

            let levels = await Levels.findOne({ guild: this.message.guild.id, user: this.message.author.id });
            if (!levels) levels = new Levels({ guild: this.message.guild.id, user: this.message.author.id });
    
            const newXp = (Math.floor(Math.random() * 30) + 1);
            levels.stats.currXp += newXp;

            if (levels.stats.currXp >= levels.stats.reqXp) {
                levels.stats.currXp = 0;
                levels.stats.level += 1;
                levels.stats.reqXp = levels.stats.level * 500;
                msg = `Congratulations ${this.message.author}! You leveled up to Level ${levels.stats.level}!`;
            }

            try {
                await levels.updateOne(levels);
            } catch (err) {
                console.log(err);
                return false;
            }
            return {
                msg,
                cooldown: this.cooldown
            };
        }
        
    }
}