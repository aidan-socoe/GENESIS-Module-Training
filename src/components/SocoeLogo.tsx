import React from 'react';

interface SocoeLogoProps {
  className?: string;
  showTagline?: boolean;
  size?: 'sm' | 'md' | 'lg';
}

export const SocoeLogo: React.FC<SocoeLogoProps> = ({
  className = '',
  showTagline = false,
  size = 'md',
}) => {
  const sizeClasses = {
    sm: 'h-6 sm:h-7',
    md: 'h-8 sm:h-9',
    lg: 'h-10 sm:h-12',
  };

  return (
    <div className={`flex flex-col select-none ${className}`}>
      {/* Uploaded SOCOE brand image */}
      <div className="flex items-center">
        <img
          id="socoe-logo-img"
          src="/socoe-white-r-1.png"
          alt="SOCOE - Architects of Tomorrow"
          className={`w-auto ${sizeClasses[size]} object-contain drop-shadow-[0_0_16px_rgba(0,194,203,0.3)] transition-all`}
          referrerPolicy="no-referrer"
          loading="eager"
        />
      </div>

      {showTagline && (
        <span className="text-[10px] uppercase font-semibold text-cyan-400 tracking-[0.25em] mt-1 pl-1">
          Architects of Tomorrow
        </span>
      )}
    </div>
  );
};
