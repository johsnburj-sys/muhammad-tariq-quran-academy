import React from 'react';

/**
 * Open Holy Quran with subtle Islamic geometric star accent (Rub el Hizb)
 * Refined line art with balanced proportions and delicate gold ornament
 */
export const QuranQualificationIcon: React.FC<{ className?: string }> = ({
  className = 'w-7 h-7',
}) => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
    stroke="currentColor"
    strokeWidth="1.75"
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden="true"
  >
    {/* Open Quran pages on rehal curve */}
    <path d="M2 6C3.8 4.7 6.5 4.5 9 5.3C10.5 5.8 11.5 6.7 12 7.5C12.5 6.7 13.5 5.8 15 5.3C17.5 4.5 20.2 4.7 22 6V19C20.2 17.7 17.5 17.5 15 18.3C13.5 18.8 12.5 19.7 12 20.5C11.5 19.7 10.5 18.8 9 18.3C6.5 17.5 3.8 17.7 2 19V6Z" />
    <path d="M12 7.5V20.5" />
    {/* Scripture lines */}
    <path d="M5.5 9.5C7 9.1 8.5 9.2 9.5 9.7" strokeWidth="1.25" strokeOpacity="0.75" />
    <path d="M5.5 12.5C7 12.1 8.5 12.2 9.5 12.7" strokeWidth="1.25" strokeOpacity="0.75" />
    <path d="M5.5 15.5C7 15.1 8.5 15.2 9.5 15.7" strokeWidth="1.25" strokeOpacity="0.75" />
    <path d="M14.5 9.7C15.5 9.2 17 9.1 18.5 9.5" strokeWidth="1.25" strokeOpacity="0.75" />
    <path d="M14.5 12.7C15.5 12.2 17 12.1 18.5 12.5" strokeWidth="1.25" strokeOpacity="0.75" />
    <path d="M14.5 15.7C15.5 15.2 17 15.1 18.5 15.5" strokeWidth="1.25" strokeOpacity="0.75" />
    {/* Subtle 8-pointed Islamic geometric star accent hovering at top center */}
    <path
      d="M12 1.5L12.7 2.8L14 3.5L12.7 4.2L12 5.5L11.3 4.2L10 3.5L11.3 2.8L12 1.5Z"
      fill="#F59E0B"
      stroke="#D97706"
      strokeWidth="0.8"
    />
  </svg>
);

/**
 * Professional Teaching Experience & Credential Certificate Icon with Checkmark
 * Balanced outline design with matching stroke weight and refined gold seal
 */
export const TeachingExperienceIcon: React.FC<{ className?: string }> = ({
  className = 'w-7 h-7',
}) => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
    stroke="currentColor"
    strokeWidth="1.75"
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden="true"
  >
    {/* Certificate Parchment frame */}
    <rect x="3" y="3" width="18" height="15" rx="2" />
    {/* Certificate credential line details */}
    <path d="M6.5 7H12.5" strokeWidth="1.5" strokeOpacity="0.8" />
    <path d="M6.5 10H14.5" strokeWidth="1.5" strokeOpacity="0.8" />
    <path d="M6.5 13H10.5" strokeWidth="1.5" strokeOpacity="0.8" />
    {/* Certified Experience Ribbon & Seal */}
    <circle cx="16.5" cy="15.5" r="3.75" fill="#FEF3C7" stroke="#D97706" strokeWidth="1.25" />
    {/* Verified checkmark inside gold seal */}
    <path
      d="M15 15.5L16.2 16.7L18.2 14.5"
      stroke="#064E3B"
      strokeWidth="1.6"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    {/* Ribbon tails beneath seal */}
    <path
      d="M15 19.25L15.4 21.5L16.5 20.6L17.6 21.5L18 19.25"
      stroke="#D97706"
      strokeWidth="1.25"
      strokeLinejoin="round"
      fill="#F59E0B"
      fillOpacity="0.2"
    />
  </svg>
);
