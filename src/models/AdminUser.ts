import mongoose, { Document, Schema } from 'mongoose';

export interface IModulePermissions {
  projects: {
    view: boolean;
    create: boolean;
    edit: boolean;
    media: boolean;
    delete: boolean;
    publish: boolean;
  };
  services: {
    view: boolean;
    create: boolean;
    edit: boolean;
    delete: boolean;
    publish: boolean;
  };
  sectors: {
    view: boolean;
    create: boolean;
    edit: boolean;
    media: boolean;
    delete: boolean;
  };
  clients: {
    view: boolean;
    create: boolean;
    edit: boolean;
    media: boolean;
    delete: boolean;
  };
  testimonials: {
    view: boolean;
    create: boolean;
    edit: boolean;
    media: boolean;
    delete: boolean;
  };
  homepage: {
    view: boolean;
    editHero: boolean;
    editAbout: boolean;
    editFinalCTA: boolean;
    media: boolean;
  };
  theme: {
    view: boolean;
    editPalette: boolean;
    editSections: boolean;
    editHeaderFooter: boolean;
  };
  sections: {
    view: boolean;
    toggleVisibility: boolean;
    reorder: boolean;
  };
  inbox: {
    view: boolean;
    updateStatus: boolean;
    delete: boolean;
    exportCsv: boolean;
  };
  auditLogs: {
    view: boolean;
    clear: boolean;
  };
  users: {
    view: boolean;
    manage: boolean;
  };
}

export interface IUserPermissions {
  modules: IModulePermissions;
  // Legacy / fallback support
  pages?: Record<string, boolean>;
  actions?: Record<string, boolean>;
}

export interface IAdminUser extends Document {
  name: string;
  email: string;
  passwordHash: string;
  role: 'superadmin' | 'admin' | 'editor' | 'media_manager' | 'lead_specialist' | 'viewer' | 'custom';
  isSuperAdmin: boolean;
  isLocked: boolean; // Cannot be deleted
  permissions: IUserPermissions;
  lastLoginAt?: Date;
  createdAt: Date;
  updatedAt: Date;
}

export const FULL_MODULE_PERMISSIONS: IModulePermissions = {
  projects: { view: true, create: true, edit: true, media: true, delete: true, publish: true },
  services: { view: true, create: true, edit: true, delete: true, publish: true },
  sectors: { view: true, create: true, edit: true, media: true, delete: true },
  clients: { view: true, create: true, edit: true, media: true, delete: true },
  testimonials: { view: true, create: true, edit: true, media: true, delete: true },
  homepage: { view: true, editHero: true, editAbout: true, editFinalCTA: true, media: true },
  theme: { view: true, editPalette: true, editSections: true, editHeaderFooter: true },
  sections: { view: true, toggleVisibility: true, reorder: true },
  inbox: { view: true, updateStatus: true, delete: true, exportCsv: true },
  auditLogs: { view: true, clear: true },
  users: { view: true, manage: true },
};

export const READONLY_MODULE_PERMISSIONS: IModulePermissions = {
  projects: { view: true, create: false, edit: false, media: false, delete: false, publish: false },
  services: { view: true, create: false, edit: false, delete: false, publish: false },
  sectors: { view: true, create: false, edit: false, media: false, delete: false },
  clients: { view: true, create: false, edit: false, media: false, delete: false },
  testimonials: { view: true, create: false, edit: false, media: false, delete: false },
  homepage: { view: true, editHero: false, editAbout: false, editFinalCTA: false, media: false },
  theme: { view: true, editPalette: false, editSections: false, editHeaderFooter: false },
  sections: { view: true, toggleVisibility: false, reorder: false },
  inbox: { view: true, updateStatus: false, delete: false, exportCsv: false },
  auditLogs: { view: true, clear: false },
  users: { view: false, manage: false },
};

export const DEFAULT_PERMISSIONS: Record<string, IUserPermissions> = {
  superadmin: {
    modules: JSON.parse(JSON.stringify(FULL_MODULE_PERMISSIONS)),
    pages: {
      homepage: true, projects: true, services: true, sectors: true, clients: true,
      testimonials: true, theme: true, sections: true, inbox: true, auditLogs: true, users: true,
    },
    actions: { canEditText: true, canEditMedia: true, canEditColors: true, canDeleteItems: true, canManageUsers: true },
  },
  admin: {
    modules: {
      ...JSON.parse(JSON.stringify(FULL_MODULE_PERMISSIONS)),
      users: { view: true, manage: false },
    },
    pages: {
      homepage: true, projects: true, services: true, sectors: true, clients: true,
      testimonials: true, theme: true, sections: true, inbox: true, auditLogs: true, users: false,
    },
    actions: { canEditText: true, canEditMedia: true, canEditColors: true, canDeleteItems: true, canManageUsers: false },
  },
  editor: {
    modules: {
      ...JSON.parse(JSON.stringify(READONLY_MODULE_PERMISSIONS)),
      projects: { view: true, create: true, edit: true, media: true, delete: false, publish: false },
      services: { view: true, create: true, edit: true, delete: false, publish: false },
      sectors: { view: true, create: true, edit: true, media: true, delete: false },
      clients: { view: true, create: true, edit: true, media: true, delete: false },
      testimonials: { view: true, create: true, edit: true, media: false, delete: false },
      homepage: { view: true, editHero: true, editAbout: true, editFinalCTA: true, media: false },
      inbox: { view: true, updateStatus: true, delete: false, exportCsv: false },
      theme: { view: false, editPalette: false, editSections: false, editHeaderFooter: false },
      sections: { view: false, toggleVisibility: false, reorder: false },
    },
    pages: {
      homepage: true, projects: true, services: true, sectors: true, clients: true,
      testimonials: true, theme: false, sections: false, inbox: true, auditLogs: false, users: false,
    },
    actions: { canEditText: true, canEditMedia: true, canEditColors: false, canDeleteItems: false, canManageUsers: false },
  },
  media_manager: {
    modules: {
      ...JSON.parse(JSON.stringify(READONLY_MODULE_PERMISSIONS)),
      projects: { view: true, create: false, edit: false, media: true, delete: false, publish: false },
      sectors: { view: true, create: false, edit: false, media: true, delete: false },
      clients: { view: true, create: false, edit: false, media: true, delete: false },
      testimonials: { view: true, create: false, edit: false, media: true, delete: false },
      homepage: { view: true, editHero: false, editAbout: false, editFinalCTA: false, media: true },
      theme: { view: false, editPalette: false, editSections: false, editHeaderFooter: false },
      sections: { view: false, toggleVisibility: false, reorder: false },
      inbox: { view: false, updateStatus: false, delete: false, exportCsv: false },
    },
    pages: {
      homepage: true, projects: true, services: false, sectors: true, clients: true,
      testimonials: true, theme: false, sections: false, inbox: false, auditLogs: false, users: false,
    },
    actions: { canEditText: false, canEditMedia: true, canEditColors: false, canDeleteItems: false, canManageUsers: false },
  },
  lead_specialist: {
    modules: {
      ...JSON.parse(JSON.stringify(READONLY_MODULE_PERMISSIONS)),
      projects: { view: false, create: false, edit: false, media: false, delete: false, publish: false },
      services: { view: false, create: false, edit: false, delete: false, publish: false },
      sectors: { view: false, create: false, edit: false, media: false, delete: false },
      clients: { view: false, create: false, edit: false, media: false, delete: false },
      homepage: { view: false, editHero: false, editAbout: false, editFinalCTA: false, media: false },
      theme: { view: false, editPalette: false, editSections: false, editHeaderFooter: false },
      sections: { view: false, toggleVisibility: false, reorder: false },
      inbox: { view: true, updateStatus: true, delete: false, exportCsv: true },
    },
    pages: {
      homepage: false, projects: false, services: false, sectors: false, clients: false,
      testimonials: true, theme: false, sections: false, inbox: true, auditLogs: false, users: false,
    },
    actions: { canEditText: false, canEditMedia: false, canEditColors: false, canDeleteItems: false, canManageUsers: false },
  },
  viewer: {
    modules: JSON.parse(JSON.stringify(READONLY_MODULE_PERMISSIONS)),
    pages: {
      homepage: true, projects: true, services: true, sectors: true, clients: true,
      testimonials: true, theme: true, sections: true, inbox: true, auditLogs: true, users: false,
    },
    actions: { canEditText: false, canEditMedia: false, canEditColors: false, canDeleteItems: false, canManageUsers: false },
  },
};

const AdminUserSchema = new Schema<IAdminUser>(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true, lowercase: true, trim: true },
    passwordHash: { type: String, required: true },
    role: {
      type: String,
      enum: ['superadmin', 'admin', 'editor', 'media_manager', 'lead_specialist', 'viewer', 'custom'],
      default: 'editor',
    },
    isSuperAdmin: { type: Boolean, default: false },
    isLocked: { type: Boolean, default: false },
    permissions: {
      type: Schema.Types.Mixed,
      default: () => JSON.parse(JSON.stringify(DEFAULT_PERMISSIONS.editor)),
    },
    lastLoginAt: { type: Date },
  },
  {
    timestamps: true,
  }
);

export const AdminUser = mongoose.model<IAdminUser>('AdminUser', AdminUserSchema);
