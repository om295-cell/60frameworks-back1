import { Request, Response, NextFunction } from 'express';
import mongoose from 'mongoose';
import { Service } from '../models/Service.js';
import { INITIAL_SERVICES } from '../services/seedData.js';
import { AppError } from '../middleware/errorHandler.js';

export const getServices = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    if (mongoose.connection.readyState !== 1) {
      res.status(200).json({
        success: true,
        count: INITIAL_SERVICES.length,
        data: INITIAL_SERVICES,
        source: 'in-memory-fallback',
      });
      return;
    }

    const services = await Service.find().sort({ order: 1 }).lean();
    res.status(200).json({
      success: true,
      count: services.length,
      data: services.length > 0 ? services : INITIAL_SERVICES,
      source: services.length > 0 ? 'database' : 'seed-fallback',
    });
  } catch (error) {
    next(error);
  }
};

export const getServiceBySlug = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const { slug } = req.params;

    if (mongoose.connection.readyState !== 1) {
      const fallback = INITIAL_SERVICES.find((s) => s.slug === slug);
      if (!fallback) throw new AppError(`Service '${slug}' not found`, 404);
      res.status(200).json({ success: true, data: fallback, source: 'in-memory-fallback' });
      return;
    }

    const service = await Service.findOne({ slug }).lean();
    if (!service) {
      const fallback = INITIAL_SERVICES.find((s) => s.slug === slug);
      if (fallback) {
        res.status(200).json({ success: true, data: fallback, source: 'seed-fallback' });
        return;
      }
      throw new AppError(`Service '${slug}' not found`, 404);
    }

    res.status(200).json({ success: true, data: service, source: 'database' });
  } catch (error) {
    next(error);
  }
};

export const createService = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const slug = req.body.slug || req.body.title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
    const service = await Service.create({ ...req.body, slug });
    res.status(201).json({ success: true, data: service, message: 'Service created successfully' });
  } catch (error) {
    next(error);
  }
};

export const updateService = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const { id } = req.params;
    const isObjectId = mongoose.Types.ObjectId.isValid(id);
    const query = isObjectId ? { _id: id } : { $or: [{ slug: id }, { title: id }] };
    const service = await Service.findOneAndUpdate(query, req.body, {
      new: true,
      runValidators: true,
      upsert: true,
      setDefaultsOnInsert: true,
    });
    res.status(200).json({ success: true, data: service, message: 'Service updated successfully' });
  } catch (error) {
    next(error);
  }
};

export const deleteService = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const { id } = req.params;
    const isObjectId = mongoose.Types.ObjectId.isValid(id);
    const query = isObjectId ? { _id: id } : { $or: [{ slug: id }, { title: id }] };
    const service = await Service.findOneAndDelete(query);
    if (!service) throw new AppError('Service not found', 404);
    res.status(200).json({ success: true, message: 'Service deleted successfully' });
  } catch (error) {
    next(error);
  }
};
