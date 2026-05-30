import React, { useState, useEffect } from "react";
import { 
  motion, 
  AnimatePresence 
} from "motion/react";
import { 
  Smartphone, 
  Tablet, 
  Laptop, 
  Plus, 
  Trash, 
  Settings, 
  ArrowUp, 
  ArrowDown, 
  Copy, 
  RotateCcw, 
  Download, 
  Upload, 
  X, 
  Check, 
  Eye, 
  Undo, 
  Sparkles, 
  Phone, 
  Mail, 
  MapPin, 
  List, 
  Image, 
  Columns, 
  Grid, 
  FileText, 
  Layout, 
  ChevronDown, 
  ChevronUp, 
  Sliders, 
  Award, 
  Shield, 
  Compass, 
  Heart, 
  Info, 
  HelpCircle, 
  Send,
  ExternalLink,
  MousePointerClick,
  Video,
  Play,
  Lock,
  Unlock,
  UserCheck
} from "lucide-react";

// ==========================================
// TYPE DEFINITIONS FOR DIVI STYLE PAGE BUILDER
// ==========================================

export interface BuilderModule {
  id: string;
  type: "heading" | "text" | "image" | "button" | "divider" | "icon" | "accordion" | "grid-packages" | "contact-form" | "testimonials" | "video";
  content: {
    text?: string;
    tag?: "h1" | "h2" | "h3" | "h4" | "h5" | "h6" | "p";
    src?: string;
    alt?: string;
    link?: string;
    iconName?: string;
    dividerStyle?: "solid" | "dashed" | "dotted";
    dividerThickness?: number;
    items?: { title: string; desc: string; open?: boolean }[]; // For Accordion
    placeholderField?: string; // For form custom fields
    videoUrl?: string; // For video embed
    videoType?: "youtube" | "vimeo" | "custom";
    videoTitle?: string;
  };
  style: {
    textColor?: string;
    bgColor?: string;
    fontSize?: string; // Slider value or text style 
    fontWeight?: "font-light" | "font-normal" | "font-medium" | "font-semibold" | "font-bold" | "font-black" | string;
    fontFamily?: "sans" | "display" | "serif" | "mono";
    letterSpacing?: "tracking-tighter" | "tracking-tight" | "tracking-normal" | "tracking-wide" | "tracking-widest" | string;
    lineHeight?: "leading-none" | "leading-tight" | "leading-normal" | "leading-relaxed" | "leading-loose" | string;
    paddingY?: number; // spacing top/bottom in px
    paddingX?: number; // spacing left/right in px
    marginY?: number;
    marginBottom?: number;
    alignment?: "text-left" | "text-center" | "text-right" | "text-justify";
    borderRadius?: number;
    shadow?: "none" | "shadow-sm" | "shadow" | "shadow-md" | "shadow-lg" | "shadow-xl" | "shadow-2xl";
    borderWidth?: number;
    borderColor?: string;
  };
}

export interface BuilderColumn {
  id: string;
  span: number; // e.g. 12 = full, 6 = half, 4 = third, 3 = fourth
  bgColor?: string;
  padding?: number;
  borderRadius?: number;
  borderColor?: string;
  borderWidth?: number;
  modules: BuilderModule[];
}

export interface BuilderRow {
  id: string;
  columnsCount: 1 | 2 | 3 | 4 | number;
  gap: "gap-2" | "gap-4" | "gap-6" | "gap-8" | "gap-12" | string;
  bgColor?: string;
  paddingY?: number;
  columns: BuilderColumn[];
}

export interface BuilderSection {
  id: string;
  name: string;
  type: "custom" | "hero" | "packages" | "contact";
  bgColor: string;
  bgImage?: string;
  bgGradient?: string;
  paddingY: number; // spacing top/bottom in px
  textColor?: string;
  rows: BuilderRow[];
}

export interface VisualBuilderProps {
  onBack: () => void;
  language: "es" | "en";
  whatsappNumber?: string;
  destinationFormEmail?: string;
  packages: any[];
}

// Predefined available fonts for Elementor/Divi theme style
const FONT_FAMILIES = [
  { value: "sans", name: "Inter (Moderna Sans)" },
  { value: "display", name: "Space Grotesk (Tech Headings)" },
  { value: "serif", name: "Playfair Display (Editorial Serif)" },
  { value: "mono", name: "JetBrains Mono (Developer Mono)" }
];

const WEIGHTS = [
  { value: "font-light", name: "Light (300)" },
  { value: "font-normal", name: "Regular (400)" },
  { value: "font-medium", name: "Medium (500)" },
  { value: "font-semibold", name: "Semi Bold (600)" },
  { value: "font-bold", name: "Bold (700)" },
  { value: "font-black", name: "Extra Black (900)" }
];

const ALIGNMENTS = [
  { value: "text-left", name: "Izquierda" },
  { value: "text-center", name: "Centro" },
  { value: "text-right", name: "Derecha" },
  { value: "text-justify", name: "Justificado" }
];

const SHADOWS = [
  { value: "none", name: "Sin sombra" },
  { value: "shadow-sm", name: "Subutil (Pequeña)" },
  { value: "shadow", name: "Normal" },
  { value: "shadow-md", name: "Mediana" },
  { value: "shadow-lg", name: "Grande" },
  { value: "shadow-xl", name: "Muy Grande" },
  { value: "shadow-2xl", name: "Sombra Divi Premium" }
];

const LETTER_SPACINGS = [
  { value: "tracking-tighter", name: "Muy Ajustado" },
  { value: "tracking-tight", name: "Ajustado" },
  { value: "tracking-normal", name: "Normal" },
  { value: "tracking-wide", name: "Espaciado (Ancho)" },
  { value: "tracking-widest", name: "Súper Espaciado" }
];

const LINE_HEIGHTS = [
  { value: "leading-none", name: "Compacto" },
  { value: "leading-tight", name: "Ajustado" },
  { value: "leading-normal", name: "Normal" },
  { value: "leading-relaxed", name: "Relajado (Web)" },
  { value: "leading-loose", name: "Espacioso" }
];

// Elegant Color Swatches matching Sisari design & Divi guidelines
const PRESET_COLORS = [
  "#e12d8a", // Sisari Pink
  "#f58220", // Sisari Orange
  "#2c2c2c", // Charcoal Dark
  "#4a5568", // Gray Darker
  "#718096", // Gray
  "#a0aec0", // Gray Lighter
  "#edf2f7", // Soft White Background
  "#f7fafc", // Cool Slate background
  "#22c55e", // WhatsApp Green
  "#3b82f6", // Royal Blue
  "#e11d48", // Rose Red
  "#ffffff"  // Pure White
];

// ==========================================
// DEFAULT LAYOUT TEMPLATES PER PAGE
// ==========================================

const createDefaultLayoutHome = (): BuilderSection[] => [
  {
    id: "sec-hero-home",
    name: "Portada de Inicio (Bienvenida)",
    type: "hero",
    bgColor: "#1a1a1a",
    bgImage: "https://images.unsplash.com/photo-1526392060635-9d6019884377?auto=format&fit=crop&q=80&w=1600",
    paddingY: 130,
    textColor: "#ffffff",
    rows: [
      {
        id: "row-hero-home-1",
        columnsCount: 1,
        gap: "gap-6",
        columns: [
          {
            id: "col-hero-home-1-1",
            span: 12,
            modules: [
              {
                id: "mod-home-badge",
                type: "heading",
                content: {
                  text: "☀️ SISARI TRAVEL PERÚ - ENCUENTRA TU DESTINO",
                  tag: "h6"
                },
                style: {
                  textColor: "#f58220",
                  fontSize: "14px",
                  fontWeight: "font-black",
                  fontFamily: "mono",
                  letterSpacing: "tracking-widest",
                  alignment: "text-center",
                  marginBottom: 12
                }
              },
              {
                id: "mod-home-title",
                type: "heading",
                content: {
                  text: "VIVE LA MAGIA DEL ANDE Y AVENTURA INFINITA",
                  tag: "h1"
                },
                style: {
                  textColor: "#ffffff",
                  fontSize: "52px",
                  fontWeight: "font-black",
                  fontFamily: "display",
                  letterSpacing: "tracking-tight",
                  alignment: "text-center",
                  lineHeight: "leading-none",
                  marginBottom: 20
                }
              },
              {
                id: "mod-home-desc",
                type: "text",
                content: {
                  text: "Planifica con inteligencia y conéctate de manera auténtica con los secretos de Ayacucho, Cusco y el sur del Perú. Personaliza cada experiencia a tu ritmo físico."
                },
                style: {
                  textColor: "#f7fafc",
                  fontSize: "17px",
                  fontWeight: "font-light",
                  fontFamily: "sans",
                  alignment: "text-center",
                  lineHeight: "leading-relaxed",
                  marginBottom: 32,
                  paddingX: 50
                }
              },
              {
                id: "mod-home-btn",
                type: "button",
                content: {
                  text: "🚀 AGENDAR CONSULTA CON ASISTENTE IA",
                  link: "#asistente-ia"
                },
                style: {
                  textColor: "#ffffff",
                  bgColor: "#e12d8a",
                  fontWeight: "font-bold",
                  alignment: "text-center",
                  borderRadius: 32,
                  fontSize: "14px",
                  paddingX: 28,
                  paddingY: 15,
                  shadow: "shadow-2xl"
                }
              }
            ]
          }
        ]
      }
    ]
  },
  {
    id: "sec-home-why",
    name: "Coordenadas y Ventajas",
    type: "custom",
    bgColor: "#ffffff",
    paddingY: 70,
    rows: [
      {
        id: "row-home-why-title",
        columnsCount: 1,
        gap: "gap-2",
        columns: [
          {
            id: "col-home-why-title-1",
            span: 12,
            modules: [
              {
                id: "mod-home-why-sub",
                type: "heading",
                content: {
                  text: "EXPERIENCIA EXCLUSIVA",
                  tag: "h6"
                },
                style: {
                  textColor: "#e12d8a",
                  fontSize: "12px",
                  fontWeight: "font-bold",
                  fontFamily: "mono",
                  alignment: "text-center"
                }
              },
              {
                id: "mod-home-why-main",
                type: "heading",
                content: {
                  text: "¿Por qué los viajeros eligen Sisari?",
                  tag: "h2"
                },
                style: {
                  textColor: "#2c2c2c",
                  fontSize: "30px",
                  fontWeight: "font-black",
                  fontFamily: "display",
                  alignment: "text-center",
                  marginBottom: 32
                }
              }
            ]
          }
        ]
      }
    ]
  },
  {
    id: "sec-home-packages",
    name: "Nuestros Paquetes Recomendados",
    type: "packages",
    bgColor: "#ffffff",
    paddingY: 80,
    rows: [
      {
        id: "row-home-packages",
        columnsCount: 1,
        gap: "gap-4",
        columns: [
          {
            id: "col-home-pkg-1",
            span: 12,
            modules: [
              {
                id: "mod-home-pkg-tag",
                type: "heading",
                content: {
                  text: "RESERVAS CON GARANTÍA",
                  tag: "h6"
                },
                style: {
                  textColor: "#e12d8a",
                  fontSize: "12px",
                  fontWeight: "font-bold",
                  fontFamily: "mono",
                  alignment: "text-center"
                }
              },
              {
                id: "mod-home-pkg-title",
                type: "heading",
                content: {
                  text: "Últimas Ofertas y Paquetes de Temporada",
                  tag: "h2"
                },
                style: {
                  textColor: "#2c2c2c",
                  fontSize: "32px",
                  fontWeight: "font-bold",
                  fontFamily: "display",
                  alignment: "text-center",
                  marginBottom: 30
                }
              },
              {
                id: "mod-home-pkg-grid",
                type: "grid-packages",
                content: {},
                style: {
                  alignment: "text-center"
                }
              }
            ]
          }
        ]
      }
    ]
  }
];

const createDefaultLayoutNosotros = (): BuilderSection[] => [
  {
    id: "sec-nosotros-hero",
    name: "Banner Quiénes Somos (Nosotros)",
    type: "hero",
    bgColor: "#e12d8a",
    bgImage: "https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?auto=format&fit=crop&q=80&w=1600",
    paddingY: 100,
    textColor: "#ffffff",
    rows: [
      {
        id: "row-not-1",
        columnsCount: 1,
        gap: "gap-4",
        columns: [
          {
            id: "col-not-1-1",
            span: 12,
            modules: [
              {
                id: "mod-not-tag",
                type: "heading",
                content: {
                  text: "NUESTRA HISTORIA",
                  tag: "h6"
                },
                style: {
                  textColor: "#f58220",
                  fontSize: "13px",
                  fontWeight: "font-bold",
                  fontFamily: "mono",
                  alignment: "text-center"
                }
              },
              {
                id: "mod-not-title",
                type: "heading",
                content: {
                  text: "CONOCE EL EQUIPO DE SISARI TRAVEL",
                  tag: "h1"
                },
                style: {
                  textColor: "#ffffff",
                  fontSize: "44px",
                  fontWeight: "font-black",
                  fontFamily: "display",
                  alignment: "text-center",
                  marginBottom: 12
                }
              },
              {
                id: "mod-not-text",
                type: "text",
                content: {
                  text: "Somos guías locales y apasionados del folklore, arqueología y ecoturismo en el Perú. Fomentamos un turismo 100% sostenible y directo con las comunidades nativas y artesanos locales."
                },
                style: {
                  textColor: "#ffffff",
                  fontSize: "15px",
                  fontFamily: "sans",
                  alignment: "text-center",
                  lineHeight: "leading-relaxed"
                }
              }
            ]
          }
        ]
      }
    ]
  },
  {
    id: "sec-nosotros-logos",
    name: "Instituciones Asociadas (Logos Grid)",
    type: "custom",
    bgColor: "#f7fafc",
    paddingY: 60,
    rows: [
      {
        id: "row-not-logos-title",
        columnsCount: 1,
        gap: "gap-2",
        columns: [
          {
            id: "col-not-logo-col",
            span: 12,
            modules: [
              {
                id: "mod-logo-sub",
                type: "heading",
                content: {
                  text: "RESPALDO LOCAL",
                  tag: "h6"
                },
                style: {
                  textColor: "#e12d8a",
                  fontSize: "11px",
                  fontWeight: "font-bold",
                  fontFamily: "mono",
                  alignment: "text-center"
                }
              },
              {
                id: "mod-logo-main",
                type: "heading",
                content: {
                  text: "Entidades de las que Somos Miembro Oficial",
                  tag: "h3"
                },
                style: {
                  textColor: "#2d3748",
                  fontSize: "24px",
                  fontWeight: "font-bold",
                  fontFamily: "display",
                  alignment: "text-center",
                  marginBottom: 20
                }
              }
            ]
          }
        ]
      }
    ]
  }
];

const createDefaultLayoutLanding = (): BuilderSection[] => [
  {
    id: "sec-hero",
    name: "Banner Principal (Hero Header)",
    type: "hero",
    bgColor: "#2c2c2c",
    bgImage: "https://images.unsplash.com/photo-1584551246679-0daf3d275d0f?auto=format&fit=crop&q=80&w=1600",
    paddingY: 110,
    textColor: "#ffffff",
    rows: [
      {
        id: "row-hero-1",
        columnsCount: 1,
        gap: "gap-6",
        columns: [
          {
            id: "col-hero-1-1",
            span: 12,
            modules: [
              {
                id: "mod-hero-badge",
                type: "heading",
                content: {
                  text: "🌸 AGENCIA DE TURISMO CERTIFICADA EN AYACUCHO",
                  tag: "h6"
                },
                style: {
                  textColor: "#f58220",
                  fontSize: "14px",
                  fontWeight: "font-black",
                  fontFamily: "mono",
                  letterSpacing: "tracking-widest",
                  alignment: "text-center",
                  marginBottom: 12
                }
              },
              {
                id: "mod-hero-title",
                type: "heading",
                content: {
                  text: "DESCUBRE LA MAGIA DEL IMPERIO WARI Y MILLPU TURQUESA",
                  tag: "h1"
                },
                style: {
                  textColor: "#ffffff",
                  fontSize: "48px",
                  fontWeight: "font-black",
                  fontFamily: "display",
                  letterSpacing: "tracking-tight",
                  alignment: "text-center",
                  lineHeight: "leading-tight",
                  marginBottom: 16
                }
              },
              {
                id: "mod-hero-desc",
                type: "text",
                content: {
                  text: "Diseña tu viaje a medida con el constructor visual premium de Sisari Travel. Personaliza cada detalle de tu itinerario con nuestro exclusivo asistente inteligente en tiempo real."
                },
                style: {
                  textColor: "#edf2f7",
                  fontSize: "16px",
                  fontWeight: "font-light",
                  fontFamily: "sans",
                  alignment: "text-center",
                  lineHeight: "leading-relaxed",
                  marginBottom: 28,
                  paddingX: 30
                }
              },
              {
                id: "mod-hero-btn",
                type: "button",
                content: {
                  text: "⚡ EXPLORAR PAQUETES DE VIAJE",
                  link: "#paquetes"
                },
                style: {
                  textColor: "#ffffff",
                  bgColor: "#e12d8a",
                  fontWeight: "font-bold",
                  alignment: "text-center",
                  borderRadius: 30,
                  fontSize: "14px",
                  paddingX: 24,
                  paddingY: 14,
                  shadow: "shadow-lg"
                }
              }
            ]
          }
        ]
      }
    ]
  },
  {
    id: "sec-whyus",
    name: "Sección Nosotros (Iconos y Ventajas)",
    type: "custom",
    bgColor: "#ffffff",
    paddingY: 80,
    rows: [
      {
        id: "row-whyus-title",
        columnsCount: 1,
        gap: "gap-4",
        columns: [
          {
            id: "col-whyus-title-1",
            span: 12,
            modules: [
              {
                id: "mod-why-tag",
                type: "heading",
                content: {
                  text: "NUESTRAS COORDENADAS",
                  tag: "h6"
                },
                style: {
                  textColor: "#e12d8a",
                  fontSize: "12px",
                  fontWeight: "font-bold",
                  fontFamily: "mono",
                  letterSpacing: "tracking-widest",
                  alignment: "text-center"
                }
              },
              {
                id: "mod-why-title",
                type: "heading",
                content: {
                  text: "¿Por qué viajar con Sisari Travel?",
                  tag: "h2"
                },
                style: {
                  textColor: "#2c2c2c",
                  fontSize: "36px",
                  fontWeight: "font-black",
                  fontFamily: "display",
                  alignment: "text-center",
                  marginBottom: 8
                }
              },
              {
                id: "mod-why-divider",
                type: "divider",
                content: {
                  dividerStyle: "solid",
                  dividerThickness: 3
                },
                style: {
                  textColor: "#f58220",
                  alignment: "text-center",
                  paddingY: 10,
                  marginBottom: 28
                }
              }
            ]
          }
        ]
      },
      {
        id: "row-whyus-cards",
        columnsCount: 3,
        gap: "gap-8",
        columns: [
          {
            id: "col-whyus-card-1",
            span: 4,
            bgColor: "#edf2f7",
            borderRadius: 16,
            padding: 24,
            modules: [
              {
                id: "mod-card-icon-1",
                type: "icon",
                content: {
                  iconName: "Award",
                },
                style: {
                  textColor: "#e12d8a",
                  alignment: "text-left",
                  fontSize: "32px",
                  marginBottom: 12
                }
              },
              {
                id: "mod-card-title-1",
                type: "heading",
                content: {
                  text: "Operador Autorizado",
                  tag: "h4"
                },
                style: {
                  textColor: "#2c2c2c",
                  fontSize: "18px",
                  fontWeight: "font-bold",
                  fontFamily: "display"
                }
              },
              {
                id: "mod-card-text-1",
                type: "text",
                content: {
                  text: "Contamos con licencias locales y nacionales (MINCETUR). Garantía de seriedad y servicio certificado."
                },
                style: {
                  textColor: "#4a5568",
                  fontSize: "14px",
                  lineHeight: "leading-relaxed"
                }
              }
            ]
          },
          {
            id: "col-whyus-card-2",
            span: 4,
            bgColor: "#edf2f7",
            borderRadius: 16,
            padding: 24,
            modules: [
              {
                id: "mod-card-icon-2",
                type: "icon",
                content: {
                  iconName: "Shield",
                },
                style: {
                  textColor: "#f58220",
                  alignment: "text-left",
                  fontSize: "32px",
                  marginBottom: 12
                }
              },
              {
                id: "mod-card-title-2",
                type: "heading",
                content: {
                  text: "Viaje Seguro",
                  tag: "h4"
                },
                style: {
                  textColor: "#2c2c2c",
                  fontSize: "18px",
                  fontWeight: "font-bold",
                  fontFamily: "display"
                }
              },
              {
                id: "mod-card-text-2",
                type: "text",
                content: {
                  text: "Unidades modernas de transporte con conductores experimentados y SOAT turístico para tu tranquilidad."
                },
                style: {
                  textColor: "#4a5568",
                  fontSize: "14px",
                  lineHeight: "leading-relaxed"
                }
              }
            ]
          },
          {
            id: "col-whyus-card-3",
            span: 4,
            bgColor: "#edf2f7",
            borderRadius: 16,
            padding: 24,
            modules: [
              {
                id: "mod-card-icon-3",
                type: "icon",
                content: {
                  iconName: "Compass",
                },
                style: {
                  textColor: "#e12d8a",
                  alignment: "text-left",
                  fontSize: "32px",
                  marginBottom: 12
                }
              },
              {
                id: "mod-card-title-3",
                type: "heading",
                content: {
                  text: "Expertos Locales",
                  tag: "h4"
                },
                style: {
                  textColor: "#2c2c2c",
                  fontSize: "18px",
                  fontWeight: "font-bold",
                  fontFamily: "display"
                }
              },
              {
                id: "mod-card-text-3",
                type: "text",
                content: {
                  text: "Guías apasionados bilingües originarios de Ayacucho te revelarán los secretos ancestrales."
                },
                style: {
                  textColor: "#4a5568",
                  fontSize: "14px",
                  lineHeight: "leading-relaxed"
                }
              }
            ]
          }
        ]
      }
    ]
  },
  {
    id: "sec-packages",
    name: "Módulo De Catálogo de Paquetes",
    type: "packages",
    bgColor: "#f7fafc",
    paddingY: 90,
    rows: [
      {
        id: "row-pack-title",
        columnsCount: 1,
        gap: "gap-4",
        columns: [
          {
            id: "col-pack-title-1",
            span: 12,
            modules: [
              {
                id: "mod-pack-subtitle",
                type: "heading",
                content: {
                  text: "SÉ NUESTRO INVITADO",
                  tag: "h6"
                },
                style: {
                  textColor: "#f58220",
                  fontSize: "13px",
                  fontWeight: "font-black",
                  fontFamily: "mono",
                  letterSpacing: "tracking-widest",
                  alignment: "text-center"
                }
              },
              {
                id: "mod-pack-title",
                type: "heading",
                content: {
                  text: "Tours Destacados en Ayacucho",
                  tag: "h3"
                },
                style: {
                  textColor: "#2c2c2c",
                  fontSize: "32px",
                  fontWeight: "font-extrabold",
                  fontFamily: "display",
                  alignment: "text-center"
                }
              },
              {
                id: "mod-pack-desc",
                type: "text",
                content: {
                  text: "Haz clic en el botón de edición para cambiar los colores de las tarjetas o incrustar nuevos tours dinámicamente con un solo clic."
                },
                style: {
                  textColor: "#718096",
                  fontSize: "14px",
                  alignment: "text-center",
                  marginBottom: 32,
                  paddingX: 50
                }
              },
              {
                id: "mod-pack-widget",
                type: "grid-packages",
                content: {},
                style: {
                  borderRadius: 24,
                  shadow: "shadow-md",
                  paddingY: 10
                }
              }
            ]
          }
        ]
      }
    ]
  },
  {
    id: "sec-testimonials",
    name: "Comentarios de Clientes",
    type: "custom",
    bgColor: "#ffffff",
    paddingY: 80,
    rows: [
      {
        id: "row-testi-title",
        columnsCount: 1,
        gap: "gap-2",
        columns: [
          {
            id: "col-testi-title-1",
            span: 12,
            modules: [
              {
                id: "mod-testi-title",
                type: "heading",
                content: {
                  text: "Lo que dicen los viajeros felices",
                  tag: "h2"
                },
                style: {
                  textColor: "#2c2c2c",
                  fontSize: "30px",
                  fontWeight: "font-black",
                  fontFamily: "display",
                  alignment: "text-center",
                  marginBottom: 30
                }
              },
              {
                id: "mod-testi-render",
                type: "testimonials",
                content: {},
                style: {}
              }
            ]
          }
        ]
      }
    ]
  },
  {
    id: "sec-contacto",
    name: "Formulario de Reserva & Contacto",
    type: "contact",
    bgColor: "#2c2c2c",
    paddingY: 90,
    textColor: "#ffffff",
    rows: [
      {
        id: "row-cont-form",
        columnsCount: 2,
        gap: "gap-12",
        columns: [
          {
            id: "col-cont-left",
            span: 5,
            modules: [
              {
                id: "mod-cont-h",
                type: "heading",
                content: {
                  text: "¿Tienes dudas sobre Ayacucho?",
                  tag: "h3"
                },
                style: {
                  textColor: "#ffffff",
                  fontSize: "32px",
                  fontWeight: "font-black",
                  fontFamily: "display",
                  alignment: "text-left"
                }
              },
              {
                id: "mod-cont-p",
                type: "text",
                content: {
                  text: "Escríbenos directamente o chatea en tiempo real con un asesor. Estamos listos para diseñar una propuesta inolvidable para ti y tu familia."
                },
                style: {
                  textColor: "#a0aec0",
                  fontSize: "15px",
                  lineHeight: "leading-relaxed",
                  marginBottom: 24
                }
              },
              {
                id: "mod-cont-list",
                type: "text",
                content: {
                  text: "📍 Jirón Lima 140, 1ra Cuadra, Ayacucho, Perú\n📞 Central: +51 980 535 383\n✉️ Correo Oficial: reservas@sisaritravel.pe"
                },
                style: {
                  textColor: "#edf2f7",
                  fontSize: "14px",
                  fontFamily: "mono",
                  lineHeight: "leading-loose"
                }
              }
            ]
          },
          {
            id: "col-cont-right",
            span: 7,
            bgColor: "#ffffff",
            padding: 32,
            borderRadius: 24,
            modules: [
              {
                id: "mod-cont-form-widget",
                type: "contact-form",
                content: {},
                style: {}
              }
            ]
          }
        ]
      }
    ]
  }
];

export default function VisualBuilder({ onBack, language, whatsappNumber, destinationFormEmail, packages }: VisualBuilderProps) {
  const [activePage, setActivePage] = useState<"home" | "nosotros" | "landing">("home");
  const [viewport, setViewport] = useState<"desktop" | "tablet" | "mobile">("desktop");

  // Master states loaded dynamically per page
  const [sections, setSectionsInternal] = useState<BuilderSection[]>([]);

  // History states (Undo/Redo)
  const [sectionsHistory, setSectionsHistory] = useState<BuilderSection[][]>([]);
  const [historyPointer, setHistoryPointer] = useState<number>(-1);

  // Automatic saving states
  const [saveStatus, setSaveStatus] = useState<"saved" | "saving" | "waiting">("saved");
  const [lastSavedTime, setLastSavedTime] = useState<string>("");

  // Role permissions: admin (Super Admin), editor (Editor), marketing (Marketing), copywriter (Redactor)
  const [currentRole, setCurrentRole] = useState<"admin" | "editor" | "marketing" | "copywriter">("admin");

  // Preview Mode
  const [isPreviewMode, setIsPreviewMode] = useState<boolean>(false);

  // Synchronize layout depending on selected page with history initializing
  useEffect(() => {
    const cached = localStorage.getItem(`sisari_visual_builder_sections_${activePage}`);
    let initialSecs: BuilderSection[] = [];
    if (cached) {
      try {
        const parsed = JSON.parse(cached);
        if (Array.isArray(parsed) && parsed.length > 0) {
          initialSecs = parsed;
        }
      } catch (e) {
        console.error("Error loading cached layout for page:", activePage, e);
      }
    }

    if (initialSecs.length === 0) {
      if (activePage === "home") {
        initialSecs = createDefaultLayoutHome();
      } else if (activePage === "nosotros") {
        initialSecs = createDefaultLayoutNosotros();
      } else {
        initialSecs = createDefaultLayoutLanding();
      }
    }

    setSectionsInternal(initialSecs);
    setSectionsHistory([initialSecs]);
    setHistoryPointer(0);
    setSaveStatus("saved");
    
    // Set typical saved time on load
    const date = new Date();
    setLastSavedTime(date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }));
  }, [activePage]);

  // Wrap setSections calls with history recording & auto save indicator
  const setSections = (newSections: BuilderSection[] | ((prev: BuilderSection[]) => BuilderSection[])) => {
    setSectionsInternal(prev => {
      const resolved = typeof newSections === "function" ? newSections(prev) : newSections;
      
      // Update history stacks
      const nextHistory = sectionsHistory.slice(0, historyPointer + 1);
      nextHistory.push(resolved);
      setSectionsHistory(nextHistory);
      setHistoryPointer(nextHistory.length - 1);
      
      // Live Auto Save
      setSaveStatus("saving");
      localStorage.setItem(`sisari_visual_builder_sections_${activePage}`, JSON.stringify(resolved));
      setTimeout(() => {
        setSaveStatus("saved");
        const date = new Date();
        setLastSavedTime(date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' }));
      }, 700);

      return resolved;
    });
  };

  const handleUndo = () => {
    if (historyPointer > 0) {
      const prevIdx = historyPointer - 1;
      setHistoryPointer(prevIdx);
      setSectionsInternal(sectionsHistory[prevIdx]);
      localStorage.setItem(`sisari_visual_builder_sections_${activePage}`, JSON.stringify(sectionsHistory[prevIdx]));
      showToast(language === "es" ? "Deshacer cambio exitoso" : "Undo successful");
    }
  };

  const handleRedo = () => {
    if (historyPointer < sectionsHistory.length - 1) {
      const nextIdx = historyPointer + 1;
      setHistoryPointer(nextIdx);
      setSectionsInternal(sectionsHistory[nextIdx]);
      localStorage.setItem(`sisari_visual_builder_sections_${activePage}`, JSON.stringify(sectionsHistory[nextIdx]));
      showToast(language === "es" ? "Rehacer cambio exitoso" : "Redo successful");
    }
  };

  // Role based helper to check if a specific action or property is modification-unlocked
  const isFieldUnlocked = (fieldCategory: "content-text" | "content-media" | "content-links" | "content-layout" | "design" | "advanced") => {
    return true;
  };

  const [selectedElement, setSelectedElement] = useState<{
    type: "section" | "row" | "column" | "module";
    sectionId: string;
    rowId?: string;
    columnId?: string;
    moduleId?: string;
  } | null>(null);

  const [activeInspectorTab, setActiveInspectorTab] = useState<"content" | "design" | "advanced">("content");
  
  // Custom theme states to help build templates
  const [showAddSectionModal, setShowAddSectionModal] = useState(false);
  const [addSectionTargetIdx, setAddSectionTargetIdx] = useState<number | null>(null);
  
  // Toast notifications
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const showToast = (msg: string, type?: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3000);
  };

  const handleResetLayout = () => {
    if (window.confirm(language === "es" ? "¿Seguro que deseas reiniciar el diseño a la plantilla original de Sisari?" : "Are you sure you want to revert to the default template?")) {
      let resetLayout: BuilderSection[] = [];
      if (activePage === "home") {
        resetLayout = createDefaultLayoutHome();
      } else if (activePage === "nosotros") {
        resetLayout = createDefaultLayoutNosotros();
      } else {
        resetLayout = createDefaultLayoutLanding();
      }
      setSections(resetLayout);
      setSelectedElement(null);
      showToast(language === "es" ? "Diseño de plantilla restablecido exitosamente" : "Layout template successfully restored");
    }
  };

  const handleSave = () => {
    localStorage.setItem(`sisari_visual_builder_sections_${activePage}`, JSON.stringify(sections));
    showToast(language === "es" ? "¡Cambios guardados en memoria del Frontend!" : "Changes saved to frontend storage!");
  };

  const handleExport = () => {
    const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(sections, null, 2));
    const downloadAnchor = document.createElement('a');
    downloadAnchor.setAttribute("href", dataStr);
    downloadAnchor.setAttribute("download", `sisari_layout_${activePage}.json`);
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    downloadAnchor.remove();
    showToast(language === "es" ? "Diseño exportado con éxito en JSON" : "Layout exported as JSON file");
  };

  const handleImport = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      try {
        const imported = JSON.parse(event.target?.result as string);
        if (Array.isArray(imported)) {
          setSections(imported);
          setSelectedElement(null);
          showToast(language === "es" ? "Layout importado exitosamente" : "Layout imported successfully");
        } else {
          alert(language === "es" ? "El archivo no contiene un formato de Layout Divi válido." : "Invalid page builder layout file format.");
        }
      } catch(exception) {
        alert(language === "es" ? "Error al parsear el archivo JSON" : "Error parsing JSON file");
      }
    };
    reader.readAsText(file);
  };

  // Helper selectors
  const getSelectedObject = () => {
    if (!selectedElement) return null;
    const { type, sectionId, rowId, columnId, moduleId } = selectedElement;

    const sec = sections.find(s => s.id === sectionId);
    if (!sec) return null;
    if (type === "section") return sec;

    const row = sec.rows.find(r => r.id === rowId);
    if (!row) return null;
    if (type === "row") return row;

    const col = row.columns.find(c => c.id === columnId);
    if (!col) return null;
    if (type === "column") return col;

    const mod = col.modules.find(m => m.id === moduleId);
    if (!mod) return null;
    if (type === "module") return mod;

    return null;
  };

  // State update handler
  const updateSelectedObject = (updatedFields: any) => {
    if (!selectedElement) return;
    const { type, sectionId, rowId, columnId, moduleId } = selectedElement;

    setSections(prevSections => {
      return prevSections.map(sec => {
        if (sec.id !== sectionId) return sec;

        if (type === "section") {
          return { ...sec, ...updatedFields };
        }

        return {
          ...sec,
          rows: sec.rows.map(row => {
            if (row.id !== rowId) return row;

            if (type === "row") {
              return { ...row, ...updatedFields };
            }

            return {
              ...row,
              columns: row.columns.map(col => {
                if (col.id !== columnId) return col;

                if (type === "column") {
                  return { ...col, ...updatedFields };
                }

                return {
                  ...col,
                  modules: col.modules.map(mod => {
                    if (mod.id !== moduleId) return mod;
                    return { ...mod, ...updatedFields };
                  })
                };
              })
            };
          })
        };
      });
    });
  };

  // ==========================================
  // ELEMENT ACTIONS: ADD, DELETE, REORDER, COPY
  // ==========================================

  // REORDER SECTIONS
  const moveSection = (index: number, direction: "up" | "down") => {
    const nextIdx = index + (direction === "up" ? -1 : 1);
    if (nextIdx < 0 || nextIdx >= sections.length) return;
    const updated = [...sections];
    const temp = updated[index];
    updated[index] = updated[nextIdx];
    updated[nextIdx] = temp;
    setSections(updated);
    showToast(language === "es" ? "Sección reordenada" : "Section moved");
  };

  // COPY ELEMENT
  const duplicateElement = (type: "section" | "row" | "module", sectionId: string, rowId?: string, colId?: string, moduleId?: string) => {
    if (!isFieldUnlocked("content-layout")) {
      showToast(language === "es" ? "⚠️ Rol actual no permite modificar la estructura (layout)" : "⚠️ Current role does not allow layout modifications", "error");
      return;
    }
    const generateId = (prefix: string) => `${prefix}-${Math.random().toString(36).substr(2, 9)}`;

    setSections(prevSections => {
      if (type === "section") {
        const secIdx = prevSections.findIndex(s => s.id === sectionId);
        if (secIdx === -1) return prevSections;
        const original = prevSections[secIdx];
        const copy: BuilderSection = JSON.parse(JSON.stringify(original));
        copy.id = generateId("sec");
        copy.name = `${copy.name} (Copia)`;
        // Regenerate child IDs to avoid collisions
        copy.rows.forEach(r => {
          r.id = generateId("row");
          r.columns.forEach(c => {
            c.id = generateId("col");
            c.modules.forEach(m => {
              m.id = generateId("mod");
            });
          });
        });
        const updated = [...prevSections];
        updated.splice(secIdx + 1, 0, copy);
        return updated;
      }

      return prevSections.map(s => {
        if (s.id !== sectionId) return s;

        if (type === "row" && rowId) {
          const rowIdx = s.rows.findIndex(r => r.id === rowId);
          if (rowIdx === -1) return s;
          const original = s.rows[rowIdx];
          const copy: BuilderRow = JSON.parse(JSON.stringify(original));
          copy.id = generateId("row");
          copy.columns.forEach(c => {
            c.id = generateId("col");
            c.modules.forEach(m => {
              m.id = generateId("mod");
            });
          });
          const updatedRows = [...s.rows];
          updatedRows.splice(rowIdx + 1, 0, copy);
          return { ...s, rows: updatedRows };
        }

        if (type === "module" && rowId && colId && moduleId) {
          return {
            ...s,
            rows: s.rows.map(r => {
              if (r.id !== rowId) return r;
              return {
                ...r,
                columns: r.columns.map(c => {
                  if (c.id !== colId) return c;
                  const modIdx = c.modules.findIndex(m => m.id === moduleId);
                  if (modIdx === -1) return c;
                  const original = c.modules[modIdx];
                  const copy: BuilderModule = JSON.parse(JSON.stringify(original));
                  copy.id = generateId("mod");
                  const updatedMods = [...c.modules];
                  updatedMods.splice(modIdx + 1, 0, copy);
                  return { ...c, modules: updatedMods };
                })
              };
            })
          };
        }

        return s;
      });
    });
    showToast(language === "es" ? "Elemento clonado con éxito" : "Element duplicated successfully");
  };

  // DELETE ELEMENT
  const deleteElement = (type: "section" | "row" | "column" | "module", sectionId: string, rowId?: string, colId?: string, moduleId?: string) => {
    if (!isFieldUnlocked("content-layout")) {
      showToast(language === "es" ? "⚠️ Tu rol actual no permite eliminar elementos (layout)" : "⚠️ Current role does not allow element deletion", "error");
      return;
    }
    if (type === "section") {
      if (sections.length <= 1) {
        alert(language === "es" ? "No puedes eliminar todas las secciones. Debe quedar al menos una." : "At least one section must remain on the canvas.");
        return;
      }
      setSections(prev => prev.filter(s => s.id !== sectionId));
      if (selectedElement?.sectionId === sectionId) setSelectedElement(null);
      showToast("Sección eliminada");
      return;
    }

    setSections(prevSections => {
      return prevSections.map(s => {
        if (s.id !== sectionId) return s;

        if (type === "row" && rowId) {
          return { ...s, rows: s.rows.filter(r => r.id !== rowId) };
        }

        if (type === "module" && rowId && colId && moduleId) {
          return {
            ...s,
            rows: s.rows.map(r => {
              if (r.id !== rowId) return r;
              return {
                ...r,
                columns: r.columns.map(c => {
                  if (c.id !== colId) return c;
                  return { ...c, modules: c.modules.filter(m => m.id !== moduleId) };
                })
              };
            })
          };
        }
        return s;
      });
    });
    setSelectedElement(null);
    showToast("Elemento eliminado");
  };

  // REORDER MODULES INSIDE COLUMN
  const moveModule = (sectionId: string, rowId: string, colId: string, index: number, direction: "up" | "down") => {
    if (!isFieldUnlocked("content-layout")) {
      showToast(language === "es" ? "⚠️ Tu rol actual no permite reordenar este elemento (layout)" : "⚠️ Current role does not allow component reordering", "error");
      return;
    }
    const nextIdx = index + (direction === "up" ? -1 : 1);
    
    setSections(prevSections => {
      return prevSections.map(s => {
        if (s.id !== sectionId) return s;
        return {
          ...s,
          rows: s.rows.map(r => {
            if (r.id !== rowId) return r;
            return {
              ...r,
              columns: r.columns.map(c => {
                if (c.id !== colId) return c;
                if (nextIdx < 0 || nextIdx >= c.modules.length) return c;
                
                const updatedMods = [...c.modules];
                const temp = updatedMods[index];
                updatedMods[index] = updatedMods[nextIdx];
                updatedMods[nextIdx] = temp;
                return { ...c, modules: updatedMods };
              })
            };
          })
        };
      });
    });
  };

  // ADD SECTION TO THE WEB
  const addNewSectionFromTemplate = (templateType: "hero" | "features" | "cta" | "testimonials" | "grid" | "contact-minimal" | "blank") => {
    const generateId = (prefix: string) => `${prefix}-${Math.random().toString(36).substr(2, 9)}`;
    let newSec: BuilderSection;

    switch(templateType) {
      case "hero":
        newSec = {
          id: generateId("sec"),
          name: "Nueva Sección Slider Hero",
          type: "hero",
          bgColor: "#e12d8a",
          paddingY: 90,
          textColor: "#ffffff",
          rows: [
            {
              id: generateId("row"),
              columnsCount: 1,
              gap: "gap-6",
              columns: [{
                id: generateId("col"),
                span: 12,
                modules: [
                  {
                    id: generateId("mod"),
                    type: "heading",
                    content: { text: "BIENVENIDOS AL COMPLEJO ARQUEOLÓGICO WARI", tag: "h2" },
                    style: { fontSize: "32px", fontWeight: "font-black", alignment: "text-center", textColor: "#ffffff", fontFamily: "display" }
                  },
                  {
                    id: generateId("mod"),
                    type: "button",
                    content: { text: "Contactar por WhatsApp", link: "#" },
                    style: { bgColor: "#25c55e", textColor: "#ffffff", alignment: "text-center", borderRadius: 20, paddingX: 20, paddingY: 10 }
                  }
                ]
              }]
            }
          ]
        };
        break;
      case "features":
        newSec = {
          id: generateId("sec"),
          name: "Características (Módulos Columnas)",
          type: "custom",
          bgColor: "#ffffff",
          paddingY: 70,
          rows: [
            {
              id: generateId("row"),
              columnsCount: 3,
              gap: "gap-6",
              columns: [
                {
                  id: generateId("col"), span: 4, bgColor: "#f7fafc", padding: 20, borderRadius: 12,
                  modules: [
                    { id: generateId("mod"), type: "icon", content: { iconName: "Shield" }, style: { textColor: "#e12d8a", fontSize: "30px" } },
                    { id: generateId("mod"), type: "heading", content: { text: "Seguridad Premium", tag: "h4" }, style: { fontSize: "18px", fontWeight: "font-bold" } },
                    { id: generateId("mod"), type: "text", content: { text: "Tu compra está asegurada ante contingencias." }, style: { fontSize: "14px", textColor: "#4a5568" } }
                  ]
                },
                {
                  id: generateId("col"), span: 4, bgColor: "#f7fafc", padding: 20, borderRadius: 12,
                  modules: [
                    { id: generateId("mod"), type: "icon", content: { iconName: "Heart" }, style: { textColor: "#f58220", fontSize: "30px" } },
                    { id: generateId("mod"), type: "heading", content: { text: "Amor por Ayacucho", tag: "h4" }, style: { fontSize: "18px", fontWeight: "font-bold" } },
                    { id: generateId("mod"), type: "text", content: { text: "Sabor local y autenticidad en cada calle." }, style: { fontSize: "14px", textColor: "#4a5568" } }
                  ]
                },
                {
                  id: generateId("col"), span: 4, bgColor: "#f7fafc", padding: 20, borderRadius: 12,
                  modules: [
                    { id: generateId("mod"), type: "icon", content: { iconName: "Award" }, style: { textColor: "#e12d8a", fontSize: "30px" } },
                    { id: generateId("mod"), type: "heading", content: { text: "Sello de Calidad", tag: "h4" }, style: { fontSize: "18px", fontWeight: "font-bold" } },
                    { id: generateId("mod"), type: "text", content: { text: "Reconocimientos de turismo por 10 años." }, style: { fontSize: "14px", textColor: "#4a5568" } }
                  ]
                }
              ]
            }
          ]
        };
        break;
      case "cta":
        newSec = {
          id: generateId("sec"),
          name: "Sección de Oferta (Fila Destacada)",
          type: "custom",
          bgColor: "#e12d8a",
          paddingY: 60,
          textColor: "#ffffff",
          rows: [
            {
              id: generateId("row"),
              columnsCount: 1,
              gap: "gap-4",
              columns: [{
                id: generateId("col"),
                span: 12,
                modules: [
                  {
                    id: generateId("mod"),
                    type: "heading",
                    content: { text: "OFERTA DE TEMPORADA - 20% DE DESCUENTO EN MILLPU", tag: "h2" },
                    style: { fontSize: "28px", fontWeight: "font-black", alignment: "text-center", fontFamily: "display", textColor: "#ffffff" }
                  },
                  {
                    id: generateId("mod"),
                    type: "text",
                    content: { text: "Reserva hoy tu cupo y sé parte del selecto grupo de viajeros recomendados para este mes." },
                    style: { fontSize: "15px", alignment: "text-center", textColor: "#edf2f7" }
                  },
                  {
                    id: generateId("mod"),
                    type: "button",
                    content: { text: "Quiero Reservar Mi Descuento", link: "#contacto" },
                    style: { bgColor: "#f58220", textColor: "#ffffff", alignment: "text-center", borderRadius: 10, paddingX: 20, paddingY: 10 }
                  }
                ]
              }]
            }
          ]
        };
        break;
      default:
        // Simple blank / custom row
        newSec = {
          id: generateId("sec"),
          name: "Nueva Sección en Blanco",
          type: "custom",
          bgColor: "#ffffff",
          paddingY: 50,
          rows: [
            {
              id: generateId("row"),
              columnsCount: 1,
              gap: "gap-4",
              columns: [{
                id: generateId("col"),
                span: 12,
                modules: [
                  {
                    id: generateId("mod"),
                    type: "heading",
                    content: { text: "Fila editable de Elementor", tag: "h3" },
                    style: { fontSize: "22px", fontWeight: "font-bold", alignment: "text-center" }
                  }
                ]
              }]
            }
          ]
        };
    }

    const updated = [...sections];
    if (addSectionTargetIdx !== null) {
      updated.splice(addSectionTargetIdx + 1, 0, newSec);
    } else {
      updated.push(newSec);
    }
    setSections(updated);
    setShowAddSectionModal(false);
    setSelectedElement({ type: "section", sectionId: newSec.id });
    showToast(language === "es" ? "Sección agregada con éxito" : "New section successfully added");
  };

  // ADD NEW MODULE INSIDE COLUMN
  const addNewModule = (sectionId: string, rowId: string, colId: string, moduleType: "heading" | "text" | "image" | "button" | "divider" | "icon" | "accordion") => {
    if (!isFieldUnlocked("content-layout")) {
      showToast(language === "es" ? "⚠️ Tu rol actual no permite agregar elementos (layout)" : "⚠️ Current role does not allow component insertions", "error");
      return;
    }
    const generateId = () => `mod-${Math.random().toString(36).substr(2, 9)}`;
    const newModId = generateId();

    let initialContent: any = { text: "Editable text block" };
    let initialStyle: any = { fontSize: "14px", alignment: "text-left" };

    if (moduleType === "heading") {
      initialContent = { text: "Nuevo Título H3", tag: "h3" };
      initialStyle = { fontSize: "24px", fontWeight: "font-bold", textColor: "#2c2c2c" };
    } else if (moduleType === "image") {
      initialContent = { src: "https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?auto=format&fit=crop&q=80&w=400", alt: "Ayacucho image" };
      initialStyle = { borderRadius: 12, shadow: "shadow", alignment: "text-center" };
    } else if (moduleType === "button") {
      initialContent = { text: "Clic Aquí", link: "#" };
      initialStyle = { bgColor: "#e12d8a", textColor: "#ffffff", borderRadius: 8, paddingX: 16, paddingY: 10, alignment: "text-left" };
    } else if (moduleType === "icon") {
      initialContent = { iconName: "Heart" };
      initialStyle = { textColor: "#e12d8a", fontSize: "32px", alignment: "text-center" };
    } else if (moduleType === "divider") {
      initialContent = { dividerStyle: "solid", dividerThickness: 2 };
      initialStyle = { textColor: "#edf2f7", paddingY: 16 };
    } else if (moduleType === "accordion") {
      initialContent = {
        items: [
          { title: "¿Qué incluye el tour a Millpu?", desc: "Transporte turístico, guía oficial bilingüe certificado, entradas completas al cañón y asistencia local." },
          { title: "¿Se requiere preparación física?", desc: "Se requiere caminata moderada en altura (3,500 msnm), recomendada para personas sin dolencias cardíacas." }
        ]
      };
      initialStyle = {};
    }

    const newMod: BuilderModule = {
      id: newModId,
      type: moduleType,
      content: initialContent,
      style: initialStyle
    };

    setSections(prevSections => {
      return prevSections.map(s => {
        if (s.id !== sectionId) return s;
        return {
          ...s,
          rows: s.rows.map(r => {
            if (r.id !== rowId) return r;
            return {
              ...r,
              columns: r.columns.map(c => {
                if (c.id !== colId) return c;
                return { ...c, modules: [...c.modules, newMod] };
              })
            };
          })
        };
      });
    });

    setSelectedElement({
      type: "module",
      sectionId,
      rowId,
      columnId: colId,
      moduleId: newModId
    });
    showToast("Módulo agregado");
  };

  // Helper to resolve dynamically selected Lucide Icon
  const renderLucideIconByName = (name: string, sizeClass = "w-6 h-6", customStyles = {}) => {
    const icons: { [key: string]: React.ComponentType<any> } = {
      Award, Shield, Compass, Heart, Phone, Mail, MapPin, Sliders, Sparkles, HelpCircle, Info, Send
    };
    const SelectedComponent = icons[name] || HelpCircle;
    return <SelectedComponent className={sizeClass} style={customStyles} />;
  };

  const selectedObj = getSelectedObject() as any;

  return (
    <div className="min-h-screen bg-[#111111] text-[#eaeaea] font-sans flex flex-col relative antialiased leading-normal">
      
      {/* BUILDER HEADER CONTROL BAR */}
      <div className="bg-[#1e1e1e] border-b border-[#2d2d2d] px-6 py-4 flex flex-col md:flex-row items-center justify-between gap-4 sticky top-0 z-[100] shadow-md select-none font-sans">
        
        {/* Brand Banner or logo */}
        <div className="flex items-center gap-3">
          <button 
            type="button" 
            onClick={onBack}
            className="p-2 bg-neutral-800 hover:bg-neutral-700 active:scale-95 text-white rounded-lg transition-all text-xs flex items-center gap-1 cursor-pointer"
          >
            <ChevronDown className="w-4 h-4 rotate-90" />
            <span>Regresar a la Web</span>
          </button>
          
          <div className="h-6 w-[1.5px] bg-[#2d2d2d] hidden sm:block" />
          
          <div className="flex flex-col text-left">
            <h1 className="font-display font-black text-xs sm:text-sm tracking-wider text-[#e12d8a] flex items-center gap-2 uppercase">
              <span>🌸 CONSTRUCTOR VISUAL SISARI</span> 
              <span className="text-[10px] bg-[#f58220] text-white px-2 py-0.5 rounded-full font-serif lowercase italic">divi+elementor</span>
            </h1>
            <p className="text-[10px] text-neutral-400 font-medium">Modo WYSIWYG en Frontend: Haz clic en cualquier bloque de la web para editarlo</p>
          </div>
        </div>

        {/* ACTIVE EDITING PAGE SELECTOR */}
        <div className="flex items-center gap-2 bg-[#121212] p-2 rounded-xl border border-[#2d2d2d]">
          <span className="text-[9px] uppercase font-black text-neutral-400 tracking-wider">Página Activa:</span>
          <select
            value={activePage}
            onChange={(e) => {
              setActivePage(e.target.value as any);
              setSelectedElement(null);
            }}
            className="bg-[#1e1e1e] text-white text-xs font-bold px-3 py-1.5 rounded-lg border border-[#3d3d3d] hover:border-[#e12d8a] focus:ring-1 focus:ring-[#e12d8a] outline-none cursor-pointer transition-all"
          >
            <option value="home">🏠 Página de Inicio</option>
            <option value="nosotros">🙋 Página de Nosotros (Sobre el equipo)</option>
            <option value="landing">✈️ Landings de Paquetes Sisari</option>
          </select>
        </div>

        {/* Viewport Selectors */}
        <div className="flex items-center gap-2 bg-[#2d2d2d] p-1 rounded-xl shadow-inner">
          <button 
            type="button"
            onClick={() => setViewport("desktop")}
            className={`p-2 rounded-lg transition-all flex items-center justify-center cursor-pointer ${viewport === "desktop" ? "bg-[#e12d8a] text-white" : "text-neutral-400 hover:text-white hover:bg-neutral-850"}`}
            title="Desktop view"
          >
            <Laptop className="w-4 h-4" />
          </button>
          <button 
            type="button"
            onClick={() => setViewport("tablet")}
            className={`p-2 rounded-lg transition-all flex items-center justify-center cursor-pointer ${viewport === "tablet" ? "bg-[#e12d8a] text-white" : "text-neutral-400 hover:text-white hover:bg-neutral-850"}`}
            title="Tablet view"
          >
            <Tablet className="w-4 h-4" />
          </button>
          <button 
            type="button"
            onClick={() => setViewport("mobile")}
            className={`p-2 rounded-lg transition-all flex items-center justify-center cursor-pointer ${viewport === "mobile" ? "bg-[#e12d8a] text-white" : "text-neutral-400 hover:text-white hover:bg-neutral-850"}`}
            title="Smartphone view"
          >
            <Smartphone className="w-4 h-4" />
          </button>
        </div>

        {/* Toolbar general buttons */}
        <div className="flex items-center gap-2 flex-wrap justify-end">
          
          {/* Back office reset */}
          <button 
            onClick={handleResetLayout}
            className="bg-neutral-800 hover:bg-neutral-700 text-white font-medium text-xs px-3 py-2 rounded-lg cursor-pointer transition-all flex items-center gap-1.5"
            title="Restaurar a Diseño Original"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Reiniciar</span>
          </button>

          {/* Import JSON */}
          <label className="bg-neutral-800 hover:bg-neutral-700 text-white font-medium text-xs px-3 py-2 rounded-lg cursor-pointer transition-all flex items-center gap-1.5 shadow">
            <Upload className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Importar</span>
            <input type="file" accept=".json" onChange={handleImport} className="hidden" />
          </label>

          {/* Export layout */}
          <button 
            onClick={handleExport}
            className="bg-neutral-850 hover:bg-[#2d2d2d] text-neutral-200 border border-[#3d3d3d] font-medium text-xs px-3 py-2 rounded-lg cursor-pointer transition-all flex items-center gap-1.5"
            title="Exportar archivo de diseño en JSON"
          >
            <Download className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Exportar JSON</span>
          </button>

          {/* Core Submit save changes */}
          <button 
            onClick={handleSave}
            className="bg-green-600 hover:bg-green-700 text-white font-bold text-xs px-4 py-2 rounded-lg cursor-pointer transition-all flex items-center gap-2 active:scale-95 shadow shadow-green-900"
          >
            <Check className="w-4 h-4" />
            <span>Guardar Cambios</span>
          </button>
        </div>

      </div>

      {/* BUILDER SUB-HEADER WITH ADVANCED CONTROLS (Undo/Redo, Roles, AutoSave, Preview Mode) */}
      <div className="bg-[#151515] border-b border-[#242424] px-6 py-2.5 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-neutral-400 font-sans select-none">
        {/* Left side: Role & Auto-save status */}
        <div className="flex items-center gap-4 flex-wrap">
          <div className="flex items-center gap-1.5 bg-neutral-900 border border-neutral-800 px-3 py-1 rounded-full text-neutral-300">
            <UserCheck className="w-3.5 h-3.5 text-amber-500" />
            <span className="text-[10px] uppercase font-bold text-neutral-500 tracking-wider">Permisos de Edición:</span>
            <select
              value={currentRole}
              onChange={(e) => {
                const newRole = e.target.value as any;
                setCurrentRole(newRole);
                setSelectedElement(null); // Unselect to prevent locked inspector states
                showToast(
                  newRole === "admin" ? "Modo Super Administrador (Control total sin restricciones)" :
                  newRole === "editor" ? "Editor: Sin cambios de filas ni columnas" :
                  newRole === "marketing" ? "Marketing: Edición de banners, imágenes, videos y links" :
                  "Redactor / Copywriter: Edición de textos y descripciones solamente"
                );
              }}
              className="bg-transparent text-[#e12d8a] font-bold outline-none cursor-pointer text-xs focus:ring-0 border-0 py-0 pl-1 pr-3"
            >
              <option value="admin" className="bg-neutral-900 text-white font-bold">👑 Super Administrador</option>
              <option value="editor" className="bg-neutral-900 text-white font-bold">💼 Editor de Contenidos y Estilo</option>
              <option value="marketing" className="bg-neutral-900 text-white font-bold">🎯 Responsable de Marketing</option>
              <option value="copywriter" className="bg-neutral-900 text-white font-bold">✍️ Redactor / Copywriter</option>
            </select>
          </div>

          {/* Save status notification display */}
          <div className="flex items-center gap-1.5 font-mono text-[10px]">
            {saveStatus === "saving" ? (
              <>
                <span className="w-2 h-2 rounded-full bg-yellow-500 animate-ping" />
                <span className="text-yellow-500 font-bold">● Guardando cambios de diseño...</span>
              </>
            ) : (
              <>
                <span className="w-2 h-2 rounded-full bg-green-500" />
                <span className="text-neutral-400 font-bold">Auto-guardado activo (LocalS) {lastSavedTime ? `a las ${lastSavedTime}` : ""}</span>
              </>
            )}
          </div>
        </div>

        {/* Right side: Undo, Redo, Preview view mode toggle */}
        <div className="flex items-center gap-3.5 font-sans">
          
          {/* History Controls */}
          <div className="flex items-center gap-1 bg-neutral-900 border border-[#2d2d2d] rounded-lg p-0.5">
            <button
              onClick={handleUndo}
              disabled={historyPointer <= 0}
              className={`p-1.5 rounded transition-all cursor-pointer ${historyPointer > 0 ? "text-neutral-200 hover:bg-neutral-800 hover:text-white" : "text-neutral-600 cursor-not-allowed"}`}
              title="Deshacer (Undo)"
            >
              <Undo className="w-4 h-4" />
            </button>
            <div className="w-[1px] h-4 bg-neutral-800" />
            <button
              onClick={handleRedo}
              disabled={historyPointer >= sectionsHistory.length - 1}
              className={`p-1.5 rounded transition-all cursor-pointer ${historyPointer < sectionsHistory.length - 1 ? "text-neutral-200 hover:bg-neutral-800 hover:text-white" : "text-neutral-600 cursor-not-allowed"}`}
              title="Rehacer (Redo)"
            >
              <Undo className="w-4 h-4 scale-x-[-1]" />
            </button>
          </div>

          {/* Toggle preview mode */}
          <button
            onClick={() => {
              setIsPreviewMode(!isPreviewMode);
              showToast(!isPreviewMode ? "Visualización limpia (Vista Previa) sin marcos de edición" : "Editor habilitado de vuelta");
            }}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg border font-bold text-xs cursor-pointer transition-all ${isPreviewMode ? "bg-[#e12d8a] text-white border-[#e12d8a]" : "bg-neutral-850 hover:bg-neutral-800 text-neutral-300 border-neutral-700"}`}
            title="Previsualizar layout real"
          >
            <Eye className="w-3.5 h-3.5" />
            <span>{isPreviewMode ? "Habilitar Maquetación" : "Vista Previa real"}</span>
          </button>
        </div>
      </div>

      {/* CORE SPLIT INTERFACES - CANVAS WORKPLACE */}
      <div className="flex-grow flex overflow-hidden relative min-h-0 bg-[#161616]">
        
        {/* ==========================================
            LEFT SIDEBAR: OUTLINE ELEMENT TREE EXPLORER
            ========================================== */}
        {!isPreviewMode && (
          <div className="w-72 bg-[#1b1b1b] border-r border-[#2a2a2a] overflow-y-auto p-4 flex flex-col gap-4 select-none flex-shrink-0 hidden lg:flex text-left">
            
            <div className="flex items-center justify-between">
              <span className="text-[11px] font-bold text-neutral-400 tracking-wider uppercase font-mono">📦 Árbol de Secciones</span>
              <button 
                type="button" 
                onClick={() => { setAddSectionTargetIdx(null); setShowAddSectionModal(true); }}
                className="text-[10px] bg-[#e12d8a] text-white hover:bg-[#e12d8a]/90 px-2 py-1 rounded-md flex items-center gap-0.5 cursor-pointer font-bold"
              >
                <Plus className="w-2.5 h-2.5" />
                <span>Sección</span>
              </button>
            </div>

            <div className="space-y-3.5 text-xs">
              {sections.map((sec, idx) => {
                const isSelected = selectedElement?.sectionId === sec.id && selectedElement.type === "section";
                
                return (
                  <div 
                    key={sec.id}
                    className={`border rounded-xl transition-all ${isSelected ? "border-[#e12d8a] bg-[#e12d8a]/10" : "border-[#2a2a2a] bg-[#1e1e1e]"}`}
                  >
                    {/* Section Title details */}
                    <div className="flex items-center justify-between p-3 cursor-pointer" onClick={() => setSelectedElement({ type: "section", sectionId: sec.id })}>
                      <div className="font-semibold text-neutral-200 line-clamp-1 max-w-[130px] flex items-center gap-1">
                        <span className="text-pink-500 font-light font-mono">■</span>
                        <span>{sec.name}</span>
                      </div>
                      
                      {/* Tiny Arrows controls */}
                      <div className="flex items-center gap-1 bg-[#161616] rounded-md p-0.5">
                        <button 
                          onClick={(e) => { e.stopPropagation(); moveSection(idx, "up"); }}
                          disabled={idx === 0}
                          className="text-neutral-500 hover:text-white disabled:text-neutral-700"
                          title="Subir Sección"
                        >
                          <ChevronUp className="w-3.5 h-3.5" />
                        </button>
                        <button 
                          onClick={(e) => { e.stopPropagation(); moveSection(idx, "down"); }}
                          disabled={idx === sections.length - 1}
                          className="text-neutral-500 hover:text-white disabled:text-neutral-700"
                          title="Bajar Sección"
                        >
                          <ChevronDown className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>

                    {/* Section sub rows */}
                    <div className="px-3 pb-3 pt-0 border-t border-[#2a2a2a]/40 divide-y divide-[#2a2a2a]/30">
                      {sec.rows.map(row => {
                        return (
                          <div key={row.id} className="py-2">
                            <button 
                              type="button"
                              onClick={() => setSelectedElement({ type: "row", sectionId: sec.id, rowId: row.id })}
                              className="w-full text-left font-semibold text-neutral-400 hover:text-white flex items-center justify-between mt-0.5"
                            >
                              <span className="text-[#f58220] font-light">⚬ Fila ({row.columnsCount} Cols)</span>
                              <span className="text-[10px] text-neutral-600">ID: {row.id.substring(4, 8)}</span>
                            </button>
                            
                            {/* Columns under rows */}
                            <div className="pl-3 mt-1 space-y-1.5 font-sans">
                              {row.columns.map((c, cIdx) => (
                                <div key={c.id}>
                                  <div className="text-[10px] text-neutral-500 font-mono">Columna {cIdx+1} ({c.modules.length} Módulos)</div>
                                  <div className="pl-2.5 border-l border-neutral-700/50 space-y-1 mt-1">
                                    {c.modules.map(mod => {
                                      const isModSelected = selectedElement?.moduleId === mod.id;
                                      return (
                                        <button 
                                          key={mod.id}
                                          onClick={() => setSelectedElement({
                                            type: "module",
                                            sectionId: sec.id,
                                            rowId: row.id,
                                            columnId: c.id,
                                            moduleId: mod.id
                                          })}
                                          className={`w-full text-left truncate px-2 py-1 rounded text-[10px] block transition-colors ${isModSelected ? "bg-[#33a1fd]/20 text-[#33a1fd] font-bold" : "text-neutral-300 hover:bg-neutral-800"}`}
                                        >
                                          <span className="capitalize">{mod.type}</span>: {mod.content.text || "(Media)"}
                                        </button>
                                      );
                                    })}
                                  </div>
                                </div>
                              ))}
                            </div>
                          </div>
                        );
                      })}
                    </div>

                  </div>
                );
              })}
            </div>

            <div className="mt-auto pt-4 border-t border-neutral-800 flex items-center justify-between text-[11px] text-neutral-500 font-mono">
              <span>Secciones: {sections.length}</span>
              <span>Unidades: localStore</span>
            </div>

          </div>
        )}

        {/* ==========================================
            MIDDLE WYSIWYG PREVIEW CONTAINER CANVAS
            ========================================== */}
        <div className="flex-grow overflow-y-auto flex items-start justify-center p-6 bg-[#161616]">
          
          <motion.div 
            layout
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
            className="bg-white rounded-3xl shadow-2xl relative text-left select-text"
            style={{
              width: viewport === "desktop" ? "100%" : viewport === "tablet" ? "768px" : "375px",
              maxWidth: "100%",
              color: "#2c2c2c",
              fontFamily: "Inter, sans-serif"
            }}
          >
            {/* Top Device IFrame Header representation bar */}
            <div className="bg-[#e4e4e7] rounded-t-3xl border-b border-[#d4d4d8] py-2.5 px-6 flex items-center justify-between select-none">
              <div className="flex items-center gap-1.5">
                <span className="w-3 h-3 rounded-full bg-red-400"></span>
                <span className="w-3 h-3 rounded-full bg-yellow-400"></span>
                <span className="w-3 h-3 rounded-full bg-green-400"></span>
              </div>
              <div className="text-[10px] sm:text-xs font-mono font-bold text-neutral-600 bg-white/60 px-5 py-1.5 rounded-full shadow-inner max-w-[280px] sm:max-w-md truncate">
                🗺️ https://sisari.com/{activePage}/elementor-live
              </div>
              <div className="text-[10px] text-neutral-500 font-bold uppercase tracking-wider">{viewport.toUpperCase()}</div>
            </div>

            {/* PREVIEW CANVAS AREA COMPONENT SCREEN */}
            <div className="h-[750px] overflow-y-auto select-text relative">
              {sections.map((sec, secIdx) => {
                const isSecSelected = selectedElement?.sectionId === sec.id && selectedElement?.type === "section";
                
                return (
                  <div
                    key={sec.id}
                    onClick={(e) => { 
                      if (isPreviewMode) return;
                      e.stopPropagation(); 
                      setSelectedElement({ type: "section", sectionId: sec.id }); 
                    }}
                    className={`relative transition-all group-section ${(!isPreviewMode && isSecSelected) ? "border-2 border-dashed border-[#e12d8a]" : (!isPreviewMode) ? "hover:border-2 hover:border-[#e12d8a]/40 border-2 border-transparent" : "border-0"}`}
                    style={{
                      backgroundColor: sec.bgColor || "transparent",
                      backgroundImage: sec.bgImage ? (sec.bgImage.startsWith("linear") ? sec.bgImage : `linear-gradient(rgba(0, 0, 0, 0.45), rgba(0, 0, 0, 0.5)), url(${sec.bgImage})`) : undefined,
                      backgroundSize: "cover",
                      backgroundPosition: "center",
                      paddingTop: sec.paddingY !== undefined ? `${sec.paddingY}px` : "50px",
                      paddingBottom: sec.paddingY !== undefined ? `${sec.paddingY}px` : "50px",
                      paddingLeft: sec.paddingX !== undefined ? `${sec.paddingX}px` : "0px",
                      paddingRight: sec.paddingX !== undefined ? `${sec.paddingX}px` : "0px",
                      marginTop: sec.marginY !== undefined ? `${sec.marginY}px` : "0px",
                      marginBottom: sec.marginBottom !== undefined ? `${sec.marginBottom}px` : "0px",
                      borderRadius: sec.borderRadius !== undefined ? `${sec.borderRadius}px` : "0px",
                      borderWidth: sec.borderWidth !== undefined ? `${sec.borderWidth}px` : "0px",
                      borderColor: sec.borderColor || "transparent",
                      borderStyle: sec.borderWidth ? "solid" : "none",
                      color: sec.textColor || "inherit",
                      boxShadow: sec.shadow && sec.shadow !== "none" ? (sec.shadow === "sm" ? "0 1px 2px 0 rgba(0, 0, 0, 0.05)" : sec.shadow === "md" ? "0 4px 6px -1px rgba(0, 0, 0, 0.1)" : sec.shadow === "lg" ? "0 10px 15px -3px rgba(0, 0, 0, 0.1)" : "0 20px 25px -5px rgba(0, 0, 0, 0.1)") : undefined
                    }}
                  >
                    {/* Section Admin Labels Floating Toolbar */}
                    {!isPreviewMode && (
                      <div className="absolute top-2 left-2 z-20 flex items-center gap-2 bg-[#e12d8a] text-white text-[10px] font-black px-2.5 py-1 rounded-md opacity-0 group-section-hover:opacity-100 transition-opacity select-none tracking-widest uppercase">
                        <span>SECCIÓN: {sec.name || `Sec ${secIdx+1}`}</span>
                        
                        <div className="h-4 w-[1px] bg-white/20 ml-2" />
                        
                        <button 
                          onClick={(e) => { e.stopPropagation(); duplicateElement("section", sec.id); }}
                          className="hover:text-green-200 transition-colors"
                          title="Clonar Sección"
                        >
                          <Copy className="w-3 h-3" />
                        </button>
                        <button 
                          onClick={(e) => { e.stopPropagation(); deleteElement("section", sec.id); }}
                          className="hover:text-red-200 transition-colors"
                          title="Eliminar Sección"
                        >
                          <Trash className="w-3 h-3" />
                        </button>
                        <button 
                          onClick={(e) => { e.stopPropagation(); setAddSectionTargetIdx(secIdx); setShowAddSectionModal(true); }}
                          className="hover:text-amber-200 transition-colors"
                          title="Agregar Sección Abajo"
                        >
                          <Plus className="w-3 h-3" />
                        </button>
                      </div>
                    )}

                    {/* Section body rows map */}
                    <div 
                      className="mx-auto px-4 sm:px-6 lg:px-8 space-y-6"
                      style={{
                        maxWidth: sec.maxWidth || "1280px"
                      }}
                    >
                        {sec.rows.map(row => {
                        const isRowSelected = selectedElement?.rowId === row.id && selectedElement?.type === "row";
                        return (
                          <div
                            key={row.id}
                            onClick={(e) => { 
                              if (isPreviewMode) return;
                              e.stopPropagation(); 
                              setSelectedElement({ type: "row", sectionId: sec.id, rowId: row.id }); 
                            }}
                            className={`relative transition-all group-row ${(!isPreviewMode && isRowSelected) ? "border-2 border-dashed border-[#f58220]" : (!isPreviewMode) ? "hover:border border-[#f58220]/40 border border-transparent" : "border-0"}`}
                            style={{
                              backgroundColor: row.bgColor || "transparent",
                              paddingTop: row.paddingY !== undefined ? `${row.paddingY}px` : "0px",
                              paddingBottom: row.paddingY !== undefined ? `${row.paddingY}px` : "0px",
                              paddingLeft: row.paddingX !== undefined ? `${row.paddingX}px` : "0px",
                              paddingRight: row.paddingX !== undefined ? `${row.paddingX}px` : "0px",
                              marginTop: row.marginY !== undefined ? `${row.marginY}px` : "0px",
                              marginBottom: row.marginBottom !== undefined ? `${row.marginBottom}px` : "0px",
                              borderRadius: row.borderRadius !== undefined ? `${row.borderRadius}px` : "0px",
                              borderWidth: row.borderWidth !== undefined ? `${row.borderWidth}px` : "0px",
                              borderColor: row.borderColor || "transparent",
                              borderStyle: row.borderWidth ? "solid" : "none",
                              maxWidth: row.maxWidth || "100%",
                              width: "100%",
                              boxShadow: row.shadow && row.shadow !== "none" ? (row.shadow === "sm" ? "0 1px 2px 0 rgba(0, 0, 0, 0.05)" : row.shadow === "md" ? "0 4px 6px -1px rgba(0, 0, 0, 0.1)" : row.shadow === "lg" ? "0 10px 15px -3px rgba(0, 0, 0, 0.1)" : "0 20px 25px -5px rgba(0, 0, 0, 0.1)") : undefined
                            }}
                          >
                            {/* Row admin bar floating */}
                            {!isPreviewMode && (
                              <div className="absolute -top-3.5 right-2 z-20 flex items-center gap-1.5 bg-[#f58220] text-white text-[9px] font-bold px-2 py-0.5 rounded shadow select-none uppercase">
                                <span>FILA</span>
                                <button 
                                  onClick={(e) => { e.stopPropagation(); duplicateElement("row", sec.id, row.id); }}
                                  className="hover:scale-110"
                                  title="Clonar Fila"
                                >
                                  <Copy className="w-2.5 h-2.5" />
                                </button>
                                <button 
                                  onClick={(e) => { e.stopPropagation(); deleteElement("row", sec.id, row.id); }}
                                  className="hover:scale-110 text-red-100"
                                  title="Eliminar Fila"
                                >
                                  <Trash className="w-2.5 h-2.5" />
                                </button>
                              </div>
                            )}

                            {/* Render grid row column items */}
                            <div className={`grid grid-cols-1 md:grid-cols-12 ${row.gap}`}>
                              {row.columns.map((col, colIdx) => {
                                // Calculate spans for responsive rendering
                                const isColSelected = selectedElement?.columnId === col.id && selectedElement?.type === "column";
                                const bgColClass = col.bgColor ? "" : "transparent";
                                
                                return (
                                  <div
                                    key={col.id}
                                    onClick={(e) => { e.stopPropagation(); setSelectedElement(isPreviewMode ? null : { type: "column", sectionId: sec.id, rowId: row.id, columnId: col.id }); }}
                                    className={`md:col-span-${col.span} col-span-12 relative flex flex-col justify-start rounded-xl group-column ${(!isPreviewMode && isColSelected) ? "border border-[#0096c7] ring-2 ring-[#0096c7]/30" : (!isPreviewMode) ? "hover:border hover:border-neutral-300" : ""}`}
                                    style={{
                                      backgroundColor: col.bgColor || "transparent",
                                      paddingTop: col.paddingY !== undefined ? `${col.paddingY}px` : (col.padding !== undefined ? `${col.padding}px` : "8px"),
                                      paddingBottom: col.paddingY !== undefined ? `${col.paddingY}px` : (col.padding !== undefined ? `${col.padding}px` : "8px"),
                                      paddingLeft: col.paddingX !== undefined ? `${col.paddingX}px` : (col.padding !== undefined ? `${col.padding}px` : "8px"),
                                      paddingRight: col.paddingX !== undefined ? `${col.paddingX}px` : (col.padding !== undefined ? `${col.padding}px` : "8px"),
                                      marginTop: col.marginY !== undefined ? `${col.marginY}px` : "0px",
                                      marginBottom: col.marginBottom !== undefined ? `${col.marginBottom}px` : "0px",
                                      borderRadius: col.borderRadius !== undefined ? `${col.borderRadius}px` : "12px",
                                      borderWidth: col.borderWidth !== undefined ? `${col.borderWidth}px` : "0px",
                                      borderColor: col.borderColor || "transparent",
                                      borderStyle: col.borderWidth ? "solid" : "none",
                                      boxShadow: col.shadow && col.shadow !== "none" ? (col.shadow === "sm" ? "0 1px 2px 0 rgba(0, 0, 0, 0.05)" : col.shadow === "md" ? "0 4px 6px -1px rgba(0, 0, 0, 0.1)" : col.shadow === "lg" ? "0 10px 15px -3px rgba(0, 0, 0, 0.1)" : "0 20px 25px -5px rgba(0, 0, 0, 0.1)") : undefined
                                    }}
                                  >
                                    
                                    {/* Column Empty State placeholder helper */}
                                    {col.modules.length === 0 && !isPreviewMode && (
                                      <div className="py-8 px-4 border border-dashed border-neutral-300 rounded-xl text-center bg-neutral-50/50 flex flex-col items-center justify-center gap-2">
                                        <span className="text-[10px] font-bold text-neutral-400 font-mono tracking-wider">COLUMNA VACÍA</span>
                                        <button 
                                          type="button"
                                          onClick={(e) => { e.stopPropagation(); addNewModule(sec.id, row.id, col.id, "heading"); }}
                                          className="text-[9px] bg-blue-500 hover:bg-blue-600 text-white font-black px-2 py-1 rounded"
                                        >
                                          Agregar Módulo
                                        </button>
                                      </div>
                                    )}

                                    {/* Column Modules render list */}
                                    <div className="space-y-4 w-full">
                                      {col.modules.map((mod, modIdx) => {
                                        const isModSelected = selectedElement?.moduleId === mod.id && selectedElement?.type === "module";
                                        
                                        // Specific module style derivations
                                        const resolvedFontFamily = mod.style?.fontFamily === "display" ? "font-display" : mod.style?.fontFamily === "mono" ? "font-mono" : mod.style?.fontFamily === "serif" ? "font-serif" : "font-sans";
                                        const resolvedFontSize = mod.style?.fontSize ? mod.style.fontSize : mod.type === "heading" ? "30px" : "15px";
                                        
                                        return (
                                          <div
                                            key={mod.id}
                                            onClick={(e) => {
                                              e.stopPropagation();
                                              if (isPreviewMode) return;
                                              setSelectedElement({
                                                type: "module",
                                                sectionId: sec.id,
                                                rowId: row.id,
                                                columnId: col.id,
                                                moduleId: mod.id
                                              });
                                            }}
                                            className={`relative group/module ${(!isPreviewMode && isModSelected) ? "ring-2 ring-blue-500 rounded-lg p-2 bg-blue-50/5" : (!isPreviewMode) ? "hover:ring-1 hover:ring-blue-400 hover:rounded-md" : ""}`}
                                            style={{
                                              backgroundColor: mod.style?.bgColor || "transparent",
                                              paddingTop: mod.style?.paddingY !== undefined ? `${mod.style.paddingY}px` : undefined,
                                              paddingBottom: mod.style?.paddingY !== undefined ? `${mod.style.paddingY}px` : undefined,
                                              paddingLeft: mod.style?.paddingX !== undefined ? `${mod.style.paddingX}px` : undefined,
                                              paddingRight: mod.style?.paddingX !== undefined ? `${mod.style.paddingX}px` : undefined,
                                              marginTop: mod.style?.marginY !== undefined ? `${mod.style.marginY}px` : undefined,
                                              marginBottom: mod.style?.marginBottom !== undefined ? `${mod.style.marginBottom}px` : undefined,
                                              borderRadius: mod.style?.borderRadius !== undefined ? `${mod.style.borderRadius}px` : undefined,
                                              borderWidth: mod.style?.borderWidth !== undefined ? `${mod.style.borderWidth}px` : undefined,
                                              borderColor: mod.style?.borderColor || undefined,
                                              borderStyle: mod.style?.borderWidth ? "solid" : undefined,
                                              boxShadow: mod.style?.shadow && mod.style?.shadow !== "none" ? (mod.style.shadow === "sm" ? "0 1px 2px 0 rgba(0, 0, 0, 0.05)" : mod.style.shadow === "md" ? "0 4px 6px -1px rgba(0, 0, 0, 0.1)" : mod.style.shadow === "lg" ? "0 10px 15px -3px rgba(0, 0, 0, 0.1)" : "0 20px 25px -5px rgba(0, 0, 0, 0.1)") : undefined,
                                              maxWidth: mod.style?.maxWidth || undefined,
                                            }}
                                          >
                                            
                                            {/* Micro hover label control triggers */}
                                            <div className={`absolute right-1 -top-3 z-30 opacity-0 group/module-hover:opacity-100 flex items-center gap-1 bg-blue-500 text-white px-2 py-0.5 rounded text-[8px] font-bold select-none uppercase ${isPreviewMode ? "hidden" : ""}`}>
                                              <span>{mod.type}</span>
                                              <button 
                                                onClick={(e) => { e.stopPropagation(); moveModule(sec.id, row.id, col.id, modIdx, "up"); }} 
                                                disabled={modIdx === 0}
                                                className="disabled:opacity-30"
                                              >
                                                ▲
                                              </button>
                                              <button 
                                                onClick={(e) => { e.stopPropagation(); moveModule(sec.id, row.id, col.id, modIdx, "down"); }} 
                                                disabled={modIdx === col.modules.length - 1}
                                                className="disabled:opacity-30"
                                              >
                                                ▼
                                              </button>
                                              <button onClick={(e) => { e.stopPropagation(); duplicateElement("module", sec.id, row.id, col.id, mod.id); }}>
                                                C
                                              </button>
                                              <button onClick={(e) => { e.stopPropagation(); deleteElement("module", sec.id, row.id, col.id, mod.id); }} className="text-red-100">
                                                X
                                              </button>
                                            </div>

                                            {/* Specific Module Render Switches */}
                                            {mod.type === "heading" && (() => {
                                              const Tag = mod.content.tag || "h3";
                                              const element = (
                                                <Tag 
                                                  className={`${resolvedFontFamily} ${mod.style?.fontWeight || "font-black"} ${mod.style?.letterSpacing || "tracking-tight"} ${mod.style?.lineHeight || "leading-relaxed"} ${mod.style?.alignment || "text-left"}`}
                                                  style={{
                                                    color: mod.style?.textColor || sec.textColor || "#2c2c2c",
                                                    fontSize: resolvedFontSize,
                                                    marginTop: mod.style?.marginY ? `${mod.style.marginY}px` : "0px",
                                                    marginBottom: mod.style?.marginY ? `${mod.style.marginY}px` : "12px",
                                                  }}
                                                >
                                                  {mod.content.text}
                                                </Tag>
                                              );
                                              return mod.content.link ? (
                                                <a href={mod.content.link} className="hover:underline hover:opacity-90 block max-w-full" style={{ color: "inherit" }}>{element}</a>
                                              ) : element;
                                            })()}

                                            {mod.type === "text" && (() => {
                                              const element = (
                                                <p
                                                  className={`${resolvedFontFamily} ${mod.style?.fontWeight || "font-light"} ${mod.style?.alignment || "text-left"} ${mod.style?.letterSpacing || "tracking-normal"} ${mod.style?.lineHeight || "leading-relaxed"} whitespace-pre-line`}
                                                  style={{
                                                    color: mod.style?.textColor || sec.textColor || "#4a5568",
                                                    fontSize: resolvedFontSize,
                                                    marginTop: mod.style?.marginY ? `${mod.style.marginY}px` : "0px",
                                                    marginBottom: mod.style?.marginY ? `${mod.style.marginY}px` : "12px"
                                                  }}
                                                >
                                                  {mod.content.text}
                                                </p>
                                              );
                                              return mod.content.link ? (
                                                <a href={mod.content.link} className="hover:underline hover:opacity-90 block max-w-full" style={{ color: "inherit" }}>{element}</a>
                                              ) : element;
                                            })()}

                                            {mod.type === "image" && (() => {
                                              const imageElement = (
                                                <img
                                                  src={mod.content.src || "https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?auto=format&fit=crop&q=80&w=400"}
                                                  alt={mod.content.alt || "CMS Image Block"}
                                                  className={`max-w-full transition-all ${mod.style?.shadow || "none"} ${mod.content.link ? "hover:scale-[1.01] transition-transform duration-200" : ""}`}
                                                  style={{
                                                    borderRadius: mod.style?.borderRadius ? `${mod.style.borderRadius}px` : "12px",
                                                    borderWidth: mod.style?.borderWidth ? `${mod.style.borderWidth}px` : "0px",
                                                    borderColor: mod.style?.borderColor || "transparent",
                                                    maxHeight: "350px",
                                                    objectFit: "cover"
                                                  }}
                                                />
                                              );
                                              return (
                                                <div className={`w-full flex ${mod.style?.alignment === "text-center" ? "justify-center" : mod.style?.alignment === "text-right" ? "justify-end" : "justify-start relative"}`}>
                                                  {mod.content.link ? (
                                                    <a href={mod.content.link} className="hover:opacity-90 transition-opacity block max-w-full">{imageElement}</a>
                                                  ) : imageElement}
                                                </div>
                                              );
                                            })()}

                                            {mod.type === "button" && (
                                              <div className={`w-full flex ${mod.style?.alignment === "text-center" ? "justify-center" : mod.style?.alignment === "text-right" ? "justify-end" : "justify-start"}`}>
                                                <a
                                                  href={mod.content.link || "#"}
                                                  className={`inline-block font-sans hover:brightness-110 active:scale-95 transition-all text-xs font-bold leading-normal ${mod.style?.shadow || "shadow"}`}
                                                  style={{
                                                    backgroundColor: mod.style?.bgColor || "#e12d8a",
                                                    color: mod.style?.textColor || "#ffffff",
                                                    borderRadius: mod.style?.borderRadius ? `${mod.style.borderRadius}px` : "12px",
                                                    paddingTop: mod.style?.paddingY ? `${mod.style.paddingY}px` : "12px",
                                                    paddingBottom: mod.style?.paddingY ? `${mod.style.paddingY}px` : "12px",
                                                    paddingLeft: mod.style?.paddingX ? `${mod.style.paddingX}px` : "24px",
                                                    paddingRight: mod.style?.paddingX ? `${mod.style.paddingX}px` : "24px",
                                                  }}
                                                >
                                                  {mod.content.text}
                                                </a>
                                              </div>
                                            )}

                                            {mod.type === "divider" && (
                                              <div 
                                                className="w-full flex items-center py-4"
                                                style={{
                                                  paddingTop: mod.style?.paddingY ? `${mod.style.paddingY}px` : "12px",
                                                  paddingBottom: mod.style?.paddingY ? `${mod.style.paddingY}px` : "12px"
                                                }}
                                              >
                                                <hr 
                                                  className="w-full"
                                                  style={{
                                                    borderTopStyle: mod.content.dividerStyle || "solid",
                                                    borderTopWidth: `${mod.content.dividerThickness || 2}px`,
                                                    borderColor: mod.style?.textColor || "#edf2f7"
                                                  }}
                                                />
                                              </div>
                                            )}

                                            {mod.type === "icon" && (() => {
                                              const iconElement = (
                                                <div 
                                                  className="p-3 bg-neutral-100 rounded-xl inline-block"
                                                  style={{
                                                    color: mod.style?.textColor || "#e12d8a",
                                                    backgroundColor: mod.style?.bgColor || "#edf2f7",
                                                    padding: "12px",
                                                    borderRadius: "15px"
                                                  }}
                                                >
                                                  {renderLucideIconByName(mod.content.iconName || "Star", "w-8 h-8")}
                                                </div>
                                              );
                                              return (
                                                <div className={`w-full flex ${mod.style?.alignment === "text-center" ? "justify-center" : mod.style?.alignment === "text-right" ? "justify-end" : "justify-start"}`}>
                                                  {mod.content.link ? (
                                                    <a href={mod.content.link} className="hover:scale-105 transition-transform duration-200 block">{iconElement}</a>
                                                  ) : iconElement}
                                                </div>
                                              );
                                            })()}

                                            {mod.type === "accordion" && (
                                              <div className="space-y-2 text-left font-sans text-xs">
                                                {(mod.content.items || []).map((item: any, iIdx: number) => (
                                                  <div key={iIdx} className="border border-neutral-250 bg-[#fbfaf8] rounded-xl p-3">
                                                    <div className="font-bold text-brand-charcoal text-sm flex items-center justify-between cursor-pointer">
                                                      <span>{item.title}</span>
                                                      <span className="text-[#e12d8a] font-serif">+</span>
                                                    </div>
                                                    <p className="text-neutral-500 font-light mt-1.5 leading-relaxed">{item.desc}</p>
                                                  </div>
                                                ))}
                                              </div>
                                            )}

                                            {mod.type === "video" && (() => {
                                              const rawUrl = mod.content.videoUrl || mod.content.src || "https://www.youtube.com/watch?v=dQw4w9WgXcQ";
                                              const videoType = mod.content.videoType || "youtube";
                                              const videoTitle = mod.content.videoTitle || mod.content.title || "Vídeo Corporativo de Viajes";
                                              
                                              // Parse Youtube/Vimeo ID
                                              let embedUrl = "";
                                              if (videoType === "youtube") {
                                                const ytIdMatch = rawUrl.match(/(?:youtube\.com\/(?:[^\/]+\/.+\/|(?:v|e(?:mbed)?)\/|.*[?&]v=)|youtu\.be\/)([^"&?\/\s]{11})/);
                                                const ytId = ytIdMatch ? ytIdMatch[1] : "dQw4w9WgXcQ";
                                                embedUrl = `https://www.youtube.com/embed/${ytId}`;
                                              } else if (videoType === "vimeo") {
                                                const vimIdMatch = rawUrl.match(/(?:vimeo\.com\/|player\.vimeo\.com\/video\/)([0-9]+)/);
                                                const vimId = vimIdMatch ? vimIdMatch[1] : "76979871";
                                                embedUrl = `https://player.vimeo.com/video/${vimId}`;
                                              }

                                              return (
                                                <div className="w-full flex flex-col gap-2 relative">
                                                  {videoTitle && (
                                                    <span className="text-[10px] font-mono text-neutral-500 uppercase tracking-widest font-black flex items-center gap-1">
                                                      <span className="inline-block w-1.5 h-1.5 rounded-full bg-red-650 animate-pulse" />
                                                      {videoTitle}
                                                    </span>
                                                  )}
                                                  <div className="relative w-full aspect-video overflow-hidden bg-black rounded-2xl shadow-xl border border-neutral-250">
                                                    {(videoType === "youtube" || videoType === "vimeo") && embedUrl ? (
                                                      <iframe 
                                                        src={embedUrl}
                                                        className="w-full h-full border-0 absolute inset-0 select-text"
                                                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                                        allowFullScreen
                                                        title={videoTitle}
                                                      />
                                                    ) : (
                                                      <video 
                                                        src={rawUrl} 
                                                        controls 
                                                        className="w-full h-full object-cover select-text"
                                                        poster={mod.content.src || "https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?auto=format&fit=crop&q=80&w=600"}
                                                      />
                                                    )}
                                                  </div>
                                                </div>
                                              );
                                            })()}

                                            {/* EMBEDDED DYNAMIC SITE MODULES REPRESENTATIONS */}
                                            {mod.type === "grid-packages" && (
                                              <div className="relative border border-dashed border-[#edf2f7] p-2 bg-[#ffffff]/60 rounded-3xl">
                                                <span className="absolute -top-3.5 left-4 bg-brand-pink text-white text-[8px] tracking-widest font-bold px-2 py-0.5 rounded uppercase">⚙️ CATÁLOGO DINÁMICO EN VIVO</span>
                                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4">
                                                  {packages.slice(0, 2).map((pkg: any) => (
                                                    <div key={pkg.id} className="bg-white border border-neutral-100 shadow rounded-2xl overflow-hidden text-left flex flex-col text-xs pb-3">
                                                      <img src={pkg.image} className="w-full h-32 object-cover" />
                                                      <div className="p-3">
                                                        <span className="text-[9px] font-black text-brand-pink uppercase tracking-widest">{pkg.category} • {pkg.duration}</span>
                                                        <h5 className="font-bold text-neutral-800 text-sm mt-1">{pkg.title}</h5>
                                                        <p className="font-extrabold text-neutral-800 mt-2 text-sm">{pkg.price}</p>
                                                      </div>
                                                    </div>
                                                  ))}
                                                </div>
                                              </div>
                                            )}

                                            {mod.type === "testimonials" && (
                                              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                                <div className="bg-[#fbfaf8] border border-neutral-100 p-4 rounded-xl shadow-sm text-left">
                                                  <div className="text-yellow-500 text-xs mb-1">★★★★★</div>
                                                  <p className="text-xs text-neutral-600 italic">"¡Superó las expectativas! El tour a Millpu estuvo súper bien organizado. Sari nos ayudó con todo."</p>
                                                  <div className="font-bold text-[10px] text-neutral-700 mt-2">— Andrea Alva, Trujillo</div>
                                                </div>
                                                <div className="bg-[#fbfaf8] border border-neutral-100 p-4 rounded-xl shadow-sm text-left">
                                                  <div className="text-yellow-500 text-xs mb-1">★★★★★</div>
                                                  <p className="text-xs text-neutral-600 italic">"El planner inteligente de itinerarios nos diseñó la ruta de 3 días ideal. Un servicio impecable."</p>
                                                  <div className="font-bold text-[10px] text-neutral-700 mt-2">— Robert Evans, Miami</div>
                                                </div>
                                              </div>
                                            )}

                                            {mod.type === "contact-form" && (
                                              <div className="space-y-3 font-sans max-w-md mx-auto text-xs font-semibold text-brand-charcoal">
                                                <div>
                                                  <label className="text-brand-charcoal text-[11px] uppercase tracking-wider">Nombre Completo</label>
                                                  <input type="text" placeholder="ejm. Carlos Mendoza" disabled className="w-full px-3 py-2 border border-neutral-200 bg-neutral-50 rounded-lg text-xs font-light mt-1" />
                                                </div>
                                                <div>
                                                  <label className="text-brand-charcoal text-[11px] uppercase tracking-wider">Celular / WhatsApp</label>
                                                  <input type="text" placeholder="+51 999..." disabled className="w-full px-3 py-2 border border-neutral-200 bg-neutral-50 rounded-lg text-xs font-light mt-1" />
                                                </div>
                                                <button type="button" disabled className="w-full bg-[#e12d8a] text-white font-bold py-3.5 rounded-lg font-sans shadow-md text-xs tracking-wider uppercase mt-3">CONTACTAR ASESOR</button>
                                              </div>
                                            )}

                                          </div>
                                        );
                                      })}
                                    </div>

                                    {/* Column Quick Module Builder Addition trigger */}
                                    <div className="mt-auto pt-3 flex items-center justify-center border-t border-dashed border-neutral-200/50">
                                      <div className="flex items-center gap-1.5 select-none text-[8px] font-bold text-neutral-400">
                                        <button 
                                          type="button"
                                          onClick={(e) => { e.stopPropagation(); addNewModule(sec.id, row.id, col.id, "heading"); }}
                                          className="bg-neutral-100 hover:bg-neutral-200 px-1.5 py-1 rounded transition-colors cursor-pointer block"
                                        >
                                          +Título
                                        </button>
                                        <button 
                                          type="button"
                                          onClick={(e) => { e.stopPropagation(); addNewModule(sec.id, row.id, col.id, "text"); }}
                                          className="bg-neutral-100 hover:bg-neutral-200 px-1.5 py-1 rounded transition-colors cursor-pointer block"
                                        >
                                          +Parrafo
                                        </button>
                                        <button 
                                          type="button"
                                          onClick={(e) => { e.stopPropagation(); addNewModule(sec.id, row.id, col.id, "image"); }}
                                          className="bg-neutral-100 hover:bg-neutral-200 px-1.5 py-1 rounded transition-colors cursor-pointer block"
                                        >
                                          +Imagen
                                        </button>
                                        <button 
                                          type="button"
                                          onClick={(e) => { e.stopPropagation(); addNewModule(sec.id, row.id, col.id, "button"); }}
                                          className="bg-neutral-100 hover:bg-neutral-200 px-1.5 py-1 rounded transition-colors cursor-pointer block"
                                        >
                                          +Boton
                                        </button>
                                      </div>
                                    </div>

                                  </div>
                                );
                              })}
                            </div>

                          </div>
                        );
                      })}
                    </div>

                  </div>
                );
              })}
            </div>

          </motion.div>
        </div>

        {/* ==========================================
            RIGHT SIDEBAR: ELEMENT PROPERTIES INSPECTOR
            ========================================== */}
        {!isPreviewMode && (
          <div className="w-80 bg-[#1b1b1b] border-l border-[#2a2a2a] overflow-y-auto flex flex-col flex-shrink-0 select-none text-left">
          
          <div className="p-4 border-b border-[#2a2a2a] flex items-center justify-between bg-[#1f1f1f]">
            <div className="flex items-center gap-2">
              <Sliders className="w-4 h-4 text-[#e12d8a]" />
              <span className="text-xs font-black tracking-wider uppercase">Inspector de Estilos</span>
            </div>
            {(selectedElement && selectedObj) ? (
              <span className="text-[9px] bg-neutral-800 text-neutral-300 font-mono px-2 py-0.5 rounded">
                {selectedElement.type.toUpperCase()}: {selectedElement.moduleId ? selectedElement.moduleId.substring(4, 8) : selectedElement.sectionId.substring(4, 8)}
              </span>
            ) : (
              <span className="text-[10px] text-neutral-500">Ninguno</span>
            )}
          </div>

          {/* If nothing is selected */}
          {(!selectedElement || !selectedObj) ? (
            <div className="p-8 text-center flex-grow flex flex-col justify-center items-center gap-3 text-neutral-500 font-sans">
              <MousePointerClick className="w-10 h-10 text-neutral-600 animate-pulse" />
              <p className="text-xs font-bold text-neutral-400">Selecciona algún elemento en el lienzo</p>
              <p className="text-[10px] leading-relaxed max-w-[200px]">Haz clic en cualquier sección, columna, imagen, texto o botón de la web real para abrir todos sus estilos en este panel lateral instantáneamente.</p>
            </div>
          ) : (
            <div className="flex-grow flex flex-col min-h-0 font-sans">
              
              {/* Tabs list (Mirroring Divi/Elementor panel tabs) */}
              <div className="grid grid-cols-3 border-b border-[#2a2a2a] text-[10px] font-black uppercase text-center bg-[#151515]">
                <button 
                  onClick={() => setActiveInspectorTab("content")} 
                  className={`py-3 transition-colors cursor-pointer ${activeInspectorTab === "content" ? "border-b-2 border-[#e12d8a] text-white font-bold" : "text-neutral-400 hover:text-white"}`}
                >
                  Contenido
                </button>
                <button 
                  onClick={() => {
                    if (isFieldUnlocked("design")) {
                      setActiveInspectorTab("design");
                    }
                  }} 
                  disabled={!isFieldUnlocked("design")}
                  className={`py-3 flex items-center justify-center gap-1 transition-colors ${!isFieldUnlocked("design") ? "opacity-40 cursor-not-allowed text-neutral-550" : "cursor-pointer"} ${activeInspectorTab === "design" ? "border-b-2 border-[#e12d8a] text-white font-bold" : "text-neutral-400 hover:text-white"}`}
                  title={!isFieldUnlocked("design") ? "Bloqueado para tu rol actual" : "Diseño del elemento"}
                >
                  {!isFieldUnlocked("design") && <Lock className="w-2.5 h-2.5 text-amber-500" />}
                  Diseño
                </button>
                <button 
                  onClick={() => {
                    if (isFieldUnlocked("advanced")) {
                      setActiveInspectorTab("advanced");
                    }
                  }} 
                  disabled={!isFieldUnlocked("advanced")}
                  className={`py-3 flex items-center justify-center gap-1 transition-colors ${!isFieldUnlocked("advanced") ? "opacity-40 cursor-not-allowed text-neutral-550" : "cursor-pointer"} ${activeInspectorTab === "advanced" ? "border-b-2 border-[#e12d8a] text-white font-bold" : "text-neutral-400 hover:text-white"}`}
                  title={!isFieldUnlocked("advanced") ? "Bloqueado para tu rol actual" : "Opciones avanzadas"}
                >
                  {!isFieldUnlocked("advanced") && <Lock className="w-2.5 h-2.5 text-amber-500" />}
                  Avanzado
                </button>
              </div>

              {/* Inspector Content body forms */}
              <div className="p-4 flex-grow overflow-y-auto space-y-4 text-xs font-medium text-neutral-300">
                
                {/* ==================== CONTENT TAB ==================== */}
                {activeInspectorTab === "content" && (
                  <div className="space-y-4">
                    
                    {/* EDIT SECTION CONTENT */}
                    {selectedElement.type === "section" && (
                      <div className="space-y-3">
                        <div>
                          <label className="text-[10px] text-neutral-400 font-bold block uppercase mb-1">Nombre Identificador</label>
                          <input 
                            type="text" 
                            value={selectedObj?.name || ""} 
                            onChange={(e) => updateSelectedObject({ name: e.target.value })}
                            className="w-full bg-[#2a2a2a] border border-[#3a3a3a] rounded-lg px-2.5 py-1.5 text-white focus:outline-none focus:border-[#e12d8a] text-xs font-sans"
                          />
                        </div>
                        <div>
                          <label className="text-[10px] text-neutral-400 font-bold block uppercase mb-1">Fondo de sección (Imagen URL)</label>
                          <input 
                            type="text" 
                            value={selectedObj?.bgImage || ""} 
                            onChange={(e) => updateSelectedObject({ bgImage: e.target.value })}
                            placeholder="e.g. https://images..."
                            className="w-full bg-[#2a2a2a] border border-[#3a3a3a] rounded-lg px-2.5 py-1.5 text-white focus:outline-none focus:border-[#e12d8a] text-xs font-mono"
                          />
                        </div>
                      </div>
                    )}

                    {/* EDIT ROW COLS COUNT */}
                    {selectedElement.type === "row" && (
                      <div className="space-y-3">
                        <div>
                          <label className="text-[10px] text-neutral-400 font-bold block uppercase mb-1">Número de Columnas</label>
                          <select 
                            value={selectedObj?.columnsCount || 1} 
                            onChange={(e) => {
                              const count = parseInt(e.target.value) as 1|2|3|4;
                              const generateId = () => `col-${Math.random().toString(36).substr(2, 9)}`;
                              
                              // Regenerate columns with correct spans
                              let newCols: BuilderColumn[] = [];
                              if (count === 1) newCols = [{ id: generateId(), span: 12, modules: selectedObj.columns[0]?.modules || [] }];
                              else if (count === 2) {
                                newCols = [
                                  { id: generateId(), span: 6, modules: selectedObj.columns[0]?.modules || [] },
                                  { id: generateId(), span: 6, modules: selectedObj.columns[1]?.modules || [] }
                                ];
                              } else if (count === 3) {
                                newCols = [
                                  { id: generateId(), span: 4, modules: selectedObj.columns[0]?.modules || [] },
                                  { id: generateId(), span: 4, modules: selectedObj.columns[1]?.modules || [] },
                                  { id: generateId(), span: 4, modules: selectedObj.columns[2]?.modules || [] }
                                ];
                              } else if (count === 4) {
                                newCols = [
                                  { id: generateId(), span: 3, modules: selectedObj.columns[0]?.modules || [] },
                                  { id: generateId(), span: 3, modules: selectedObj.columns[1]?.modules || [] },
                                  { id: generateId(), span: 3, modules: selectedObj.columns[2]?.modules || [] },
                                  { id: generateId(), span: 3, modules: selectedObj.columns[3]?.modules || [] }
                                ];
                              }
                              updateSelectedObject({ columnsCount: count, columns: newCols });
                            }}
                            className="w-full bg-[#2a2a2a] border border-[#3a3a3a] rounded-lg px-2.5 py-1.5 text-white focus:outline-none focus:border-[#e12d8a] text-xs"
                          >
                            <option value={1}>1 Columna (Ancho Completo)</option>
                            <option value={2}>2 Columnas (Mitad/Mitad)</option>
                            <option value={3}>3 Columnas (Un Tercio)</option>
                            <option value={4}>4 Columnas (Un Cuarto)</option>
                          </select>
                        </div>
                      </div>
                    )}

                    {/* EDIT COLUMN BACKGROUND */}
                    {selectedElement.type === "column" && (
                      <div className="space-y-3">
                        <div>
                          <label className="text-[10px] text-neutral-400 font-bold flex items-center gap-1 uppercase mb-1">
                            Ancho Columna (Fila grid span)
                            {!isFieldUnlocked("content-layout") && <Lock className="w-2.5 h-2.5 text-amber-500 inline" />}
                          </label>
                          <select 
                            value={selectedObj?.span || 12}
                            disabled={!isFieldUnlocked("content-layout")}
                            onChange={(e) => updateSelectedObject({ span: parseInt(e.target.value) })}
                            className={`w-full bg-[#2a2a2a] border border-[#3a3a3a] rounded-lg px-2.5 py-1.5 text-white focus:outline-none focus:border-[#e12d8a] text-xs font-mono ${!isFieldUnlocked("content-layout") ? "opacity-50 cursor-not-allowed" : ""}`}
                          >
                            <option value={12}>100% Ancho (span 12)</option>
                            <option value={8}>66% Ancho (span 8)</option>
                            <option value={6}>50% Ancho (span 6)</option>
                            <option value={4}>33% Ancho (span 4)</option>
                            <option value={3}>25% Ancho (span 3)</option>
                          </select>
                        </div>
                      </div>
                    )}

                    {/* EDIT MODULE DETAIL CONTENT */}
                    {selectedElement.type === "module" && (
                      <div className="space-y-4 font-sans">
                        
                        {/* Text fields for headers or paragraphs */}
                        {(selectedObj?.type === "heading" || selectedObj?.type === "text") && (
                          <div className="space-y-3">
                            <div>
                              <label className="text-[10px] text-neutral-400 font-bold flex items-center gap-1 uppercase mb-1">
                                Contenido de Texto
                                {!isFieldUnlocked("content-text") && <Lock className="w-2.5 h-2.5 text-amber-500 inline" />}
                              </label>
                              <textarea 
                                rows={6}
                                value={selectedObj?.content?.text || ""} 
                                disabled={!isFieldUnlocked("content-text")}
                                onChange={(e) => updateSelectedObject({
                                  content: { ...selectedObj.content, text: e.target.value }
                                })}
                                className={`w-full bg-[#2a2a2a] border border-[#3a3a3a] rounded-lg px-2.5 py-2 text-white focus:outline-none focus:border-[#e12d8a] text-xs font-sans ring-1 ring-neutral-750 ${!isFieldUnlocked("content-text") ? "opacity-55 cursor-not-allowed" : ""}`}
                              />
                            </div>

                            {selectedObj?.type === "heading" && (
                              <div>
                                <label className="text-[10px] text-neutral-400 font-bold flex items-center gap-1 uppercase mb-1">
                                  Etiqueta HTML (SEO)
                                  {!isFieldUnlocked("content-layout") && <Lock className="w-2.5 h-2.5 text-amber-500 inline" />}
                                </label>
                                <select 
                                  value={selectedObj?.content?.tag || "h3"}
                                  disabled={!isFieldUnlocked("content-layout")}
                                  onChange={(e) => updateSelectedObject({
                                    content: { ...selectedObj.content, tag: e.target.value }
                                  })}
                                  className={`w-full bg-[#2a2a2a] border border-[#3a3a3a] rounded-lg px-2.5 py-1.5 text-[#eaeaea] text-xs ${!isFieldUnlocked("content-layout") ? "opacity-55 cursor-not-allowed" : ""}`}
                                >
                                  <option value="h1">Header H1 Principal</option>
                                  <option value="h2">H2 Sección</option>
                                  <option value="h3">H3 Subsección</option>
                                  <option value="h4">H4 Tarjetas</option>
                                  <option value="h5">H5 Mini</option>
                                  <option value="h6">H6 Badge superior</option>
                                </select>
                              </div>
                            )}

                          </div>
                        )}

                        {/* Image fields content */}
                        {selectedObj?.type === "image" && (
                          <div className="space-y-3">
                            <div>
                              <label className="text-[10px] text-neutral-400 font-bold flex items-center gap-1 uppercase mb-1">
                                Ruta de imagen (URL)
                                {!isFieldUnlocked("content-media") && <Lock className="w-2.5 h-2.5 text-amber-500 inline" />}
                              </label>
                              <input 
                                type="text"
                                value={selectedObj?.content?.src || ""}
                                disabled={!isFieldUnlocked("content-media")}
                                onChange={(e) => updateSelectedObject({
                                  content: { ...selectedObj.content, src: e.target.value }
                                })}
                                className={`w-full bg-[#2a2a2a] border border-[#3a3a3a] rounded-lg px-2.5 py-1.5 text-white text-xs font-mono ${!isFieldUnlocked("content-media") ? "opacity-55 cursor-not-allowed" : ""}`}
                              />
                            </div>
                            <div>
                              <label className="text-[10px] text-neutral-400 font-bold flex items-center gap-1 uppercase mb-1">
                                Texto alternativo (Alt)
                                {!isFieldUnlocked("content-text") && <Lock className="w-2.5 h-2.5 text-amber-500 inline" />}
                              </label>
                              <input 
                                type="text"
                                value={selectedObj?.content?.alt || ""}
                                disabled={!isFieldUnlocked("content-text")}
                                onChange={(e) => updateSelectedObject({
                                  content: { ...selectedObj.content, alt: e.target.value }
                                })}
                                className={`w-full bg-[#2a2a2a] border border-[#3a3a3a] rounded-lg px-2.5 py-1.5 text-white text-xs ${!isFieldUnlocked("content-text") ? "opacity-55 cursor-not-allowed" : ""}`}
                              />
                            </div>
                          </div>
                        )}

                        {/* Button fields content */}
                        {selectedObj?.type === "button" && (
                          <div className="space-y-4">
                            <div>
                              <label className="text-[10px] text-neutral-400 font-bold block uppercase mb-1">Texto del Botón</label>
                              <input 
                                type="text"
                                value={selectedObj?.content?.text || ""}
                                onChange={(e) => updateSelectedObject({
                                  content: { ...selectedObj.content, text: e.target.value }
                                })}
                                className="w-full bg-[#2a2a2a] border border-[#3a3a3a] rounded-lg px-2.5 py-1.5 text-white text-xs"
                              />
                            </div>
                            <div>
                              <label className="text-[10px] text-neutral-400 font-bold block uppercase mb-1">Enlace de Destino (URL o Anchor)</label>
                              <input 
                                type="text"
                                value={selectedObj?.content?.link || ""}
                                onChange={(e) => updateSelectedObject({
                                  content: { ...selectedObj.content, link: e.target.value }
                                })}
                                className="w-full bg-[#2a2a2a] border border-[#3a3a3a] rounded-lg px-2.5 py-1.5 text-white text-xs font-mono"
                              />
                            </div>

                            {/* Custom Background Color Selection */}
                            <div className="border-t border-neutral-800 pt-3 space-y-1.5">
                              <label className="text-[10px] text-neutral-400 font-bold block uppercase">Color de Fondo del Botón</label>
                              <div className="flex flex-wrap gap-1">
                                {PRESET_COLORS.map(color => (
                                  <button
                                    key={color}
                                    type="button"
                                    title={color}
                                    onClick={() => updateSelectedObject({ style: { ...selectedObj.style, bgColor: color } })}
                                    className={`w-4.5 h-4.5 rounded-full border transition-all active:scale-95 ${selectedObj.style?.bgColor === color ? "border-white scale-110" : "border-neutral-700"}`}
                                    style={{ backgroundColor: color }}
                                  />
                                ))}
                              </div>
                              <div className="flex gap-1.5 items-center">
                                <input 
                                  type="color" 
                                  value={selectedObj.style?.bgColor || "#e12d8a"} 
                                  onChange={(e) => updateSelectedObject({ style: { ...selectedObj.style, bgColor: e.target.value } })}
                                  className="w-8 h-8 rounded border border-[#3a3a3a] bg-[#2a2a2a] cursor-pointer"
                                />
                                <input 
                                  type="text"
                                  value={selectedObj.style?.bgColor || "#e12d8a"} 
                                  onChange={(e) => updateSelectedObject({ style: { ...selectedObj.style, bgColor: e.target.value } })}
                                  className="flex-1 bg-[#2a2a2a] border border-[#3a3a3a] rounded-lg px-2.5 py-1.5 text-white text-xs font-mono"
                                  placeholder="#hex"
                                />
                              </div>
                            </div>

                            {/* Custom Text Color Selection */}
                            <div className="border-t border-neutral-800 pt-3 space-y-1.5">
                              <label className="text-[10px] text-neutral-400 font-bold block uppercase">Color de Texto del Botón</label>
                              <div className="flex flex-wrap gap-1">
                                {PRESET_COLORS.map(color => (
                                  <button
                                    key={color}
                                    type="button"
                                    title={color}
                                    onClick={() => updateSelectedObject({ style: { ...selectedObj.style, textColor: color } })}
                                    className={`w-4.5 h-4.5 rounded-full border transition-all active:scale-95 ${selectedObj.style?.textColor === color ? "border-white scale-110" : "border-neutral-700"}`}
                                    style={{ backgroundColor: color }}
                                  />
                                ))}
                              </div>
                              <div className="flex gap-1.5 items-center">
                                <input 
                                  type="color" 
                                  value={selectedObj.style?.textColor || "#ffffff"} 
                                  onChange={(e) => updateSelectedObject({ style: { ...selectedObj.style, textColor: e.target.value } })}
                                  className="w-8 h-8 rounded border border-[#3a3a3a] bg-[#2a2a2a] cursor-pointer"
                                />
                                <input 
                                  type="text"
                                  value={selectedObj.style?.textColor || "#ffffff"} 
                                  onChange={(e) => updateSelectedObject({ style: { ...selectedObj.style, textColor: e.target.value } })}
                                  className="flex-1 bg-[#2a2a2a] border border-[#3a3a3a] rounded-lg px-2.5 py-1.5 text-white text-xs font-mono"
                                  placeholder="#hex"
                                />
                              </div>
                            </div>
                          </div>
                        )}

                        {/* Icon field Content selector */}
                        {selectedObj?.type === "icon" && (
                          <div>
                            <label className="text-[10px] text-neutral-400 font-bold block uppercase mb-1">Elegir Lucide Icono</label>
                            <select
                              value={selectedObj?.content?.iconName || "Star"}
                              onChange={(e) => updateSelectedObject({
                                content: { ...selectedObj.content, iconName: e.target.value }
                              })}
                              className="w-full bg-[#2a2a2a] border border-[#3a3a3a] rounded-lg px-2.5 py-1.5 text-neutral-200 text-xs"
                            >
                              <option value="Award">Award (Sello Premium)</option>
                              <option value="Shield">Shield (Seguridad)</option>
                              <option value="Compass">Compass (Brujula Guía)</option>
                              <option value="Heart">Heart (Pasión Favorito)</option>
                              <option value="Phone">Phone (Contacto)</option>
                              <option value="Mail">Mail (Correo)</option>
                              <option value="MapPin">MapPin (Ubicacion)</option>
                              <option value="Sparkles">Sparkles (IA Planner)</option>
                            </select>
                          </div>
                        )}

                        {/* Accordion list items generator */}
                        {selectedObj?.type === "accordion" && (
                          <div className="space-y-4">
                            <span className="text-[10px] font-bold text-neutral-400 block uppercase">Elementos del Colapsable</span>
                            {(selectedObj.content.items || []).map((item: any, idx: number) => (
                              <div key={idx} className="border border-neutral-850 p-2.5 rounded-lg bg-neutral-900 space-y-2">
                                <input 
                                  type="text"
                                  value={item.title}
                                  onChange={(e) => {
                                    const updated = [...selectedObj.content.items];
                                    updated[idx].title = e.target.value;
                                    updateSelectedObject({ content: { ...selectedObj.content, items: updated } });
                                  }}
                                  className="w-full bg-[#2a2a2a] border border-[#3a3a3a] rounded px-2 py-1 text-white text-[11px] font-bold"
                                />
                                <textarea 
                                  value={item.desc}
                                  rows={3}
                                  onChange={(e) => {
                                    const updated = [...selectedObj.content.items];
                                    updated[idx].desc = e.target.value;
                                    updateSelectedObject({ content: { ...selectedObj.content, items: updated } });
                                  }}
                                  className="w-full bg-[#2a2a2a] border border-[#3a3a3a] rounded px-2 py-1 text-white text-[10px]"
                                />
                              </div>
                            ))}
                          </div>
                        )}

                        {/* LIVE INTEGRATIONS INFOBOX */}
                        {["grid-packages", "testimonials", "contact-form"].includes(selectedObj?.type) && (
                          <div className="p-3 bg-[#e12d8a]/5 border border-[#e12d8a]/20 rounded-xl text-neutral-400 leading-relaxed text-[11px]">
                            🔔 Este es un módulo modular unificado con el núcleo backend inteligente de <strong>Sisari Travel</strong>. La disposición, diseño, sombras y color se sincronizan directamente con el sistema dinámico.
                          </div>
                        )}

                        {/* Video module fields content */}
                        {selectedObj?.type === "video" && (
                          <div className="space-y-4">
                            <div>
                              <label className="text-[10px] text-neutral-400 font-bold flex items-center gap-1 uppercase mb-1">
                                Título del Video (SEO / Alt)
                                {!isFieldUnlocked("content-text") && <Lock className="w-2.5 h-2.5 text-amber-500 inline" />}
                              </label>
                              <input 
                                type="text"
                                value={selectedObj?.content?.title || selectedObj?.content?.videoTitle || "Video de Presentación"}
                                disabled={!isFieldUnlocked("content-text")}
                                onChange={(e) => updateSelectedObject({
                                  content: { ...selectedObj.content, title: e.target.value, videoTitle: e.target.value }
                                })}
                                className={`w-full bg-[#2a2a2a] border border-[#3a3a3a] rounded-lg px-2.5 py-1.5 text-white text-xs ${!isFieldUnlocked("content-text") ? "opacity-55 cursor-not-allowed" : ""}`}
                              />
                            </div>

                            <div>
                              <label className="text-[10px] text-neutral-400 font-bold flex items-center gap-1 uppercase mb-1">
                                Tipo de Origen
                                {!isFieldUnlocked("content-media") && <Lock className="w-2.5 h-2.5 text-amber-500 inline" />}
                              </label>
                              <select 
                                value={selectedObj?.content?.videoType || "youtube"}
                                disabled={!isFieldUnlocked("content-media")}
                                onChange={(e) => updateSelectedObject({
                                  content: { ...selectedObj.content, videoType: e.target.value }
                                })}
                                className={`w-full bg-[#2a2a2a] border border-[#3a3a3a] rounded-lg px-2.5 py-1.5 text-white text-xs ${!isFieldUnlocked("content-media") ? "opacity-55 cursor-not-allowed" : ""}`}
                              >
                                <option value="youtube">YouTube (iframe)</option>
                                <option value="vimeo">Vimeo (iframe)</option>
                                <option value="custom">Video Directo (MP4/HLS / .mp4 URL)</option>
                              </select>
                            </div>

                            <div>
                              <label className="text-[10px] text-neutral-400 font-bold flex items-center gap-1 uppercase mb-1">
                                Enlace / URL del Video
                                {!isFieldUnlocked("content-media") && <Lock className="w-2.5 h-2.5 text-amber-500 inline" />}
                              </label>
                              <input 
                                type="text"
                                value={selectedObj?.content?.src || selectedObj?.content?.videoUrl || ""}
                                disabled={!isFieldUnlocked("content-media")}
                                placeholder={
                                  selectedObj?.content?.videoType === "youtube" 
                                    ? "https://www.youtube.com/embed/dQw4w9WgXcQ" 
                                    : selectedObj?.content?.videoType === "vimeo" 
                                      ? "https://player.vimeo.com/video/519805" 
                                      : "https://assets.mixkit.co/videos/preview/mixkit-machu-picchu-panoramic-view-42171-large.mp4"
                                }
                                onChange={(e) => updateSelectedObject({
                                  content: { ...selectedObj.content, src: e.target.value, videoUrl: e.target.value }
                                })}
                                className={`w-full bg-[#2a2a2a] border border-[#3a3a3a] rounded-lg px-2.5 py-1.5 text-white text-xs font-mono ${!isFieldUnlocked("content-media") ? "opacity-55 cursor-not-allowed" : ""}`}
                              />
                              <p className="text-[9px] text-neutral-500 italic mt-1">
                                Asegúrate de ingresar el enlace de incrustación (embed) o la ruta directa al archivo multimedia.
                              </p>
                            </div>
                          </div>
                        )}

                        {/* Interactive Link Editor for other elements */}
                        {selectedObj?.type && ["heading", "text", "image", "icon"].includes(selectedObj.type) && (
                          <div className="pt-3 border-t border-[#3a3a3a] mt-3 space-y-2">
                            <label className="text-[10px] text-neutral-400 font-bold block uppercase tracking-wider">Enlace / URL de Destino (Opcional)</label>
                            <input 
                              type="text"
                              value={selectedObj?.content?.link || ""}
                              onChange={(e) => updateSelectedObject({
                                content: { ...selectedObj.content, link: e.target.value }
                              })}
                              placeholder="Ej. https://wa.me/51980535383 o #contacto"
                              className="w-full bg-[#2a2a2a] border border-[#3a3a3a] rounded-lg px-2.5 py-1.5 text-white text-xs font-mono"
                            />
                            <p className="text-[9px] text-neutral-500 italic mt-0.5">Permite asignarle un enlace interactivo de redirección al elemento al ser presionado.</p>
                          </div>
                        )}

                      </div>
                    )}

                  </div>
                )}


                {/* ==================== DESIGN TAB ==================== */}
                {activeInspectorTab === "design" && (
                  <div className="space-y-5 font-sans">
                    
                    {/* PALETTE COLOR SELECTOR SYSTEM */}
                    <div className="p-3 bg-[#222222] rounded-xl border border-neutral-800 space-y-3">
                      <h5 className="text-[10px] uppercase font-black tracking-wider text-[#e12d8a]">🎨 Fondo y Colores</h5>
                      
                      {/* Background Color */}
                      <div className="space-y-1.5">
                        <label className="text-[10px] text-neutral-400 font-bold block uppercase">Color de Fondo</label>
                        <div className="grid grid-cols-6 gap-1 mb-1.5">
                          {PRESET_COLORS.map(color => (
                            <button
                              key={color}
                              type="button"
                              onClick={() => {
                                if (selectedElement.type === "section") updateSelectedObject({ bgColor: color });
                                else if (selectedElement.type === "row") updateSelectedObject({ bgColor: color });
                                else if (selectedElement.type === "column") updateSelectedObject({ bgColor: color });
                                else if (selectedElement.type === "module") updateSelectedObject({ style: { ...selectedObj.style, bgColor: color } });
                              }}
                              className="w-full h-5 rounded border border-[#3d3d3d] cursor-pointer"
                              style={{ backgroundColor: color }}
                              title={color}
                            />
                          ))}
                        </div>
                        <input 
                          type="text"
                          value={
                            selectedElement.type === "module" ? (selectedObj?.style?.bgColor || "") : (selectedObj?.bgColor || "")
                          }
                          onChange={(e) => {
                            if (selectedElement.type === "section") updateSelectedObject({ bgColor: e.target.value });
                            else if (selectedElement.type === "row") updateSelectedObject({ bgColor: e.target.value });
                            else if (selectedElement.type === "column") updateSelectedObject({ bgColor: e.target.value });
                            else if (selectedElement.type === "module") updateSelectedObject({ style: { ...selectedObj.style, bgColor: e.target.value } });
                          }}
                          placeholder="#transparent"
                          className="w-full bg-[#1a1a1a] border border-[#3a3a3a] rounded px-2.5 py-1 text-white text-xs font-mono"
                        />
                      </div>

                      {/* Text / Primary Color */}
                      <div className="space-y-1.5 border-t border-neutral-800 pt-2.5">
                        <label className="text-[10px] text-neutral-400 font-bold block uppercase">Color de Texto o Elemento</label>
                        <div className="grid grid-cols-6 gap-1 mb-1.5">
                          {PRESET_COLORS.map(color => (
                            <button
                              key={color}
                              type="button"
                              onClick={() => {
                                if (selectedElement.type === "section") updateSelectedObject({ textColor: color });
                                else if (selectedElement.type === "module") updateSelectedObject({ style: { ...selectedObj.style, textColor: color } });
                                else updateSelectedObject({ textColor: color });
                              }}
                              className="w-full h-5 rounded border border-[#3d3d3d] cursor-pointer"
                              style={{ backgroundColor: color }}
                              title={color}
                            />
                          ))}
                        </div>
                        <input 
                          type="text"
                          value={
                            selectedElement.type === "module" ? (selectedObj?.style?.textColor || "") : (selectedObj?.textColor || "")
                          }
                          onChange={(e) => {
                            if (selectedElement.type === "section") updateSelectedObject({ textColor: e.target.value });
                            else if (selectedElement.type === "module") updateSelectedObject({ style: { ...selectedObj.style, textColor: e.target.value } });
                            else updateSelectedObject({ textColor: e.target.value });
                          }}
                          placeholder="#ffffff"
                          className="w-full bg-[#1a1a1a] border border-[#3a3a3a] rounded px-2.5 py-1 text-white text-xs font-mono"
                        />
                      </div>
                    </div>

                    {/* SPACING: MARGINS & PADDINGS */}
                    <div className="p-3 bg-[#222222] rounded-xl border border-neutral-800 space-y-3.5">
                      <h5 className="text-[10px] uppercase font-black tracking-wider text-[#e12d8a]">📐 Espaciado (Márgenes y Rellenos)</h5>
                      
                      {/* Padding Y */}
                      <div>
                        <label className="text-[10px] text-neutral-400 font-bold block uppercase mb-1">
                          Relleno Vertical (Padding Y / Interno: {
                            selectedElement.type === "module" ? (selectedObj.style?.paddingY || 0) : 
                            (selectedObj?.paddingY !== undefined ? selectedObj.paddingY : (selectedObj?.padding || 0))
                          }px)
                        </label>
                        <input 
                          type="range" 
                          min="0" 
                          max="160" 
                          value={
                            selectedElement.type === "module" ? (selectedObj.style?.paddingY || 0) : 
                            (selectedObj?.paddingY !== undefined ? selectedObj.paddingY : (selectedObj?.padding || 0))
                          }
                          onChange={(e) => {
                            const val = parseInt(e.target.value);
                            if (selectedElement.type === "section") updateSelectedObject({ paddingY: val });
                            else if (selectedElement.type === "row") updateSelectedObject({ paddingY: val });
                            else if (selectedElement.type === "column") updateSelectedObject({ padding: val });
                            else if (selectedElement.type === "module") updateSelectedObject({ style: { ...selectedObj.style, paddingY: val } });
                          }}
                          className="w-full h-1 bg-[#1a1a1a] rounded appearance-none cursor-pointer accent-[#e12d8a]"
                        />
                      </div>

                      {/* Padding X */}
                      <div>
                        <label className="text-[10px] text-neutral-400 font-bold block uppercase mb-1">
                          Relleno Horizontal (Padding X: {
                            selectedElement.type === "module" ? (selectedObj.style?.paddingX || 0) : (selectedObj?.paddingX || 0)
                          }px)
                        </label>
                        <input 
                          type="range" 
                          min="0" 
                          max="120" 
                          value={
                            selectedElement.type === "module" ? (selectedObj.style?.paddingX || 0) : (selectedObj?.paddingX || 0)
                          }
                          onChange={(e) => {
                            const val = parseInt(e.target.value);
                            if (selectedElement.type === "section") updateSelectedObject({ paddingX: val });
                            else if (selectedElement.type === "row") updateSelectedObject({ paddingX: val });
                            else if (selectedElement.type === "column") updateSelectedObject({ paddingX: val });
                            else if (selectedElement.type === "module") updateSelectedObject({ style: { ...selectedObj.style, paddingX: val } });
                          }}
                          className="w-full h-1 bg-[#1a1a1a] rounded appearance-none cursor-pointer accent-[#e12d8a]"
                        />
                      </div>

                      {/* Margin Y */}
                      <div>
                        <label className="text-[10px] text-neutral-400 font-bold block uppercase mb-1">
                          Margen Externo (Margin Y: {
                            selectedElement.type === "module" ? (selectedObj.style?.marginY || 0) : (selectedObj?.marginY || 0)
                          }px)
                        </label>
                        <input 
                          type="range" 
                          min="-20" 
                          max="120" 
                          value={
                            selectedElement.type === "module" ? (selectedObj.style?.marginY || 0) : (selectedObj?.marginY || 0)
                          }
                          onChange={(e) => {
                            const val = parseInt(e.target.value);
                            if (selectedElement.type === "section") updateSelectedObject({ marginY: val });
                            else if (selectedElement.type === "row") updateSelectedObject({ marginY: val });
                            else if (selectedElement.type === "column") updateSelectedObject({ marginY: val });
                            else if (selectedElement.type === "module") updateSelectedObject({ style: { ...selectedObj.style, marginY: val } });
                          }}
                          className="w-full h-1 bg-[#1a1a1a] rounded appearance-none cursor-pointer accent-[#e12d8a]"
                        />
                      </div>

                      {/* Margin Bottom */}
                      <div>
                        <label className="text-[10px] text-neutral-400 font-bold block uppercase mb-1">
                          Margen Inferior Específico (Margin Bottom: {
                            selectedElement.type === "module" ? (selectedObj.style?.marginBottom || 0) : (selectedObj?.marginBottom || 0)
                          }px)
                        </label>
                        <input 
                          type="range" 
                          min="0" 
                          max="120" 
                          value={
                            selectedElement.type === "module" ? (selectedObj.style?.marginBottom || 0) : (selectedObj?.marginBottom || 0)
                          }
                          onChange={(e) => {
                            const val = parseInt(e.target.value);
                            if (selectedElement.type === "section") updateSelectedObject({ marginBottom: val });
                            else if (selectedElement.type === "row") updateSelectedObject({ marginBottom: val });
                            else if (selectedElement.type === "column") updateSelectedObject({ marginBottom: val });
                            else if (selectedElement.type === "module") updateSelectedObject({ style: { ...selectedObj.style, marginBottom: val } });
                          }}
                          className="w-full h-1 bg-[#1a1a1a] rounded appearance-none cursor-pointer accent-[#e12d8a]"
                        />
                      </div>
                    </div>

                    {/* BORDERS & CORNERS */}
                    <div className="p-3 bg-[#222222] rounded-xl border border-neutral-800 space-y-3.5">
                      <h5 className="text-[10px] uppercase font-black tracking-wider text-[#e12d8a]">🔲 Bordes y Esquinas</h5>
                      
                      {/* Border Width */}
                      <div>
                        <label className="text-[10px] text-neutral-400 font-bold block uppercase mb-1">
                          Grosor del Borde ({
                            selectedElement.type === "module" ? (selectedObj.style?.borderWidth || 0) : (selectedObj?.borderWidth || 0)
                          }px)
                        </label>
                        <input 
                          type="range" 
                          min="0" 
                          max="12" 
                          value={
                            selectedElement.type === "module" ? (selectedObj.style?.borderWidth || 0) : (selectedObj?.borderWidth || 0)
                          }
                          onChange={(e) => {
                            const val = parseInt(e.target.value);
                            if (selectedElement.type === "section") updateSelectedObject({ borderWidth: val });
                            else if (selectedElement.type === "row") updateSelectedObject({ borderWidth: val });
                            else if (selectedElement.type === "column") updateSelectedObject({ borderWidth: val });
                            else if (selectedElement.type === "module") updateSelectedObject({ style: { ...selectedObj.style, borderWidth: val } });
                          }}
                          className="w-full h-1 bg-[#1a1a1a] rounded appearance-none cursor-pointer accent-[#e12d8a]"
                        />
                      </div>

                      {/* Border Radius */}
                      <div>
                        <label className="text-[10px] text-neutral-400 font-bold block uppercase mb-1">
                          Bordes Redondeados (Esquinas: {
                            selectedElement.type === "module" ? (selectedObj.style?.borderRadius || 0) : (selectedObj?.borderRadius || 0)
                          }px)
                        </label>
                        <input 
                          type="range" 
                          min="0" 
                          max="100" 
                          value={
                            selectedElement.type === "module" ? (selectedObj.style?.borderRadius || 0) : (selectedObj?.borderRadius || 0)
                          }
                          onChange={(e) => {
                            const val = parseInt(e.target.value);
                            if (selectedElement.type === "section") updateSelectedObject({ borderRadius: val });
                            else if (selectedElement.type === "row") updateSelectedObject({ borderRadius: val });
                            else if (selectedElement.type === "column") updateSelectedObject({ borderRadius: val });
                            else if (selectedElement.type === "module") updateSelectedObject({ style: { ...selectedObj.style, borderRadius: val } });
                          }}
                          className="w-full h-1 bg-[#1a1a1a] rounded appearance-none cursor-pointer accent-[#e12d8a]"
                        />
                      </div>

                      {/* Border Color */}
                      <div className="space-y-1">
                        <label className="text-[10px] text-neutral-400 font-bold block uppercase">Color del Borde</label>
                        <input 
                          type="text"
                          value={
                            selectedElement.type === "module" ? (selectedObj?.style?.borderColor || "") : (selectedObj?.borderColor || "")
                          }
                          onChange={(e) => {
                            if (selectedElement.type === "section") updateSelectedObject({ borderColor: e.target.value });
                            else if (selectedElement.type === "row") updateSelectedObject({ borderColor: e.target.value });
                            else if (selectedElement.type === "column") updateSelectedObject({ borderColor: e.target.value });
                            else if (selectedElement.type === "module") updateSelectedObject({ style: { ...selectedObj.style, borderColor: e.target.value } });
                          }}
                          placeholder="#e2e8f0"
                          className="w-full bg-[#1a1a1a] border border-[#3a3a3a] rounded px-2.5 py-1 text-white text-xs font-mono"
                        />
                      </div>
                    </div>

                    {/* CONTAINER SIZE (MAX-WIDTH) */}
                    {(selectedElement.type === "section" || selectedElement.type === "row" || selectedElement.type === "module") && (
                      <div className="p-3 bg-[#222222] rounded-xl border border-neutral-800 space-y-2">
                        <h5 className="text-[10px] uppercase font-black tracking-wider text-[#e12d8a]">📏 Ancho de Contenedor</h5>
                        <select
                          value={selectedObj?.maxWidth || ""}
                          onChange={(e) => updateSelectedObject({ maxWidth: e.target.value })}
                          className="w-full bg-[#1a1a1a] border border-[#3a3a3a] rounded px-2.5 py-1 text-white text-xs"
                        >
                          <option value="">Por defecto (Automático / Completo)</option>
                          <option value="100%">100% Ancho Completo</option>
                          <option value="1536px">Ancho Ultra Extendido (2XL - 1536px)</option>
                          <option value="1280px">Ancho Estándar Divi (XL - 1280px)</option>
                          <option value="1024px">Ancho Centrado (LG - 1024px)</option>
                          <option value="768px">Ancho Contenido Angosto (MD - 768px)</option>
                          <option value="640px">Ancho Mini (SM - 640px)</option>
                        </select>
                      </div>
                    )}

                    {/* BOX SHADOW */}
                    <div className="p-3 bg-[#222222] rounded-xl border border-neutral-800 space-y-2">
                      <h5 className="text-[10px] uppercase font-black tracking-wider text-[#e12d8a]">👥 Sombras Proyectadas</h5>
                      <select
                        value={
                          selectedElement.type === "module" ? (selectedObj.style?.shadow || "none") : (selectedObj?.shadow || "none")
                        }
                        onChange={(e) => {
                          if (selectedElement.type === "module") updateSelectedObject({ style: { ...selectedObj.style, shadow: e.target.value } });
                          else updateSelectedObject({ shadow: e.target.value });
                        }}
                        className="w-full bg-[#1a1a1a] border border-[#3a3a3a] rounded px-2.5 py-1 text-white text-xs"
                      >
                        {SHADOWS.map(sh => (
                          <option key={sh.value} value={sh.value}>{sh.name}</option>
                        ))}
                      </select>
                    </div>

                    {/* MODULE SPECIFIC TYPOGRAPHY & FONT SETTINGS */}
                    {selectedElement.type === "module" && (
                      <div className="p-3 bg-[#222222] rounded-xl border border-neutral-800 space-y-3.5">
                        <h5 className="text-[10px] uppercase font-black tracking-wider text-[#e12d8a]">✍️ Tipografía del Elemento</h5>
                        
                        {/* Font size input */}
                        {(selectedObj?.type === "heading" || selectedObj?.type === "text" || selectedObj?.type === "icon" || selectedObj?.type === "button") && (
                          <div>
                            <label className="text-[10px] text-neutral-400 font-bold block uppercase mb-1">Tamaño de Fuente ({selectedObj.style?.fontSize || "Por defecto"})</label>
                            <input 
                              type="text"
                              value={selectedObj.style?.fontSize || ""}
                              onChange={(e) => updateSelectedObject({ style: { ...selectedObj.style, fontSize: e.target.value } })}
                              placeholder="e.g. 32px or 1.5rem"
                              className="w-full bg-[#1a1a1a] border border-[#3a3a3a] rounded px-2 py-1 text-white text-xs font-mono"
                            />
                            
                            {/* Fast size buttons */}
                            <div className="flex gap-1 mt-1.5 flex-wrap">
                              {["12px", "14px", "16px", "20px", "24px", "32px", "44px", "60px"].map(sz => (
                                <button
                                  key={sz}
                                  type="button"
                                  onClick={() => updateSelectedObject({ style: { ...selectedObj.style, fontSize: sz } })}
                                  className="text-[9px] bg-neutral-800 hover:bg-neutral-700 px-1.5 py-0.5 rounded cursor-pointer"
                                >
                                  {sz}
                                </button>
                              ))}
                            </div>
                          </div>
                        )}

                        {/* Font Family selector */}
                        {(selectedObj?.type === "heading" || selectedObj?.type === "text" || selectedObj?.type === "button") && (
                          <div>
                            <label className="text-[10px] text-neutral-400 font-bold block uppercase mb-1">Tipografía y Fuente</label>
                            <select
                              value={selectedObj.style?.fontFamily || "sans"}
                              onChange={(e) => updateSelectedObject({ style: { ...selectedObj.style, fontFamily: e.target.value } })}
                              className="w-full bg-[#1a1a1a] border border-[#3a3a3a] rounded px-2.5 py-1 text-neutral-200 text-xs"
                            >
                              {FONT_FAMILIES.map(font => (
                                <option key={font.value} value={font.value}>{font.name}</option>
                              ))}
                            </select>
                          </div>
                        )}

                        {/* Font weight and aligning */}
                        {(selectedObj?.type === "heading" || selectedObj?.type === "text" || selectedObj?.type === "button") && (
                          <div className="grid grid-cols-2 gap-2">
                            <div>
                              <label className="text-[10px] text-neutral-400 font-bold block uppercase mb-1 font-sans">Peso</label>
                              <select
                                value={selectedObj.style?.fontWeight || "font-normal"}
                                onChange={(e) => updateSelectedObject({ style: { ...selectedObj.style, fontWeight: e.target.value } })}
                                className="w-full bg-[#1a1a1a] border border-[#3a3a3a] rounded px-2.5 py-1 text-neutral-200 text-xs"
                              >
                                {WEIGHTS.map(w => (
                                  <option key={w.value} value={w.value}>{w.name}</option>
                                ))}
                              </select>
                            </div>
                            <div>
                              <label className="text-[10px] text-neutral-400 font-bold block uppercase mb-1">Alineación</label>
                              <select
                                value={selectedObj.style?.alignment || "text-left"}
                                onChange={(e) => updateSelectedObject({ style: { ...selectedObj.style, alignment: e.target.value } })}
                                className="w-full bg-[#1a1a1a] border border-[#3a3a3a] rounded px-2.5 py-1 text-neutral-200 text-xs"
                              >
                                {ALIGNMENTS.map(a => (
                                  <option key={a.value} value={a.value}>{a.name}</option>
                                ))}
                              </select>
                            </div>
                          </div>
                        )}

                        {/* Letter spacing and line height */}
                        {(selectedObj?.type === "heading" || selectedObj?.type === "text") && (
                          <div className="grid grid-cols-2 gap-2">
                            <div>
                              <label className="text-[10px] text-neutral-400 font-bold block uppercase mb-1">Espaciado</label>
                              <select
                                value={selectedObj.style?.letterSpacing || "tracking-normal"}
                                onChange={(e) => updateSelectedObject({ style: { ...selectedObj.style, letterSpacing: e.target.value } })}
                                className="w-full bg-[#1a1a1a] border border-[#3a3a3a] rounded px-2.5 py-1 text-neutral-200 text-xs"
                              >
                                {LETTER_SPACINGS.map(ls => (
                                  <option key={ls.value} value={ls.value}>{ls.name}</option>
                                ))}
                              </select>
                            </div>
                            <div>
                              <label className="text-[10px] text-neutral-400 font-bold block uppercase mb-1">Interlineado</label>
                              <select
                                value={selectedObj.style?.lineHeight || "leading-normal"}
                                onChange={(e) => updateSelectedObject({ style: { ...selectedObj.style, lineHeight: e.target.value } })}
                                className="w-full bg-[#1a1a1a] border border-[#3a3a3a] rounded px-2.5 py-1 text-neutral-200 text-xs"
                              >
                                {LINE_HEIGHTS.map(lh => (
                                  <option key={lh.value} value={lh.value}>{lh.name}</option>
                                ))}
                              </select>
                            </div>
                          </div>
                        )}
                      </div>
                    )}

                  </div>
                )}


                {/* ==================== ADVANCED TAB ==================== */}
                {activeInspectorTab === "advanced" && (
                  <div className="space-y-4 font-sans text-xs">
                    
                    <div>
                      <span className="text-[10px] font-bold text-neutral-400 block uppercase mb-1">Clases CSS Personalizadas (Multiples)</span>
                      <input 
                        type="text" 
                        placeholder="e.g. shadow-double border-bottom-pulse" 
                        disabled 
                        className="w-full bg-[#2a2a2a] text-[#8e8e8e] border border-[#3a3a3a] rounded px-2.5 py-1.5 focus:outline-none"
                      />
                    </div>

                    <div className="p-3 bg-[#f58220]/5 border border-[#f58220]/15 rounded-xl text-neutral-400 leading-relaxed text-[11px] space-y-1">
                      <strong className="text-white block">🚀 Características de Diseño Divi:</strong>
                      <p>Soporte 100% interactivo para layouts anidados de forma fluida. Genera código limpio responsive compilable de inmediato.</p>
                    </div>

                  </div>
                )}

              </div>
              
              {/* Reset selected item */}
              <div className="p-4 bg-[#1e1e1e] border-t border-[#2a2a2a] flex items-center justify-between">
                <button 
                  onClick={() => setSelectedElement(null)}
                  className="bg-neutral-850 hover:bg-neutral-800 text-white font-bold py-1.5 px-3 rounded text-[11px] block text-center cursor-pointer"
                >
                  Deseleccionar Bloque
                </button>
                <span className="text-[10px] text-neutral-500">Sisari Travel Engine</span>
              </div>

            </div>
          )}

        </div>
        )}

      </div>

      {/* ==========================================
          MODAL DRAWER: ADD SECTION LAYOUT TYPES
          ========================================== */}
      <AnimatePresence>
        {showAddSectionModal && (
          <div className="fixed inset-0 bg-black/75 flex items-center justify-center p-4 z-[9999] select-none font-sans">
            <motion.div 
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-[#1f1f1f] border border-neutral-750 p-6 rounded-3xl w-full max-w-xl shadow-2xl relative text-left text-[#eaeaea]"
            >
              <button 
                onClick={() => setShowAddSectionModal(false)}
                className="absolute top-4 right-4 bg-neutral-800 hover:bg-neutral-700 text-neutral-300 rounded-full p-2 cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>

              <h3 className="font-display font-black text-lg text-white mb-1 uppercase flex items-center gap-2">
                <Layout className="w-5 h-5 text-brand-pink" />
                <span>Elegir Plantilla de Sección (Estilo DIVI)</span>
              </h3>
              <p className="text-neutral-400 text-xs mb-6">Elige una de las plantillas premium pre-diseñadas para agregarla a tu lienzo y editar sus bloques de manera directa.</p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                
                <button 
                  onClick={() => addNewSectionFromTemplate("hero")}
                  className="p-4 rounded-2xl bg-neutral-850 border border-neutral-700 hover:border-[#e12d8a] hover:bg-neutral-800 text-left transition-all cursor-pointer block"
                >
                  <div className="font-bold text-sm text-neutral-100 flex items-center gap-2">🌅 Hero Header Promocional</div>
                  <p className="text-[11px] text-neutral-400 mt-1 leading-relaxed">Fondo con imagen fluida, título display gigante con letra espaciada y botón de llamado a la acción.</p>
                </button>

                <button 
                  onClick={() => addNewSectionFromTemplate("features")}
                  className="p-4 rounded-2xl bg-neutral-850 border border-neutral-700 hover:border-[#e12d8a] hover:bg-neutral-800 text-left transition-all cursor-pointer block"
                >
                  <div className="font-bold text-sm text-neutral-100 flex items-center gap-2">🛡️ Cuadrícula de 3 Ventajas</div>
                  <p className="text-[11px] text-neutral-400 mt-1 leading-relaxed">Fila con tres columnas perfectamente alineadas para destacar valores de la empresa, servicios o garantías.</p>
                </button>

                <button 
                  onClick={() => addNewSectionFromTemplate("cta")}
                  className="p-4 rounded-2xl bg-neutral-850 border border-neutral-700 hover:border-[#e12d8a] hover:bg-neutral-800 text-left transition-all cursor-pointer block"
                >
                  <div className="font-bold text-sm text-neutral-100 flex items-center gap-2">⚡ Llamado a la Acción (CTA)</div>
                  <p className="text-[11px] text-neutral-400 mt-1 leading-relaxed">Banda de color intenso para ofertas relámpago con un gran botón destacado para canalizar reservas.</p>
                </button>

                <button 
                  onClick={() => addNewSectionFromTemplate("blank")}
                  className="p-4 rounded-2xl bg-neutral-850 border border-neutral-700 hover:border-[#e12d8a] hover:bg-neutral-800 text-left transition-all cursor-pointer block"
                >
                  <div className="font-bold text-sm text-neutral-100 flex items-center gap-2">▫️ Sección en Blanco (Diseño Vacío)</div>
                  <p className="text-[11px] text-neutral-400 mt-1 leading-relaxed">Sección limpia con una fila lista para insertar cualquier módulo (imágenes, textos o sliders) de forma manual.</p>
                </button>

              </div>
              
              <div className="text-center mt-6 text-[10px] text-[#e12d8a] font-mono tracking-widest uppercase">
                ✨ SISTEMA DRAG-AND-CLICK CONSTRUCTOR VISUAL DE RETABLOWEB
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* FLOAT TOAST NOTIFIER SYSTEM */}
      <AnimatePresence>
        {toastMessage && (
          <motion.div 
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 50, opacity: 0 }}
            className="fixed bottom-6 left-6 z-[1000] bg-zinc-900 border border-zinc-800 shadow-xl px-5 py-3 rounded-2xl text-xs font-bold text-white flex items-center gap-2.5 font-sans"
          >
            <div className="w-2 h-2 rounded-full bg-[#e12d8a] animate-ping" />
            <span>{toastMessage}</span>
          </motion.div>
        )}
      </AnimatePresence>

    </div>
  );
}
