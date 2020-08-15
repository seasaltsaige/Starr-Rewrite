import { ClientEvents } from 'discord.js';
import StarrClient from "./StarrClient";
import EventDataResolvable from '../interfaces/EventDataResolvable';

export default abstract class BaseEvent {
    constructor(private eventData: EventDataResolvable) { }

    public get name(): string { return this.eventData.name }
    public get description(): string { return this.eventData.description }

    public abstract run(client: StarrClient): void
}
