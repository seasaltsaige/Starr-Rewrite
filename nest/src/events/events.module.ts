import { Module } from '@nestjs/common';
import { EventsGateway } from './events.gateway';

@Module({
    exports: [EventsGateway],
    providers: [EventsGateway]
})
export class EventsModule { }
