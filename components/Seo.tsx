import React from 'react';
import { Helmet } from 'react-helmet-async';

interface SeoProps {
  title: string;
  description: string;
  canonical: string;
  image?: string;
  schemaMarkup?: Record<string, unknown> | Array<Record<string, unknown>>;
}

export const Seo: React.FC<SeoProps> = ({
  title,
  description,
  canonical,
  image,
  schemaMarkup,
}) => {
  const socialImage = image || new URL('/favicon-48x48.png', canonical).toString();

  return (
    <Helmet>
      <title>{title}</title>
      <meta name="description" content={description} />
      <link rel="canonical" href={canonical} />

      <meta property="og:type" content="website" />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:url" content={canonical} />
      <meta property="og:image" content={socialImage} />

      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={socialImage} />

      {schemaMarkup && (
        <script type="application/ld+json">{JSON.stringify(schemaMarkup)}</script>
      )}
    </Helmet>
  );
};

export default Seo;