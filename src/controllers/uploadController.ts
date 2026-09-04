import { Request, Response, NextFunction } from 'express';
import { put } from '@vercel/blob';
import { handleUpload, type HandleUploadBody } from '@vercel/blob/client';
import { config } from '../config/environment.js';

/**
 * Direct server-side upload fallback for small files
 */
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

/**
 * Handle Vercel Blob client-side upload token handshake
 * Allows the browser to upload large videos (up to 500MB) directly to Vercel Blob CDN
 * completely bypassing serverless 4.5MB payload limits.
 */
export const handleBlobClientUpload = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const jsonResponse = await handleUpload({
      body: req.body as HandleUploadBody,
      request: req,
      token: config.blob.token,
      onBeforeGenerateToken: async () => {
        return {
          allowedContentTypes: [
            'image/jpeg',
            'image/png',
            'image/webp',
            'image/gif',
            'image/svg+xml',
            'video/mp4',
            'video/webm',
            'video/quicktime',
            'video/x-matroska',
            'video/mpeg',
          ],
          tokenPayload: JSON.stringify({}),
        };
      },
      onUploadCompleted: async ({ blob }) => {
        console.log('[Vercel Blob Client Upload Complete]:', blob.url);
      },
    });

    res.status(200).json(jsonResponse);
  } catch (error: any) {
    console.error('HandleBlobClientUpload error:', error);
    res.status(400).json({ error: error.message || 'Client upload token handshake failed' });
  }
};
