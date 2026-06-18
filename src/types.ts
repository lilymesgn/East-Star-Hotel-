/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export type Language = 'en' | 'am';

export interface Room {
  id: string;
  nameEn: string;
  nameAm: string;
  priceUSD: number;
  priceETB: number;
  descriptionEn: string;
  descriptionAm: string;
  amenitiesEn: string[];
  amenitiesAm: string[];
  maxGuests: number;
  bedTypeEn: string;
  bedTypeAm: string;
  sizeSqM: number;
  image: string;
  rating: number;
}

export interface Review {
  id: string;
  author: string;
  avatar?: string;
  locationEn: string;
  locationAm: string;
  rating: number;
  textEn: string;
  textAm: string;
  date: string;
}

export interface DiningItem {
  id: string;
  nameEn: string;
  nameAm: string;
  tagEn: string;
  tagAm: string;
  descriptionEn: string;
  descriptionAm: string;
  image: string;
  hours: string;
}

export interface BookingInquiry {
  id: string;
  guestName: string;
  email: string;
  phone: string;
  checkIn: string;
  checkOut: string;
  roomId: string;
  roomNameEn: string;
  guestsCount: number;
  notes?: string;
  status: 'Pending' | 'Confirmed' | 'Cancelled' | 'CheckedIn' | 'CheckedOut';
  dateSubmitted: string;
  isManual?: boolean;
}

export interface HotelInfo {
  nameEn: string;
  nameAm: string;
  taglineEn: string;
  taglineAm: string;
  phone1: string;
  phone2: string;
  locationEn: string;
  locationAm: string;
  addressEn: string;
  addressAm: string;
}

export interface HeaderConfig {
  logoTextEn: string;
  logoTextAm: string;
  buttonTextEn: string;
  buttonTextAm: string;
  menuItems: Array<{ id: string; nameEn: string; nameAm: string; path: string }>;
}

export interface HeroConfig {
  image: string;
  headlineEn: string;
  headlineAm: string;
  subtextEn: string;
  subtextAm: string;
  ctaTextEn: string;
  ctaTextAm: string;
}

export interface AboutConfig {
  paragraph1En: string;
  paragraph1Am: string;
  paragraph2En: string;
  paragraph2Am: string;
  missionEn: string;
  missionAm: string;
  exteriorPic: string;
  terracePic: string;
  staffInfoEn: string;
  staffInfoAm: string;
}

export interface FooterConfig {
  email: string;
  phone1: string;
  phone2: string;
  addressEn: string;
  addressAm: string;
  facebookUrl: string;
  instagramUrl: string;
  telegramUrl: string;
  copyrightEn: string;
  copyrightAm: string;
}

export interface ContactMapConfig {
  mapEmbedUrl: string;
  contactEmail: string;
}

export interface SeoConfig {
  siteTitle: string;
  metaDescription: string;
  seoTags: string;
}

export interface PromotionOffer {
  id: string;
  titleEn: string;
  titleAm: string;
  descriptionEn: string;
  descriptionAm: string;
  discountBadgeEn: string;
  discountBadgeAm: string;
  image: string;
  code: string;
  isActive: boolean;
}

export interface MediaImage {
  id: string;
  url: string;
  category: string; // 'Rooms' | 'Dining' | 'Hero' | 'About' | 'Logo' | 'Other'
  name: string;
}
