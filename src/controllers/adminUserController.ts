import { Request, Response } from 'express';
import { AdminUser, DEFAULT_PERMISSIONS, IAdminUser } from '../models/AdminUser.js';

// Super Admin permanent default account
export const SUPER_ADMIN_EMAIL = 'admin@60frameworks.com';
export const SUPER_ADMIN_DEFAULT_PASSWORD = 'admin60fw2024!';

export const normalizeUserPermissions = (perms: any, role: string) => {
  const fallback = DEFAULT_PERMISSIONS[role] || DEFAULT_PERMISSIONS.editor;
  if (!perms) return fallback;
  if (!perms.modules) {
    return {
      ...fallback,
      pages: perms.pages || fallback.pages,
      actions: perms.actions || fallback.actions,
    };
  }
  return perms;
};

let inMemoryUsers: any[] = [
  {
    _id: 'super_admin_root',
    name: 'Master Super Admin',
    email: SUPER_ADMIN_EMAIL,
    passwordHash: SUPER_ADMIN_DEFAULT_PASSWORD,
    role: 'superadmin',
    isSuperAdmin: true,
    isLocked: true,
    permissions: DEFAULT_PERMISSIONS.superadmin,
    registeredDeviceId: '',   // Superadmin is exempt — never enforced
    deviceLockEnabled: false, // Superadmin bypass
    createdAt: new Date(),
    updatedAt: new Date(),
  },
];

export const getUsers = async (_req: Request, res: Response): Promise<void> => {
  try {
    let users: any = await AdminUser.find().select('-passwordHash');
    if (!users || users.length === 0) {
      // Ensure super admin exists in DB
      try {
        await AdminUser.create(inMemoryUsers[0]);
        users = await AdminUser.find().select('-passwordHash');
      } catch {
        const safe = inMemoryUsers.map(({ passwordHash, ...rest }) => rest);
        res.status(200).json({ success: true, data: safe });
        return;
      }
    }

    const normalizedUsers = (users || []).map((u: any) => {
      const doc = u.toObject ? u.toObject() : u;
      return {
        ...doc,
        permissions: normalizeUserPermissions(doc.permissions, doc.role),
      };
    });

    res.status(200).json({
      success: true,
      data: normalizedUsers,
    });
  } catch (error) {
    console.warn('Error fetching users from DB, returning in-memory users:', error);
    const safe = inMemoryUsers.map(({ passwordHash, ...rest }) => ({
      ...rest,
      permissions: normalizeUserPermissions(rest.permissions, rest.role),
    }));
    res.status(200).json({
      success: true,
      data: safe,
    });
  }
};

export const createUser = async (req: Request, res: Response): Promise<void> => {
  try {
    const { name, email, password, role, permissions } = req.body;

    if (!email || !password || !name) {
      res.status(400).json({ success: false, message: 'Name, email, and password are required' });
      return;
    }

    const cleanEmail = email.toLowerCase().trim();

    // Check duplicate
    if (inMemoryUsers.some(u => u.email === cleanEmail)) {
      res.status(400).json({ success: false, message: 'User with this email already exists' });
      return;
    }

    const roleName = role || 'editor';
    const userPermissions = permissions || DEFAULT_PERMISSIONS[roleName] || DEFAULT_PERMISSIONS.editor;

    const newUserObj = {
      _id: `user_${Date.now()}`,
      name,
      email: cleanEmail,
      passwordHash: password, // In a production setup, bcrypt.hash
      role: roleName,
      isSuperAdmin: false,
      isLocked: false,
      permissions: userPermissions,
      registeredDeviceId: '',  // Will be set on first login
      deviceLockEnabled: true, // Device lock active by default
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    inMemoryUsers.push(newUserObj);

    try {
      const dbUser = await AdminUser.create(newUserObj);
      res.status(201).json({
        success: true,
        data: {
          _id: dbUser._id,
          name: dbUser.name,
          email: dbUser.email,
          role: dbUser.role,
          isSuperAdmin: dbUser.isSuperAdmin,
          permissions: dbUser.permissions,
          registeredDeviceId: dbUser.registeredDeviceId || '',
          deviceLockEnabled: dbUser.deviceLockEnabled !== false,
        },
        message: 'User created successfully',
      });
      return;
    } catch {
      const { passwordHash, ...safe } = newUserObj;
      res.status(201).json({
        success: true,
        data: safe,
        message: 'User created in memory',
      });
    }
  } catch (error: any) {
    res.status(500).json({ success: false, message: error.message || 'Failed to create user' });
  }
};

export const updateUser = async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params;
    const { name, email, password, role, permissions } = req.body;

    const userIndex = inMemoryUsers.findIndex(u => u._id === id || u.email === id);
    const existing = inMemoryUsers[userIndex];

    if (existing?.isSuperAdmin || existing?.email === SUPER_ADMIN_EMAIL) {
      // Super admin email/role cannot be demoted or changed
      if (role && role !== 'superadmin') {
        res.status(403).json({ success: false, message: 'Cannot demote the Super Admin account' });
        return;
      }
    }

    if (userIndex !== -1) {
      inMemoryUsers[userIndex] = {
        ...inMemoryUsers[userIndex],
        ...(name ? { name } : {}),
        ...(email && !existing?.isSuperAdmin ? { email: email.toLowerCase().trim() } : {}),
        ...(password ? { passwordHash: password } : {}),
        ...(role && !existing?.isSuperAdmin ? { role } : {}),
        ...(permissions ? { permissions } : {}),
        // Reset device: clears the registered device fingerprint so the next login registers a new one
        ...(req.body.resetDevice ? { registeredDeviceId: '' } : {}),
        updatedAt: new Date(),
      };
    }

    try {
      const isObjectId = /^[0-9a-fA-F]{24}$/.test(id);
      const dbUser = isObjectId
        ? await AdminUser.findById(id)
        : await AdminUser.findOne({ $or: [{ _id: id }, { email: id.toLowerCase().trim() }] });

      if (dbUser) {
        if (dbUser.isSuperAdmin && role && role !== 'superadmin') {
          res.status(403).json({ success: false, message: 'Cannot demote the Super Admin account' });
          return;
        }
        if (name) dbUser.name = name;
        if (email && !dbUser.isSuperAdmin) dbUser.email = email.toLowerCase().trim();
        if (password) dbUser.passwordHash = password;
        if (role && !dbUser.isSuperAdmin) dbUser.role = role;
        if (permissions) dbUser.permissions = permissions;
        // Reset device fingerprint if requested
        if (req.body.resetDevice) dbUser.registeredDeviceId = '';
        await dbUser.save();
      }
    } catch {}

    const updated = inMemoryUsers[userIndex] || { _id: id, name, email, role, permissions };
    const { passwordHash, ...safe } = updated;

    res.status(200).json({
      success: true,
      data: safe,
      message: 'User updated successfully',
    });
  } catch (error: any) {
    res.status(500).json({ success: false, message: error.message || 'Failed to update user' });
  }
};

export const deleteUser = async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params;

    const userToDelete = inMemoryUsers.find(u => u._id === id || u.email === id);

    if (userToDelete?.isSuperAdmin || userToDelete?.isLocked || userToDelete?.email === SUPER_ADMIN_EMAIL) {
      res.status(403).json({
        success: false,
        message: 'Security Violation: The Master Super Admin account cannot be deleted.',
      });
      return;
    }

    inMemoryUsers = inMemoryUsers.filter(u => u._id !== id && u.email !== id);

    try {
      const isObjectId = /^[0-9a-fA-F]{24}$/.test(id);
      const dbUser = isObjectId
        ? await AdminUser.findById(id)
        : await AdminUser.findOne({ $or: [{ _id: id }, { email: id.toLowerCase().trim() }] });

      if (dbUser?.isSuperAdmin || dbUser?.isLocked) {
        res.status(403).json({ success: false, message: 'Cannot delete Super Admin' });
        return;
      }
      if (dbUser) {
        await AdminUser.findByIdAndDelete(dbUser._id);
      }
    } catch {}

    res.status(200).json({
      success: true,
      message: 'User deleted successfully',
    });
  } catch (error: any) {
    res.status(500).json({ success: false, message: error.message || 'Failed to delete user' });
  }
};

export const loginAdmin = async (req: Request, res: Response): Promise<void> => {
  try {
    const { email, password, deviceId } = req.body;

    // Super Admin Quick Password or Email+Password — always exempt from device locking
    if (password === SUPER_ADMIN_DEFAULT_PASSWORD && (!email || email === SUPER_ADMIN_EMAIL)) {
      res.status(200).json({
        success: true,
        data: {
          name: 'Master Super Admin',
          email: SUPER_ADMIN_EMAIL,
          role: 'superadmin',
          isSuperAdmin: true,
          permissions: DEFAULT_PERMISSIONS.superadmin,
          registeredDeviceId: '',
          deviceLockEnabled: false,
        },
      });
      return;
    }

    const cleanEmail = email ? email.toLowerCase().trim() : '';
    const incomingDevice = (deviceId || '').trim().toUpperCase();

    // Helper: validate and lock device
    const evaluateDevice = (user: any): { allowed: boolean; isFirstLogin: boolean; registeredDevice?: string } => {
      // Superadmin and accounts with deviceLockEnabled: false are exempt
      if (user.isSuperAdmin || user.deviceLockEnabled === false) {
        return { allowed: true, isFirstLogin: false };
      }

      const registered = (user.registeredDeviceId || '').trim().toUpperCase();

      // First device login: no device registered yet
      if (!registered) {
        return { allowed: true, isFirstLogin: true };
      }

      // Existing device matches
      if (incomingDevice && registered === incomingDevice) {
        return { allowed: true, isFirstLogin: false };
      }

      // Device mismatch: rejected
      return { allowed: false, isFirstLogin: false, registeredDevice: registered };
    };

    // ── 1. Check MongoDB First (Primary Persistent Store) ──
    try {
      const dbUser = await AdminUser.findOne({ email: cleanEmail });
      if (dbUser && dbUser.passwordHash === password) {
        const check = evaluateDevice(dbUser);

        if (!check.allowed) {
          res.status(403).json({
            success: false,
            message: `Access denied: Please log in from your registered device (${check.registeredDevice}).`,
            deviceBlocked: true,
            registeredDeviceId: check.registeredDevice,
          });
          return;
        }

        // If first login, register the incoming device ID permanently in MongoDB
        if (check.isFirstLogin && incomingDevice) {
          dbUser.registeredDeviceId = incomingDevice;
        }
        dbUser.lastLoginAt = new Date();
        await dbUser.save();

        // Keep in-memory cache in sync
        const memIdx = inMemoryUsers.findIndex(u => u.email === cleanEmail);
        if (memIdx !== -1) {
          inMemoryUsers[memIdx].registeredDeviceId = dbUser.registeredDeviceId;
          inMemoryUsers[memIdx].lastLoginAt = dbUser.lastLoginAt;
        }

        res.status(200).json({
          success: true,
          data: {
            _id: dbUser._id,
            name: dbUser.name,
            email: dbUser.email,
            role: dbUser.role,
            isSuperAdmin: !!dbUser.isSuperAdmin,
            permissions: normalizeUserPermissions(dbUser.permissions, dbUser.role),
            registeredDeviceId: dbUser.registeredDeviceId || '',
            deviceLockEnabled: dbUser.deviceLockEnabled !== false,
          },
        });
        return;
      }
    } catch (dbErr) {
      console.warn('MongoDB login check error, falling back to in-memory:', dbErr);
    }

    // ── 2. Fallback to In-Memory Users ──
    const user = inMemoryUsers.find(
      u => u.email === cleanEmail && u.passwordHash === password
    );

    if (user) {
      const check = evaluateDevice(user);

      if (!check.allowed) {
        res.status(403).json({
          success: false,
          message: `Access denied: Please log in from your registered device (${check.registeredDevice}).`,
          deviceBlocked: true,
          registeredDeviceId: check.registeredDevice,
        });
        return;
      }

      if (check.isFirstLogin && incomingDevice) {
        user.registeredDeviceId = incomingDevice;
        // Attempt to update DB if connected
        try {
          await AdminUser.findOneAndUpdate(
            { email: cleanEmail },
            { registeredDeviceId: incomingDevice, lastLoginAt: new Date() }
          );
        } catch {}
      }

      res.status(200).json({
        success: true,
        data: {
          _id: user._id,
          name: user.name,
          email: user.email,
          role: user.role,
          isSuperAdmin: !!user.isSuperAdmin,
          permissions: normalizeUserPermissions(user.permissions, user.role),
          registeredDeviceId: user.registeredDeviceId || '',
          deviceLockEnabled: user.deviceLockEnabled !== false,
        },
      });
      return;
    }

    res.status(401).json({ success: false, message: 'Invalid credentials. Access denied.' });
  } catch (error: any) {
    res.status(500).json({ success: false, message: error.message || 'Login failed' });
  }
};
