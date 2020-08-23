import { Field, ObjectType } from "@nestjs/graphql";

@ObjectType()
export default class MutedUserType {

    @Field()
    public id: string

    @Field(() => String)
    public unmute: Date | "none"

    @Field(() => [String])
    public oldRoles: string[]
}