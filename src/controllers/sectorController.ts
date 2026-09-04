import { Request, Response, NextFunction } from 'express';
import mongoose from 'mongoose';
import { Sector } from '../models/Sector.js';
import { INITIAL_SECTORS } from '../services/seedData.js';
import { AppError } from '../middleware/errorHandler.js';

export const getSectors = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    if (mongoose.connection.readyState !== 1) {
      res.status(200).json({
        success: true,
        count: INITIAL_SECTORS.length,
        data: INITIAL_SECTORS,
        source: 'in-memory-fallback',
      });
      return;
    }

    const sectors = await Sector.find().sort({ order: 1 }).lean();
    res.status(200).json({
      success: true,
      count: sectors.length,
      data: sectors.length > 0 ? sectors : INITIAL_SECTORS,
      source: sectors.length > 0 ? 'database' : 'seed-fallback',
    });
  } catch (error) {
    next(error);
  }
};

export const getSectorBySlug = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const { slug } = req.params;

    if (mongoose.connection.readyState !== 1) {
      const fallback = INITIAL_SECTORS.find((s) => s.slug === slug);
      if (!fallback) throw new AppError(`Sector '${slug}' not found`, 404);
      res.status(200).json({ success: true, data: fallback, source: 'in-memory-fallback' });
      return;
    }

    const sector = await Sector.findOne({ slug }).lean();
    if (!sector) {
      const fallback = INITIAL_SECTORS.find((s) => s.slug === slug);
      if (fallback) {
        res.status(200).json({ success: true, data: fallback, source: 'seed-fallback' });
        return;
      }
      throw new AppError(`Sector '${slug}' not found`, 404);
    }

    res.status(200).json({ success: true, data: sector, source: 'database' });
  } catch (error) {
    next(error);
  }
};

export const createSector = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const slug = req.body.slug || req.body.name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
    const sector = await Sector.create({ ...req.body, slug });
    res.status(201).json({ success: true, data: sector, message: 'Sector created successfully' });
  } catch (error) {
    next(error);
  }
};

export const updateSector = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const { id } = req.params;
    const isObjectId = mongoose.Types.ObjectId.isValid(id);
    const query = isObjectId ? { _id: id } : { $or: [{ slug: id }, { name: id }] };
    const sector = await Sector.findOneAndUpdate(query, req.body, {
      new: true,
      runValidators: true,
      upsert: true,
      setDefaultsOnInsert: true,
    });
    res.status(200).json({ success: true, data: sector, message: 'Sector updated successfully' });
  } catch (error) {
    next(error);
  }
};

export const deleteSector = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const { id } = req.params;
    const isObjectId = mongoose.Types.ObjectId.isValid(id);
    const query = isObjectId ? { _id: id } : { $or: [{ slug: id }, { name: id }] };
    const sector = await Sector.findOneAndDelete(query);
    if (!sector) throw new AppError('Sector not found', 404);
    res.status(200).json({ success: true, message: 'Sector deleted successfully' });
  } catch (error) {
    next(error);
  }
};
