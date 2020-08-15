import path from "path";
import { promises as fs } from "fs";
import StarrClient from "../BaseClasses/StarrClient";

export default class Registry {
    
    public async events(client: StarrClient, dir: string = "") {
        const filePath = path.join(__dirname, dir);
        const files = await fs.readdir(filePath);
        for (const file of files) {
          const stat = await fs.lstat(path.join(filePath, file));
          if (stat.isDirectory()) registerEvents(client, path.join(dir, file));
          if (file.endsWith(".js") || file.endsWith(".ts")) {
            const { default: Event } = await import(path.join(dir, file));
            const event = new Event();
            client.events.set(event.getName(), event);
            client.on(event.getName(), event.run.bind(event, client));
          }
        }
      }
}