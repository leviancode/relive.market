'use client';

import { useState } from 'react';
import { 
  AppRoot, 
  Button, 
  Cell, 
  IconButton, 
  Input, 
  List,
} from '@telegram-apps/telegram-ui';
import Image from 'next/image';
import { Page } from '@/components/Page';
import { 
  PlusIcon, 
  UserIcon, 
  MagnifyingGlassIcon,
  FunnelIcon,
} from '@heroicons/react/24/outline';

interface ListingItem {
  id: string;
  title: string;
  price: number;
  btcPrice: number;
  location: string;
  image: string;
}

const SAMPLE_ITEMS: ListingItem[] = [
  {
    id: '1',
    title: 'Motorcycle Helmet',
    price: 40,
    btcPrice: 0.0012,
    location: 'Canggu',
    image: '/images/helmet.jpg',
  },
  {
    id: '2',
    title: 'Yoga Mat',
    price: 15,
    btcPrice: 0.0004,
    location: 'Canggu',
    image: '/images/yoga-mat.jpg',
  },
  {
    id: '3',
    title: 'Surfboard',
    price: 120,
    btcPrice: 0.0037,
    location: 'Canggu',
    image: '/images/surfboard.jpg',
  },
  {
    id: '4',
    title: 'Nightstand',
    price: 30,
    btcPrice: 0.0009,
    location: 'Canggu',
    image: '/images/nightstand.jpg',
  },
];

export default function Home() {
  const [searchQuery, setSearchQuery] = useState('');

  return (
    <Page>
      <div className="flex items-center justify-between px-4 py-3">
        <h1 className="text-xl font-bold">Relive Market</h1>
        <IconButton onClick={() => {}}>
          <UserIcon className="h-6 w-6" />
        </IconButton>
      </div>

      <div className="px-4 py-2">
        <div className="relative flex items-center">
          <Input
            className="w-full pr-12"
            placeholder="Search"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            before={<MagnifyingGlassIcon className="w-5 h-5 text-gray-400" />}
          />
          <IconButton className="absolute right-2">
            <FunnelIcon className="w-5 h-5" />
          </IconButton>
        </div>
      </div>

      <List className="grid grid-cols-2 gap-4 p-4">
        {SAMPLE_ITEMS.map((item) => (
          <Cell
            key={item.id}
            className="flex flex-col rounded-xl overflow-hidden bg-gray-50"
          >
            <div className="aspect-square w-full bg-gray-100 rounded-t-xl overflow-hidden relative">
              <Image
                src={item.image}
                alt={item.title}
                fill
                className="object-cover"
              />
            </div>
            <div className="p-3">
              <h3 className="font-medium text-[#2C3639]">{item.title}</h3>
              <div className="flex items-center justify-between mt-1">
                <div className="text-sm">
                  <span className="font-semibold">${item.price}</span>
                  <span className="text-gray-500 ml-1">
                    or {item.btcPrice} BTC
                  </span>
                </div>
              </div>
              <div className="flex items-center mt-2">
                <svg
                  className="w-4 h-4 text-gray-500"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                  />
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                  />
                </svg>
                <span className="text-sm text-gray-500 ml-1">
                  {item.location}
                </span>
              </div>
            </div>
          </Cell>
        ))}
      </List>

      <Button
        className="fixed right-4 bottom-4 !rounded-full !w-14 !h-14 !p-0 flex items-center justify-center bg-[#A7B69D] hover:bg-[#96A58D]"
        onClick={() => {}}
      >
        <PlusIcon className="w-6 h-6 text-white" />
      </Button>
    </Page>
  );
}
