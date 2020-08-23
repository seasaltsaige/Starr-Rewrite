import { Module } from '@nestjs/common';
import { GuildsService } from './guilds.service';
import { GuildsResolver } from './guilds.resolver';
import { MongooseModule } from '@nestjs/mongoose';
import { Guild, GuildsSchema } from './guilds.schema';
import { EventsModule } from 'src/events/events.module';

@Module({
    imports: [
        MongooseModule.forFeature([{ name: Guild.name, schema: GuildsSchema }]),
        EventsModule,
    ],
    providers: [GuildsService, GuildsResolver]
})
export class GuildsModule { }
