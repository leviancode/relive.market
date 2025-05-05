'use client';

import { useEffect, useState } from 'react';
import { seedDevDatabase } from '@/scripts/seedListings';

export default function DevSeedPage() {
    const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        async function seed() {
            try {
                setStatus('loading');
                await seedDevDatabase();
                setStatus('success');
            } catch (err) {
                console.error('Failed to seed database:', err);
                setError(err instanceof Error ? err.message : 'Unknown error occurred');
                setStatus('error');
            }
        }

        seed();
    }, []);

    return (
        <div className="p-6 text-center">
            <h1 className="text-xl font-bold">
                {status === 'loading' && '🚀 Seeding Firestore...'}
                {status === 'success' && '✅ Seeding completed!'}
                {status === 'error' && '❌ Seeding failed!'}
                {status === 'idle' && 'Initializing...'}
            </h1>
            {status === 'loading' && (
                <p className="text-gray-500 mt-2">Check your Firebase dev console.</p>
            )}
            {status === 'success' && (
                <>
                    <p className="text-green-500 mt-2">Database has been seeded successfully!</p>
                    <p className="text-sm text-gray-400 mt-1">
                        You can now view listings in Firebase console or in your app UI.
                    </p>
                </>
            )}
            {status === 'error' && (
                <p className="text-red-500 mt-2">{error}</p>
            )}
        </div>
    );
}