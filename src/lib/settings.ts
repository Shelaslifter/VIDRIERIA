// src/lib/settings.ts - Gestión centralizada de ajustes del sitio y personalización
import { supabase } from './supabase';
import contactDefaults from '../data/contact.json';

export interface SiteSettings {
  hero_bg: string;
  before_img: string;
  after_img: string;
  whatsapp_number: string;
  phone_display: string;
  email: string;
  address: string;
  city_state: string;
  map_embed_url: string;
}

export const DEFAULT_SETTINGS: SiteSettings = {
  hero_bg: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=2070&auto=format&fit=crop",
  before_img: "https://images.unsplash.com/photo-1505691938895-1758d7feb511?q=80&w=1600&auto=format&fit=crop",
  after_img: "https://images.unsplash.com/photo-1600566752355-35792bedcfea?q=80&w=1600&auto=format&fit=crop",
  whatsapp_number: contactDefaults.whatsappNumber,
  phone_display: contactDefaults.phoneDisplay,
  email: contactDefaults.email,
  address: contactDefaults.address,
  city_state: contactDefaults.cityState,
  map_embed_url: contactDefaults.mapEmbedUrl
};

// Variable de caché a nivel de módulo y marca de tiempo con TTL de 15 segundos
let settingsPromise: Promise<SiteSettings> | null = null;
let cacheTime = 0;
const CACHE_TTL_MS = 15000;

export async function getSiteSettings(forceRefresh = false): Promise<SiteSettings> {
  const now = Date.now();
  if (!forceRefresh && settingsPromise && (now - cacheTime < CACHE_TTL_MS)) {
    return settingsPromise;
  }

  cacheTime = now;
  settingsPromise = (async () => {
    try {
      const { data, error } = await supabase
        .from('site_settings')
        .select('key, value');

      if (error || !data || data.length === 0) {
        return { ...DEFAULT_SETTINGS };
      }

      const settingsMap: Record<string, string> = {};
      data.forEach((row: { key: string; value: string }) => {
        settingsMap[row.key] = row.value;
      });

      return {
        hero_bg: settingsMap.hero_bg || DEFAULT_SETTINGS.hero_bg,
        before_img: settingsMap.before_img || DEFAULT_SETTINGS.before_img,
        after_img: settingsMap.after_img || DEFAULT_SETTINGS.after_img,
        whatsapp_number: settingsMap.whatsapp_number || DEFAULT_SETTINGS.whatsapp_number,
        phone_display: settingsMap.phone_display || DEFAULT_SETTINGS.phone_display,
        email: settingsMap.email || DEFAULT_SETTINGS.email,
        address: settingsMap.address || DEFAULT_SETTINGS.address,
        city_state: settingsMap.city_state || DEFAULT_SETTINGS.city_state,
        map_embed_url: settingsMap.map_embed_url || DEFAULT_SETTINGS.map_embed_url
      };
    } catch (err) {
      return { ...DEFAULT_SETTINGS };
    }
  })();

  return settingsPromise;
}

export const getCachedSiteSettings = getSiteSettings;
