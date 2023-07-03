import mongoose, { Document, Schema, Model } from 'mongoose';
import { Url } from 'url';

export interface ActorDocument extends Document {
  id: number;
  login: string;
  avatar_url: Url;
}

interface ActorModel extends Model<ActorDocument> {
  findOrCreateActor(
    id: number,
    actorDto: { id: number; login: string; avatar_url: Url }
  ): Promise<ActorDocument>;
}

const actorSchema = new Schema<ActorDocument>(
  {
    id: { type: Number, required: true },
    login: { type: String, required: true },
    avatar_url: { type: String, required: true },
  },
  { versionKey: false }
);

actorSchema.statics.findOrCreateActor = async function (
  id: number,
  actorDto: { id: number; login: string; avatar_url: Url }
) {
  let actor = await this.findOne({ id });

  if (!actor) {
    actor = await this.create(actorDto);
  }

  return actor;
};

const ActorModel = mongoose.model<ActorDocument, ActorModel>(
  'Actor',
  actorSchema
);

export default ActorModel;
