import { Request, Response } from 'express';
import { AuditLog } from '../models/AuditLog.js';

let inMemoryLogs: any[] = [
  {
    _id: 'log_init',
    userEmail: 'admin@60frameworks.com',
    userName: 'Master Super Admin',
    userRole: 'superadmin',
    action: 'SYSTEM_INITIALIZED',
    category: 'auth',
    target: 'System',
    details: '60FRAMEWORKS Admin Control Panel initialized with full RBAC protection.',
    createdAt: new Date(),
  },
];

export const getLogs = async (req: Request, res: Response): Promise<void> => {
  try {
    const limit = parseInt(req.query.limit as string) || 100;
    let logs = await AuditLog.find().sort({ createdAt: -1 }).limit(limit);

    if (!logs || logs.length === 0) {
      res.status(200).json({ success: true, data: inMemoryLogs });
      return;
    }

    res.status(200).json({
      success: true,
      data: logs,
    });
  } catch (error) {
    console.warn('DB logs fetch failed, returning in-memory logs:', error);
    res.status(200).json({
      success: true,
      data: inMemoryLogs,
    });
  }
};

export const createLog = async (req: Request, res: Response): Promise<void> => {
  try {
    const { userEmail, userName, userRole, action, category, target, details } = req.body;

    const logEntry = {
      _id: `log_${Date.now()}`,
      userEmail: userEmail || 'system@60frameworks.com',
      userName: userName || 'Admin',
      userRole: userRole || 'admin',
      action: action || 'ACTION',
      category: category || 'content',
      target: target || 'General',
      details: details || 'Administrative action performed',
      ipAddress: req.ip || req.socket.remoteAddress,
      createdAt: new Date(),
    };

    inMemoryLogs.unshift(logEntry);
    if (inMemoryLogs.length > 500) inMemoryLogs.pop();

    try {
      await AuditLog.create(logEntry);
    } catch {}

    res.status(201).json({
      success: true,
      data: logEntry,
    });
  } catch (error: any) {
    res.status(500).json({ success: false, message: error.message || 'Failed to record audit log' });
  }
};
