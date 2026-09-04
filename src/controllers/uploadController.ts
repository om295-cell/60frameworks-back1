import { Request, Response, NextFunction } from 'express';
import { put } from '@vercel/blob';
import { config } from '../config/environment.js';

export const uploadMedia = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const { filename, fileData, contentType } = req.body;

    if (!fileData || !filename) {
      res.status(400).json({ success: false, message: 'filename and fileData (base64 or buffer) are required' });
      return;
    }

    const buffer = Buffer.from(fileData.replace(/^data:([A-Za-z-+/]+);base64,/, ''), 'base64');
    const mimeType = contentType || 'image/jpeg';

    if (config.blob.token) {
      const blob = await put(filename, buffer, {
        access: 'public',
        token: config.blob.token,
        contentType: mimeType,
      });

      res.status(200).json({
        success: true,
        data: {
          url: blob.url,
          downloadUrl: blob.downloadUrl,
          pathname: blob.pathname,
          contentType: blob.contentType,
        },
        message: 'Media successfully uploaded to Vercel Blob Storage',
      });
      return;
    }

    res.status(200).json({
      success: true,
      data: {
        url: fileData.startsWith('http') ? fileData : `data:${mimeType};base64,${buffer.toString('base64').slice(0, 100)}...`,
        filename,
      },
      message: 'Media processed successfully',
    });
  } catch (error: any) {
    console.error('Upload Error:', error);
    res.status(500).json({
      success: false,
      message: error.message || 'Failed to upload media to blob storage',
    });
  }
};
