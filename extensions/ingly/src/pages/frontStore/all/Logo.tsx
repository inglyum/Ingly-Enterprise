import React from 'react';

/**
 * Override del logo storefront con il marchio INGLY Design (monocromatico).
 * Stesso areaId/name del Logo del core ('headerMiddleCenter' / 'Logo'), quindi
 * lo sostituisce. Se in Admin (SETTING → Store) viene caricato un logo, quello
 * ha la precedenza; altrimenti si mostra l'emblema INGLY qui sotto.
 */
interface LogoProps {
  setting?: {
    logo?: string | null;
    logoWidth?: string | null;
    logoHeight?: string | null;
    storeName?: string | null;
  };
}

const MAX_LOGO_WIDTH = 768;

export default function Logo({ setting }: LogoProps) {
  const logo = setting?.logo;
  const storeName = setting?.storeName || 'Ingly Design';
  const imgWidth = Number(setting?.logoWidth) || undefined;
  const imgHeight = Number(setting?.logoHeight) || undefined;
  const requestWidth = imgWidth ? Math.min(imgWidth, MAX_LOGO_WIDTH) : 320;
  const optimizedSrc = logo
    ? `/images?src=${encodeURIComponent(logo)}&w=${requestWidth}&q=85&f=webp`
    : undefined;

  return (
    <div className="logo flex justify-center items-center">
      <a href="/" className="logo-icon" aria-label={`${storeName} – home`}>
        {optimizedSrc ? (
          <img
            src={optimizedSrc}
            alt={storeName}
            width={imgWidth}
            height={imgHeight}
            className="max-h-10 w-auto max-w-full"
          />
        ) : (
          // Emblema INGLY monocromatico (navy #14182B), lockup orizzontale.
          <svg
            viewBox="0 0 190 44"
            className="h-9 w-auto"
            role="img"
            aria-label="Ingly Design"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
          >
            {/* emblema: cerchio + pennino + riga */}
            <circle cx="22" cy="22" r="20" stroke="#14182B" strokeWidth="2.5" />
            {/* riga graduata (diagonale) */}
            <line x1="10" y1="30" x2="34" y2="14" stroke="#14182B" strokeWidth="2" />
            <line x1="14" y1="30" x2="14" y2="26" stroke="#14182B" strokeWidth="1.4" />
            <line x1="19" y1="26.5" x2="19" y2="22.5" stroke="#14182B" strokeWidth="1.4" />
            <line x1="24" y1="23" x2="24" y2="19" stroke="#14182B" strokeWidth="1.4" />
            <line x1="29" y1="19.5" x2="29" y2="15.5" stroke="#14182B" strokeWidth="1.4" />
            {/* pennino */}
            <path
              d="M25 12 L33 20 L27 22 L23 18 Z"
              fill="#14182B"
            />
            <circle cx="25.5" cy="17.5" r="1.4" fill="#F2C21A" />
            {/* wordmark */}
            <text
              x="50"
              y="26"
              fontFamily="Arial, Helvetica, sans-serif"
              fontSize="22"
              fontWeight="800"
              letterSpacing="1.5"
              fill="#14182B"
            >
              INGLY
            </text>
            <text
              x="51"
              y="38"
              fontFamily="Arial, Helvetica, sans-serif"
              fontSize="8.5"
              fontWeight="600"
              letterSpacing="4"
              fill="#14182B"
            >
              DESIGN
            </text>
          </svg>
        )}
      </a>
    </div>
  );
}

export const layout = {
  areaId: 'headerMiddleCenter',
  sortOrder: 10
};

export const query = `
  query query {
    setting {
      logo
      logoWidth
      logoHeight
      storeName
    }
  }
`;
