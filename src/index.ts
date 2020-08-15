import dotenv from "dotenv";
dotenv.config();
import Client from "./utils/BaseClasses/StarrClient";
require("./database/database");

const StarrClient = new Client({
    defaultPrefix: "?",
    commands: new Map(), 
    owners: [
        "408080307603111936",
    ],
});

StarrClient.login(StarrClient.getToken());
import CommandHandler from "./handlers/CommandHandler";
import EventHandler from "./handlers/EventHandler";
CommandHandler.load("./src/commands", StarrClient);
EventHandler.load("./src/events", StarrClient);