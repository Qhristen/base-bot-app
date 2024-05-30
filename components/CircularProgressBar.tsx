"use client";

import React from 'react';

interface CircularProgressBarProps {
  percentage: number;
  size?: number;
  strokeWidth?: number;
  color?: string;
}

const CircularProgressBar: React.FC<CircularProgressBarProps> = ({
  percentage,
  size = 100,
  strokeWidth = 10,
  color = 'white',
}) => {
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (percentage / 100) * circumference;

  return (
    <div className="relative w-full min-h-screen flex items-center stroke-primary justify-center">
      <svg
        width={size}
        height={size}
        className="animate-spin-slow"
        style={{ animation: 'spin 2s linear infinite' }}
      >
        <circle
          strokeWidth={strokeWidth}
          stroke="currentColor"
          className="text-gray-300"
          fill="transparent"
          r={radius}
          cx={size / 2}
          cy={size / 2}
        />
        <circle
          strokeWidth={strokeWidth}
          stroke={`var(--tw-color-${color})`}
          className={`text-${color} transition-all duration-300 ease-out`}
          fill="transparent"
          r={radius}
          cx={size / 2}
          cy={size / 2}
          strokeDasharray={circumference}
          strokeDashoffset={offset * 9}
        />
      </svg>
    </div>
  );
};

export default CircularProgressBar;
