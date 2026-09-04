import { Request, Response, NextFunction } from 'express';
import mongoose from 'mongoose';
import { Testimonial } from '../models/Testimonial.js';
import { INITIAL_TESTIMONIALS } from '../services/seedData.js';
import { AppError } from '../middleware/errorHandler.js';

export const getTestimonials = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    if (mongoose.connection.readyState !== 1) {
      res.status(200).json({
        success: true,
        count: INITIAL_TESTIMONIALS.length,
        data: INITIAL_TESTIMONIALS,
        source: 'in-memory-fallback',
      });
      return;
    }

    const testimonials = await Testimonial.find().sort({ order: 1 }).lean();
    res.status(200).json({
      success: true,
      count: testimonials.length,
      data: testimonials.length > 0 ? testimonials : INITIAL_TESTIMONIALS,
      source: testimonials.length > 0 ? 'database' : 'seed-fallback',
    });
  } catch (error) {
    next(error);
  }
};

export const createTestimonial = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const testimonial = await Testimonial.create(req.body);
    res.status(201).json({ success: true, data: testimonial, message: 'Testimonial created successfully' });
  } catch (error) {
    next(error);
  }
};

export const updateTestimonial = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const { id } = req.params;
    const isObjectId = mongoose.Types.ObjectId.isValid(id);
    const query = isObjectId ? { _id: id } : { authorName: id };
    const testimonial = await Testimonial.findOneAndUpdate(query, req.body, {
      new: true,
      runValidators: true,
      upsert: true,
      setDefaultsOnInsert: true,
    });
    res.status(200).json({ success: true, data: testimonial, message: 'Testimonial updated successfully' });
  } catch (error) {
    next(error);
  }
};

export const deleteTestimonial = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const { id } = req.params;
    const isObjectId = mongoose.Types.ObjectId.isValid(id);
    const query = isObjectId ? { _id: id } : { authorName: id };
    const testimonial = await Testimonial.findOneAndDelete(query);
    if (!testimonial) throw new AppError('Testimonial not found', 404);
    res.status(200).json({ success: true, message: 'Testimonial deleted successfully' });
  } catch (error) {
    next(error);
  }
};
