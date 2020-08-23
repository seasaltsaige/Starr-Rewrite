import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Guild } from './guilds.schema';
import GuildType from './gqlTypes/guild.type';
import { EventsGateway } from 'src/events/events.gateway';

@Injectable()
export class GuildsService {

    constructor(
        @InjectModel(Guild.name)
        private Guilds: Model<Guild>,
        private ws: EventsGateway
    ) { }

    public async getAll(): Promise<Guild[]> {
        return this.Guilds.find()
    }

    public async get(id: string): Promise<Guild> {
        return this.Guilds.findOne({ id })
    }

    public async update(id: string, query: GuildType): Promise<Guild> {
        const foundGuild = await this.Guilds.findOneAndUpdate({ id }, query);
        return foundGuild.save()
    }

    public async updatePrefix(id: string, prefix: string): Promise<HttpException | Guild> {
        const foundGuild = await this.Guilds.findOne({ id });
        if (!foundGuild) return new HttpException("The guild was not found.", HttpStatus.NOT_FOUND);
        if (foundGuild.prefix === prefix) return new HttpException("Your prefix is the same.", HttpStatus.BAD_REQUEST)

        foundGuild.prefix = prefix;

        try {
            await foundGuild.save();
            this.ws.emitPrefixUpdate(foundGuild);
        } catch (err) {
            return null;
        }

        return foundGuild;
    }
}
