"use client";

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { MediaItem, getTrendingMovies, getTrendingSeries } from '@/lib/tmdb';
import Section from '@/components/Section';
import Modal from '@/components/Modal';
import styles from './Home.module.css';

export default function Home() {
  const [selectedItem, setSelectedItem] = useState<MediaItem | null>(null);
  const [movies, setMovies] = useState<MediaItem[]>([]);
  const [series, setSeries] = useState<MediaItem[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [moviesData, seriesData] = await Promise.all([
          getTrendingMovies(),
          getTrendingSeries()
        ]);
        setMovies(moviesData);
        setSeries(seriesData);
      } catch (error) {
        console.error('Failed to fetch media:', error);
      }
    };
    fetchData();
  }, []);

  return (
    <div className={styles.container}>
      {/* Header */}
      <header className={styles.header}>
        <div className={styles.logoWrapper}>
          <Image
            src="/logo.png"
            alt="Must watch Logo"
            fill
            className={styles.logoImage}
          />
        </div>
        <h1 className={styles.title}>
          Must watch
        </h1>
      </header>

      {/* Content */}
      <div className={styles.content}>
        {movies.length > 0 && (
          <Section
            title="Latest Movies (Hollywood & UK)"
            items={movies}
            onItemClick={setSelectedItem}
            seeMoreLink="/movies"
          />
        )}

        {series.length > 0 && (
          <Section
            title="Latest Series (Hollywood & UK)"
            items={series}
            onItemClick={setSelectedItem}
            seeMoreLink="/series"
          />
        )}
      </div>

      {/* Modal */}
      {selectedItem && (
        <Modal
          item={selectedItem}
          onClose={() => setSelectedItem(null)}
        />
      )}
    </div>
  );
}
