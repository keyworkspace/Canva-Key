import { SiteConfig, ServiceItem, MenuItem, ProductItem, ProjectItem } from '../types';

export const DEFAULT_TEMPLATES: Record<string, SiteConfig> = {
  business: {
    id: 'business',
    category: 'business',
    brandName: 'Vanguardia Consultoría',
    tagline: 'Estrategia, Transformación e Impacto Corporativo',
    description: 'Acompañamos a directores y fundadores a estructurar modelos de negocio escalables, optimizar operaciones y acelerar el crecimiento con métricas claras.',
    theme: 'navy',
    font: 'outfit',
    contactEmail: 'contacto@vanguardiaconsultoria.es',
    contactPhone: '+34 912 345 678',
    address: 'Paseo de la Castellana 95, Madrid',
    showTestimonials: true,
    showStats: true,
    showContactForm: true,
    ctaText: 'Agendar Consulta Estratégica',
  },
  restaurant: {
    id: 'restaurant',
    category: 'restaurant',
    brandName: 'Aura Cocina de Autor',
    tagline: 'Gastronomía Contemporánea con Raíces Mediterráneas',
    description: 'Una experiencia culinaria inmersiva guiada por el producto de temporada, el respeto al productor local y la técnica de vanguardia.',
    theme: 'burgundy',
    font: 'playfair',
    contactEmail: 'reservas@aurarestaurante.com',
    contactPhone: '+34 934 876 543',
    address: 'Calle Provenza 214, Barcelona',
    showTestimonials: true,
    showStats: true,
    showContactForm: true,
    ctaText: 'Reservar una Mesa',
  },
  creative: {
    id: 'creative',
    category: 'creative',
    brandName: 'Atelier 9 Arquitectura',
    tagline: 'Espacios que Inspiran, Respetan la Luz y Perduran',
    description: 'Estudio de arquitectura y diseño espacial enfocado en viviendas contemporáneas, rehabilitación patrimonial e interiores bioclimáticos.',
    theme: 'slate',
    font: 'outfit',
    contactEmail: 'hola@atelier9.design',
    contactPhone: '+34 963 112 233',
    address: 'Carrer de la Pau 18, Valencia',
    showTestimonials: true,
    showStats: true,
    showContactForm: true,
    ctaText: 'Iniciar un Proyecto',
  },
  shop: {
    id: 'shop',
    category: 'shop',
    brandName: 'Origen Tostadores',
    tagline: 'Café de Especialidad Tostado en Lotes Pequeños',
    description: 'Seleccionamos microlotes de fincas regenerativas con trazabilidad absoluta y notas sensoriales excepcionales. Tueste fresco cada semana.',
    theme: 'forest',
    font: 'jakarta',
    contactEmail: 'pedidos@origencafe.com',
    contactPhone: '+34 910 887 654',
    address: 'Calle del Pez 28, Malasaña, Madrid',
    showTestimonials: true,
    showStats: true,
    showContactForm: true,
    ctaText: 'Comprar Café Fresco',
  },
};

export const BUSINESS_SERVICES: ServiceItem[] = [
  {
    id: 's1',
    title: 'Estrategia y Diagnóstico Corporativo',
    summary: 'Análisis profundo de la cadena de valor, rentabilidad por unidad y posicionamiento competitivo en el mercado.',
    detail: 'Evaluamos los 5 pilares operativos de su organización para detectar cuellos de botella e ineficiencias financieras. Entregable en 4 semanas con hoja de ruta ejecutable.',
    duration: '4 a 6 semanas',
    highlight: '+35% Margen promedio'
  },
  {
    id: 's2',
    title: 'Transformación Digital y Procesos',
    summary: 'Automatización de flujos de trabajo clave, integración de CRM/ERP y modernización de infraestructura.',
    detail: 'Reemplazamos tareas manuales repetitivas mediante arquitecturas modernas en la nube, capacitando a su equipo sin fricciones.',
    duration: '8 a 12 semanas',
    highlight: '-40% Tiempo administrativo'
  },
  {
    id: 's3',
    title: 'Expansión Internacional y Nuevos Mercados',
    summary: 'Planificación de entrada a mercados europeos y latinoamericanos con cumplimiento normativo y fiscal.',
    detail: 'Estudio de factibilidad comercial, red de partners locales y mitigación de riesgos cambiarios y aduaneros.',
    duration: 'Trimestral',
    highlight: 'Presencia en 7 países'
  },
  {
    id: 's4',
    title: 'Finanzas Corporativas y M&A',
    summary: 'Preparación para rondas de capital, valoración de empresas y acompañamiento en compraventas estratégicas.',
    detail: 'Modelado financiero riguroso, confección de data room para inversores y negociación técnica hasta el cierre.',
    duration: 'A medida',
    highlight: '€48M Asesorados'
  },
];

export const RESTAURANT_MENU: MenuItem[] = [
  {
    id: 'm1',
    name: 'Carpaccio de Vambas Rojas y Cítricos Fermentados',
    description: 'Gamba roja de lonja, emulsión de yuzu casero, brotes de hinojo marino y sal ahumada de Formentera.',
    price: '24,00 €',
    category: 'entrantes',
    badge: 'Firma de la Casa'
  },
  {
    id: 'm2',
    name: 'Tartar de Boletus y Yema Curada en Miso',
    description: 'Boletus edulis silvestres, avellana tostada del Baix Camp, yema de corral curada 48h y crujiente de pan sardo.',
    price: '21,50 €',
    category: 'entrantes'
  },
  {
    id: 'm3',
    name: 'Lubina Salvaje a la Brasa de Encina',
    description: 'Lomo de lubina de anzuelo con jugo reducido de sus espinas, pil-pil de ajo negro y alcachofas confitadas.',
    price: '34,00 €',
    category: 'principales',
    badge: 'Temporada'
  },
  {
    id: 'm4',
    name: 'Solomillo de Vaca Madurada 60 Días',
    description: 'Corte seleccionado de raza rubia gallega, parmentier trufado de patata ratte y reducción de Priorat.',
    price: '38,50 €',
    category: 'principales'
  },
  {
    id: 'm5',
    name: 'Cacao Criollo, Algarroba y Aceite Picual',
    description: 'Ganache de chocolate 74% de origen, cremoso de algarroba tostada, escamas de flor de sal y virgen extra de Jaén.',
    price: '13,50 €',
    category: 'postres',
    badge: 'Recomendado'
  },
  {
    id: 'm6',
    name: 'Selección de Quesos Artesanales de Pastoreo',
    description: 'Cuatro afinaciones de pequeños elaboradores con pan de centeno madre y confitura de higos negros.',
    price: '16,00 €',
    category: 'postres'
  },
  {
    id: 'm7',
    name: 'Clos Ancestral Tinto 2021 (D.O. Penedès)',
    description: 'Variedades autóctonas recuperadas Moneu y Tempranillo. Fruta roja madura y taninos sedosos.',
    price: '42,00 €',
    category: 'vinos'
  },
  {
    id: 'm8',
    name: 'Albariño Sobre Lías Finca Monte Alto 2022',
    description: 'D.O. Rías Baixas. 12 meses de crianza sobre lías finas. Frescura salina y gran longitud.',
    price: '39,00 €',
    category: 'vinos'
  },
];

export const CREATIVE_PROJECTS: ProjectItem[] = [
  {
    id: 'p1',
    title: 'Casa Duna — Residencia en la Costa Blanca',
    location: 'Jávea, Alicante',
    year: '2025',
    category: 'Residencial',
    description: 'Vivienda unifamiliar orientada al suroeste, construida con hormigón blanco abujardado, piedra seca local y celosías cerámicas para control bioclimático pasivo.',
    area: '420 m²',
    image: '/src/assets/images/hero_architecture_studio_1790642674150.jpg'
  },
  {
    id: 'p2',
    title: 'Estudio Central & Galería Polivalente',
    location: 'Ruzafa, Valencia',
    year: '2024',
    category: 'Cultural & Mixto',
    description: 'Reconversión de un antiguo taller de ebanistería del siglo XIX en espacio híbrido para exhibición y co-creación.',
    area: '280 m²',
    image: '/src/assets/images/hero_architecture_studio_1790642674150.jpg'
  },
  {
    id: 'p3',
    title: 'Pabellón del Valle — Casa de Huéspedes',
    location: 'Valle de Jalón',
    year: '2023',
    category: 'Hospitalidad',
    description: 'Intervención mínima entre bancales de almendros centenarios, mimetizada en la topografía con muros de tapial y cubierta ajardinada.',
    area: '165 m²',
    image: '/src/assets/images/hero_architecture_studio_1790642674150.jpg'
  },
];

export const SHOP_PRODUCTS: ProductItem[] = [
  {
    id: 'c1',
    name: 'Etiopía Yirgacheffe — Microlote Kochere',
    origin: 'Kochere, Gedeo, Etiopía (2.100 msnm)',
    notes: 'Jazmín blanco, bergamota, melocotón dulce y acidez cítrica brillante.',
    price: 14.50,
    weight: '250g',
    rating: 4.9,
    image: '/src/assets/images/product_boutique_coffee_1790642704462.jpg'
  },
  {
    id: 'c2',
    name: 'Colombia Geisha — Finca El Paraíso',
    origin: 'Cauca, Colombia (1.950 msnm)',
    notes: 'Flor de azahar, maracuyá, té negro y miel de azahar.',
    price: 19.80,
    weight: '250g',
    rating: 5.0,
    image: '/src/assets/images/product_boutique_coffee_1790642704462.jpg'
  },
  {
    id: 'c3',
    name: 'Guatemala Huehuetenango — La Providencia',
    origin: 'Huehuetenango, Guatemala (1.750 msnm)',
    notes: 'Chocolate con leche 55%, avellana tostada, manzana roja y cuerpo sedoso.',
    price: 12.90,
    weight: '250g',
    rating: 4.8,
    image: '/src/assets/images/product_boutique_coffee_1790642704462.jpg'
  },
  {
    id: 'c4',
    name: 'Pack Degustación Origen (3 x 250g)',
    origin: 'Trilogía de orígenes selectos de cosecha reciente',
    notes: 'Incluye Etiopía, Colombia y Guatemala en tueste filtro o espresso a elección.',
    price: 39.00,
    weight: '750g',
    rating: 4.9,
    image: '/src/assets/images/product_boutique_coffee_1790642704462.jpg'
  }
];

export const IMAGES = {
  architecture: '/src/assets/images/hero_architecture_studio_1790642674150.jpg',
  restaurant: '/src/assets/images/hero_gourmet_restaurant_1790642684264.jpg',
  business: '/src/assets/images/hero_business_workspace_1790642694992.jpg',
  coffee: '/src/assets/images/product_boutique_coffee_1790642704462.jpg',
};
