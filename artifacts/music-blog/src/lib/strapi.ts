export interface StrapiImage {
  data: {
    id: number;
    attributes: {
      url: string;
      alternativeText: string | null;
      formats: {
        thumbnail?: { url: string };
        small?: { url: string };
        medium?: { url: string };
        large?: { url: string };
      };
    };
  } | null;
}

export interface ArticleAttributes {
  title: string;
  slug: string;
  description?: string;
  content: string;
  publishedAt: string;
  cover: StrapiImage;
  author?: {
    data: {
      id: number;
      attributes: {
        name: string;
        avatar?: StrapiImage;
      };
    } | null;
  };
  category?: {
    data: {
      id: number;
      attributes: {
        name: string;
        slug: string;
      };
    } | null;
  };
}

export interface Article {
  id: number;
  attributes: ArticleAttributes;
}

export interface CategoryAttributes {
  name: string;
  slug: string;
  description?: string;
  articles?: {
    data: Article[];
  };
}

export interface Category {
  id: number;
  attributes: CategoryAttributes;
}

export interface AboutAttributes {
  title: string;
  content: string;
  cover?: StrapiImage;
}

export interface ListResponse<T> {
  data: T[];
  meta: {
    pagination: {
      page: number;
      pageSize: number;
      pageCount: number;
      total: number;
    };
  };
}

export interface SingleResponse<T> {
  data: T;
}

const BASE = import.meta.env.VITE_STRAPI_URL;

export async function strapiGet<T>(path: string, params: Record<string, string> = {}): Promise<T> {
  const url = new URL(`${BASE}/api${path}`);
  url.searchParams.set("populate", "*");
  Object.entries(params).forEach(([k, v]) => url.searchParams.set(k, v));
  
  const res = await fetch(url.toString());
  if (!res.ok) throw new Error(`Strapi error: ${res.status}`);
  return res.json();
}

export function getStrapiImageUrl(imageData: any): string | null {
  if (!imageData) return null;
  const url =
    imageData?.data?.attributes?.url ||
    imageData?.url ||
    imageData?.formats?.medium?.url ||
    imageData?.formats?.large?.url;
  
  if (!url) return null;
  return url.startsWith("http") ? url : `${BASE}${url}`;
}
