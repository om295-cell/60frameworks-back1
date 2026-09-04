import mongoose, { Document, Schema } from 'mongoose';

export interface IUserPermissions {
  pages: {
    homepage: boolean;
    projects: boolean;
    services: boolean;
    sectors: boolean;
    clients: boolean;
    testimonials: boolean;
    theme: boolean;
    sections: boolean;
    inbox: boolean;
    auditLogs: boolean;
    users: boolean;
  };
  actions: {
    canEditText: boolean;
    canEditMedia: boolean;
    canEditColors: boolean;
    canDeleteItems: boolean;
    canManageUsers: boolean;
  };
}

export interface IAdminUser extends Document {
  name: string;
  email: string;
  passwordHash: string;
  role: 'superadmin' | 'admin' | 'editor' | 'viewer';
  isSuperAdmin: boolean;
  isLocked: boolean; // Cannot be deleted
  permissions: IUserPermissions;
  lastLoginAt?: Date;
  createdAt: Date;
  updatedAt: Date;
}

export const DEFAULT_PERMISSIONS: Record<string, IUserPermissions> = {
  superadmin: {
    pages: {
      homepage: true,
      projects: true,
      services: true,
      sectors: true,
      clients: true,
      testimonials: true,
      theme: true,
      sections: true,
      inbox: true,
      auditLogs: true,
      users: true,
    },
    actions: {
      canEditText: true,
      canEditMedia: true,
      canEditColors: true,
      canDeleteItems: true,
      canManageUsers: true,
    },
  },
  admin: {
    pages: {
      homepage: true,
      projects: true,
      services: true,
      sectors: true,
      clients: true,
      testimonials: true,
      theme: true,
      sections: true,
      inbox: true,
      auditLogs: true,
      users: false,
    },
    actions: {
      canEditText: true,
      canEditMedia: true,
      canEditColors: true,
      canDeleteItems: true,
      canManageUsers: false,
    },
  },
  editor: {
    pages: {
      homepage: true,
      projects: true,
      services: true,
      sectors: true,
      clients: true,
      testimonials: true,
      theme: false,
      sections: false,
      inbox: true,
      auditLogs: false,
      users: false,
    },
    actions: {
      canEditText: true,
      canEditMedia: true,
      canEditColors: false,
      canDeleteItems: false,
      canManageUsers: false,
    },
  },
  viewer: {
    pages: {
      homepage: true,
      projects: true,
      services: true,
      sectors: true,
      clients: true,
      testimonials: true,
      theme: true,
      sections: true,
      inbox: true,
      auditLogs: true,
      users: false,
    },
    actions: {
      canEditText: false,
      canEditMedia: false,
      canEditColors: false,
      canDeleteItems: false,
      canManageUsers: false,
    },
  },
};

const AdminUserSchema = new Schema<IAdminUser>(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true, lowercase: true, trim: true },
    passwordHash: { type: String, required: true },
    role: { type: String, enum: ['superadmin', 'admin', 'editor', 'viewer'], default: 'editor' },
    isSuperAdmin: { type: Boolean, default: false },
    isLocked: { type: Boolean, default: false },
    permissions: {
      pages: {
        homepage: { type: Boolean, default: true },
        projects: { type: Boolean, default: true },
        services: { type: Boolean, default: true },
        sectors: { type: Boolean, default: true },
        clients: { type: Boolean, default: true },
        testimonials: { type: Boolean, default: true },
        theme: { type: Boolean, default: false },
        sections: { type: Boolean, default: false },
        inbox: { type: Boolean, default: true },
        auditLogs: { type: Boolean, default: false },
        users: { type: Boolean, default: false },
      },
      actions: {
        canEditText: { type: Boolean, default: true },
        canEditMedia: { type: Boolean, default: true },
        canEditColors: { type: Boolean, default: false },
        canDeleteItems: { type: Boolean, default: false },
        canManageUsers: { type: Boolean, default: false },
      },
    },
    lastLoginAt: { type: Date },
  },
  {
    timestamps: true,
  }
);

export const AdminUser = mongoose.model<IAdminUser>('AdminUser', AdminUserSchema);
