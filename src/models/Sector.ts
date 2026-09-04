import mongoose, { Document, Schema } from 'mongoose';

export interface ISector extends Document {
  name: string;
  name_ar: string;
  slug: string;
  description: string;
  description_ar: string;
  capabilities: string[];
  capabilities_ar: string[];
  imageUrl: string;
  videoUrl?: string;
  icon: string;
  order: number;
  createdAt: Date;
  updatedAt: Date;
}

const SectorSchema = new Schema<ISector>(
  {
    name: { type: String, required: true, trim: true },
    name_ar: { type: String, default: '', trim: true },
    slug: { type: String, required: true, unique: true, index: true, lowercase: true, trim: true },
    description: { type: String, required: true },
    description_ar: { type: String, default: '' },
    capabilities: [{ type: String, required: true }],
    capabilities_ar: [{ type: String }],
    imageUrl: { type: String, required: true },
    videoUrl: { type: String, default: '' },
    icon: { type: String, required: true },
    order: { type: Number, default: 0, index: true },
  },
  {
    timestamps: true,
  }
);

export const Sector = mongoose.model<ISector>('Sector', SectorSchema);
