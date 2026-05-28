export interface DestinationPackage {
  id: string;
  title: string;
  category: "local" | "national" | "international";
  location: string;
  price: string;
  duration: string;
  difficulty: "Fácil" | "Moderado" | "Exigente";
  description: string;
  highlights: string[];
  image: string;
  whatsAppText: string;
  inclusions: string[];
  exclusions: string[];
  itinerary: {
    day: number;
    title: string;
    description: string;
  }[];
  faqs: {
    q: string;
    a: string;
  }[];
}

export interface TravelItinerary {
  destination: string;
  durationDays: number;
  travelStyle: string;
  overview: string;
  days: {
    day: number;
    title: string;
    details: string;
    recommendations: string[];
  }[];
  budgetCategory: string;
  packingSuggestions: string[];
}

export interface Testimonial {
  name: string;
  role: string;
  comment: string;
  rating: number;
  date: string;
  avatarSeed: string;
}

export interface ContactFormData {
  name: string;
  email: string;
  phone: string;
  destination: string;
  date: string;
  comments: string;
}

export interface BlogPost {
  id: string;
  titleEs: string;
  titleEn: string;
  subtitleEs: string;
  subtitleEn: string;
  contentEs: string;
  contentEn: string;
  image: string;
  category: "Consejos" | "Destinos" | "Cultura" | "Aventura" | "Travel tips" | "Destinations" | "Culture" | "Adventure";
  date: string;
  readTimeEs: string;
  readTimeEn: string;
  author: string;
}

export interface CMSCertification {
  name: string;
  logo: string;
  url: string;
}

export interface CMSTeamMember {
  name: string;
  titleEs: string;
  titleEn: string;
  descEs: string;
  descEn: string;
  image: string;
}

export interface CMSContent {
  nosotrosHeadlineEs: string;
  nosotrosHeadlineEn: string;
  nosotrosSubtitleEs: string;
  nosotrosSubtitleEn: string;
  nosotrosDescEs: string;
  nosotrosDescEn: string;
  contactoHeadlineEs: string;
  contactoHeadlineEn: string;
  contactoSubtitleEs: string;
  contactoSubtitleEn: string;
  
  // Custom Editable Contacts
  phones: string[];
  whatsappNumber: string;
  whatsappText: string;
  emails: string[];
  socialLinks: {
    facebook: string;
    instagram: string;
    linkedin: string;
    youtube: string;
  };
  socialReviewsLinks: {
    google: string;
    facebook: string;
    tripadvisor: string;
  };

  // Certifications (up to 8 square logos)
  certifications: CMSCertification[];

  // Values, Mission, Vision
  valuePropTitleEs: string;
  valuePropTitleEn: string;
  valuePropDescEs: string;
  valuePropDescEn: string;
  misionEs: string;
  misionEn: string;
  visionEs: string;
  visionEn: string;

  // Representative Team (up to 4 members)
  teamMembers: CMSTeamMember[];

  // Legal Pages texts
  legalPrivacyEs: string;
  legalPrivacyEn: string;
  legalTermsEs: string;
  legalTermsEn: string;
  legalCookiesEs: string;
  legalCookiesEn: string;
  legalNoticeEs: string;
  legalNoticeEn: string;
  legalComplaintsEs: string;
  legalComplaintsEn: string;

  // Legal & Pages frontend style configurations
  letterSpacing: "normal" | "wide" | "widest";
  lineHeight: "normal" | "relaxed" | "loose";
  fontSizeOffset: number; // -4 to +8 px offset
  legalFontFamily: "sans" | "serif" | "mono";
  themeBgColor: string;
  themeTextColor: string;
}

export interface BotPresetItem {
  pattern: string;
  responseEs: string;
  responseEn: string;
}

export interface BotConfig {
  welcomeMessageEs: string;
  welcomeMessageEn: string;
  botName: string;
  agentRoleEs: string;
  agentRoleEn: string;
  presets: BotPresetItem[];
}

export interface CRMLead {
  id: string;
  source: "Formulario de Reserva" | "Asistente Virtual Chatbot" | "Planificador de Itinerario por IA";
  name: string;
  phone: string;
  email: string;
  dateCreated: string;
  destination: string;
  travelDate?: string;
  comments: string;
  status: "Nuevo" | "En Contacto" | "Vendido" | "Cancelado";
  notes?: string;
  assignedTo?: string;
}

