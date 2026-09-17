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

    // Deep-merge DB data with defaults so any missing fields (e.g. latestEvent added later)
    // are always returned with correct fallback values
    const dbData = theme.toObject ? theme.toObject() : theme;
    const merged = {
      ...inMemoryTheme,
      ...dbData,
      sections: {
        ...DEFAULT_THEME_SETTINGS.sections,
        ...(dbData.sections || {}),
      },
    };

    // Migrate legacy whyUs light colors to luxury dark
    if (
      merged.sections?.whyUs &&
      (merged.sections.whyUs.backgroundColor === '#FFFFFF' ||
        merged.sections.whyUs.backgroundColor === '#FAFAFA' ||
        merged.sections.whyUs.backgroundColor === '#F8F9FA')
    ) {
      merged.sections.whyUs.backgroundColor = '#141414';
      merged.sections.whyUs.textColor = '#FFFFFF';
      merged.sections.whyUs.subtitleColor = '#D1D5DB';
      merged.sections.whyUs.cardBackgroundColor = '#1F1F1F';
      merged.sections.whyUs.cardTextColor = '#FFFFFF';
    }

    // Migrate legacy about light colors/cards to luxury dark
    if (
      merged.sections?.about &&
      (merged.sections.about.backgroundColor === '#FFFFFF' ||
        merged.sections.about.cardBackgroundColor === '#E6E7E8' ||
        merged.sections.about.cardBackgroundColor === '#FFFFFF')
    ) {
      merged.sections.about.backgroundColor = '#1A1A1A';
      merged.sections.about.textColor = '#FFFFFF';
      merged.sections.about.subtitleColor = '#D1D5DB';
      merged.sections.about.cardBackgroundColor = '#1F1F1F';
      merged.sections.about.cardTextColor = '#FFFFFF';
    }

    res.status(200).json({ success: true, data: merged });
  } catch (error) {
    console.warn('Error fetching theme from DB, returning in-memory theme:', error);
    res.status(200).json({ success: true, data: inMemoryTheme });
  }
};

export const updateTheme = async (req: Request, res: Response): Promise<void> => {
  try {
    inMemoryTheme = {
      ...inMemoryTheme,
      ...req.body,
      sections: {
        ...DEFAULT_THEME_SETTINGS.sections,
        ...(inMemoryTheme.sections || {}),
        ...(req.body.sections || {}),
      },
    };

    const updateDoc: any = {};
    if (req.body.header) updateDoc.header = req.body.header;
    if (req.body.footer) updateDoc.footer = req.body.footer;
    if (req.body.global) updateDoc.global = req.body.global;
    if (req.body.sections) updateDoc.sections = inMemoryTheme.sections; // use merged
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
