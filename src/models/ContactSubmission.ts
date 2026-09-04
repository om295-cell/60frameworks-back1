import mongoose, { Document, Schema } from 'mongoose';

export interface IContactSubmission extends Document {
  fullName: string;
  email: string;
  phone?: string;
  company: string;
  serviceInterest: string;
  estimatedBudget?: string;
  timeline?: string;
  message: string;
  status: 'new' | 'reviewed' | 'contacted' | 'archived';
  ipAddress?: string;
  userAgent?: string;
  createdAt: Date;
  updatedAt: Date;
}

const ContactSubmissionSchema = new Schema<IContactSubmission>(
  {
    fullName: { type: String, required: true, trim: true },
    email: { type: String, required: true, trim: true, lowercase: true },
    phone: { type: String, trim: true },
    company: { type: String, required: true, trim: true },
    serviceInterest: { type: String, required: true, trim: true },
    estimatedBudget: { type: String, trim: true },
    timeline: { type: String, trim: true },
    message: { type: String, required: true, trim: true },
    status: {
      type: String,
      enum: ['new', 'reviewed', 'contacted', 'archived'],
      default: 'new',
      index: true,
    },
    ipAddress: { type: String },
    userAgent: { type: String },
  },
  {
    timestamps: true,
  }
);

ContactSubmissionSchema.index({ email: 1, createdAt: -1 });

export const ContactSubmission = mongoose.model<IContactSubmission>(
  'ContactSubmission',
  ContactSubmissionSchema
);
