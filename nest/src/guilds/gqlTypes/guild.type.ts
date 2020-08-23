import { Field, ObjectType } from "@nestjs/graphql";
import InfractionType from "./infraction.type";
import MutedUserType from "./mutedUser.type";

@ObjectType()
export default class GuildType {

    @Field()
    public id: string

    @Field({ nullable: true })
    public prefix: string

    @Field({ nullable: true })
    public logChannel: string

    @Field()
    public infractionNumber: number

    @Field()
    public muteRole: string

    @Field(() => [InfractionType])
    public infractions: InfractionType[]

    @Field(() => [String])
    public modRoles_Users: string[]

    @Field(() => [MutedUserType])
    public mutedUsers: MutedUserType[]
}