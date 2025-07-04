import React from 'react';
import { FadeLoader } from 'react-spinners';
import styles from './FadeLoader.module.css';

const FadeLoaderComponent = ({
  size = 26,
  color = '#3b82f6',
  loading = true,
  speedMultiplier = 1,
  margin = 4,
  height = 15,
  width = 5,
  radius = 7
}) => {
  return (
    <div className={styles.container}>
      <FadeLoader
        color={color}
        loading={loading}
        cssOverride={{
          margin: `${margin}px`,
        }}
        height={height}
        width={width}
        radius={radius}
        speedMultiplier={speedMultiplier}
        aria-label="Loading Spinner"
        data-testid="fade-loader"
      />
      {loading && <p className={styles.text}>Loading...</p>}
    </div>
  );
};

export default FadeLoaderComponent;