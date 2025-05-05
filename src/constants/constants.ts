export const LISTING_CONDITIONS = {
  NEW: 'new',
  LIKE_NEW: 'like_new',
  GOOD: 'good',
  FAIR: 'fair',
  POOR: 'poor',
} as const;

export const PURCHASE_STATUS = {
  PENDING: 'pending',
  COMPLETED: 'completed',
  CANCELLED: 'cancelled',
} as const;

export const ITEMS_PER_PAGE = 20;

export const MAX_IMAGES_PER_LISTING = 10;

export const MAX_REVIEW_LENGTH = 500;

export const MIN_REVIEW_LENGTH = 10;

export const SUPPORTED_IMAGE_TYPES = ['image/jpeg', 'image/png', 'image/webp'];

export const MAX_IMAGE_SIZE_MB = 5; 