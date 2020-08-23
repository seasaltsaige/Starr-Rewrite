import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql'
import { MongooseModule } from '@nestjs/mongoose'
import { GuildsModule } from './guilds/guilds.module';
import { EventsModule } from './events/events.module';

@Module({
  imports: [
    GraphQLModule.forRoot({
      autoSchemaFile: 'src/schema.gql',
    }),
    MongooseModule.forRoot(process.env.MONGO_URI),
    GuildsModule,
    EventsModule
  ],
})
export class AppModule { }
