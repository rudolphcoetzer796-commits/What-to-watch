import React from 'react';
import Image from 'next/image';
import { MediaItem } from '@/lib/tmdb';
import styles from './Card.module.css';

interface CardProps {
    item: MediaItem;
    onClick: (item: MediaItem) => void;
}

const Card: React.FC<CardProps> = ({ item, onClick }) => {
    return (
        <div
            className={styles.cardWrapper}
            onClick={() => onClick(item)}
        >
            <div className={styles.cardInner}>
                <Image
                    src={item.posterUrl}
                    alt={item.title}
                    fill
                    className={styles.posterImage}
                    sizes="(max-width: 768px) 150px, 200px"
                />

                {/* Glass Overlay on Hover */}
                <div className={styles.overlay} />

                <div className={styles.info}>
                    <h3 className={styles.title}>{item.title}</h3>
                    <p className={styles.year}>{item.year}</p>
                </div>
            </div>
        </div>
    );
};

export default Card;
