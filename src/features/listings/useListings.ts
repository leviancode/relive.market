import { useState, useEffect } from 'react';
import { Listing } from '@/types/listing';
import { ITEMS_PER_PAGE } from '@/constants/constants';

interface UseListingsOptions {
  category?: string;
  search?: string;
  minPrice?: number;
  maxPrice?: number;
  condition?: string;
  location?: string;
}

export const useListings = (options: UseListingsOptions = {}) => {
  const [listings, setListings] = useState<Listing[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);

  useEffect(() => {
    const fetchListings = async () => {
      try {
        setLoading(true);
        // TODO: Implement actual API call
        const params = {
          page: page.toString(),
          limit: ITEMS_PER_PAGE.toString(),
          ...Object.fromEntries(
            Object.entries(options).map(([key, value]) => [key, value?.toString() ?? ''])
          ),
        };
        
        const response = await fetch('/api/listings?' + new URLSearchParams(params));
        
        if (!response.ok) {
          throw new Error('Failed to fetch listings');
        }

        const data = await response.json();
        setListings(prev => page === 1 ? data.listings : [...prev, ...data.listings]);
        setHasMore(data.listings.length === ITEMS_PER_PAGE);
      } catch (err) {
        setError(err instanceof Error ? err : new Error('Unknown error occurred'));
      } finally {
        setLoading(false);
      }
    };

    fetchListings();
  }, [page, options]);

  const loadMore = () => {
    if (!loading && hasMore) {
      setPage(prev => prev + 1);
    }
  };

  const refresh = () => {
    setPage(1);
    setListings([]);
  };

  return {
    listings,
    loading,
    error,
    hasMore,
    loadMore,
    refresh,
  };
};
