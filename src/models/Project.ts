import mongoose, { Document, Schema } from 'mongoose';

export interface IProject extends Document {
  title: string;
  title_ar: string;
  slug: string;
  category: string;
  category_ar: string;
  client: string;
  client_ar: string;
  summary: string;
  summary_ar: string;
  description: string;
  description_ar: string;
  coverImage: string;
  videoUrl?: string;
  galleryImages: string[];
  metrics: {
    label: string;
    label_ar?: string;
    value: string;
    value_ar?: string;
  }[];
  tags: string[];
  tags_ar: string[];
  featured: boolean;
  order: number;
  year: number;
  createdAt: Date;
  updatedAt: Date;
}

const ProjectSchema = new Schema<IProject>(
  {
    title: { type: String, required: true, trim: true },
    title_ar: { type: String, default: '', trim: true },
    slug: { type: String, required: true, unique: true, index: true, lowercase: true, trim: true },
    category: { type: String, required: true, index: true },
    category_ar: { type: String, default: '' },
    client: { type: String, required: true, trim: true },
    client_ar: { type: String, default: '', trim: true },
    summary: { type: String, required: true },
    summary_ar: { type: String, default: '' },
    description: { type: String, required: true },
    description_ar: { type: String, default: '' },
    coverImage: { type: String, required: true },
    videoUrl: { type: String, default: '' },
    galleryImages: [{ type: String }],
    metrics: [
      {
        label: { type: String, required: true },
        label_ar: { type: String },
        value: { type: String, required: true },
        value_ar: { type: String },
      },
    ],
    tags: [{ type: String }],
    tags_ar: [{ type: String }],
    featured: { type: Boolean, default: false, index: true },
    order: { type: Number, default: 0, index: true },
    year: { type: Number, default: 2024 },
  },
  {
    timestamps: true,
  }
);

ProjectSchema.index({ featured: -1, order: 1, createdAt: -1 });

export const Project = mongoose.model<IProject>('Project', ProjectSchema);
