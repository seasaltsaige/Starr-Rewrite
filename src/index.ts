// Import dotenv for environment variables
import { config } from "dotenv";
config(); // Execute the config to bind env to the process

// Import my Extended client
import Client from "./utils/BaseClasses/StarrClient";
const StarrClient = new Client({
    defaultPrefix: "?",
    owners: ["408080307603111936"],
    baseOptions: {
        partials: ["MESSAGE", "REACTION"],
    }
}); // Initialize the new client

import { Constants } from "discord.js";
// Constants.DefaultOptions.ws.properties.$browser = "Discord iOS";

StarrClient.login(StarrClient.getToken()); // Login
import("./database/database"); // Startup the database connection

import CommandHandler from "./handlers/CommandHandler"; // Import the command handler
import EventHandler from "./handlers/EventHandler"; // Import the event handler
import { Categories } from "./resolvables/Resolvables"; // Import the categories for the command handler

CommandHandler.load("./src/commands", Categories, StarrClient); // Execute both to initialize the commands and events
EventHandler.load("./src/events", StarrClient);