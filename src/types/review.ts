export interface Review {
    id: string;
    listingId: string;
    reviewerId: string;
    sellerId: string;
    rating: number;
    comment: string;
    createdAt: Date;
  }