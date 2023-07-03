import mongoose, { Document, Model, Schema } from 'mongoose';
import { Url } from 'url';

export interface RepoDocument extends Document {
  id: number;
  name: string;
  url: Url;
}
interface RepoModel extends Model<RepoDocument> {
  findOrCreateRepo(
    id: number,
    repoDto: { id: number; name: string; url: Url }
  ): Promise<RepoDocument>;
}
const repoSchema = new Schema<RepoDocument>(
  {
    id: { type: Number, required: true },
    name: { type: String, required: true },
    url: { type: String, required: true },
  },
  { versionKey: false }
);

repoSchema.statics.findOrCreateRepo = async function (
  id: number,
  repoDto: { id: number; name: string; url: Url }
) {
  let repo = await this.findOne({ id });

  if (!repo) {
    repo = await this.create(repoDto);
  }

  return repo;
};

const RepoModel = mongoose.model<RepoDocument, RepoModel>('Repo', repoSchema);

export default RepoModel;
