import mongoose, { Document, Schema } from 'mongoose';

export interface IAuditLog extends Document {
  userEmail: string;
  userName: string;
  userRole: string;
  action: string;
  category: 'auth' | 'content' | 'theme' | 'sections' | 'media' | 'users' | 'inbox';
  target?: string;
  details: string;
  ipAddress?: string;
  createdAt: Date;
}

const AuditLogSchema = new Schema<IAuditLog>(
  {
    userEmail: { type: String, required: true },
    userName: { type: String, default: 'Admin' },
    userRole: { type: String, default: 'admin' },
    action: { type: String, required: true },
    category: {
      type: String,
      enum: ['auth', 'content', 'theme', 'sections', 'media', 'users', 'inbox'],
      default: 'content',
    },
    target: { type: String },
    details: { type: String, required: true },
    ipAddress: { type: String },
  },
  {
    timestamps: { createdAt: true, updatedAt: false },
  }
);

AuditLogSchema.index({ createdAt: -1 });

export const AuditLog = mongoose.model<IAuditLog>('AuditLog', AuditLogSchema);
