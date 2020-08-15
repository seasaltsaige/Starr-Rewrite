// Import dotenv for environment variables
import dotenv from "dotenv";
dotenv.config(); // Execute the config to bind env to the process

// Import my Extended client
import Client from "./utils/BaseClasses/StarrClient";
const StarrClient = new Client({ defaultPrefix: "?", commands: new Map(), owners: [ "408080307603111936" ], snipes: new Map() }, {  }); // Initialize the new client
StarrClient.login(StarrClient.getToken()); // Login
require("./database/database"); // Startup the database connection

import CommandHandler from "./handlers/CommandHandler"; // Import the command handler
import EventHandler from "./handlers/EventHandler"; // Import the event handler

CommandHandler.load("./src/commands", StarrClient); // Execute both to initialize the commands and events
EventHandler.load("./src/events", StarrClient);