export interface Purchase {
    id: string;
    listingId: string;
    buyerId: string;
    sellerId: string;
    status: 'pending' | 'completed' | 'cancelled';
    amount: number;
    currency: string;
    createdAt: Date;
    updatedAt: Date;
  } 