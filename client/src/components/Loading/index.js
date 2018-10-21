import React from 'react';

const LoadingSpinner = ({ invertColors }) => (
  <div className={invertColors ? "LoadingSpinner--invert" : "LoadingSpinner"}></div>
);

export default LoadingSpinner;