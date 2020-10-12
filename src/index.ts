import Client from "./utils/structure/StarrClient";
const StarrClient = new Client({ 
    defaultPrefix: "!s!", 
    owners: [ "408080307603111936" ], 
    develop: false,
    baseOptions: { 
        partials: ["MESSAGE", "REACTION"] ,
        fetchAllMembers: false,
    } 
});
StarrClient.start();
import "./utils/Prototypes/string.extensions";