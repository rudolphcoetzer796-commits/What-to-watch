import React, { useRef } from 'react';
import Link from 'next/link';
import Card from './Card';
import { MediaItem } from '@/lib/tmdb';
import styles from './Section.module.css';

interface SectionProps {
    title: string;
    items: MediaItem[];
    onItemClick: (item: MediaItem) => void;
    seeMoreLink?: string;
}

const Section: React.FC<SectionProps> = ({ title, items, onItemClick, seeMoreLink }) => {
    const scrollContainerRef = useRef<HTMLDivElement>(null);

    return (
        <section className={styles.section}>
            <h2 className={styles.title}>
                {title}
            </h2>

            <div
                ref={scrollContainerRef}
                className={styles.scrollContainer}
            >
                {items.map((item) => (
                    <Card key={item.id} item={item} onClick={onItemClick} />
                ))}

                {seeMoreLink && (
                    <Link href={seeMoreLink} className={styles.seeMoreCard}>
                        <span className={styles.seeMoreIcon}>→</span>
                        <span className={styles.seeMoreText}>See All</span>
                    </Link>
                )}

                {/* Spacer for end of list */}
                <div className={styles.spacer} />
            </div>
        </section>
    );
};

export default Section;
