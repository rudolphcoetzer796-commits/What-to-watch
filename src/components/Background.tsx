"use client";

import React from 'react';
import styles from './Background.module.css';

const Background = () => {
  return (
    <div className={styles.container}>
      <div className={styles.bgBlack} />
      <div className={styles.driftContainer}>
        <div className={styles.gradient1} />
        <div className={styles.gradient2} />
        <div className={styles.gradient3} />
      </div>
    </div>
  );
};

export default Background;
