"use client";

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { MediaItem, getTrendingSeries } from '@/lib/tmdb';
import Card from '@/components/Card';
import Modal from '@/components/Modal';
import styles from '../GridPage.module.css';

export default function SeriesPage() {
    const [items, setItems] = useState<MediaItem[]>([]);
    const [page, setPage] = useState(1);
    const [loading, setLoading] = useState(false);
    const [selectedItem, setSelectedItem] = useState<MediaItem | null>(null);

    const fetchMore = async () => {
        setLoading(true);
        try {
            const newItems = await getTrendingSeries(page);
            setItems(prev => [...prev, ...newItems]);
            setPage(prev => prev + 1);
        } catch (error) {
            console.error('Failed to fetch series:', error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchMore();
    }, []);

    return (
        <div className={styles.container}>
            <header className={styles.header}>
                <Link href="/" className={styles.backLink}>
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <line x1="19" y1="12" x2="5" y2="12"></line>
                        <polyline points="12 19 5 12 12 5"></polyline>
                    </svg>
                </Link>
                <h1 className={styles.title}>All Series</h1>
            </header>

            <div className={styles.grid}>
                {items.map((item) => (
                    <Card key={`${item.id}-${item.title}`} item={item} onClick={setSelectedItem} />
                ))}
            </div>

            <div className={styles.loadMore}>
                <button
                    onClick={fetchMore}
                    disabled={loading}
                    className={styles.loadMoreButton}
                >
                    {loading ? 'Loading...' : 'Load More'}
                </button>
            </div>

            {selectedItem && (
                <Modal
                    item={selectedItem}
                    onClose={() => setSelectedItem(null)}
                />
            )}
        </div>
    );
}
