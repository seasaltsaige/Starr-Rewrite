import { Field, ObjectType } from "@nestjs/graphql";

@ObjectType()
export default class InfractionType {

    @Field()
    public infractionType: "warn" | "strike" | "mute" | "kick" | "ban";

    @Field()
    public caseId: string;

    @Field()
    public user: string;

    @Field()
    public description: string

    @Field(() => Date)
    public date: Date

}
