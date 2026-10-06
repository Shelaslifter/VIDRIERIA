## Development

When starting the dev server, use background mode:

```
astro dev --background
```

Manage the background server with `astro dev stop`, `astro dev status`, and `astro dev logs`.

## Documentation

Full documentation: https://docs.astro.build

Consult these guides before working on related tasks:

- [Adding pages, dynamic routes, or middleware](https://docs.astro.build/en/guides/routing/)
- [Working with Astro components](https://docs.astro.build/en/basics/astro-components/)
- [Using React, Vue, Svelte, or other framework components](https://docs.astro.build/en/guides/framework-components/)
- [Adding or managing content](https://docs.astro.build/en/guides/content-collections/)
- [Adding styles or using Tailwind](https://docs.astro.build/en/guides/styling/)
- [Supporting multiple languages](https://docs.astro.build/en/guides/internationalization/)


Actúa como un Desarrollador Frontend Senior experto en Astro, Tailwind CSS y TypeScript. 

Tu tarea es construir la plantilla de una landing page moderna, ultrarrápida y de alta conversión para "VIDRIERIA", un negocio físico especializado en vidrio templado y aluminio. 

**REGLAS DE ENTORNO:**
1. Trabaja exclusivamente en la rama `feature/plantilla-antigravity`. No hagas commits directos a `main`.
2. Utiliza la estructura de Astro (`src/pages`, `src/components`, `src/layouts`).
3. Usa Tailwind CSS para todo el estilo. No uses CSS puro a menos que sea estrictamente necesario.
4. Utiliza TypeScript de forma estricta para definir props de componentes (interfaces).

**GUÍA DE DISEÑO (UI/UX):**
- El diseño debe transmitir limpieza, elegancia y modernidad (reflejando la naturaleza del cristal).
- Utiliza efectos de "Glassmorphism" (fondos semitransparentes con desenfoque/blur) en barras de navegación, tarjetas o modales.
- Colores sugeridos: Tonos neutros (blancos, grises claros, negro asfalto) con acentos en azul acero o cian sutil para botones e íconos.
- 100% Mobile-first y responsivo.

**ARQUITECTURA DE COMPONENTES A CREAR:**

1. **Layout Principal (`Layout.astro`):** 
   Configura el esqueleto de la página con metadatos optimizados para SEO local ("Vidrios y Aluminio en [Ciudad]").

2. **Navbar (`Navbar.astro`):**
   Navegación sticky con glassmorphism, logotipo a la izquierda y enlaces a las secciones principales. Debe incluir un menú hamburguesa para móviles.

3. **Hero Section (`Hero.astro`):**
   Pantalla completa. Imagen de fondo de alta calidad (un trabajo elegante de cancelería o fachada de cristal) oscurecida sutilmente. Un titular principal de alto impacto, subtítulo descriptivo, y un Call to Action (botón) primario grande que diga "Cotizar mi proyecto".

4. **Sección de Servicios (`Services.astro`):**
   Grid de 3 columnas (apilables en móvil) usando tarjetas (Cards) con íconos para:
   - *Fabricación:* "Diseño y manufactura a medida."
   - *Instalación:* "Proceso en sitio con altos estándares de seguridad."
   - *Mantenimiento:* "Reparaciones, ajustes de cancelería y sellado."

5. **Catálogo de Trabajos (`Gallery.astro`):**
   Una cuadrícula de imágenes para mostrar proyectos anteriores. Implementa un sistema de filtros visuales simple con categorías: "Vidrio Templado", "Ventanas", "Domos", "Barandales".

6. **Cotizador / Contacto (`Contact.astro`):**
   Un formulario limpio y minimalista. Pide Nombre, Servicio de interés y Mensaje. 

7. **Botón Flotante de WhatsApp:**
   Un componente global fijo en la esquina inferior derecha que lleve directo a un chat de WhatsApp para conversión rápida.

Comienza creando el `Layout.astro`, luego los componentes modulares en la carpeta `src/components`, y finalmente intégralos todos en `src/pages/index.astro`. Avísame cuando termines la estructura base.