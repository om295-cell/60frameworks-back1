import { Request, Response, NextFunction } from 'express';
import mongoose from 'mongoose';
import { Project } from '../models/Project.js';
import { INITIAL_PROJECTS } from '../services/seedData.js';
import { AppError } from '../middleware/errorHandler.js';

export const getProjects = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const { category, featured, limit = '50' } = req.query;

    if (mongoose.connection.readyState !== 1) {
      let results = [...INITIAL_PROJECTS];
      if (category && typeof category === 'string' && category !== 'All') {
        results = results.filter((p) => p.category.toLowerCase().includes(category.toLowerCase()));
      }
      if (featured === 'true') {
        results = results.filter((p) => p.featured);
      }
      res.status(200).json({
        success: true,
        count: results.length,
        data: results.slice(0, parseInt(limit as string, 10)),
        source: 'in-memory-fallback',
      });
      return;
    }

    const query: Record<string, any> = {};
    if (category && typeof category === 'string' && category !== 'All') {
      query.category = { $regex: category, $options: 'i' };
    }
    if (featured === 'true') {
      query.featured = true;
    }

    const projects = await Project.find(query)
      .sort({ featured: -1, order: 1, createdAt: -1 })
      .limit(parseInt(limit as string, 10))
      .lean();

    res.status(200).json({
      success: true,
      count: projects.length,
      data: projects.length > 0 ? projects : INITIAL_PROJECTS,
      source: projects.length > 0 ? 'database' : 'seed-fallback',
    });
  } catch (error) {
    next(error);
  }
};

export const getProjectBySlug = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const { slug } = req.params;

    if (mongoose.connection.readyState !== 1) {
      const fallback = INITIAL_PROJECTS.find((p) => p.slug === slug);
      if (!fallback) {
        throw new AppError(`Project with slug '${slug}' not found`, 404);
      }
      res.status(200).json({ success: true, data: fallback, source: 'in-memory-fallback' });
      return;
    }

    const project = await Project.findOne({ slug }).lean();
    if (!project) {
      const fallback = INITIAL_PROJECTS.find((p) => p.slug === slug);
      if (fallback) {
        res.status(200).json({ success: true, data: fallback, source: 'seed-fallback' });
        return;
      }
      throw new AppError(`Project with slug '${slug}' not found`, 404);
    }

    res.status(200).json({
      success: true,
      data: project,
      source: 'database',
    });
  } catch (error) {
    next(error);
  }
};

export const createProject = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const slug = req.body.slug || req.body.title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
    const project = await Project.create({ ...req.body, slug });
    res.status(201).json({ success: true, data: project, message: 'Project created successfully' });
  } catch (error) {
    next(error);
  }
};

export const updateProject = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const { id } = req.params;
    const isObjectId = mongoose.Types.ObjectId.isValid(id);
    const query = isObjectId ? { _id: id } : { $or: [{ slug: id }, { title: id }] };
    const project = await Project.findOneAndUpdate(query, req.body, {
      new: true,
      runValidators: true,
      upsert: true,
      setDefaultsOnInsert: true,
    });
    res.status(200).json({ success: true, data: project, message: 'Project updated successfully' });
  } catch (error) {
    next(error);
  }
};

export const deleteProject = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const { id } = req.params;
    const isObjectId = mongoose.Types.ObjectId.isValid(id);
    const query = isObjectId ? { _id: id } : { $or: [{ slug: id }, { title: id }] };
    const project = await Project.findOneAndDelete(query);
    if (!project) {
      throw new AppError('Project not found', 404);
    }
    res.status(200).json({ success: true, message: 'Project deleted successfully' });
  } catch (error) {
    next(error);
  }
};
