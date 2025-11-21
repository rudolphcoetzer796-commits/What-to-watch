"use client";

import React, { useEffect, useState } from 'react';
import { MediaItem, getMediaDetails } from '@/lib/tmdb';
import styles from './Modal.module.css';

interface ModalProps {
    item: MediaItem;
    onClose: () => void;
}

const Modal: React.FC<ModalProps> = ({ item, onClose }) => {
    const [details, setDetails] = useState<{ trailerUrl: string; cast: string[]; watchProviders?: any[] } | null>(null);

    // Fetch details on mount
    useEffect(() => {
        const fetchDetails = async () => {
            try {
                const data = await getMediaDetails(item.id, item.type);
                setDetails(data);
            } catch (error) {
                console.error('Failed to fetch details:', error);
            }
        };
        fetchDetails();
    }, [item.id, item.type]);

    // Close on escape key
    useEffect(() => {
        const handleEsc = (e: KeyboardEvent) => {
            if (e.key === 'Escape') onClose();
        };
        window.addEventListener('keydown', handleEsc);
        return () => window.removeEventListener('keydown', handleEsc);
    }, [onClose]);

    // Prevent body scroll when modal is open
    useEffect(() => {
        document.body.style.overflow = 'hidden';
        return () => {
            document.body.style.overflow = 'unset';
        };
    }, []);

    return (
        <div className={styles.overlay}>
            {/* Backdrop */}
            <div
                className={styles.backdrop}
                onClick={onClose}
            />

            {/* Modal Content */}
            <div className={styles.modalContent}>

                {/* Close Button */}
                <button
                    onClick={onClose}
                    className={styles.closeButton}
                >
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <line x1="18" y1="6" x2="6" y2="18"></line>
                        <line x1="6" y1="6" x2="18" y2="18"></line>
                    </svg>
                </button>

                {/* Hero Section */}
                <div className={styles.hero}>
                    <div
                        className={styles.heroBackground}
                        style={{ backgroundImage: `url(${item.backdropUrl})` }}
                    />
                    <div className={styles.heroGradient} />

                    <div className={styles.heroContent}>
                        <h2 className={styles.title}>{item.title}</h2>
                        <div className={styles.meta}>
                            <span>{item.year}</span>
                            <span className={styles.typeBadge}>{item.type}</span>
                        </div>
                        <p className={styles.description}>
                            {item.description}
                        </p>
                    </div>
                </div>

                {/* Details Section */}
                <div className={styles.detailsSection}>

                    {/* Trailer */}
                    {details?.trailerUrl && (
                        <div>
                            <h3 className={styles.sectionTitle}>Official Trailer</h3>
                            <div className={styles.trailerWrapper}>
                                <iframe
                                    src={`${details.trailerUrl}?autoplay=0&modestbranding=1&rel=0`}
                                    title={`${item.title} Trailer`}
                                    className={styles.iframe}
                                    allowFullScreen
                                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                />
                            </div>
                        </div>
                    )}

                    {/* Cast */}
                    {details?.cast && details.cast.length > 0 && (
                        <div>
                            <h3 className={styles.sectionTitle}>Cast</h3>
                            <div className={styles.castGrid}>
                                {details.cast.map((actor, index) => (
                                    <div key={index} className={styles.castCard}>
                                        <p className={styles.actorName}>{actor}</p>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}

                    {/* Watch Providers */}
                    {details?.watchProviders && details.watchProviders.length > 0 && (
                        <div>
                            <h3 className={styles.sectionTitle}>Where to Watch</h3>
                            <div className={styles.providersGrid}>
                                {details.watchProviders.map((provider: any, index: number) => (
                                    <div key={index} className={styles.providerCard}>
                                        <img
                                            src={provider.logoUrl}
                                            alt={provider.name}
                                            className={styles.providerLogo}
                                        />
                                        <span className={styles.providerName}>{provider.name}</span>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}

                </div>
            </div>
        </div>
    );
};

export default Modal;
