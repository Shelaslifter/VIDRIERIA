// @ts-check
import { defineConfig } from 'astro/config';

import tailwindcss from '@tailwindcss/vite';

// https://astro.build/config
export default defineConfig({
  site: 'https://deltalum.vercel.app',
  image: {
    domains: ['images.unsplash.com', 'fimxtttwucdrqptkhknm.supabase.co'],
  },
  vite: {
    plugins: [tailwindcss()]
  }
});
