import { Request, Response, NextFunction } from 'express';

// In-memory cache for translations to avoid duplicate external requests
const translationCache = new Map<string, string>();

/**
 * Translate a text snippet using Google Translate GTX endpoint
 */
async function fetchGoogleTranslation(text: string, from = 'ar', to = 'en'): Promise<string> {
  const trimmed = text.trim();
  if (!trimmed) return '';

  const cacheKey = `${from}:${to}:${trimmed}`;
  if (translationCache.has(cacheKey)) {
    return translationCache.get(cacheKey)!;
  }

  try {
    const url = `https://translate.googleapis.com/translate_a/single?client=gtx&sl=${from}&tl=${to}&dt=t&q=${encodeURIComponent(trimmed)}`;
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`Google Translate responded with ${response.status}`);
    }

    const data: any = await response.json();
    if (Array.isArray(data) && Array.isArray(data[0])) {
      const translated = data[0].map((item: any) => item[0]).filter(Boolean).join('');
      translationCache.set(cacheKey, translated);
      return translated;
    }
    return trimmed;
  } catch (error) {
    console.warn('[TranslateController] External translation error:', error);
    // Return original text as safe fallback
    return trimmed;
  }
}

/**
 * POST /api/v1/translate
 * Body: { text: string | string[], from?: string, to?: string }
 */
export const translate = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const { text, from = 'ar', to = 'en' } = req.body;

    if (!text) {
      res.status(200).json({ success: true, result: '' });
      return;
    }

    if (Array.isArray(text)) {
      const translations = await Promise.all(
        text.map((item: string) => (typeof item === 'string' ? fetchGoogleTranslation(item, from, to) : Promise.resolve('')))
      );
      res.status(200).json({ success: true, result: translations });
      return;
    }

    if (typeof text === 'string') {
      const translated = await fetchGoogleTranslation(text, from, to);
      res.status(200).json({ success: true, result: translated });
      return;
    }

    res.status(400).json({ success: false, message: 'Invalid text payload' });
  } catch (error) {
    next(error);
  }
};

/**
 * POST /api/v1/translate/batch
 * Body: { items: Record<string, string>, from?: string, to?: string }
 */
export const translateBatch = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const { items, from = 'ar', to = 'en' } = req.body;

    if (!items || typeof items !== 'object') {
      res.status(400).json({ success: false, message: 'items must be an object of key-value strings' });
      return;
    }

    const keys = Object.keys(items);
    const results: Record<string, string> = {};

    await Promise.all(
      keys.map(async (key) => {
        const val = items[key];
        if (typeof val === 'string' && val.trim().length > 0) {
          results[key] = await fetchGoogleTranslation(val, from, to);
        } else {
          results[key] = '';
        }
      })
    );

    res.status(200).json({ success: true, results });
  } catch (error) {
    next(error);
  }
};
