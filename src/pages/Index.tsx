import React from 'react';

interface BackgroundPathsProps {
  className?: string;
}

export const BackgroundPaths: React.FC<BackgroundPathsProps> = ({ className = "" }) => {
  return (
    <div className={`absolute inset-0 overflow-hidden ${className}`}>
      <svg
        className="absolute inset-0 w-full h-full"
        xmlns="http://www.w3.org/2000/svg"
        preserveAspectRatio="none"
        viewBox="0 0 1200 800"
      >
        <defs>
          <linearGradient id="path-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="hsl(var(--primary))" stopOpacity="0.1" />
            <stop offset="50%" stopColor="hsl(var(--primary-glow))" stopOpacity="0.05" />
            <stop offset="100%" stopColor="hsl(var(--primary))" stopOpacity="0.1" />
          </linearGradient>
        </defs>
        
        {/* Curved paths */}
        <path
          d="M0,300 Q300,100 600,200 T1200,150"
          stroke="url(#path-gradient)"
          strokeWidth="2"
          fill="none"
          className="animate-pulse"
        />
        <path
          d="M0,400 Q400,200 800,300 T1200,250"
          stroke="url(#path-gradient)"
          strokeWidth="1.5"
          fill="none"
          className="animate-pulse"
          style={{ animationDelay: '1s' }}
        />
        <path
          d="M0,500 Q200,300 600,400 T1200,350"
          stroke="url(#path-gradient)"
          strokeWidth="1"
          fill="none"
          className="animate-pulse"
          style={{ animationDelay: '2s' }}
        />
        
        {/* Dots along paths */}
        <circle cx="200" cy="250" r="3" fill="hsl(var(--primary))" fillOpacity="0.3" className="animate-ping" />
        <circle cx="500" cy="180" r="2" fill="hsl(var(--primary-glow))" fillOpacity="0.4" className="animate-ping" style={{ animationDelay: '0.5s' }} />
        <circle cx="800" cy="200" r="2.5" fill="hsl(var(--primary))" fillOpacity="0.3" className="animate-ping" style={{ animationDelay: '1.5s' }} />
        <circle cx="300" cy="350" r="2" fill="hsl(var(--primary-glow))" fillOpacity="0.4" className="animate-ping" style={{ animationDelay: '2.5s' }} />
        <circle cx="700" cy="320" r="3" fill="hsl(var(--primary))" fillOpacity="0.3" className="animate-ping" style={{ animationDelay: '3s' }} />
      </svg>
    </div>
  );
};