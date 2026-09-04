import { Request, Response, NextFunction } from 'express';
import mongoose from 'mongoose';
import { Client } from '../models/Client.js';
import { INITIAL_CLIENTS } from '../services/seedData.js';
import { AppError } from '../middleware/errorHandler.js';

export const getClients = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    if (mongoose.connection.readyState !== 1) {
      res.status(200).json({
        success: true,
        count: INITIAL_CLIENTS.length,
        data: INITIAL_CLIENTS,
        source: 'in-memory-fallback',
      });
      return;
    }

    const clients = await Client.find().sort({ order: 1 }).lean();
    res.status(200).json({
      success: true,
      count: clients.length,
      data: clients.length > 0 ? clients : INITIAL_CLIENTS,
      source: clients.length > 0 ? 'database' : 'seed-fallback',
    });
  } catch (error) {
    next(error);
  }
};

export const createClient = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const client = await Client.create(req.body);
    res.status(201).json({ success: true, data: client, message: 'Client created successfully' });
  } catch (error) {
    next(error);
  }
};

export const updateClient = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const { id } = req.params;
    const isObjectId = mongoose.Types.ObjectId.isValid(id);
    const query = isObjectId ? { _id: id } : { name: id };
    const client = await Client.findOneAndUpdate(query, req.body, {
      new: true,
      runValidators: true,
      upsert: true,
      setDefaultsOnInsert: true,
    });
    res.status(200).json({ success: true, data: client, message: 'Client updated successfully' });
  } catch (error) {
    next(error);
  }
};

export const deleteClient = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const { id } = req.params;
    const isObjectId = mongoose.Types.ObjectId.isValid(id);
    const query = isObjectId ? { _id: id } : { name: id };
    const client = await Client.findOneAndDelete(query);
    if (!client) throw new AppError('Client not found', 404);
    res.status(200).json({ success: true, message: 'Client deleted successfully' });
  } catch (error) {
    next(error);
  }
};
