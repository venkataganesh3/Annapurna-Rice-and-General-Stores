import React from 'react';
import { PulseLoader } from 'react-spinners';

const LoadingSpinner = () => {
  return (
    <div style={{
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      height: '100vh'
    }}>
      <PulseLoader color="#36d7b7" size={30} />
    </div>
  );
};

export default LoadingSpinner;
