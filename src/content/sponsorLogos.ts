// Public assets are served at root; use /logo/sponsor-logos/ paths (see vite publicDir)
const sponsorLogoNames = [
  "cncf-white.svg",
  "Open-SSF-Logo-horizontal-colorwhite.svg"
];

export const sponsorLogos: string[] = sponsorLogoNames.map(
  (name) => `/logo/sponsor-logos/${name}`
);
