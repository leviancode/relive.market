'use client';

import { useTranslations } from 'next-intl';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { Button, IconButton, Input, Text } from '@telegram-apps/telegram-ui';
import { Plus, User } from 'lucide-react';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '@/lib/firebase';
import { ListingCard } from './ListingCard';
import { Listing } from '@/types/listing';
import { EmptyState } from '@/components/ui/EmptyState';

export default function ListingsPage() {
  const [listings, setListings] = useState<Listing[]>([]);
  const [search, setSearch] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);
  const router = useRouter();
  const t = useTranslations('listings');

  useEffect(() => {
    async function fetchListings() {
      try {
        console.log('[Listings] Fetching listings from Firestore...');
        const collectionName = 'listings';
        const querySnapshot = await getDocs(collection(db, collectionName));
        
        console.log('[Listings] Raw Firestore response:', {
          empty: querySnapshot.empty,
          size: querySnapshot.size,
          docs: querySnapshot.docs.map(doc => ({
            id: doc.id,
            exists: doc.exists(),
            data: doc.data()
          }))
        });

        const fetchedListings = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        })) as Listing[];

        console.log('[Listings] Processed listings:', fetchedListings);
        setListings(fetchedListings);
      } catch (error) {
        console.error('[Listings] Failed to fetch listings:', error);
        setError(error instanceof Error ? error : new Error(String(error)));
      } finally {
        setLoading(false);
      }
    }

    fetchListings();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-[#f9f9f9]">
        <div className="p-4 text-center">
          <Text weight="2" size={16}>
            {t('loading')}
          </Text>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-[#f9f9f9]">
        <div className="p-4 text-center">
          <Text weight="2" size={16} className="text-red-500">
            {t('error')}
          </Text>
          <Text size={14} className="mt-2 text-gray-500">
            {error.message}
          </Text>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#f9f9f9]">
      <div className="p-4 pb-20 relative">
        {/* Header */}
        <div className="flex justify-between items-center mb-4">
          <Text weight="2" size={20}>
            Relive.Market
          </Text>
          <Link href="/profile">
            <User size={24} />
          </Link>
        </div>

        {/* Search */}
        <Input
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder={t('searchPlaceholder')}
          className="mb-4"
        />

        {/* Listings or Empty State */}
        {listings.length === 0 ? (
          <div className="pt-20">
            <EmptyState
              title={t('emptyTitle')}
              description={t('emptyDescription')}
            />
          </div>
        ) : (
          <div className="grid grid-cols-2 gap-4">
            {listings
              .filter((l) => l.title.toLowerCase().includes(search.toLowerCase()))
              .map((listing) => (
                <ListingCard
                  key={listing.id}
                  id={listing.id}
                  title={listing.title}
                  price={listing.price}
                  imageUrl={listing.images?.[0] || '/placeholder.jpg'}
                  location={listing.location?.city || 'Unknown'}
                />
              ))}
          </div>
        )}

        {/* FAB */}
        <button
          className="fixed bottom-5 right-5 bg-blue-600 hover:bg-blue-700 text-white p-4 rounded-full shadow-md"
          onClick={() => router.push('/new')}
        >
          <Plus size={24} />
        </button>
      </div>
    </div>
  );
}
