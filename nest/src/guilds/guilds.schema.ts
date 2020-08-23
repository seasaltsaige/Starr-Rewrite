import { Schema, Prop, SchemaFactory } from "@nestjs/mongoose";
import { Document } from "mongoose";
import InfractionType from "./gqlTypes/infraction.type";
import MutedUserType from "./gqlTypes/mutedUser.type";


/** Represents a guild mongoose model. This will have all the mongoose methods. */
@Schema()
export class Guild extends Document {

    @Prop({ required: true })
    public id: string

    @Prop({ default: null })
    public prefix: string

    @Prop({ default: null })
    public logChannel: string

    @Prop({ default: 1 })
    public infractionNumber: number

    @Prop({ default: [] })
    public infractions: InfractionType[]

    @Prop({ default: [] })
    public modRoles_Users: string[]

    @Prop({ default: "" })
    public muteRole: string

    @Prop({ default: [] })
    public mutedUsers: MutedUserType[]

}

export const GuildsSchema = SchemaFactory.createForClass(Guild)