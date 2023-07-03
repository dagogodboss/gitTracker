import mongoose, { Document, Schema } from 'mongoose';

export interface EventDocument extends Document {
  id: number;
  type: string;
  actor: mongoose.Types.ObjectId;
  repo: mongoose.Types.ObjectId;
  created_at?: Date;
}

const eventSchema = new Schema<EventDocument>(
  {
    id: { type: Number, required: true },
    type: { type: String, required: true },
    actor: { type: Schema.Types.ObjectId, ref: 'Actor', required: true },
    repo: { type: Schema.Types.ObjectId, ref: 'Repo', required: true },
    created_at: { type: String, required: true },
  },
  { versionKey: false }
);

const EventModel = mongoose.model<EventDocument>('Event', eventSchema);

export default EventModel;
