import mongoose, { Document, Schema } from 'mongoose';

export interface IClient extends Document {
  name: string;
  name_ar: string;
  logoSvg: string;
  industry: string;
  industry_ar: string;
  tier: 'featured' | 'enterprise' | 'global';
  order: number;
  websiteUrl?: string;
  createdAt: Date;
  updatedAt: Date;
}

const ClientSchema = new Schema<IClient>(
  {
    name: { type: String, required: true, trim: true },
    name_ar: { type: String, default: '', trim: true },
    logoSvg: { type: String, required: true },
    industry: { type: String, required: true },
    industry_ar: { type: String, default: '' },
    tier: { type: String, enum: ['featured', 'enterprise', 'global'], default: 'enterprise' },
    order: { type: Number, default: 0, index: true },
    websiteUrl: { type: String },
  },
  {
    timestamps: true,
  }
);

export const Client = mongoose.model<IClient>('Client', ClientSchema);
