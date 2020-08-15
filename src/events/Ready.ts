import StarrClient from "../utils/BaseClasses/StarrClient";

export default class Ready {
    static async run(client: StarrClient) {
        console.log(`${client.user.tag} has logged into ${client.guilds.cache.size} with ${client.commands.size} commands.`);
    }
}