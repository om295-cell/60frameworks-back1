import mongoose, { Document, Schema } from 'mongoose';

export interface ITestimonial extends Document {
  quote: string;
  quote_ar: string;
  authorName: string;
  authorName_ar: string;
  authorRole: string;
  authorRole_ar: string;
  organization: string;
  organization_ar: string;
  avatarUrl: string;
  metricHighlight?: string;
  metricHighlight_ar?: string;
  rating: number;
  order: number;
  createdAt: Date;
  updatedAt: Date;
}

const TestimonialSchema = new Schema<ITestimonial>(
  {
    quote: { type: String, required: true },
    quote_ar: { type: String, default: '' },
    authorName: { type: String, required: true, trim: true },
    authorName_ar: { type: String, default: '', trim: true },
    authorRole: { type: String, required: true, trim: true },
    authorRole_ar: { type: String, default: '', trim: true },
    organization: { type: String, required: true, trim: true },
    organization_ar: { type: String, default: '', trim: true },
    avatarUrl: { type: String, required: true },
    metricHighlight: { type: String },
    metricHighlight_ar: { type: String, default: '' },
    rating: { type: Number, default: 5, min: 1, max: 5 },
    order: { type: Number, default: 0, index: true },
  },
  {
    timestamps: true,
  }
);

export const Testimonial = mongoose.model<ITestimonial>('Testimonial', TestimonialSchema);
