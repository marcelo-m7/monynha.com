const defaultSiteUrl = 'https://monynha.com';

export const siteUrl = (import.meta.env.VITE_SITE_URL || defaultSiteUrl).replace(/\/$/, '');

export const getCanonicalUrl = (pathname: string): string => {
  const normalizedPath = pathname.startsWith('/') ? pathname : `/${pathname}`;
  return `${siteUrl}${normalizedPath}`;
};

export const getSiteAssetUrl = (assetPath: string): string => {
  const normalizedPath = assetPath.startsWith('/') ? assetPath : `/${assetPath}`;
  return `${siteUrl}${normalizedPath}`;
};