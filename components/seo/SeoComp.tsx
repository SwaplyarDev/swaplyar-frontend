import type { Metadata, Viewport } from 'next';

export interface SEOProps {
  title: string;
  description: string;
  canonical?: string;
  openGraph?: {
    title?: string;
    description?: string;
    url?: string;
    siteName?: string;
    images?: Array<{
      url: string;
      width?: number;
      height?: number;
      alt?: string;
    }>;
    type?: 'website' | 'article' | 'product';
    publishedTime?: string;
    authors?: string[];
  };
  twitter?: {
    card?: 'summary' | 'summary_large_image' | 'app' | 'player';
    title?: string;
    description?: string;
    images?: string[];
    creator?: string;
    site?: string;
  };
  keywords?: string[];
}

export function constructMetadata({
  title,
  description,
  canonical = '',
  openGraph = {},
  twitter = {},
  keywords = [],
}: SEOProps): Metadata {
  //const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://example.com'

  //En un futuro cuando ya existan las keywords, el canonical, opengraph y twittercards descomentar esto

  return {
    title,
    description,
    //keywords,
    //metadataBase: new URL(baseUrl),
    //alternates: {
    //  canonical: canonical || baseUrl
    //},

    //openGraph: {
    //  title: openGraph.title || title,
    //  description: openGraph.description || description,
    //  url: openGraph.url || canonical || baseUrl,
    //  siteName: openGraph.siteName || 'Your Site Name',
    //  images: openGraph.images || []
    //},
    //twitter: {
    //  card: twitter.card || 'summary_large_image',
    //  title: twitter.title || title,
    //  description: twitter.description || description,
    //  images: twitter.images || []
    //}
  };
}

//export function constructViewport(): Viewport {
//  return {
//    themeColor: 'black',
//    width: 'device-width',
//    initialScale: 1,
//    maximumScale: 1,
//    userScalable: false,
//  };
//}
