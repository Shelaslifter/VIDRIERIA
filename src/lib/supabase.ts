import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.PUBLIC_SUPABASE_URL || 'https://fimxtttwucdrqptkhknm.supabase.co';
const supabaseAnonKey = import.meta.env.PUBLIC_SUPABASE_ANON_KEY || 'sb_publishable__sKmXYcNjUdjplSDUpWieQ_5OaUKzR1';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

export interface ProjectItem {
  id?: number | string;
  category: string;
  image: string;
  images?: string[];
  title: string;
  description?: string;
  specs?: string;
  dimensions?: string;
  created_at?: string;
}

const META_DELIMITER = '\n__META__:';

/**
 * Empaqueta ficha técnica + medidas + galería múltiple dentro del campo `specs`
 * para mantener compatibilidad total con la tabla `projects` de Supabase sin requerir migraciones SQL.
 */
export function encodeProjectSpecs(
  specs: string,
  dimensions?: string,
  images?: string[]
): string {
  const cleanSpecs = (specs || 'Vidrio Templado y Aluminio').trim();
  const cleanDims = (dimensions || '').trim();
  const cleanImages = Array.isArray(images) ? images.filter(Boolean) : [];

  if (!cleanDims && cleanImages.length <= 1) {
    return cleanSpecs;
  }

  const metaPayload = JSON.stringify({
    dimensions: cleanDims || undefined,
    images: cleanImages.length > 0 ? cleanImages : undefined,
  });

  return `${cleanSpecs}${META_DELIMITER}${metaPayload}`;
}

/**
 * Normaliza un registro de proyecto (proveniente de Supabase o de portfolio.json)
 * extrayendo `specs`, `dimensions` y el arreglo `images`.
 */
export function normalizeProject(raw: any): ProjectItem {
  let rawSpecs: string = raw?.specs || 'Vidrio de Seguridad • Herrajes Premium • Instalación Garantizada';
  let extractedDimensions: string | undefined = raw?.dimensions;
  let extractedImages: string[] | undefined = Array.isArray(raw?.images) ? raw.images : undefined;

  if (typeof rawSpecs === 'string' && rawSpecs.includes(META_DELIMITER)) {
    const [visibleSpecs, jsonPart] = rawSpecs.split(META_DELIMITER);
    rawSpecs = visibleSpecs.trim();
    if (jsonPart) {
      try {
        const parsed = JSON.parse(jsonPart);
        if (parsed.dimensions && !extractedDimensions) {
          extractedDimensions = parsed.dimensions;
        }
        if (Array.isArray(parsed.images) && parsed.images.length > 0 && !extractedImages) {
          extractedImages = parsed.images;
        }
      } catch {
        // Ignorar si el bloque JSON no es válido
      }
    }
  }

  const primaryImage = raw?.image || (extractedImages && extractedImages[0]) || '';
  const allImages = extractedImages && extractedImages.length > 0
    ? Array.from(new Set([primaryImage, ...extractedImages].filter(Boolean)))
    : (primaryImage ? [primaryImage] : []);

  return {
    id: raw?.id,
    category: raw?.category || 'Vidrio Templado',
    image: primaryImage,
    images: allImages,
    title: raw?.title || 'Proyecto Deltalum',
    description: raw?.description || 'Proyecto diseñado y fabricado con cristales templados y cancelería de aluminio de alta resistencia.',
    specs: rawSpecs,
    dimensions: extractedDimensions || 'Fabricación a medida exacta en obra',
    created_at: raw?.created_at,
  };
}
