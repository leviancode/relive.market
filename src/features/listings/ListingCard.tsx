import { Card } from '@telegram-apps/telegram-ui';
import Link from 'next/link';
import Image from 'next/image';
import { Heart, MapPin } from 'lucide-react';
import { useTranslations } from 'next-intl';
import { classNames } from '@/utils/classNames';
import { Listing } from '@/types/listing';

interface ListingCardProps {
  id: string;
  imageUrl: string;
  title: string;
  price: number;
  location: string;
  isFavorite?: boolean;
  onToggleFavorite?: () => void;
}

export const ListingCard = ({
  id,
  imageUrl,
  title,
  price,
  location,
  isFavorite = false,
  onToggleFavorite,
}: ListingCardProps) => {
  const t = useTranslations('listing');

  return (
    <Link href={`/listing/${id}`} passHref>
      <Card
        style={{ padding: 12 }}
        className="relative flex flex-col rounded-2xl shadow-sm bg-white"
      >
        <div className="relative w-full aspect-square rounded-xl overflow-hidden">
          <Image
            src={imageUrl}
            alt={title}
            fill
            className="object-cover"
          />
          {onToggleFavorite && (
            <button
              type="button"
              onClick={(e) => {
                e.preventDefault();
                onToggleFavorite();
              }}
              className="absolute top-2 right-2 bg-white/80 rounded-full p-1"
            >
              <Heart
                size={20}
                className={classNames('text-gray-500', isFavorite && 'fill-red-500 text-red-500')}
              />
            </button>
          )}
        </div>

        <div className="mt-3">
          <h3 className="text-sm font-medium truncate">{title}</h3>
          <p className="text-sm font-semibold mt-1">${price}</p>
          <div className="flex items-center gap-1 text-xs text-gray-500 mt-1">
            <MapPin size={12} />
            <span className="truncate">{location}</span>
          </div>
        </div>
      </Card>
    </Link>
  );
};