export type SiteCategory = 'business' | 'restaurant' | 'creative' | 'shop';

export type ViewportMode = 'desktop' | 'tablet' | 'mobile';

export type ColorTheme = 'slate' | 'navy' | 'forest' | 'terracotta' | 'burgundy';

export type FontChoice = 'outfit' | 'playfair' | 'jakarta';

export interface SiteConfig {
  id: string;
  category: SiteCategory;
  brandName: string;
  tagline: string;
  description: string;
  theme: ColorTheme;
  font: FontChoice;
  contactEmail: string;
  contactPhone: string;
  address: string;
  showTestimonials: boolean;
  showStats: boolean;
  showContactForm: boolean;
  ctaText: string;
}

export interface ServiceItem {
  id: string;
  title: string;
  summary: string;
  detail: string;
  duration?: string;
  highlight?: string;
}

export interface MenuItem {
  id: string;
  name: string;
  description: string;
  price: string;
  category: 'entrantes' | 'principales' | 'postres' | 'vinos';
  badge?: string;
}

export interface ProductItem {
  id: string;
  name: string;
  origin: string;
  notes: string;
  price: number;
  weight: string;
  rating: number;
  image: string;
}

export interface ProjectItem {
  id: string;
  title: string;
  location: string;
  year: string;
  category: string;
  description: string;
  area: string;
  image: string;
}

export interface CartItem {
  product: ProductItem;
  quantity: number;
}
