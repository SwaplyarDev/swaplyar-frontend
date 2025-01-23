import type { Metadata } from 'next';

export interface MetadataOptions {
  title?: string;
  description?: string;
  keywords?: string[];
  canonical?: string;

  openGraph?: {
    title?: string;
    description?: string;
    images?: Array<{
      url: string;
      width?: number;
      height?: number;
      alt?: string;
    }>;
    siteName?: string;
  };

  twitter?: {
    card?: 'summary' | 'summary_large_image';
    title?: string;
    description?: string;
    images?: string[];
    creator?: string;
    site?: string;
  };

  robots?: {
    index?: boolean;
    follow?: boolean;
    noarchive?: boolean;
    nosnippet?: boolean;
  };
}

export function generateMetadata(options: MetadataOptions = {}): Metadata {
  const { title, description } = options;

  return {
    // Title configuration with fallback
    title: title || undefined,
    description: description || undefined,
  };
}

export default function SEO(props: MetadataOptions) {
  return null; // Metadata generator, renders nothing
}
