// Import my Extended client
import Client from "./utils/structure/StarrClient";
// Initialize the bot client
const StarrClient = new Client({ 
    defaultPrefix: "?", 
    owners: [ "408080307603111936" ], 
    baseOptions: { 
        partials: ["MESSAGE", "REACTION"] 
    } 
});
StarrClient.start(); // Start the client
import "./utils/Prototypes/string.extensions";