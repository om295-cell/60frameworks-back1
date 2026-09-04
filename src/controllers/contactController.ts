import { Request, Response, NextFunction } from 'express';
import { z } from 'zod';
import mongoose from 'mongoose';
import { ContactSubmission } from '../models/ContactSubmission.js';
import { AppError } from '../middleware/errorHandler.js';

export const contactSchema = z.object({
  body: z.object({
    fullName: z
      .string({ required_error: 'Full name is required' })
      .min(2, 'Name must be at least 2 characters')
      .max(100, 'Name must be under 100 characters')
      .trim(),
    email: z
      .string({ required_error: 'Work email is required' })
      .email('Please enter a valid email address')
      .toLowerCase()
      .trim(),
    phone: z.string().optional(),
    company: z
      .string({ required_error: 'Company/Organization is required' })
      .min(2, 'Company must be at least 2 characters')
      .max(120, 'Company must be under 120 characters')
      .trim(),
    serviceInterest: z
      .string({ required_error: 'Service interest is required' })
      .min(2, 'Please select a service interest')
      .trim(),
    estimatedBudget: z.string().optional(),
    timeline: z.string().optional(),
    message: z
      .string({ required_error: 'Project brief or message is required' })
      .min(10, 'Message must be at least 10 characters')
      .max(3000, 'Message must be under 3000 characters')
      .trim(),
  }),
});

export const submitContact = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const { fullName, email, phone, company, serviceInterest, estimatedBudget, timeline, message } =
      req.body;

    const submissionData = {
      fullName,
      email,
      phone,
      company,
      serviceInterest,
      estimatedBudget,
      timeline,
      message,
      ipAddress: req.ip || req.socket.remoteAddress,
      userAgent: req.get('user-agent'),
      status: 'new',
    };

    if (mongoose.connection.readyState === 1) {
      await ContactSubmission.create(submissionData);
    } else {
      console.log('[Contact Submission - In Memory Log]:', submissionData);
    }

    res.status(201).json({
      success: true,
      message: 'Thank you for reaching out. Our executive strategy team will contact you within 24 hours.',
      data: {
        referenceId: `INQ-${Date.now().toString().slice(-6)}`,
        submittedAt: new Date().toISOString(),
      },
    });
  } catch (error) {
    next(error);
  }
};

export const getSubmissions = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    if (mongoose.connection.readyState !== 1) {
      res.status(200).json({ success: true, count: 0, data: [] });
      return;
    }

    const submissions = await ContactSubmission.find().sort({ createdAt: -1 }).limit(100).lean();
    res.status(200).json({
      success: true,
      count: submissions.length,
      data: submissions,
    });
  } catch (error) {
    next(error);
  }
};

export const updateSubmissionStatus = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const { id } = req.params;
    const { status } = req.body;
    const submission = await ContactSubmission.findByIdAndUpdate(id, { status }, { new: true });
    if (!submission) throw new AppError('Submission not found', 404);
    res.status(200).json({ success: true, data: submission, message: 'Status updated' });
  } catch (error) {
    next(error);
  }
};
