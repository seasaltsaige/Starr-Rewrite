import { Resolver, Query, Args, Mutation } from '@nestjs/graphql';
import GuildType from './gqlTypes/guild.type';
import { GuildsService } from './guilds.service';
import { Guild } from './guilds.schema';
import { HttpException } from '@nestjs/common';

@Resolver('Guilds')
export class GuildsResolver {

    constructor(private service: GuildsService) { }

    @Query(() => GuildType, { nullable: true })
    public guild(@Args("id") id: string): Promise<Guild> {
        return this.service.get(id)
    }

    @Query(() => [GuildType], { nullable: true })
    public guilds(): Promise<Guild[]> {
        return this.service.getAll()
    }

    @Mutation(() => GuildType, { nullable: true })
    public updatePrefix(
        @Args("id") id: string,
        @Args("prefix") prefix: string): Promise<Guild | HttpException> {
        return this.service.updatePrefix(id, prefix)
    }
}
