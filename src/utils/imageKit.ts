/**
 * ImageKit Utility - Editorial Fluidity Standard
 * Centralizes image and video transformations for high-performance delivery.
 */

const IMAGEKIT_URL_ENDPOINT = "https://ik.imagekit.io/ouw0qwets"; // Updated with user specific ID

export type ImageTransformOptions = {
  width?: number;
  height?: number;
  quality?: number;
  blur?: number;
  format?: 'webp' | 'avif' | 'auto';
  dpr?: number;
};

/**
 * Generates an optimized ImageKit URL
 * @param src The path or full URL of the image
 * @param options Transformation options
 */
export const getIKUrl = (src: string, options: ImageTransformOptions = {}) => {
  if (!src) return "";
  
  // If it's already a full URL and not ImageKit, return as is
  if (src.startsWith('http') && !src.includes('ik.imagekit.io')) return src;

  const {
    width,
    height,
    quality = 80,
    blur,
    format = 'auto',
    dpr = 1
  } = options;

  const transformations = [];
  
  if (width) transformations.push(`w-${Math.round(width * dpr)}`);
  if (height) transformations.push(`h-${Math.round(height * dpr)}`);
  if (quality) transformations.push(`q-${quality}`);
  if (blur) transformations.push(`bl-${blur}`);
  if (format) transformations.push(`f-${format}`);

  const trString = transformations.length > 0 ? `?tr=${transformations.join(',')}` : "";
  
  // Clean up path if it's already a full ImageKit URL
  const cleanPath = src.replace(IMAGEKIT_URL_ENDPOINT, "").replace(/^\//, "");
  
  return `${IMAGEKIT_URL_ENDPOINT}/${cleanPath}${trString}`;
};

/**
 * Generates an LQIP (Low Quality Image Placeholder) URL
 */
export const getIKPlaceholder = (src: string) => {
  return getIKUrl(src, { width: 50, blur: 30, quality: 20 });
};
