import { ClientEvents } from 'discord.js';
import StarrClient from "./StarrClient";
import EventDataResolvable from '../types/EventDataResolvable';

export default abstract class BaseEvent {
    constructor(private eventData: EventDataResolvable) { }

    public get name(): keyof ClientEvents { return this.eventData.name }
    public get description(): string { return this.eventData.description }

    public abstract run(client: StarrClient, ...args: any): void
}
