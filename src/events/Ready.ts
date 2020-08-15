import StarrClient from "../utils/BaseClasses/StarrClient";
import BaseEvent from "../utils/BaseClasses/BaseEvent";

export default class Ready extends BaseEvent {
    constructor() {
        super({
            name: "ready",
            description: "The event that runs when the bot logs in. Used to check when the bot is logged in."
        })
    }
    public async run(client: StarrClient) {
        console.log(`${client.user.tag} has logged into ${client.guilds.cache.size} with ${client.commands.size} commands.`);
    }
}