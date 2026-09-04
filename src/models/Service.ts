import mongoose, { Document, Schema } from 'mongoose';

export interface IService extends Document {
  title: string;
  title_ar: string;
  slug: string;
  icon: string;
  tagline: string;
  tagline_ar: string;
  description: string;
  description_ar: string;
  deliverables: string[];
  deliverables_ar: string[];
  order: number;
  highlighted: boolean;
  createdAt: Date;
  updatedAt: Date;
}

const ServiceSchema = new Schema<IService>(
  {
    title: { type: String, required: true, trim: true },
    title_ar: { type: String, default: '', trim: true },
    slug: { type: String, required: true, unique: true, index: true, lowercase: true, trim: true },
    icon: { type: String, required: true },
    tagline: { type: String, required: true },
    tagline_ar: { type: String, default: '' },
    description: { type: String, required: true },
    description_ar: { type: String, default: '' },
    deliverables: [{ type: String, required: true }],
    deliverables_ar: [{ type: String }],
    order: { type: Number, default: 0, index: true },
    highlighted: { type: Boolean, default: false },
  },
  {
    timestamps: true,
  }
);

export const Service = mongoose.model<IService>('Service', ServiceSchema);
