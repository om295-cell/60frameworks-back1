import { Request, Response } from 'express';
import { ThemeSettings, DEFAULT_THEME_SETTINGS } from '../models/ThemeSettings.js';

let inMemoryTheme: any = { ...DEFAULT_THEME_SETTINGS };

export const getTheme = async (_req: Request, res: Response): Promise<void> => {
  try {
    let theme = await ThemeSettings.findOne();
    if (!theme) {
      try {
        theme = await ThemeSettings.create(inMemoryTheme);
      } catch {
        res.status(200).json({ success: true, data: inMemoryTheme });
        return;
      }
    }

    res.status(200).json({
      success: true,
      data: theme,
    });
  } catch (error) {
    console.warn('Error fetching theme from DB, returning in-memory theme:', error);
    res.status(200).json({
      success: true,
      data: inMemoryTheme,
    });
  }
};

export const updateTheme = async (req: Request, res: Response): Promise<void> => {
  try {
    inMemoryTheme = {
      ...inMemoryTheme,
      ...req.body,
    };

    const updateDoc: any = {};
    if (req.body.header) updateDoc.header = req.body.header;
    if (req.body.footer) updateDoc.footer = req.body.footer;
    if (req.body.global) updateDoc.global = req.body.global;
    if (req.body.sections) updateDoc.sections = req.body.sections;
    if (req.body.sectionOrder) updateDoc.sectionOrder = req.body.sectionOrder;

    const theme = await ThemeSettings.findOneAndUpdate(
      {},
      { $set: updateDoc },
      { new: true, upsert: true, setDefaultsOnInsert: true }
    );

    res.status(200).json({
      success: true,
      data: theme,
      message: 'Theme settings updated successfully',
    });
  } catch (error) {
    console.warn('DB update failed for theme, saved in-memory:', error);
    res.status(200).json({
      success: true,
      data: inMemoryTheme,
      message: 'Theme settings updated in memory',
    });
  }
};
