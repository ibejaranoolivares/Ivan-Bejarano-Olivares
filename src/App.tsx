import React, { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { 
  MapPin, 
  Calendar, 
  Clock, 
  Compass, 
  Phone, 
  Mail, 
  Award, 
  Shield, 
  CheckCircle2, 
  Star, 
  Sparkles, 
  ChevronRight, 
  ChevronDown, 
  User, 
  Send, 
  Check, 
  ArrowRight,
  Menu,
  X,
  Map,
  MessageSquare,
  BookmarkCheck,
  Building,
  Settings,
  Sliders,
  Lock,
  Facebook,
  Instagram,
  Linkedin,
  Youtube,
  Globe,
  Users
} from "lucide-react";
import { PACKAGES, TESTIMONIALS, BRAND_COLORS } from "./data";
import { DestinationPackage, TravelItinerary, ContactFormData, BlogPost, CMSContent, BotConfig, CRMLead } from "./types";
import { DEFAULT_BLOG_POSTS, DEFAULT_CMS_CONTENT, DEFAULT_BOT_CONFIG, DEFAULT_CRM_LEADS } from "./initialCMSData";
import PackageLandingPage from "./components/PackageLandingPage";
import AdminConsole from "./components/AdminConsole";
import ZoneCatalogPage from "./components/ZoneCatalogPage";
import NosotrosView from "./components/NosotrosView";
import BlogView from "./components/BlogView";
import LegalView from "./components/LegalView";
import { getTranslatedPackage } from "./utils/translator";
import ContactoView from "./components/ContactoView";
import VisualBuilder from "./components/VisualBuilder";
import { TRANSLATIONS } from "./translations";

function TiktokIcon({ className = "w-4 h-4" }: { className?: string }) {
  return (
    <svg className={className} fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
      <path d="M12.53.02C13.84 0 15.14.01 16.44 0c.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.17-2.89-.6-4.09-1.5-.77-.6-1.39-1.39-1.81-2.3v7.8c.09 2.94-1.24 5.86-3.82 7.15-2.58 1.3-5.86 1.05-8.15-.65-2.29-1.7-3.32-4.9-2.38-7.66.94-2.76 3.8-4.59 6.72-4.13.01 1.42 0 2.84 0 4.26-1.73-.39-3.64.44-4.29 2.05-.65 1.61.1 3.6 1.65 4.29 1.55.69 3.59.04 4.34-1.48.24-.48.29-1.03.29-1.56V.02z"/>
    </svg>
  );
}

function SisariLogoSVG({ className = "w-10 h-10", style }: { className?: string; style?: React.CSSProperties }) {
  return (
    <svg viewBox="0 0 100 100" className={className} style={style} fill="none" xmlns="http://www.w3.org/2000/svg">
      {/* Outer brand-orange dots */}
      <circle cx="50" cy="8" r="3" fill="#f58220" />
      <circle cx="50" cy="92" r="3" fill="#f58220" />
      <circle cx="8" cy="50" r="3" fill="#f58220" />
      <circle cx="92" cy="50" r="3" fill="#f58220" />
      <circle cx="21" cy="21" r="3" fill="#f58220" />
      <circle cx="79" cy="21" r="3" fill="#f58220" />
      <circle cx="21" cy="79" r="3" fill="#f58220" />
      <circle cx="79" cy="79" r="3" fill="#f58220" />

      {/* Pink Petals (8 symmetrically placed circles) */}
      <g fill="#e12d8a">
        <circle cx="50" cy="28" r="13" />
        <circle cx="50" cy="72" r="13" />
        <circle cx="28" cy="50" r="13" />
        <circle cx="72" cy="50" r="13" />
        
        <circle cx="34" cy="34" r="13" />
        <circle cx="66" cy="34" r="13" />
        <circle cx="34" cy="66" r="13" />
        <circle cx="66" cy="66" r="13" />
      </g>

      {/* White Inner Flower/Star Motif */}
      <path
        d="M50 22 L54 36 L68 28 L60 41 L74 50 L60 59 L68 72 L54 64 L50 78 L46 64 L32 72 L40 59 L26 50 L40 41 L32 28 L46 36 Z"
        fill="#ffffff"
      />

      {/* Core brand-orange Circle */}
      <circle cx="50" cy="50" r="12" fill="#f58220" />
    </svg>
  );
}

export default function App() {
  // Packages Editable State & Persistent Storage
  const [packages, setPackages] = useState<DestinationPackage[]>(() => {
    try {
      const saved = localStorage.getItem("sisari_packages");
      if (saved) {
        return JSON.parse(saved);
      }
    } catch (e) {
      console.error("Error reading packages from localStorage:", e);
    }
    return PACKAGES;
  });

  const [blogPosts, setBlogPosts] = useState<BlogPost[]>(() => {
    try {
      const saved = localStorage.getItem("sisari_blog_posts");
      if (saved) {
        return JSON.parse(saved);
      }
    } catch (e) {
      console.error("Error reading blog posts from localStorage:", e);
    }
    return DEFAULT_BLOG_POSTS;
  });

  const [cmsContent, setCmsContent] = useState<CMSContent>(() => {
    try {
      const saved = localStorage.getItem("sisari_cms_content");
      if (saved) {
        const parsed = JSON.parse(saved);
        return { ...DEFAULT_CMS_CONTENT, ...parsed };
      }
    } catch (e) {
      console.error("Error reading cms content from localStorage:", e);
    }
    return DEFAULT_CMS_CONTENT;
  });

  // Main custom view page state
  const [currentView, setCurrentView] = useState<"home" | "nosotros" | "blog" | "contacto" | "privacy" | "terms" | "cookies" | "notice" | "complaints" | "builder">("home");

  const [botConfig, setBotConfig] = useState<BotConfig>(() => {
    try {
      const saved = localStorage.getItem("sisari_bot_config");
      if (saved) {
        return JSON.parse(saved);
      }
    } catch (e) {
      console.error("Error reading bot config from localStorage:", e);
    }
    return DEFAULT_BOT_CONFIG;
  });

  const [crmLeads, setCrmLeads] = useState<CRMLead[]>(() => {
    try {
      const saved = localStorage.getItem("sisari_crm_leads");
      if (saved) {
        return JSON.parse(saved);
      }
    } catch (e) {
      console.error("Error reading crm leads from localStorage:", e);
    }
    return DEFAULT_CRM_LEADS;
  });

  // Sync state changes with local storage
  useEffect(() => {
    localStorage.setItem("sisari_packages", JSON.stringify(packages));
  }, [packages]);

  useEffect(() => {
    localStorage.setItem("sisari_blog_posts", JSON.stringify(blogPosts));
  }, [blogPosts]);

  useEffect(() => {
    localStorage.setItem("sisari_cms_content", JSON.stringify(cmsContent));
  }, [cmsContent]);

  useEffect(() => {
    localStorage.setItem("sisari_bot_config", JSON.stringify(botConfig));
  }, [botConfig]);

  useEffect(() => {
    localStorage.setItem("sisari_crm_leads", JSON.stringify(crmLeads));
  }, [crmLeads]);

  // Multilanguage and interactive state hooks
  const [language, setLanguage] = useState<"es" | "en">("es");

  const translatedPackages = React.useMemo(() => {
    return packages.map(pkg => getTranslatedPackage(pkg, language));
  }, [packages, language]);
  const [currentSlide, setCurrentSlide] = useState(0);

  // Floating WhatsApp bot popup states
  const [isWaBotOpen, setIsWaBotOpen] = useState(false);
  const [waUserQueryValue, setWaUserQueryValue] = useState("");
  const [waBotMessages, setWaBotMessages] = useState<Array<{ sender: "bot" | "user"; text: string; time: string }>>([
    {
      sender: "bot",
      text: "¡Hola! Soy Sari, tu asesora virtual de Sisari Travel. 🌸 ¿A qué espectacular destino te gustaría viajar hoy?",
      time: "18:59"
    }
  ]);

  // Sync virtual bot message language when the language state changes.
  useEffect(() => {
    setWaBotMessages([
      {
        sender: "bot",
        text: language === "es" ? botConfig.welcomeMessageEs : botConfig.welcomeMessageEn,
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      }
    ]);
  }, [language, botConfig]);

  const handleWaBotSend = (userText: string) => {
    if (!userText.trim()) return;

    // Append user message
    const formattedTime = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    const newUserMsg = { sender: "user" as const, text: userText, time: formattedTime };
    
    setWaBotMessages(prev => [...prev, newUserMsg]);
    setWaUserQueryValue("");

    // Simulate bot thinking and responding
    setTimeout(() => {
      let botResponse = "";
      const textLower = userText.toLowerCase();

      // Look through custom administrator presets first
      const matchingPreset = botConfig.presets.find(preset => 
        textLower.includes(preset.pattern.toLowerCase())
      );

      if (matchingPreset) {
        botResponse = language === "es" ? matchingPreset.responseEs : matchingPreset.responseEn;
      } else {
        // High fidelity fallback triggers
        if (language === "es") {
          if (textLower.includes("millpu") || textLower.includes("ayacucho") || textLower.includes("quinua") || textLower.includes("local")) {
            botResponse = "¡Excelente la elección de Millpu! Es una de las excursiones locales más solicitadas. El tour dura 1 día completo e incluye camioneta turística, guía y chalecos. ¿De cuántos pasajeros de tu familia se trataría?";
          } else if (textLower.includes("machu") || textLower.includes("picchu") || textLower.includes("cusco") || textLower.includes("nacional")) {
            botResponse = "¡El Cusco histórico y Machu Picchu son maravillosos! Ofrecemos paquetes completos que incluyen tickets de tren, guiado y reservas de hotel. ¡Puedo pasarte el folleto completo!";
          } else if (textLower.includes("mexico") || textLower.includes("méxico") || textLower.includes("internacional") || textLower.includes("colombia")) {
            botResponse = "¡Excelente plan internacional! Organizamos vuelos, tours arqueológicos oficiales de las Pirámides en México, y asistencia 24/7. Te sugiero conectar con uno de nuestros agentes reales.";
          } else {
            botResponse = "¿Te gustaría recibir tarifas inmediatas para este destino? Te sugiero dejar tu nombre o reservar un paquete para comunicarnos contigo de inmediato.";
          }
        } else {
          if (textLower.includes("millpu") || textLower.includes("ayacucho") || textLower.includes("quinua") || textLower.includes("local")) {
            botResponse = "Splendid plan! Millpu is our premier local excursion. The full-day guided tour features private round-trip transportation, safety equipment, and photography stops. How many travelers are looking to join?";
          } else if (textLower.includes("machu") || textLower.includes("picchu") || textLower.includes("cusco") || textLower.includes("national")) {
            botResponse = "Cusco and Machu Picchu are absolutely stunning! We manage all coordinates for trains, local boutique hotel bookings, and fast-track entrances. Want a full catalog copy?";
          } else if (textLower.includes("mexico") || textLower.includes("méxico") || textLower.includes("international") || textLower.includes("colombia")) {
            botResponse = "Fascinating choice! Our agency covers flight deals, private guided archaeological walks to Mexican pyramids, and custom itinerary options. I'll connect you directly to our lead advisors.";
          } else {
            botResponse = "Would you like directly tailored pricing for your travel group? Leave your contact details below or check our catalog packages.";
          }
        }
      }

      setWaBotMessages(prev => [...prev, {
        sender: "bot",
        text: botResponse,
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      }]);

      // Automatically pipe leads under 'Asistente Virtual Chatbot' if name, phone, email, or a real query is typed
      const nameMatch = userText.match(/(?:soy|me llamo|mi nombre es)\s+([A-Za-zÀ-ÿ\s]+)/i);
      const phoneMatch = userText.match(/(\+?\d[\d\s-]{7,13})/);
      const emailMatch = userText.match(/([a-zA-Z0-9._-]+@[a-zA-Z0-9._-]+\.[a-zA-Z0-9_-]+)/);

      if (nameMatch || phoneMatch || emailMatch || userText.length > 8) {
        const leadId = "lead_bot_" + Date.now().toString().slice(-6);
        const extractedName = nameMatch ? nameMatch[1].trim() : "Viajero Chatbot";
        const extractedPhone = phoneMatch ? phoneMatch[1].trim() : "No especificado";
        const extractedEmail = emailMatch ? emailMatch[1].trim() : "contacto-pendiente@asistente.com";

        setCrmLeads(prev => {
          // Prevent multiple double lead triggers in a single chat turn
          const exists = prev.some(l => l.comments.includes(userText));
          if (exists) return prev;

          const newLead: CRMLead = {
            id: leadId,
            source: "Asistente Virtual Chatbot",
            name: extractedName,
            phone: extractedPhone,
            email: extractedEmail,
            dateCreated: new Date().toISOString().split("T")[0],
            destination: "Consulta Asistente",
            comments: `Mensaje recibido en Chatbot: "${userText}"`,
            status: "Nuevo",
            notes: "Lead capturado por el chatbot en tiempo real. Clasificado como Nuevo."
          };
          return [newLead, ...prev];
        });
      }

    }, 850);
  };

  const [isAdmin, setIsAdmin] = useState<boolean>(() => {
    return localStorage.getItem("sisari_admin_logged") === "true";
  });
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  const [adminPasswordInput, setAdminPasswordInput] = useState("");
  const [loginError, setLoginError] = useState("");
  const [pendingAdminAction, setPendingAdminAction] = useState<"console" | "builder" | "">("");

  const [adminPasscode, setAdminPasscode] = useState<string>(() => {
    const saved = localStorage.getItem("sisari_admin_passcode");
    if (!saved) {
      localStorage.setItem("sisari_admin_passcode", "SisariTravel*2026");
      return "SisariTravel*2026";
    }
    return saved;
  });
  const [showRecoveryForm, setShowRecoveryForm] = useState(false);
  const [recoveryEmail, setRecoveryEmail] = useState("");
  const [newAdminPasswordVal, setNewAdminPasswordVal] = useState("");
  const [recoverySuccessMessage, setRecoverySuccessMessage] = useState("");

  const [isAdminConsoleOpen, setIsAdminConsoleOpen] = useState(false);
  const [showAllInCatalog, setShowAllInCatalog] = useState(false);

  const slides = React.useMemo(() => {
    return cmsContent.heroSlides || DEFAULT_CMS_CONTENT.heroSlides || [];
  }, [cmsContent.heroSlides]);

  const formattedWhatsAppNumber = React.useMemo(() => {
    const raw = cmsContent.whatsappNumber || "+51980535383";
    return raw.replace(/\D/g, "");
  }, [cmsContent.whatsappNumber]);

  // Carousel automatic transition timer
  useEffect(() => {
    const slideTimer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 5000);
    return () => clearInterval(slideTimer);
  }, [slides.length]);

  // Navigation State
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeTab, setActiveTab] = useState<"all" | "local" | "national" | "international">("all");
  const [selectedZonePage, setSelectedZonePage] = useState<"local" | "national" | "international" | null>(null);
  const [isNavDropdownOpen, setIsNavDropdownOpen] = useState(false);
  const [isSectionDropdownOpen, setIsSectionDropdownOpen] = useState(false);
  const [isMobileNavDropdownOpen, setIsMobileNavDropdownOpen] = useState(false);
  const [selectedPackage, setSelectedPackage] = useState<DestinationPackage | null>(null);

  // Dynamic Blog Interactive States
  const [selectedBlogPost, setSelectedBlogPost] = useState<BlogPost | null>(null);
  const [blogCategoryFilter, setBlogCategoryFilter] = useState("Todos");
  const [blogSearchTerm, setBlogSearchTerm] = useState("");

  const selectPackageAndScroll = (pkg: DestinationPackage) => {
    setSelectedPackage(pkg);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  // AI Planner Form States
  const [aiDestination, setAiDestination] = useState("");
  const [aiDuration, setAiDuration] = useState(3);
  const [aiStyle, setAiStyle] = useState("Aventura y Naturaleza");
  const [aiTravelers, setAiTravelers] = useState("En Pareja");
  
  // AI Planner Engine States
  const [isPlanning, setIsPlanning] = useState(false);
  const [planningStep, setPlanningStep] = useState(0);
  const [itineraryResult, setItineraryResult] = useState<TravelItinerary | null>(null);
  const [itineraryError, setItineraryError] = useState<string | null>(null);
  const [expandedDay, setExpandedDay] = useState<number | null>(1);

  // AI custom dynamic shipper states
  const [iaClientName, setIaClientName] = useState("");
  const [iaClientEmail, setIaClientEmail] = useState("");
  const [iaClientPhone, setIaClientPhone] = useState("");
  const [isSendingAIShip, setIsSendingAIShip] = useState(false);
  const [iaLeadSubmitted, setIaLeadSubmitted] = useState(false);

  // Booking Form State
  const [bookingForm, setBookingForm] = useState<ContactFormData>({
    name: "",
    email: "",
    phone: "",
    destination: "Aguas Turquesas de Millpu",
    date: "",
    comments: ""
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [bookingSuccessTicket, setBookingSuccessTicket] = useState<any>(null);

  // Quick Suggestion Chips for AI Planner
  const quickSuggestions = [
    "Santuario de Ayacucho y Huamanga",
    "Ciudadela del Cusco y Machu Picchu",
    "Islas Galápagos y Playas del Ecuador",
    "Ciudad Amurallada de Cartagena",
    "Cancún y la Riviera Maya en México",
    "Cataratas de Iguazú, Argentina"
  ];

  const getFilteredPackages = () => {
    if (activeTab === "all") {
      // En la página de inicio habrá tres de cada uno por categoría (3 locales, 3 nacionales y 3 internacionales)
      const locals = translatedPackages.filter((p) => p.category === "local").slice(0, 3);
      const nationals = translatedPackages.filter((p) => p.category === "national").slice(0, 3);
      const internationals = translatedPackages.filter((p) => p.category === "international").slice(0, 3);
      return [...locals, ...nationals, ...internationals];
    }
    return translatedPackages.filter((pkg) => pkg.category === activeTab);
  };

  const filteredPackages = getFilteredPackages();

  // Progress steps for the cool AI planning animation
  const steps = [
    "Conectando con el servidor de Sisari Travel...",
    "Analizando mapas de rutas en Ayacucho e histórico de viajes...",
    "Optimizando cronograma por cercanía y nivel de exigencia física...",
    "Formateando recomendaciones de comida típica y tips de seguridad..."
  ];

  // AI Planner generator
  const handleGenerateItinerary = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!aiDestination.trim()) return;

    setIsPlanning(true);
    setPlanningStep(0);
    setItineraryResult(null);
    setItineraryError(null);
    setIaLeadSubmitted(false);

    // Dynamic fake progress steps for sensory polish
    const stepInterval = setInterval(() => {
      setPlanningStep((prev) => {
        if (prev < steps.length - 1) {
          return prev + 1;
        } else {
          clearInterval(stepInterval);
          return prev;
        }
      });
    }, 1500);

    try {
      const response = await fetch("/api/plan-itinerary", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          destination: aiDestination,
          duration: aiDuration,
          style: aiStyle,
          travelers: aiTravelers
        })
      });

      clearInterval(stepInterval);

      if (!response.ok) {
        const errData = await response.json();
        throw new Error(errData.error || "Hubo un error al generar tu itinerario.");
      }

      const result = await response.json();
      setItineraryResult(result);
      setExpandedDay(1);

      // Save a dynamic hot lead into the CRM
      const newLead: CRMLead = {
        id: "lead_ai_" + Date.now().toString().slice(-6),
        source: "Planificador de Itinerario por IA",
        name: "Viajero Planificador AI",
        phone: "Consultas Web",
        email: "viajero-ai-itinerary@sisari.com",
        dateCreated: new Date().toISOString().split("T")[0],
        destination: aiDestination,
        travelDate: `${aiDuration} Días`,
        comments: `Estilo: "${aiStyle}", Viajero: "${aiTravelers}". Generó una ruta exitosa por IA.`,
        status: "Nuevo",
        notes: "Lead registrado desde el Planificador de Itinerarios por Inteligencia Artificial de Sisari."
      };
      setCrmLeads(prev => [newLead, ...prev]);
    } catch (err: any) {
      console.error(err);
      setItineraryError(err.message || "Error al conectar con el servidor de Inteligencia Artificial.");
    } finally {
      setIsPlanning(false);
    }
  };

  // Send AI itinerary details directly via email dispatch
  const handleSendAIShipping = async () => {
    if (!iaClientName.trim() || !iaClientEmail.trim() || !iaClientPhone.trim()) {
      alert(language === "es" ? "Por favor complete todos los campos requeridos." : "Please fill in all requested fields.");
      return;
    }
    
    setIsSendingAIShip(true);
    try {
      const response = await fetch("/api/send-email-itinerary", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: iaClientName,
          email: iaClientEmail,
          phone: iaClientPhone,
          destination: itineraryResult?.destination,
          overview: itineraryResult?.overview,
          days: itineraryResult?.days,
          packing: itineraryResult?.packingSuggestions,
          ownerEmail: cmsContent.destinationFormEmail || "reservas@sisaritravel.pe"
        })
      });

      if (!response.ok) {
        throw new Error("No se pudo procesar la entrega de correo.");
      }

      // Add a polished lead to CRM Leads in real-time
      const realLead: CRMLead = {
        id: "lead_ai_" + Date.now().toString().slice(-6),
        source: "Planificador de Itinerario por IA",
        name: iaClientName,
        phone: iaClientPhone,
        email: iaClientEmail,
        dateCreated: new Date().toISOString().split("T")[0],
        destination: itineraryResult?.destination || aiDestination,
        travelDate: `${aiDuration} Días`,
        comments: `Estilo: "${aiStyle}", Viajeros: "${aiTravelers}". Cliente solicitó entrega formal por Correo Directo.`,
        status: "Nuevo",
        notes: `Itinerario enviado a ${iaClientEmail}. Registrado en base de clientes Sisari.`
      };

      setCrmLeads((prev) => [realLead, ...prev]);
      setIaLeadSubmitted(true);
    } catch (error) {
      console.error("Error shipping AI email:", error);
      alert(language === "es" ? "Error al registrar sus datos de contacto." : "Error saving contact details.");
    } finally {
      setIsSendingAIShip(false);
    }
  };

  // Submit Booking Form handler
  const handleBookingSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!bookingForm.name || !bookingForm.phone || !bookingForm.email) return;

    setIsSubmitting(true);

    setTimeout(() => {
      setIsSubmitting(false);
      // Generate unique token mock ticketing
      const ticketId = "ST-" + Math.floor(100000 + Math.random() * 900000);
      setBookingSuccessTicket({
        ticketId,
        packageName: bookingForm.destination,
        travelerName: bookingForm.name,
        travelerPhone: bookingForm.phone,
        travelerEmail: bookingForm.email,
        travelDate: bookingForm.date || "Fecha por definir",
        comments: bookingForm.comments || "Sin comentarios adicionales",
        dateCreated: new Date().toLocaleDateString("es-ES")
      });

      // Append new CRM lead record automatically
      const newLead: CRMLead = {
        id: "lead_form_" + Date.now().toString().slice(-6),
        source: "Formulario de Reserva",
        name: bookingForm.name,
        phone: bookingForm.phone,
        email: bookingForm.email,
        dateCreated: new Date().toISOString().split("T")[0],
        destination: bookingForm.destination,
        travelDate: bookingForm.date || "Por definir",
        comments: bookingForm.comments || "Sin comentarios adicionales",
        status: "Nuevo",
        notes: "Lead registrado desde el formulario oficial de reservas de la página web."
      };
      setCrmLeads(prev => [newLead, ...prev]);

    }, 1800);
  };

  const handleResetTicket = () => {
    setBookingSuccessTicket(null);
    setBookingForm({
      name: "",
      email: "",
      phone: "",
      destination: "Aguas Turquesas de Millpu",
      date: "",
      comments: ""
    });
  };

  // Utility to scroll directly to sections or subviews
  const scrollToId = (id: string) => {
    setMobileMenuOpen(false);
    setSelectedPackage(null); 
    setSelectedZonePage(null); 
    
    if (id === "nosotros") {
      setCurrentView("nosotros");
      window.scrollTo({ top: 0, behavior: "smooth" });
      return;
    }
    if (id === "blog") {
      setCurrentView("blog");
      window.scrollTo({ top: 0, behavior: "smooth" });
      return;
    }
    if (id === "contacto") {
      setCurrentView("contacto");
      window.scrollTo({ top: 0, behavior: "smooth" });
      return;
    }
    if (["privacy", "terms", "cookies", "notice", "complaints"].includes(id)) {
      setCurrentView(id as any);
      window.scrollTo({ top: 0, behavior: "smooth" });
      return;
    }

    // Otherwise, transition back to home first if not already there
    const wasNotHome = currentView !== "home";
    if (wasNotHome) {
      setCurrentView("home");
    }

    setTimeout(() => {
      const element = document.getElementById(id);
      if (element) {
        element.scrollIntoView({ behavior: "smooth" });
      } else {
        window.scrollTo({ top: 0, behavior: "smooth" });
      }
    }, wasNotHome ? 120 : 50);
  };

  const t = TRANSLATIONS[language];

  // Helper function to translate difficulty values
  const translateDifficulty = (diff: string) => {
    if (language === "es") return diff;
    if (diff === "Fácil") return "Easy";
    if (diff === "Moderado") return "Moderate";
    if (diff === "Exigente") return "Challenging";
    return diff;
  };

  // Helper function to translate duration strings
  const translateDuration = (dur: string) => {
    if (language === "es") return dur;
    let res = dur;
    res = res.replace(/Medio Día/g, "Half Day");
    res = res.replace(/Día Completo/g, "Full Day");
    res = res.replace(/horas/g, "hours");
    res = res.replace(/Días/g, "Days").replace(/Día/g, "Day");
    res = res.replace(/Noches/g, "Nights").replace(/Noche/g, "Night");
    res = res.replace(/ y /g, " and ");
    return res;
  };

  return (
    <div className="min-h-screen bg-[#fbfaf8] text-brand-charcoal font-sans selection:bg-brand-pink/20 selection:text-brand-pink">
      
      {/* HEADER SECTION WITH DUAL NAVIGATION BARS */}
      <header className="sticky top-0 z-50 bg-[#fbfaf8]/90 backdrop-blur-md border-b border-brand-pink/10 shadow-sm transition-all text-left">
        {/* SECONDARY TOP SUBHEADER (Phone, Social Icons, Language, Admin Toggle) */}
        <div className="bg-[#1e1e1e] text-[#e0e0e0] text-[10px] sm:text-xs py-2 border-b border-white/5 select-none font-sans">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between gap-4">
            
            {/* Left: Contact Phone, Email, and Address */}
            <div className="flex flex-wrap items-center gap-x-4 gap-y-1 font-semibold font-mono text-white text-xs">
              <a 
                href={`tel:${(cmsContent.phones?.[0] || "+51 987 654 321").replace(/\s+/g, '')}`} 
                className="hover:text-brand-pink transition-colors flex items-center gap-1.5 cursor-pointer"
                title="Marcar Teléfono"
              >
                <Phone className="w-3.5 h-3.5 text-brand-pink fill-brand-pink shrink-0" />
                <span>{cmsContent.phones?.[0] || "+51 987 654 321"}</span>
              </a>

              <span className="text-white/20 hidden md:inline">|</span>

              <a 
                href={`mailto:${cmsContent.emails?.[0] || "reservas@sisaritravel.pe"}`} 
                className="hover:text-brand-orange transition-colors flex items-center gap-1.5 cursor-pointer text-[11px] sm:text-xs"
                title="Buzón de Reservas"
              >
                <Mail className="w-3.5 h-3.5 text-brand-orange shrink-0" />
                <span>{cmsContent.emails?.[0] || "reservas@sisaritravel.pe"}</span>
              </a>

              <span className="text-white/20 hidden lg:inline">|</span>

              <a 
                href={cmsContent.addressMapUrl || "https://maps.google.com/?q=Jiron+Lima+140,+Ayacucho,+Peru"} 
                target="_blank" 
                rel="noopener noreferrer" 
                className="hover:text-[#f81585] transition-colors flex items-center gap-1.5 cursor-pointer hidden sm:flex text-[11px] sm:text-xs"
                title="Abrir Google Maps"
              >
                <MapPin className="w-3.5 h-3.5 text-blue-400 shrink-0" />
                <span className="line-clamp-1 max-w-[150px] md:max-w-[280px]">
                  {language === "es" ? (cmsContent.addressEs || "Jirón Lima 140, 1ra Cuadra") : (cmsContent.addressEn || "140 Jiron Lima, 1st Block")}
                </span>
              </a>
            </div>

            {/* Right: Socials, Language Selector, Admin Console button */}
            <div className="flex items-center gap-3 md:gap-5">
              {/* Desktop Social icons */}
              <div className="hidden md:flex items-center gap-1">
                <a href={cmsContent.socialLinks?.facebook || "https://facebook.com"} target="_blank" rel="noopener noreferrer" className="p-1 rounded-full text-[#b3b3b3] hover:text-[#f81585] hover:bg-white/5 transition-all" title="Facebook">
                  <Facebook className="w-3.5 h-3.5" />
                </a>
                <a href={cmsContent.socialLinks?.instagram || "https://instagram.com"} target="_blank" rel="noopener noreferrer" className="p-1 rounded-full text-[#b3b3b3] hover:text-[#f81585] hover:bg-white/5 transition-all" title="Instagram">
                  <Instagram className="w-3.5 h-3.5" />
                </a>
                <a href={cmsContent.socialLinks?.tiktok || "https://tiktok.com"} target="_blank" rel="noopener noreferrer" className="p-1 rounded-full text-[#b3b3b3] hover:text-[#f81585] hover:bg-white/5 transition-all" title="TikTok">
                  <TiktokIcon className="w-3.5 h-3.5" />
                </a>
                <a href={cmsContent.socialLinks?.youtube || "https://youtube.com"} target="_blank" rel="noopener noreferrer" className="p-1 rounded-full text-[#b3b3b3] hover:text-[#f81585] hover:bg-white/5 transition-all" title="YouTube">
                  <Youtube className="w-3.5 h-3.5" />
                </a>
                <a href={cmsContent.socialLinks?.linkedin || "https://linkedin.com"} target="_blank" rel="noopener noreferrer" className="p-1 rounded-full text-[#b3b3b3] hover:text-[#f81585] hover:bg-white/5 transition-all" title="LinkedIn">
                  <Linkedin className="w-3.5 h-3.5" />
                </a>
              </div>

              <div className="h-4.5 w-[1px] bg-white/10 hidden md:block" />

              {/* Language + Admin Controls */}
              <div className="flex items-center gap-2">
                {/* Language selection button */}
                <button 
                  type="button"
                  onClick={() => setLanguage(language === "es" ? "en" : "es")}
                  className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/10 hover:bg-[#f81585] hover:text-white text-white font-black text-[9px] sm:text-[10px] border border-white/10 transition-all cursor-pointer uppercase"
                  title={language === "es" ? "Switch to English" : "Cambiar a Español"}
                >
                  <Globe className="w-3 h-3 shrink-0 text-brand-orange" />
                  <span>{language === "es" ? "EN" : "ES"}</span>
                </button>

                {/* Visual Page Builder Button - Visible only to authentic admin */}
                {isAdmin && (
                  <button 
                    type="button"
                    onClick={() => setCurrentView("builder")}
                    className="flex items-center gap-1 px-3 py-1 rounded-full bg-[#e12d8a] text-white hover:bg-neutral-700 font-black text-[9px] sm:text-[10px] uppercase tracking-wider transition-all cursor-pointer shadow-sm shadow-black/20"
                    title="Constructor Visual Divi / Elementor"
                  >
                    <Sparkles className="w-2.5 h-2.5 text-yellow-300 animate-pulse fill-yellow-300" />
                    <span>CONSTRUCTOR VISUAL</span>
                  </button>
                )}

                {/* Admin Console panel button */}
                <button 
                  type="button"
                  onClick={() => {
                    if (isAdmin) {
                      setIsAdminConsoleOpen(true);
                    } else {
                      setPendingAdminAction("console");
                      setIsLoginModalOpen(true);
                    }
                  }}
                  className="flex items-center gap-1 px-3 py-1 rounded-full bg-brand-orange text-white hover:bg-brand-orange/90 font-black text-[9px] sm:text-[10px] uppercase tracking-wider transition-all cursor-pointer shadow-sm shadow-black/20"
                  title="Consola de Administración - Sisari Travel"
                >
                  <Sliders className="w-2.5 h-2.5" />
                  <span>{isAdmin ? t.consolaAdmin.replace("Consola ", "") : (language === "es" ? "Acceso Admin" : "Admin Access")}</span>
                </button>

                {/* Admin Logout button */}
                {isAdmin && (
                  <button
                    type="button"
                    onClick={() => {
                      setIsAdmin(false);
                      localStorage.setItem("sisari_admin_logged", "false");
                      setIsAdminConsoleOpen(false);
                      if (currentView === "builder") {
                        setCurrentView("home");
                      }
                    }}
                    className="flex items-center gap-1 px-2.5 py-1 rounded-full bg-red-600/95 text-white hover:bg-red-700 text-[9px] sm:text-[10px] font-black uppercase tracking-wider transition-all cursor-pointer"
                    title="Cerrar sesión de Administrador"
                  >
                    <X className="w-2.5 h-2.5 mt-0.5" />
                    <span>Salir</span>
                  </button>
                )}
              </div>
            </div>

          </div>
        </div>

        {/* PRIMARY MAIN NAV BAR */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3 flex items-center justify-between">
          
          {/* Brand Logo and Text combined */}
          <div 
            className="flex items-center gap-3 cursor-pointer group"
            onClick={() => {
              if (currentView !== "home") {
                setCurrentView("home");
                setTimeout(() => scrollToId("inicio"), 150);
              } else {
                scrollToId("inicio");
              }
            }}
          >
            <img
              src={cmsContent.logoImage || "https://images.unsplash.com/photo-1614741118887-7a4ee193a5fa?w=200&q=80"}
              alt="Sisari Travel Logo"
              referrerPolicy="no-referrer"
              className="h-12 w-auto max-w-[180px] object-contain group-hover:scale-105 transition-transform duration-300"
            />
          </div>

          {/* Nav Destinations and Services (Dynamically rendered from CMS) */}
          <nav className="hidden md:flex items-center gap-6 lg:gap-8 font-semibold text-sm text-brand-charcoal/85 animate-fade-in">
            {(cmsContent.menuItems || DEFAULT_CMS_CONTENT.menuItems).map((item) => {
              const label = language === "es" ? item.labelEs : item.labelEn;
              const isSelected = currentView === item.target;
              
              if (item.target === "paquetes") {
                // Render the packages dropdown!
                return (
                  <div 
                    key={item.id}
                    className="relative"
                    onMouseEnter={() => setIsNavDropdownOpen(true)}
                    onMouseLeave={() => setIsNavDropdownOpen(false)}
                  >
                    <button 
                      onClick={() => {
                        if (currentView !== "home") {
                          setCurrentView("home");
                          setTimeout(() => scrollToId("paquetes"), 150);
                        } else {
                          scrollToId("paquetes");
                        }
                        setIsNavDropdownOpen(!isNavDropdownOpen);
                      }} 
                      className="hover:text-brand-pink transition-colors cursor-pointer flex items-center gap-1 py-1"
                    >
                      <span>{label}</span>
                      <ChevronDown className={`w-3.5 h-3.5 transition-transform duration-200 ${isNavDropdownOpen ? "rotate-180" : ""}`} />
                    </button>
                    
                    <AnimatePresence>
                      {isNavDropdownOpen && (
                        <motion.div
                          initial={{ opacity: 0, y: 10, scale: 0.95 }}
                          animate={{ opacity: 1, y: 0, scale: 1 }}
                          exit={{ opacity: 0, y: 10, scale: 0.95 }}
                          transition={{ duration: 0.15 }}
                          className="absolute top-full left-1/2 -translate-x-1/2 mt-2 w-72 bg-white rounded-2xl shadow-xl border border-brand-pink/10 py-3 z-50 flex flex-col gap-1 text-xs text-left"
                        >
                          <div className="px-4 py-1.5 border-b border-brand-pink/5 text-[10px] font-mono tracking-widest text-[#e12d8a] uppercase font-bold text-center">
                            {t.catalogoTuristico}
                          </div>
                          {(cmsContent.secondaryMenuItems || DEFAULT_CMS_CONTENT.secondaryMenuItems || []).map((secItem) => {
                            const secLabel = language === "es" ? secItem.labelEs : secItem.labelEn;
                            const secSelected = selectedZonePage === secItem.target;
                            
                            return (
                              <button
                                key={secItem.id}
                                type="button"
                                onClick={() => {
                                  if (secItem.type === "custom_page") {
                                    setCurrentView(secItem.target);
                                  } else {
                                    setSelectedZonePage(secItem.target as any);
                                    setSelectedPackage(null);
                                    if (currentView !== "home") {
                                      setCurrentView("home");
                                      setTimeout(() => scrollToId("paquetes"), 150);
                                    } else {
                                      scrollToId("paquetes");
                                    }
                                  }
                                  setIsNavDropdownOpen(false);
                                }}
                                className={`px-4 py-2.5 text-left hover:bg-brand-pink/5 flex flex-col transition-colors cursor-pointer ${
                                  secSelected ? "bg-brand-pink/5 text-brand-pink font-semibold" : "text-brand-charcoal"
                                }`}
                              >
                                <span className="text-xs font-semibold">{secLabel}</span>
                                <span className="text-[10px] text-brand-charcoal/50 font-light mt-0.5">
                                  {language === "es" 
                                    ? `Ver catálogo de ${secLabel}`
                                    : `View ${secLabel} travel gallery`}
                                </span>
                              </button>
                            );
                          })}
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                );
              }

              // Render regular section scroll or custom sub-route
              return (
                <button
                  key={item.id}
                  onClick={() => {
                    if (item.type === "section") {
                      if (currentView !== "home") {
                        setCurrentView("home");
                        setTimeout(() => scrollToId(item.target), 150);
                      } else {
                        scrollToId(item.target);
                      }
                    } else {
                      setCurrentView(item.target);
                      window.scrollTo({ top: 0, behavior: "smooth" });
                    }
                  }}
                  className={`hover:text-brand-pink transition-colors cursor-pointer ${
                    isSelected ? "text-brand-pink font-extrabold" : ""
                  }`}
                >
                  {label}
                </button>
              );
            })}
          </nav>

          {/* Booking CTA button in Primary Nav */}
          <div className="hidden md:flex items-center gap-4">
            <button 
              onClick={() => {
                if (currentView !== "home") {
                  setCurrentView("home");
                  setTimeout(() => scrollToId("contacto"), 150);
                } else {
                  scrollToId("contacto");
                }
              }}
              className="bg-brand-pink hover:bg-brand-pink/95 active:scale-95 text-white font-extrabold text-xs uppercase tracking-wider px-5 py-3 rounded-full shadow-md transition-all cursor-pointer"
            >
              {t.reservarAhora}
            </button>
          </div>

          {/* Hamburger Mobile Menu Toggle */}
          <button 
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)} 
            className="md:hidden p-2 rounded-lg text-brand-charcoal hover:bg-brand-pink/5 cursor-pointer"
            aria-label="Toggle Menu"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile Navigation Drawer */}
        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.div 
               initial={{ height: 0, opacity: 0 }}
               animate={{ height: "auto", opacity: 1 }}
               exit={{ height: 0, opacity: 0 }}
               className="md:hidden border-t border-brand-pink/10 bg-[#fbfaf8] overflow-hidden"
            >
              <div className="px-4 pt-2 pb-6 flex flex-col gap-4 text-base font-semibold">
                {(cmsContent.menuItems || DEFAULT_CMS_CONTENT.menuItems).map((item) => {
                  const label = language === "es" ? item.labelEs : item.labelEn;
                  
                  if (item.target === "paquetes") {
                    return (
                      <div key={item.id} className="border-b border-brand-pink/5 py-1 text-left">
                        <button 
                          onClick={() => setIsMobileNavDropdownOpen(!isMobileNavDropdownOpen)} 
                          className="w-full flex items-center justify-between text-left py-1 hover:text-brand-pink cursor-pointer"
                        >
                          <span className="text-base font-semibold">{label}</span>
                          <ChevronDown className={`w-4 h-4 transition-transform duration-200 ${isMobileNavDropdownOpen ? "rotate-180 text-brand-pink" : "text-neutral-500"}`} />
                        </button>
                        <AnimatePresence>
                          {isMobileNavDropdownOpen && (
                            <motion.div 
                              initial={{ height: 0, opacity: 0 }}
                              animate={{ height: "auto", opacity: 1 }}
                              exit={{ height: 0, opacity: 0 }}
                              className="pl-4 mt-2 flex flex-col gap-2.5 overflow-hidden text-left"
                            >
                              {(cmsContent.secondaryMenuItems || DEFAULT_CMS_CONTENT.secondaryMenuItems || []).map((secItem) => {
                                const secLabel = language === "es" ? secItem.labelEs : secItem.labelEn;
                                const secSelected = selectedZonePage === secItem.target;
                                
                                return (
                                  <button
                                    key={secItem.id}
                                    type="button"
                                    onClick={() => {
                                      if (secItem.type === "custom_page") {
                                        setCurrentView(secItem.target);
                                      } else {
                                        setSelectedZonePage(secItem.target as any);
                                        setSelectedPackage(null);
                                        if (currentView !== "home") {
                                          setCurrentView("home");
                                          setTimeout(() => scrollToId("paquetes"), 150);
                                        } else {
                                          scrollToId("paquetes");
                                        }
                                      }
                                      setMobileMenuOpen(false);
                                      setIsMobileNavDropdownOpen(false);
                                    }}
                                    className={`text-left py-1.5 flex items-center gap-1.5 cursor-pointer ${
                                      secSelected ? "text-brand-pink font-extrabold" : "text-brand-charcoal/80 font-normal"
                                    }`}
                                  >
                                    <span className="text-xs">{secLabel}</span>
                                  </button>
                                );
                              })}
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </div>
                    );
                  }

                  return (
                    <button
                      key={item.id}
                      onClick={() => {
                        setMobileMenuOpen(false);
                        if (item.type === "section") {
                          if (currentView !== "home") {
                            setCurrentView("home");
                            setTimeout(() => scrollToId(item.target), 150);
                          } else {
                            scrollToId(item.target);
                          }
                        } else {
                          setCurrentView(item.target);
                          window.scrollTo({ top: 0, behavior: "smooth" });
                        }
                      }}
                      className="text-left py-2 hover:text-brand-pink border-b border-brand-pink/5 cursor-pointer"
                    >
                      {label}
                    </button>
                  );
                })}

                <div className="flex flex-wrap gap-2 pt-2">
                  <button 
                    type="button"
                    onClick={() => { setIsAdminConsoleOpen(true); setMobileMenuOpen(false); }}
                    className="flex items-center gap-1.5 px-4 py-2 rounded-full bg-brand-orange/10 text-brand-orange font-bold border border-brand-orange/20 text-xs"
                  >
                    <Sliders className="w-4 h-4" /> {t.consolaAdmin}
                  </button>
                  {/* Language Toggle */}
                  <button 
                    type="button"
                    onClick={() => { setLanguage(language === "es" ? "en" : "es"); setMobileMenuOpen(false); }}
                    className="flex items-center gap-1.5 px-4 py-2 rounded-full bg-brand-pink/5 text-brand-pink font-bold border border-brand-pink/25 text-xs"
                  >
                    <Globe className="w-4 h-4" /> {language === "es" ? "ENGLISH (EN)" : "ESPAÑOL (ES)"}
                  </button>
                </div>
                <button onClick={() => scrollToId("testimonios")} className="text-left py-2 hover:text-brand-pink border-b border-brand-pink/5">{t.testimonios}</button>
                
                {/* Mobile Social Medias row */}
                <div className="flex items-center justify-around py-2 bg-neutral-100/50 rounded-xl border border-brand-pink/5 mt-1">
                  <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="p-2 text-brand-charcoal hover:text-brand-pink transition-colors">
                    <Facebook className="w-5 h-5" />
                  </a>
                  <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="p-2 text-brand-charcoal hover:text-brand-pink transition-colors">
                    <Instagram className="w-5 h-5" />
                  </a>
                  <a href="https://tiktok.com" target="_blank" rel="noopener noreferrer" className="p-2 text-brand-charcoal hover:text-brand-pink transition-colors">
                    <TiktokIcon className="w-5 h-5" />
                  </a>
                  <a href="https://youtube.com" target="_blank" rel="noopener noreferrer" className="p-2 text-brand-charcoal hover:text-brand-pink transition-colors">
                    <Youtube className="w-5 h-5" />
                  </a>
                  <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="p-2 text-brand-charcoal hover:text-brand-pink transition-colors">
                    <Linkedin className="w-5 h-5" />
                  </a>
                </div>

                <button 
                  onClick={() => { scrollToId("contacto"); setMobileMenuOpen(false); }}
                  className="w-full text-center bg-brand-pink text-white font-bold py-3 rounded-xl mt-2 cursor-pointer"
                >
                  {t.reservarAhora}
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </header>

      <AnimatePresence mode="wait">
        {selectedPackage ? (
          <PackageLandingPage 
            pkg={getTranslatedPackage(selectedPackage, language)} 
            onBack={() => {
              setSelectedPackage(null);
              setTimeout(() => {
                const el = document.getElementById("paquetes");
                if (el) el.scrollIntoView({ behavior: "smooth" });
              }, 50);
            }} 
            setBookingForm={setBookingForm}
            scrollToId={scrollToId}
            whatsappNumber={cmsContent.whatsappNumber}
            onAddCRMLead={(newLead: CRMLead) => setCrmLeads((prev) => [newLead, ...prev])}
            destinationFormEmail={cmsContent.destinationFormEmail}
            tripadvisorUrl={cmsContent.socialReviewsLinks?.tripadvisor}
            googleReviewsUrl={cmsContent.socialReviewsLinks?.google}
          />
        ) : selectedZonePage ? (
          <ZoneCatalogPage
            zone={selectedZonePage}
            packages={translatedPackages}
            onBack={() => {
              setSelectedZonePage(null);
              setTimeout(() => {
                const el = document.getElementById("paquetes");
                if (el) el.scrollIntoView({ behavior: "smooth" });
              }, 50);
            }}
            onSelectPackage={(pkg) => selectPackageAndScroll(pkg)}
            language={language}
            whatsappNumber={cmsContent.whatsappNumber}
          />
        ) : currentView === "nosotros" ? (
          <NosotrosView 
            cmsContent={cmsContent}
            language={language}
            onBack={() => setCurrentView("home")}
            scrollToId={scrollToId}
          />
        ) : currentView === "blog" ? (
          <BlogView 
            blogPosts={blogPosts}
            language={language}
            onBack={() => setCurrentView("home")}
            scrollToId={scrollToId}
          />
        ) : currentView === "contacto" ? (
          <ContactoView 
            cmsContent={cmsContent}
            language={language}
            onBack={() => setCurrentView("home")}
          />
        ) : currentView === "builder" ? (
          <VisualBuilder 
            onBack={() => setCurrentView("home")}
            language={language}
            whatsappNumber={cmsContent.whatsappNumber}
            destinationFormEmail={cmsContent.destinationFormEmail}
            packages={packages}
          />
        ) : ["privacy", "terms", "cookies", "notice", "complaints"].includes(currentView) ? (
          <LegalView 
            cmsContent={cmsContent}
            currentType={currentView as any}
            language={language}
            onBack={() => setCurrentView("home")}
            onUpdateCMSContent={(updated) => setCmsContent(updated)}
            onAddCRMLead={(lead) => setCrmLeads(prev => [lead, ...prev])}
          />
        ) : (cmsContent.menuItems || DEFAULT_CMS_CONTENT.menuItems).some(item => item.type === "custom_page" && item.target === currentView) ? (() => {
          const item = (cmsContent.menuItems || DEFAULT_CMS_CONTENT.menuItems).find(item => item.type === "custom_page" && item.target === currentView);
          const title = language === "es" ? item?.customTitleEs || item?.labelEs : item?.customTitleEn || item?.labelEn;
          const body = language === "es" ? item?.customContentEs : item?.customContentEn;
          const image = item?.customImage || "https://images.unsplash.com/photo-1526392060635-9d6019884377?w=1200";

          return (
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              className="py-12 sm:py-24 max-w-5xl mx-auto px-4 sm:px-6"
            >
              <button 
                onClick={() => setCurrentView("home")}
                className="mb-8 flex items-center gap-2 text-brand-pink font-bold text-xs uppercase cursor-pointer hover:underline"
              >
                ← {language === "es" ? "Volver al Inicio" : "Back to Home"}
              </button>

              <div className="relative rounded-3xl overflow-hidden h-72 sm:h-96 md:h-[400px] mb-12 shadow-lg">
                <img 
                  src={image} 
                  alt={title} 
                  className="w-full h-full object-cover filter brightness-[0.75]"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent flex items-end p-6 sm:p-12">
                  <div className="text-left space-y-2 max-w-3xl">
                    <span className="text-[10px] font-mono tracking-widest text-[#f58220] font-black uppercase">
                      {language === "es" ? "EXPLORACIÓN EXCLUSIVA" : "EXCLUSIVE EXPLORATION"}
                    </span>
                    <h1 className="font-display font-black text-2xl sm:text-4xl text-white tracking-tight">
                      {title}
                    </h1>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
                <div className="lg:col-span-8 text-left space-y-6">
                  <div className="whitespace-pre-line text-brand-charcoal/80 leading-relaxed font-light text-xs sm:text-sm">
                    {body || (language === "es" ? "Contenido por configurar desde el panel de administración." : "Content to be configured from the admin panel.")}
                  </div>
                </div>

                <div className="lg:col-span-4 space-y-6">
                  <div className="bg-brand-pink/5 rounded-3xl p-6 border border-brand-pink/15 text-left space-y-4">
                    <h4 className="text-xs font-mono font-black text-brand-pink uppercase tracking-widest">
                      {language === "es" ? "COTIZAR PLAN" : "BOOK PLAN"}
                    </h4>
                    <p className="text-xs text-brand-charcoal/85 leading-relaxed font-light">
                      {language === "es" 
                        ? "¿Quieres armar un itinerario para esta sección personalizada? Escríbenos directamente o usa el planificador inteligente."
                        : "Wish to book this custom experience? Direct-message our team for exclusive local pricing."}
                    </p>
                    <button 
                      onClick={() => {
                        setCurrentView("contacto");
                        setTimeout(() => {
                          const contactTypeNode = document.getElementById("contacto");
                          if (contactTypeNode) contactTypeNode.scrollIntoView({ behavior: "smooth" });
                        }, 100);
                      }}
                      className="w-full py-3 bg-brand-pink hover:bg-brand-pink/90 active:scale-95 text-white font-black text-[10px] uppercase tracking-wider rounded-full shadow-md transition-all cursor-pointer text-center"
                    >
                      {language === "es" ? "Enviar Mensaje" : "Inquire Now"}
                    </button>
                  </div>
                </div>
              </div>
            </motion.div>
          );
        })() : (
          <motion.div
            key="home-content"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            {/* HERO SECTION WITH DYNAMIC GRAPHICS (Full Page Background Image Carousel) */}
            <section id="inicio" className="relative h-[calc(100vh-120px)] lg:h-[calc(100vh-112px)] min-h-[600px] lg:min-h-[750px] w-full flex items-center justify-center overflow-hidden bg-brand-charcoal select-none">
              
              {/* Dynamic Background Image Crossfade Carousel */}
              <div className="absolute inset-0 z-0">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={currentSlide}
                    initial={{ opacity: 0, scale: 1.02 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.98 }}
                    transition={{ duration: 0.65, ease: "easeInOut" }}
                    className="absolute inset-0 w-full h-full"
                  >
                    <img 
                      src={slides[currentSlide].image} 
                      alt={language === "es" ? slides[currentSlide].titleEs : slides[currentSlide].titleEn}
                      className="w-full h-full object-cover"
                      referrerPolicy="no-referrer"
                    />
                  </motion.div>
                </AnimatePresence>
                {/* Overlay to ensure high accessibility and readable white text */}
                <div className="absolute inset-0 bg-black/45 z-10 pointer-events-none" />
              </div>

              {/* Centered clean overlay text directly on the image with no background layer band */}
              <div className="w-full relative z-20 flex flex-col items-center justify-center py-10 sm:py-14 px-4">
                <div className="max-w-5xl mx-auto px-4 w-full flex flex-col items-center text-center gap-4 sm:gap-6">
                  
                  {/* Floating slide badge or tag */}
                  <motion.div 
                    key={`tag-${currentSlide}`}
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4 }}
                    className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-white font-mono text-[9px] sm:text-xs font-bold uppercase tracking-widest shadow-md"
                  >
                    <MapPin className="w-3.5 h-3.5 text-brand-orange animate-pulse" />
                    <span>{language === "es" ? slides[currentSlide].tagEs : slides[currentSlide].tagEn} | {language === "es" ? slides[currentSlide].locationEs : slides[currentSlide].locationEn}</span>
                  </motion.div>

                  {/* Dynamic big title */}
                  <motion.h1
                    key={`title-${currentSlide}`}
                    initial={{ opacity: 0, y: 15 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.1 }}
                    className="font-display font-black text-3xl sm:text-5xl lg:text-6.5xl text-white tracking-tight uppercase leading-tight drop-shadow-xl max-w-4xl text-center"
                    style={{
                      borderRadius: "0px"
                    }}
                  >
                    {language === "es" 
                      ? `CONOCE ${slides[currentSlide].titleEs.toUpperCase()}`
                      : `DISCOVER ${slides[currentSlide].titleEn.toUpperCase()}`
                    }
                  </motion.h1>

                  {/* Subtitle / Description sentence formatted in uppercase or regular elegant case */}
                  <motion.p
                    key={`desc-${currentSlide}`}
                    initial={{ opacity: 0, y: 15 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.2 }}
                    className="text-xs sm:text-sm md:text-base text-white/95 max-w-4xl tracking-wider uppercase font-semibold text-center drop-shadow leading-relaxed"
                  >
                    {language === "es" 
                      ? `${slides[currentSlide].locationEs.toUpperCase()} — ${slides[currentSlide].descEs.toUpperCase()}`
                      : `${slides[currentSlide].locationEn.toUpperCase()} — ${slides[currentSlide].descEn.toUpperCase()}`
                    }
                  </motion.p>

                  {/* CTA button (Pink color highlighted perfectly) */}
                  <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.4, delay: 0.3 }}
                    className="mt-2"
                  >
                    <button 
                      onClick={() => scrollToId("paquetes")}
                      className="bg-brand-pink hover:bg-brand-pink/90 text-white font-extrabold uppercase tracking-widest text-xs sm:text-sm px-8 py-3.5 sm:px-10 sm:py-4 rounded-md shadow-lg hover:shadow-brand-pink/20 transition-all active:scale-95 duration-200 cursor-pointer"
                    >
                      {language === "es" ? "EXPLORAR TOURS" : "EXPLORE TOURS"}
                    </button>
                  </motion.div>
                </div>
              </div>

              {/* Slider Left Chevron Navigation Button (Near border edge) */}
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
                }}
                className="absolute left-4 sm:left-8 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-black/25 hover:bg-brand-pink text-white flex items-center justify-center backdrop-blur-sm transition-all focus:outline-none z-30 cursor-pointer active:scale-90 shadow-lg border border-white/10 group animate-fade-in"
                aria-label="Previous Slide"
              >
                <ChevronRight className="w-6 h-6 rotate-180 group-hover:scale-110 transition-transform" />
              </button>

              {/* Slider Right Chevron Navigation Button (Near border edge) */}
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  setCurrentSlide((prev) => (prev + 1) % slides.length);
                }}
                className="absolute right-4 sm:right-8 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-black/25 hover:bg-brand-pink text-white flex items-center justify-center backdrop-blur-sm transition-all focus:outline-none z-30 cursor-pointer active:scale-90 shadow-lg border border-white/10 group animate-fade-in"
                aria-label="Next Slide"
              >
                <ChevronRight className="w-6 h-6 group-hover:scale-110 transition-transform" />
              </button>

              {/* Dynamic Bottom jump dots */}
              <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex items-center gap-2.5 z-30">
                {slides.map((_, idx) => (
                  <button
                    key={idx}
                    type="button"
                    onClick={() => setCurrentSlide(idx)}
                    className={`h-2.5 rounded-full transition-all duration-300 cursor-pointer ${
                      currentSlide === idx ? "w-8 bg-brand-pink" : "w-2.5 bg-white/50 hover:bg-white"
                    }`}
                    aria-label={`Go to slide ${idx + 1}`}
                  />
                ))}
              </div>

              {/* Floating trust badge at the corner of the slide */}
              <div className="absolute bottom-6 right-6 bg-black/40 backdrop-blur-md border border-white/10 p-2.5 rounded-xl shadow-xl hidden lg:flex items-center gap-2.5 z-30">
                <div className="w-8 h-8 rounded-full bg-brand-pink/20 flex items-center justify-center text-brand-pink">
                  <Shield className="w-4 h-4" />
                </div>
                <div className="text-left text-white">
                  <p className="text-[8px] uppercase font-bold text-brand-orange font-mono tracking-wider">
                    {language === "es" ? "Turismo Seguro" : "Safe Tourism"}
                  </p>
                  <p className="text-[10px] font-semibold text-white/90">
                    {language === "es" ? "Agencia Registrada" : "Registered Agency"}
                  </p>
                </div>
              </div>

              {/* Floating micro milestone stats inside a sleek glass pill over the media */}
              <div className="absolute bottom-6 left-6 bg-black/40 backdrop-blur-md rounded-xl border border-white/10 py-2.5 px-5 hidden lg:flex items-center gap-6 text-white z-30 select-none">
                <div className="text-center font-normal">
                  <p className="font-display font-black text-sm text-brand-orange leading-none">10+</p>
                  <p className="text-[8px] text-white/70 uppercase tracking-widest mt-0.5">{language === "es" ? "Años" : "Years"}</p>
                </div>
                <div className="h-6 w-[1px] bg-white/15" />
                <div className="text-center">
                  <p className="font-display font-black text-sm text-white leading-none">5,000+</p>
                  <p className="text-[8px] text-white/70 uppercase tracking-widest mt-0.5">{language === "es" ? "Clientes" : "Clients"}</p>
                </div>
                <div className="h-6 w-[1px] bg-white/15" />
                <div className="text-center">
                  <p className="font-display font-black text-sm text-brand-pink leading-none">100%</p>
                  <p className="text-[8px] text-white/70 uppercase tracking-widest mt-0.5">{language === "es" ? "Formal" : "Official"}</p>
                </div>
              </div>

            </section>

      {/* Nosotros Section on Homepage - Dynamic & Beautifully Detailed */}
      <section id="nosotros" className="py-20 px-4 sm:px-6 lg:px-8 bg-white border-y border-brand-pink/5 scroll-mt-20">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            
            {/* Left side: Stunning layered image and badges */}
            <div className="relative group">
              {/* Outer soft glowing background element */}
              <div className="absolute -inset-4 rounded-[40px] bg-gradient-to-tr from-brand-pink/20 to-brand-orange/20 blur-2xl opacity-75 group-hover:opacity-90 transition-all duration-500" />
              
              <div className="relative rounded-[32px] overflow-hidden shadow-2xl border border-white/40 aspect-[4/3] md:aspect-video lg:aspect-[4/3] bg-neutral-100">
                <img 
                  src="https://images.unsplash.com/photo-1526772662000-3f88f10405ff?w=1000&auto=format&fit=crop&q=80" 
                  alt="Sisari Travel - Aventura Impresionante" 
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                
                {/* Floating dynamic stats card inside the image */}
                <div className="absolute bottom-6 left-6 right-6 bg-white/95 backdrop-blur-md rounded-2xl p-4 border border-white/20 shadow-xl flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-brand-pink/10 flex items-center justify-center text-brand-pink shrink-0">
                      <Compass className="w-5 h-5 text-brand-pink" />
                    </div>
                    <div className="text-left">
                      <h4 className="text-xs font-black text-brand-charcoal uppercase tracking-wider">Ayacucho, Perú</h4>
                      <p className="text-[10px] text-brand-charcoal/60">{language === "es" ? "Agencia Formal Registrada" : "Officially Registered Agency"}</p>
                    </div>
                  </div>
                  <span className="text-[10px] bg-emerald-500 text-white font-mono font-bold px-2 py-0.5 rounded-full uppercase tracking-wider animate-pulse">
                    DIRCETUR
                  </span>
                </div>
              </div>

              {/* Offset decorative badge */}
              <div className="absolute -top-6 -right-5 bg-brand-orange text-white w-24 h-24 rounded-full flex flex-col items-center justify-center text-center shadow-lg transform rotate-12 group-hover:rotate-6 transition-all duration-500 select-none z-10 border-4 border-white">
                <p className="font-display font-black text-xl leading-none">10+</p>
                <p className="text-[8px] uppercase tracking-widest font-bold mt-0.5">{language === "es" ? "Años" : "Years"}</p>
                <p className="text-[7px] text-white/80">{language === "es" ? "Trayectoria" : "History"}</p>
              </div>
            </div>

            {/* Right side: High-fidelity details and corporate attributes */}
            <div className="space-y-6 text-left">
              <div className="inline-flex items-center gap-2 bg-brand-pink/10 text-brand-pink text-[10px] uppercase font-mono tracking-widest px-3 py-1 rounded-full font-black border border-brand-pink/15">
                <Users className="w-3.5 h-3.5" />
                <span>{language === "es" ? "CONÓCENOS" : "GET TO KNOW US"}</span>
              </div>
              
              <h2 className="font-display font-extrabold text-3xl sm:text-4xl text-[#2c2c2c] tracking-tight leading-tight">
                {language === "es" ? "Sobre Nosotros: Sisari Travel" : "About Us: Sisari Travel"}
              </h2>
              
              <h3 className="text-md sm:text-lg font-semibold text-brand-orange leading-snug">
                {language === "es" ? cmsContent.nosotrosHeadlineEs : cmsContent.nosotrosHeadlineEn}
              </h3>
              
              <p className="text-brand-charcoal/80 text-sm sm:text-base font-light leading-relaxed">
                {language === "es" ? cmsContent.nosotrosDescEs : cmsContent.nosotrosDescEn}
                {" "}
                {language === "es" 
                  ? "Nos apasiona que cada visitante descubra el misticismo, los monumentos milenarios y los paisajes impresionantes de Ayacucho y de todo el Perú. Con Sisari Travel, viajas con confianza y calor humano certificado."
                  : "We are passionate about letting every traveler discover the mysticism, ancient monuments, and awe-inspiring landscapes of Ayacucho and all of Peru. With Sisari Travel, you travel with security and certified warmth."}
              </p>

              {/* Values/Attributes lists */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4 border-t border-brand-pink/10">
                <div className="flex items-start gap-3">
                  <div className="p-2 rounded-xl bg-brand-pink/10 hover:bg-brand-pink/20 transition-colors text-brand-pink shrink-0 mt-0.5">
                    <Shield className="w-4 h-4" />
                  </div>
                  <div>
                    <h4 className="text-xs font-bold text-brand-charcoal uppercase tracking-wider">{language === "es" ? cmsContent.nosotrosValue1TitleEs : cmsContent.nosotrosValue1TitleEn}</h4>
                    <p className="text-xs text-brand-charcoal/70 mt-1 font-light leading-relaxed">{language === "es" ? cmsContent.nosotrosValue1DescEs : cmsContent.nosotrosValue1DescEn}</p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="p-2 rounded-xl bg-brand-orange/10 hover:bg-brand-orange/20 transition-colors text-brand-orange shrink-0 mt-0.5">
                    <Compass className="w-4 h-4" />
                  </div>
                  <div>
                    <h4 className="text-xs font-bold text-brand-charcoal uppercase tracking-wider">{language === "es" ? cmsContent.nosotrosValue3TitleEs : cmsContent.nosotrosValue3TitleEn}</h4>
                    <p className="text-xs text-brand-charcoal/70 mt-1 font-light leading-relaxed">{language === "es" ? cmsContent.nosotrosValue3DescEs : cmsContent.nosotrosValue3DescEn}</p>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="pt-4 flex flex-wrap gap-4 items-center">
                <button
                  type="button"
                  onClick={() => setCurrentView("nosotros")}
                  className="px-6 py-3 rounded-full bg-brand-charcoal hover:bg-black text-white text-xs font-black uppercase tracking-wider transition-all shadow-md active:scale-95 cursor-pointer"
                >
                  {language === "es" ? "Ver Más Historia →" : "Read Full Story →"}
                </button>
                
                <button
                  type="button"
                  onClick={() => scrollToId("contacto")}
                  className="px-6 py-3 rounded-full bg-brand-pink hover:bg-brand-pink/90 text-white text-xs font-black uppercase tracking-wider transition-all shadow-md active:scale-95 cursor-pointer"
                >
                  {language === "es" ? "Contactar Asesor" : "Speak to an Expert"}
                </button>
              </div>

            </div>
          </div>
        </div>
      </section>

      {/* CORE PRODUCTS: TOURIST PACKAGES */}
      <section id="paquetes" className="py-20 px-4 bg-[#fbfaf8] relative">
        <div className="max-w-7xl mx-auto">
          
          <div className="text-center max-w-3xl mx-auto mb-12">
            <h2 className="text-brand-pink uppercase font-mono tracking-widest text-xs font-bold mb-3">
              {t.destinosExclusivos}
            </h2>
            <h3 className="font-display text-3xl sm:text-4xl font-extrabold text-[#2c2c2c] tracking-tight">
              {t.exploraNuestrosPaquetes}
            </h3>
            <p className="text-brand-charcoal/75 font-light mt-3">
              {t.seleccionaAventuraPref}
            </p>
          </div>



          {/* Core divided package section on Homepage */}
          <div className="flex flex-col gap-20">
            
            {/* LOCAL FEATURED ZONE */}
            <div className="border-b border-brand-pink/10 pb-16 last:border-0 last:pb-0">
              <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 gap-4">
                <div className="max-w-xl text-left">
                  <span className="text-brand-pink font-semibold uppercase text-[10px] font-mono tracking-widest bg-brand-pink/5 px-3 py-1 rounded-full border border-brand-pink/10">
                    🏝️ {t.turismoLocal}
                  </span>
                  <h4 className="font-display font-extrabold text-2xl sm:text-3xl text-[#2c2c2c] tracking-tight mt-3">
                    {t.toursLocalesEnAyacucho}
                  </h4>
                  <p className="text-sm text-brand-charcoal/70 leading-relaxed font-light mt-2">
                    {t.toursLocalesDesc}
                  </p>
                </div>
                <button
                  type="button"
                  onClick={() => setSelectedZonePage("local")}
                  className="bg-brand-pink/5 text-brand-pink hover:bg-brand-pink hover:text-white text-xs font-extrabold px-5 py-3 rounded-xl border border-brand-pink/10 hover:border-brand-pink transition-all shrink-0 cursor-pointer text-center"
                >
                  {t.verCatalogoCompleto} Ayacucho ({translatedPackages.filter(p => p.category === 'local').length} {t.destinos}) →
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {translatedPackages.filter(p => p.category === 'local').slice(0, 3).map((pkg) => (
                  <div key={pkg.id} className="bg-white rounded-3xl overflow-hidden border border-brand-pink/5 hover:border-brand-pink/25 hover:shadow-xl transition-all flex flex-col h-full group">
                    <div onClick={() => selectPackageAndScroll(pkg)} className="relative overflow-hidden aspect-[4/3] cursor-pointer">
                      <img src={pkg.image} alt={pkg.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" referrerPolicy="no-referrer" />
                      <div className="absolute top-4 left-4 bg-brand-charcoal/80 backdrop-blur-md text-white font-semibold text-[10px] tracking-wider uppercase px-2.5 py-1 rounded-full">{pkg.location}</div>
                      <div className="absolute top-4 right-4 bg-brand-pink text-white font-extrabold text-[9px] tracking-widest uppercase px-2 py-1 rounded-md shadow-sm">{t.favoritoLocal}</div>
                    </div>
                    <div className="p-6 flex flex-col flex-grow gap-4">
                      <div className="flex items-center justify-between text-xs text-brand-charcoal/60 font-medium">
                        <span className="flex items-center gap-1"><Clock className="w-3.5 h-3.5 text-brand-pink" />{translateDuration(pkg.duration)}</span>
                        <span className="flex items-center gap-1"><Compass className="w-3.5 h-3.5 text-brand-orange" />{t.dificultad}: {translateDifficulty(pkg.difficulty)}</span>
                      </div>
                      <h4 onClick={() => selectPackageAndScroll(pkg)} className="font-display font-bold text-xl text-brand-charcoal hover:text-brand-pink transition-colors leading-tight cursor-pointer text-left">{pkg.title}</h4>
                      <p className="text-sm text-brand-charcoal/70 leading-relaxed font-light line-clamp-3 text-left">{pkg.description}</p>
                      
                      <div className="border-t border-brand-pink/5 pt-4 text-left">
                        <p className="text-[10px] font-mono uppercase tracking-widest text-[#f58220] font-bold mb-2">{t.loDestacadoViaje}</p>
                        <ul className="text-xs text-brand-charcoal/80 flex flex-col gap-1 w-full scale-y-100">
                          {pkg.highlights.slice(0, 3).map((hlt, idx) => (
                            <li key={idx} className="flex items-start gap-1.5 leading-tight text-left">
                              <Check className="w-3.5 h-3.5 text-brand-pink shrink-0 mt-0.5" />
                              <span>{hlt}</span>
                            </li>
                          ))}
                        </ul>
                      </div>

                      <div className="border-t border-brand-pink/5 pt-4 mt-auto flex items-center justify-between">
                        <div className="text-left">
                          <p className="text-[10px] text-brand-charcoal/50 leading-none">{t.desdeTodoIncluido}</p>
                          <p className="text-xl font-display font-extrabold text-brand-charcoal mt-1">{pkg.price}</p>
                        </div>
                        <div className="flex gap-2">
                          <a href={`https://wa.me/${formattedWhatsAppNumber}?text=${encodeURIComponent(pkg.whatsAppText)}`} target="_blank" rel="noopener noreferrer" className="bg-green-500 hover:bg-green-600 active:scale-95 text-white p-2.5 rounded-full flex items-center justify-center shadow-md transition-all cursor-pointer"><Phone className="w-4 h-4 fill-white text-green-500" /></a>
                          <button type="button" onClick={() => selectPackageAndScroll(pkg)} className="bg-brand-pink text-white hover:bg-brand-pink/90 active:scale-95 text-xs font-bold px-4 py-2.5 rounded-xl block shadow-sm transition-all cursor-pointer">{t.verDetalle}</button>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* NATIONAL FEATURED ZONE */}
            <div className="border-b border-brand-pink/10 pb-16 last:border-0 last:pb-0">
              <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 gap-4">
                <div className="max-w-xl text-left">
                  <span className="text-brand-orange font-semibold uppercase text-[10px] font-mono tracking-widest bg-brand-orange/5 px-3 py-1 rounded-full border border-brand-orange/10">
                    ⛰️ {t.rutasNacionales}
                  </span>
                  <h4 className="font-display font-extrabold text-2xl sm:text-3xl text-[#2c2c2c] tracking-tight mt-3">
                    {t.rutasNacionalesIncreibles}
                  </h4>
                  <p className="text-sm text-brand-charcoal/70 leading-relaxed font-light mt-2">
                    {t.rutasNacionalesDesc}
                  </p>
                </div>
                <button
                  type="button"
                  onClick={() => setSelectedZonePage("national")}
                  className="bg-brand-orange/5 text-brand-orange hover:bg-brand-orange hover:text-white text-xs font-extrabold px-5 py-3 rounded-xl border border-brand-orange/10 hover:border-brand-orange transition-all shrink-0 cursor-pointer text-center"
                >
                  {t.verCatalogoCompleto} Perú ({translatedPackages.filter(p => p.category === 'national').length} {t.destinos}) →
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {translatedPackages.filter(p => p.category === 'national').slice(0, 3).map((pkg) => (
                  <div key={pkg.id} className="bg-white rounded-3xl overflow-hidden border border-brand-pink/5 hover:border-brand-pink/25 hover:shadow-xl transition-all flex flex-col h-full group">
                    <div onClick={() => selectPackageAndScroll(pkg)} className="relative overflow-hidden aspect-[4/3] cursor-pointer">
                      <img src={pkg.image} alt={pkg.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" referrerPolicy="no-referrer" />
                      <div className="absolute top-4 left-4 bg-brand-charcoal/80 backdrop-blur-md text-white font-semibold text-[10px] tracking-wider uppercase px-2.5 py-1 rounded-full">{pkg.location}</div>
                    </div>
                    <div className="p-6 flex flex-col flex-grow gap-4">
                      <div className="flex items-center justify-between text-xs text-brand-charcoal/60 font-medium">
                        <span className="flex items-center gap-1"><Clock className="w-3.5 h-3.5 text-brand-pink" />{translateDuration(pkg.duration)}</span>
                        <span className="flex items-center gap-1"><Compass className="w-3.5 h-3.5 text-brand-orange" />{t.dificultad}: {translateDifficulty(pkg.difficulty)}</span>
                      </div>
                      <h4 onClick={() => selectPackageAndScroll(pkg)} className="font-display font-bold text-xl text-brand-charcoal hover:text-brand-pink transition-colors leading-tight cursor-pointer text-left">{pkg.title}</h4>
                      <p className="text-sm text-brand-charcoal/70 leading-relaxed font-light line-clamp-3 text-left">{pkg.description}</p>
                      
                      <div className="border-t border-brand-pink/5 pt-4 text-left">
                        <p className="text-[10px] font-mono uppercase tracking-widest text-[#f58220] font-bold mb-2">{t.loDestacadoViaje}</p>
                        <ul className="text-xs text-brand-charcoal/80 flex flex-col gap-1 w-full">
                          {pkg.highlights.slice(0, 3).map((hlt, idx) => (
                            <li key={idx} className="flex items-start gap-1.5 leading-tight text-left">
                              <Check className="w-3.5 h-3.5 text-brand-pink shrink-0 mt-0.5" />
                              <span>{hlt}</span>
                            </li>
                          ))}
                        </ul>
                      </div>

                      <div className="border-t border-brand-pink/5 pt-4 mt-auto flex items-center justify-between">
                        <div className="text-left">
                          <p className="text-[10px] text-brand-charcoal/50 leading-none">{t.desdeTodoIncluido}</p>
                          <p className="text-xl font-display font-extrabold text-brand-charcoal mt-1">{pkg.price}</p>
                        </div>
                        <div className="flex gap-2">
                          <a href={`https://wa.me/${formattedWhatsAppNumber}?text=${encodeURIComponent(pkg.whatsAppText)}`} target="_blank" rel="noopener noreferrer" className="bg-green-500 hover:bg-green-600 active:scale-95 text-white p-2.5 rounded-full flex items-center justify-center shadow-md transition-all cursor-pointer"><Phone className="w-4 h-4 fill-white text-green-500" /></a>
                          <button type="button" onClick={() => selectPackageAndScroll(pkg)} className="bg-brand-pink text-white hover:bg-brand-pink/90 active:scale-95 text-xs font-bold px-4 py-2.5 rounded-xl block shadow-sm transition-all cursor-pointer">{t.verDetalle}</button>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* INTERNATIONAL FEATURED ZONE */}
            <div className="border-b border-brand-pink/10 pb-16 last:border-0 last:pb-0">
              <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 gap-4">
                <div className="max-w-xl text-left">
                  <span className="text-purple-600 font-semibold uppercase text-[10px] font-mono tracking-widest bg-purple-500/5 px-3 py-1 rounded-full border border-purple-500/10">
                    ✈️ {t.rutasInternacionales}
                  </span>
                  <h4 className="font-display font-extrabold text-2xl sm:text-3xl text-[#2c2c2c] tracking-tight mt-3">
                    {t.aventurasInternacionales}
                  </h4>
                  <p className="text-sm text-brand-charcoal/70 leading-relaxed font-light mt-2">
                    {t.aventurasInternacionalesDesc}
                  </p>
                </div>
                <button
                  type="button"
                  onClick={() => setSelectedZonePage("international")}
                  className="bg-purple-500/5 text-purple-600 hover:bg-purple-600 hover:text-white text-xs font-extrabold px-5 py-3 rounded-xl border border-purple-100 hover:border-purple-600 transition-all shrink-0 cursor-pointer text-center"
                >
                  {t.verCatalogoCompleto} Internacional ({translatedPackages.filter(p => p.category === 'international').length} {t.destinos}) →
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {translatedPackages.filter(p => p.category === 'international').slice(0, 3).map((pkg) => (
                  <div key={pkg.id} className="bg-white rounded-3xl overflow-hidden border border-brand-pink/5 hover:border-brand-pink/25 hover:shadow-xl transition-all flex flex-col h-full group">
                    <div onClick={() => selectPackageAndScroll(pkg)} className="relative overflow-hidden aspect-[4/3] cursor-pointer">
                      <img src={pkg.image} alt={pkg.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" referrerPolicy="no-referrer" />
                      <div className="absolute top-4 left-4 bg-brand-charcoal/80 backdrop-blur-md text-white font-semibold text-[10px] tracking-wider uppercase px-2.5 py-1 rounded-full">{pkg.location}</div>
                    </div>
                    <div className="p-6 flex flex-col flex-grow gap-4">
                      <div className="flex items-center justify-between text-xs text-brand-charcoal/60 font-medium">
                        <span className="flex items-center gap-1"><Clock className="w-3.5 h-3.5 text-brand-pink" />{translateDuration(pkg.duration)}</span>
                        <span className="flex items-center gap-1"><Compass className="w-3.5 h-3.5 text-brand-orange" />{t.dificultad}: {translateDifficulty(pkg.difficulty)}</span>
                      </div>
                      <h4 onClick={() => selectPackageAndScroll(pkg)} className="font-display font-bold text-xl text-brand-charcoal hover:text-brand-pink transition-colors leading-tight cursor-pointer text-left">{pkg.title}</h4>
                      <p className="text-sm text-brand-charcoal/70 leading-relaxed font-light line-clamp-3 text-left">{pkg.description}</p>
                      
                      <div className="border-t border-brand-pink/5 pt-4 text-left">
                        <p className="text-[10px] font-mono uppercase tracking-widest text-[#f58220] font-bold mb-2">{t.loDestacadoViaje}</p>
                        <ul className="text-xs text-brand-charcoal/80 flex flex-col gap-1 w-full">
                          {pkg.highlights.slice(0, 3).map((hlt, idx) => (
                            <li key={idx} className="flex items-start gap-1.5 leading-tight text-left">
                              <Check className="w-3.5 h-3.5 text-brand-pink shrink-0 mt-0.5" />
                              <span>{hlt}</span>
                            </li>
                          ))}
                        </ul>
                      </div>

                      <div className="border-t border-brand-pink/5 pt-4 mt-auto flex items-center justify-between">
                        <div className="text-left">
                          <p className="text-[10px] text-brand-charcoal/50 leading-none">{t.desdeTodoIncluido}</p>
                          <p className="text-xl font-display font-extrabold text-brand-charcoal mt-1">{pkg.price}</p>
                        </div>
                        <div className="flex gap-2">
                          <a href={`https://wa.me/${formattedWhatsAppNumber}?text=${encodeURIComponent(pkg.whatsAppText)}`} target="_blank" rel="noopener noreferrer" className="bg-green-500 hover:bg-green-600 active:scale-95 text-white p-2.5 rounded-full flex items-center justify-center shadow-md transition-all cursor-pointer"><Phone className="w-4 h-4 fill-white text-green-500" /></a>
                          <button type="button" onClick={() => selectPackageAndScroll(pkg)} className="bg-brand-pink text-white hover:bg-brand-pink/90 active:scale-95 text-xs font-bold px-4 py-2.5 rounded-xl block shadow-sm transition-all cursor-pointer">{t.verDetalle}</button>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

          </div>

        </div>
      </section>

      {/* STATEFUL COMPONENT: GEMINI POWERED INTELLIGENT TRAVEL PLANNER */}
      <section id="planificador" className="py-20 px-4 bg-gradient-to-br from-[#fdf2f8] via-[#fbfaf8] to-[#fff7ed]">
        <div className="max-w-7xl mx-auto">
          
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="inline-flex items-center gap-1.5 bg-brand-pink/10 border border-brand-pink/20 px-4.5 py-1.5 rounded-full text-brand-pink text-xs font-bold tracking-wider uppercase mb-3">
              <Sparkles className="w-4.5 h-4.5 animate-pulse text-brand-pink" />
              <span>Tecnología de Vanguardia</span>
            </span>
            <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-extrabold text-brand-charcoal tracking-tight leading-none">
              Diseña tu Ruta de Viaje Inteligente
            </h2>
            <p className="text-brand-charcoal/70 font-light mt-4 max-w-2xl mx-auto">
              ¿Quieres un destino personalizado fuera de catálogo? Cuéntale a nuestro motor inteligente de Sisari Travel lo que sueñas hacer y te devolverá un itinerario profesional inmediato.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-stretch">
            
            {/* Input planner form */}
            <div className="lg:col-span-5 bg-white border border-brand-pink/10 rounded-3xl p-6 sm:p-8 shadow-md">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 rounded-lg bg-brand-pink/10 flex items-center justify-center text-brand-pink">
                  <Compass className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-display font-extrabold text-[#2c2c2c] text-lg">Preferencias de Ruta</h3>
                  <p className="text-xs text-brand-charcoal/60">Configura tus días e intereses de viaje</p>
                </div>
              </div>

              <form onSubmit={handleGenerateItinerary} className="space-y-5">
                
                {/* Destination input */}
                <div>
                  <label htmlFor="ai-destination" className="block text-xs font-bold uppercase tracking-wider text-brand-charcoal/80 mb-2">
                    ¿A qué lugar deseas viajar?
                  </label>
                  <input 
                    type="text" 
                    id="ai-destination"
                    className="w-full px-4 py-3.5 rounded-xl border border-brand-pink/10 focus:ring-2 focus:ring-brand-pink/30 focus:border-brand-pink outline-none text-sm transition-all text-brand-charcoal bg-white font-medium"
                    placeholder="Escribe ej: Huancavelica, Valle del Colca, Cusco..."
                    value={aiDestination}
                    onChange={(e) => setAiDestination(e.target.value)}
                    required
                  />
                  
                  {/* Quick suggestion chips */}
                  <div className="mt-2.5 flex flex-wrap gap-1.5">
                    {quickSuggestions.slice(0, 4).map((chip, i) => (
                      <button
                        type="button"
                        key={i}
                        className="text-[10px] font-semibold bg-brand-pink/5 text-brand-pink hover:bg-brand-pink/15 px-2.5 py-1 rounded-full transition-all border border-brand-pink/5 cursor-pointer"
                        onClick={() => setAiDestination(chip)}
                      >
                        + {chip}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Duration select slider */}
                <div>
                  <div className="flex justify-between items-center mb-2">
                    <label className="block text-xs font-bold uppercase tracking-wider text-brand-charcoal/80">
                      Duración del itinerario
                    </label>
                    <span className="font-display font-extrabold text-sm text-brand-pink bg-brand-pink/5 border border-brand-pink/10 px-2.5 py-0.5 rounded-full">
                      {aiDuration} Días
                    </span>
                  </div>
                  <input 
                    type="range" 
                    min="1" 
                    max="10" 
                    className="w-full h-2 bg-pink-100 rounded-lg appearance-none cursor-pointer accent-brand-pink"
                    value={aiDuration}
                    onChange={(e) => setAiDuration(Number(e.target.value))}
                  />
                  <div className="flex justify-between text-[10px] text-brand-charcoal/50 mt-1 px-1 font-mono">
                    <span>1 día</span>
                    <span>5 días</span>
                    <span>10 días</span>
                  </div>
                </div>

                {/* Travel style choices cards */}
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-brand-charcoal/80 mb-2">
                    Estilo de Viaje
                  </label>
                  <div className="grid grid-cols-2 gap-2">
                    {[
                      "Aventura y Trekking",
                      "Cultural e Histórico",
                      "Relajante y Paisajístico",
                      "Familiar y Descomplicado"
                    ].map((style) => (
                      <button
                        type="button"
                        key={style}
                        onClick={() => setAiStyle(style)}
                        className={`px-3 py-2.5 rounded-xl text-left text-xs transition-all border font-semibold flex items-center gap-1.5 cursor-pointer ${
                          aiStyle === style 
                            ? "bg-brand-pink/5 text-brand-pink border-brand-pink" 
                            : "bg-white text-brand-charcoal/80 border-brand-pink/5 hover:bg-brand-pink/5"
                        }`}
                      >
                        <Compass className="w-3.5 h-3.5 shrink-0 text-brand-orange" />
                        <span className="line-clamp-1">{style}</span>
                      </button>
                    ))}
                  </div>
                </div>

                {/* Traveler group */}
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-brand-charcoal/80 mb-2">
                    ¿Con quién viajas?
                  </label>
                  <div className="grid grid-cols-2 gap-2">
                    {[
                      "Viajero Solitario",
                      "En Pareja",
                      "Familia (con niños)",
                      "Grupo de Amigos"
                    ].map((trav) => (
                      <button
                        type="button"
                        key={trav}
                        onClick={() => setAiTravelers(trav)}
                        className={`px-3 py-2.5 rounded-xl text-left text-xs transition-all border font-semibold flex items-center gap-1.5 cursor-pointer ${
                          aiTravelers === trav 
                            ? "bg-brand-orange/5 text-brand-orange border-brand-orange" 
                            : "bg-white text-brand-charcoal/80 border-brand-pink/5 hover:bg-brand-pink/5"
                        }`}
                      >
                        <User className="w-3.5 h-3.5 shrink-0 text-brand-pink" />
                        <span>{trav}</span>
                      </button>
                    ))}
                  </div>
                </div>

                {/* Trigger generator button */}
                <button
                  type="submit"
                  disabled={isPlanning}
                  className="w-full bg-brand-pink hover:bg-brand-pink/95 disabled:bg-neutral-400 text-white font-bold py-4 rounded-xl shadow-lg transition-all flex items-center justify-center gap-2 mt-5 cursor-pointer text-sm"
                >
                  {isPlanning ? (
                    <>
                      <div className="w-5 h-5 border-2 border-white/60 border-t-white rounded-full animate-spin"></div>
                      <span>Generando Itinerario...</span>
                    </>
                  ) : (
                    <>
                      <Sparkles className="w-4.5 h-4.5 fill-white text-white" />
                      <span>Planificar Ruta de Sisari con IA</span>
                    </>
                  )}
                </button>

              </form>
            </div>

            {/* AI Results Screen Output */}
            <div className="lg:col-span-7 w-full h-full flex flex-col">
              <div className="bg-[#fbfaf8] border-2 border-dashed border-brand-pink/15 rounded-3xl min-h-[480px] lg:min-h-0 h-full p-6 lg:p-8 flex flex-col justify-center items-center relative overflow-hidden bg-white flex-1">
                
                <AnimatePresence mode="wait">
                  
                  {/* Initial state placeholder - replaced with a striking impressive image */}
                  {!isPlanning && !itineraryResult && !itineraryError && (
                    <motion.div 
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      className="absolute inset-0 w-full h-full flex flex-col justify-end p-8 text-left"
                    >
                      {/* Background Image overlay */}
                      <img 
                        src="https://images.unsplash.com/photo-1501555088652-021faa106b9b?w=1200&auto=format&fit=crop&q=80"
                        alt="Aventura Impresionante Ayacucho"
                        className="absolute inset-0 w-full h-full object-cover select-none pointer-events-none"
                        referrerPolicy="no-referrer"
                      />
                      {/* Color grading overlay gradient */}
                      <div className="absolute inset-0 bg-gradient-to-t from-brand-charcoal via-brand-charcoal/50 to-transparent" />
                      
                      {/* Dynamic typography */}
                      <div className="relative z-10 space-y-2 mt-auto">
                        <span className="inline-block bg-brand-orange text-white text-[9px] font-black tracking-widest uppercase px-2.5 py-1 rounded-full shadow mb-1">
                          ⛰️ EN VIVO DESDE AYACUCHO
                        </span>
                        <h4 className="font-display font-black text-white text-3xl sm:text-4xl tracking-tight leading-none uppercase">
                          AYACUCHO TE ESPERA
                        </h4>
                        <p className="text-white/90 text-xs sm:text-sm max-w-lg leading-relaxed font-light">
                          Configura las opciones en el panel de la izquierda y haz clic en "Planificar Ruta". Nuestro motor inteligente diseñará un itinerario en vivo 100% interactivo para descubrir la majestuosidad de la región.
                        </p>
                        
                        <div className="flex items-center gap-1.5 pt-2 text-[10px] text-white/70 font-semibold uppercase tracking-wider font-mono">
                          <span>✨ PERSONALIZADOR INTELIGENTE COMPLETO</span>
                        </div>
                      </div>
                    </motion.div>
                  )}

                  {/* LOADING PLANNING STATE PROGRESS BAR */}
                  {isPlanning && (
                    <motion.div 
                      key="planning-animation"
                      initial={{ opacity: 0, scale: 0.95 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0 }}
                      className="w-full max-w-md flex flex-col items-center gap-6"
                    >
                      <div className="relative">
                        <SisariLogoSVG className="w-20 h-20 animate-spin" style={{ animationDuration: '6s' }} />
                        <div className="absolute inset-0 flex items-center justify-center">
                          <Sparkles className="w-6 h-6 text-brand-pink animate-bounce" />
                        </div>
                      </div>

                      <div className="text-center w-full">
                        <h4 className="font-display font-bold text-lg text-brand-charcoal">Redactando Plan Estratégico...</h4>
                        <p className="text-xs font-mono text-brand-pink font-semibold mt-1">{planningStep + 1} de {steps.length} Procesos completados</p>
                      </div>

                      {/* Display loading messages sequentially */}
                      <div className="w-full bg-[#fbfaf8] border border-brand-pink/10 rounded-xl p-3 text-xs text-brand-charcoal/80 text-center font-light min-h-[44px]">
                        <motion.span 
                          key={planningStep}
                          initial={{ opacity: 0, y: 5 }}
                          animate={{ opacity: 1, y: 0 }}
                          className="block"
                        >
                          {steps[planningStep]}
                        </motion.span>
                      </div>

                      {/* Progress bar visual indicator */}
                      <div className="w-full h-1.5 bg-pink-100 rounded-full overflow-hidden">
                        <motion.div 
                          className="h-full bg-brand-pink"
                          initial={{ width: "0%" }}
                          animate={{ width: `${((planningStep + 1) / steps.length) * 100}%` }}
                          transition={{ duration: 1 }}
                        />
                      </div>
                    </motion.div>
                  )}

                  {/* ERRORED STATE */}
                  {itineraryError && (
                    <motion.div 
                      key="error-state"
                      className="text-center max-w-md flex flex-col items-center gap-3"
                    >
                      <div className="w-12 h-12 rounded-full bg-red-100 flex items-center justify-center text-red-500 mb-2">
                        <X className="w-6 h-6" />
                      </div>
                      <h4 className="font-display font-extrabold text-[#2c2c2c] text-lg">Error en el Servidor IA</h4>
                      <p className="text-sm text-red-600/90 leading-relaxed font-mono text-xs bg-red-50 border border-red-100 rounded-xl p-3">
                        {itineraryError}
                      </p>
                      <button 
                        onClick={handleGenerateItinerary}
                        className="bg-brand-pink text-white text-xs font-bold py-2.5 px-5 rounded-lg transition-all mt-2 cursor-pointer"
                      >
                        Reintentar Generar
                      </button>
                    </motion.div>
                  )}

                  {/* SUCCESS RENDER OF DYNAMIC ITINERARY */}
                  {!isPlanning && itineraryResult && (
                    <motion.div 
                      key="itinerary-success"
                      initial={{ opacity: 0, y: 15 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="w-full text-left flex flex-col gap-6"
                    >
                      
                      {/* Destination Header Title */}
                      <div className="border-b border-brand-pink/10 pb-4 flex flex-col sm:flex-row justify-between sm:items-center gap-4">
                        <div>
                          <div className="flex items-center gap-1.5 text-xs text-brand-pink font-bold uppercase tracking-wider">
                            <MapPin className="w-4 h-4 text-brand-orange" />
                            <span>Itinerario Personalizado por Sisari</span>
                          </div>
                          <h4 className="font-display font-extrabold text-2xl sm:text-3xl text-brand-charcoal mt-1">
                            {itineraryResult.destination}
                          </h4>
                          <p className="text-xs text-brand-charcoal/60 mt-1">
                            {itineraryResult.overview}
                          </p>
                        </div>

                        {/* Travel Specs Pills */}
                        <div className="flex flex-wrap gap-2">
                          <span className="text-[10px] font-bold uppercase tracking-wider bg-brand-pink/10 text-brand-pink px-3 py-1.5 rounded-full border border-brand-pink/15 font-mono font-bold">
                            {itineraryResult.durationDays} Días
                          </span>
                          <span className="text-[10px] font-bold uppercase tracking-wider bg-brand-orange/10 text-brand-orange px-3 py-1.5 rounded-full border border-brand-orange/15 font-mono font-bold">
                            {itineraryResult.travelStyle}
                          </span>
                        </div>
                      </div>

                      {/* SMART APP EMAIL-WHATSAPP DIRECT NOTIFICATION ENGAGE */}
                      {!iaLeadSubmitted ? (
                        <div className="bg-[#fcf8f6] border-2 border-brand-orange/20 rounded-2xl p-5 shadow-sm flex flex-col gap-3.5 text-left">
                          <div className="flex items-start gap-2.5">
                            <div className="w-9 h-9 rounded-full bg-brand-orange/15 flex items-center justify-center text-lg shrink-0">
                              📩
                            </div>
                            <div className="space-y-0.5">
                              <h5 className="font-display font-extrabold text-brand-charcoal text-sm leading-tight">
                                {language === "es" ? "Recibir un Reporte Completo en tu Correo Directo" : "Get Itinerary Direct in Your Inbox"}
                              </h5>
                              <p className="text-[11px] text-brand-charcoal/60 font-light">
                                {language === "es" 
                                  ? "Guarda este plan inteligente y recibe alertas de ofertas exclusivas de temporada para tu viaje de ensueño."
                                  : "Save this dynamic AI layout on your server and get active discount links on local hotels."}
                              </p>
                            </div>
                          </div>

                          <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                            <div className="flex flex-col gap-1">
                              <label className="text-[10px] uppercase font-bold text-brand-charcoal/60 font-mono tracking-wider">Tu Nombre</label>
                              <input 
                                type="text"
                                placeholder={language === "es" ? "Ej. Laura Mendoza" : "e.g., Laura Mendoza"}
                                value={iaClientName}
                                onChange={(e) => setIaClientName(e.target.value)}
                                className="bg-white border border-brand-pink/15 rounded-xl px-3 py-2 text-xs focus:ring-1 focus:ring-brand-pink focus:outline-none text-brand-charcoal"
                              />
                            </div>
                            <div className="flex flex-col gap-1">
                              <label className="text-[10px] uppercase font-bold text-brand-charcoal/60 font-mono tracking-wider">Tu Correo Electrónico</label>
                              <input 
                                type="email"
                                placeholder="laura@ejemplo.com"
                                value={iaClientEmail}
                                onChange={(e) => setIaClientEmail(e.target.value)}
                                className="bg-white border border-brand-pink/15 rounded-xl px-3 py-2 text-xs focus:ring-1 focus:ring-brand-pink focus:outline-none text-brand-charcoal"
                              />
                            </div>
                            <div className="flex flex-col gap-1">
                              <label className="text-[10px] uppercase font-bold text-brand-charcoal/60 font-mono tracking-wider font-bold">Tu Celular / WhatsApp</label>
                              <input 
                                type="tel"
                                placeholder="+51 987 654 321"
                                value={iaClientPhone}
                                onChange={(e) => setIaClientPhone(e.target.value)}
                                className="bg-white border border-brand-pink/15 rounded-xl px-3 py-2 text-xs focus:ring-1 focus:ring-brand-pink focus:outline-none text-brand-charcoal font-bold"
                              />
                            </div>
                          </div>

                          <button
                            type="button"
                            onClick={handleSendAIShipping}
                            disabled={isSendingAIShip}
                            className="bg-brand-pink hover:bg-brand-pink/90 text-white font-extrabold text-xs py-2.5 rounded-xl shadow transition-all uppercase tracking-wider flex items-center justify-center gap-1.5 cursor-pointer disabled:opacity-60"
                          >
                            {isSendingAIShip ? (
                              <span>{language === "es" ? "Enviando Itinerario..." : "Shipping Itinerary..."}</span>
                            ) : (
                              <>
                                <span>{language === "es" ? "Enviar Itinerario Directo por Correo" : "Send Itinerary Direct"}</span>
                                <Send className="w-3.5 h-3.5" />
                              </>
                            )}
                          </button>
                        </div>
                      ) : (
                        <div className="bg-emerald-50 border border-emerald-500/25 rounded-2xl p-5 shadow-xs flex flex-col gap-2.5 text-left">
                          <div className="flex items-start gap-2.5">
                            <div className="w-9 h-9 rounded-full bg-emerald-100 flex items-center justify-center text-lg shrink-0">
                              ✅
                            </div>
                            <div className="space-y-0.5">
                              <h5 className="font-display font-black text-emerald-800 text-sm leading-tight">
                                {language === "es" ? "¡Itinerario Despachado al Correo!" : "Itinerary Shipped Direct!"}
                              </h5>
                              <p className="text-[10px] text-emerald-700 font-semibold font-mono">
                                {language === "es" 
                                  ? `Enviado con éxito a: ${iaClientEmail}`
                                  : `Sent successfully to: ${iaClientEmail}`}
                              </p>
                            </div>
                          </div>
                          <p className="text-[11px] text-[#2c2c2c]/85 leading-relaxed font-light">
                            {language === "es"
                              ? "Hemos enviado su plan de viaje por correo directo y registrado sus preferencias de viaje en nuestro CRM. Nuestros asesores locales ya están cotizando pasajes y hotelería de primer nivel para coordinar por WhatsApp."
                              : "Your travel settings are logged in our CRM system. Our agents have set optimal package rates with local boutique hotels."}
                          </p>
                        </div>
                      )}

                      {/* Split Output details / columns */}
                      <div className="grid grid-cols-1 md:grid-cols-12 gap-6 w-full">
                        
                        {/* Packing checklist / recommendations left */}
                        <div className="md:col-span-4 flex flex-col gap-5 bg-[#fbfaf8] border border-brand-pink/5 rounded-2xl p-4">
                          <div>
                            <p className="text-[11px] font-bold text-brand-orange uppercase tracking-widest font-mono mb-2">Clima & Presupuesto</p>
                            <p className="text-xs text-brand-charcoal/80 leading-relaxed bg-white border border-brand-pink/5 rounded-xl p-3">
                              {itineraryResult.budgetCategory}
                            </p>
                          </div>

                          <div>
                            <p className="text-[11px] font-bold text-brand-pink uppercase tracking-widest font-mono mb-2">Sugerencias de Mochila</p>
                            <ul className="text-xs text-brand-charcoal/85 flex flex-col gap-2 bg-white border border-brand-pink/5 rounded-xl p-3">
                              {itineraryResult.packingSuggestions.map((item, idx) => (
                                <li key={idx} className="flex items-start gap-1.5 leading-tight">
                                  <CheckCircle2 className="w-4 h-4 text-brand-orange shrink-0 mt-0.5" />
                                  <span>{item}</span>
                                </li>
                              ))}
                            </ul>
                          </div>

                          {/* Quick conversion CTA */}
                          <button
                            onClick={() => {
                              setBookingForm((prev) => ({
                                ...prev,
                                destination: `${itineraryResult.destination} (${itineraryResult.durationDays} Días)`,
                                comments: `Solicito cotización de paquete personalizado según mi itinerario de la Inteligencia Artificial de Sisari para estilo: ${itineraryResult.travelStyle}.`
                              }));
                              scrollToId("contacto");
                            }}
                            className="w-full bg-brand-pink text-white font-bold text-xs py-3 rounded-xl shadow-md uppercase tracking-wider text-center mt-2 flex items-center justify-center gap-1 cursor-pointer"
                          >
                            <BookmarkCheck className="w-4 h-4" />
                            <span>Reservar esta Ruta</span>
                          </button>
                        </div>

                        {/* Interactive Accordion timeline right */}
                        <div className="md:col-span-8 flex flex-col gap-3">
                          <p className="text-[11px] font-bold text-brand-charcoal/60 uppercase tracking-widest font-mono mb-1">Cronograma Diario:</p>
                          
                          <div className="space-y-3">
                            {itineraryResult.days.map((dayObj) => {
                              const isOpen = expandedDay === dayObj.day;
                              return (
                                <div 
                                  key={dayObj.day}
                                  className={`border rounded-2xl transition-all overflow-hidden ${
                                    isOpen 
                                      ? "border-brand-pink bg-brand-pink/5/10 shadow-sm" 
                                      : "border-brand-pink/10 hover:border-brand-pink/25"
                                  }`}
                                >
                                  {/* Accordion header clicker */}
                                  <button
                                    onClick={() => setExpandedDay(isOpen ? null : dayObj.day)}
                                    className="w-full px-4 py-3.5 text-left flex items-center justify-between gap-3 text-sm font-semibold text-[#2c2c2c] bg-white cursor-pointer"
                                  >
                                    <div className="flex items-center gap-2.5">
                                      <span className="w-7 h-7 bg-brand-pink text-white font-extrabold text-xs flex items-center justify-center rounded-full shrink-0">
                                        D{dayObj.day}
                                      </span>
                                      <span className="font-display font-extrabold text-[#2c2c2c] line-clamp-1">{dayObj.title}</span>
                                    </div>
                                    <ChevronDown className={`w-4 h-4 transition-transform duration-300 ${isOpen ? "rotate-180 text-brand-pink" : "text-neutral-400"}`} />
                                  </button>

                                  {/* Accordion content body */}
                                  <AnimatePresence initial={false}>
                                    {isOpen && (
                                      <motion.div
                                        initial={{ height: 0, opacity: 0 }}
                                        animate={{ height: "auto", opacity: 1 }}
                                        exit={{ height: 0, opacity: 0 }}
                                        transition={{ duration: 0.3 }}
                                        className="border-t border-brand-pink/10 bg-[#fefefe] p-4 text-xs space-y-3"
                                      >
                                        <p className="text-brand-charcoal/80 leading-relaxed font-light">
                                          {dayObj.details}
                                        </p>

                                        {/* Day highlights recommendation tags */}
                                        <div className="bg-[#fbfaf8]/80 border border-brand-pink/5 rounded-xl p-3 space-y-1.5">
                                          <p className="text-[10px] font-bold uppercase tracking-wider text-brand-orange flex items-center gap-1.5 font-mono">
                                            <Sparkles className="w-3.5 h-3.5 text-brand-orange animate-spin" style={{ animationDuration: '4s' }} />
                                            <span>Tips del Guía de Sisari Travel:</span>
                                          </p>
                                          <ul className="space-y-1 flex flex-col">
                                            {dayObj.recommendations.map((rec, i) => (
                                              <li key={i} className="flex items-start gap-1 leading-tight text-brand-charcoal/90">
                                                <span className="text-[#e21a7a] font-bold text-center shrink-0 w-4">•</span>
                                                <span>{rec}</span>
                                              </li>
                                            ))}
                                          </ul>
                                        </div>
                                      </motion.div>
                                    )}
                                  </AnimatePresence>

                                </div>
                              );
                            })}
                          </div>

                        </div>

                      </div>

                      {/* Direct PDF print / Export buttons simulate */}
                      <div className="pt-4 border-t border-brand-pink/10 flex flex-col sm:flex-row gap-3 justify-end">
                        <button 
                          onClick={() => window.print()}
                          className="px-4 py-2 border border-brand-charcoal/25 hover:border-brand-pink hover:text-brand-pink text-xs font-semibold rounded-lg text-brand-charcoal transition-all cursor-pointer"
                        >
                          🖨️ Imprimir Itinerario
                        </button>
                        
                        <a
                          href={`https://wa.me/${formattedWhatsAppNumber}?text=${encodeURIComponent(
                            iaLeadSubmitted 
                              ? `Hola Sisari Travel! Soy *${iaClientName}*. Acabo de planificar con su Asistente IA una ruta espectacular para *${itineraryResult.destination}* (${itineraryResult.durationDays} días, estilo *${itineraryResult.travelStyle}*). Deseo que un asesor me contacte por favor para presupuestar.`
                              : `Hola Sisari Travel, acabo de diseñar un plan de viaje para *${itineraryResult.destination}* (${itineraryResult.durationDays} días) con su Asistente IA. Quisiera presupuestar precios de pasajes y hospedaje por favor.`
                          )}`}
                          target="_blank"
                          rel="noreferrer"
                          className="bg-green-500 hover:bg-green-600 text-white font-bold text-xs px-5 py-2.5 rounded-lg flex items-center justify-center gap-1.5 shadow-sm transition-all cursor-pointer"
                        >
                          <Phone className="w-4 h-4 fill-white text-green-500 shrink-0" />
                          <span>{iaLeadSubmitted ? "Chatear por WhatsApp sobre mi Rutero" : "Enviar Itinerario por WhatsApp"}</span>
                        </a>
                      </div>

                    </motion.div>
                  )}

                </AnimatePresence>

              </div>
            </div>

          </div>

        </div>
      </section>

      {/* BLOG & NEWS SECTION (TIPO ENTRADA) */}
      <section id="blog" className="py-24 px-4 bg-white border-t border-brand-pink/5 relative text-left">
        {/* Decorative background element */}
        <div className="absolute top-0 right-0 w-80 h-80 bg-brand-pink/3 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-80 h-80 bg-brand-orange/3 rounded-full blur-3xl pointer-events-none" />

        <div className="max-w-7xl mx-auto relative z-10">
          
          {/* Header */}
          <div className="text-center max-w-2xl mx-auto mb-14">
            <h2 className="text-[#e12d8a] uppercase font-mono tracking-widest text-xs font-bold mb-3">
              {language === "es" ? "BLOG Y NOTICIAS" : "TRAVEL BLOG & NEWS"}
            </h2>
            <h3 className="font-display text-3xl font-extrabold text-brand-charcoal tracking-tight sm:text-4xl">
              {language === "es" ? "Explora Nuestro Diario de Viaje" : "Discover Our Latest Adventures"}
            </h3>
            <p className="text-brand-charcoal/70 font-light mt-3 text-sm">
              {language === "es" 
                ? "Consejos de viaje, guías gastronómicas y relatos directo de nuestros guías locales para inspirar tu siguiente aventura."
                : "Expert travel tips, culinary secrets, and destination guides directly from our local curators."}
            </p>
          </div>

          {/* Filters and search bar */}
          <div className="mb-12 flex flex-col items-center gap-6 md:flex-row md:justify-between border-b border-brand-pink/5 pb-8">
            {/* Tag/Category Chips */}
            <div className="flex flex-wrap gap-2 justify-center md:justify-start">
              {["Todos", "Consejos", "Destinos", "Aventura", "Cultura", "Gastronomía"].map((cat) => {
                const labelEs = cat;
                const labelEn = cat === "Todos" ? "All" 
                                : cat === "Consejos" ? "Tips" 
                                : cat === "Destinos" ? "Destinations" 
                                : cat === "Aventura" ? "Adventure" 
                                : cat === "Cultura" ? "Culture" 
                                : "Gastronomy";
                const isSelected = blogCategoryFilter === cat;
                return (
                  <button
                    key={cat}
                    onClick={() => setBlogCategoryFilter(cat)}
                    className={`px-4 py-2 rounded-full text-xs font-semibold cursor-pointer transition-all duration-200 border ${
                      isSelected 
                        ? "bg-brand-pink border-brand-pink text-white shadow-md shadow-brand-pink/20 scale-105" 
                        : "bg-white border-neutral-200 text-neutral-600 hover:border-brand-pink/30 hover:text-brand-pink"
                    }`}
                  >
                    {language === "es" ? labelEs : labelEn}
                  </button>
                );
              })}
            </div>

            {/* Simple Search bar */}
            <div className="relative w-full max-w-xs">
              <input
                type="text"
                value={blogSearchTerm}
                onChange={(e) => setBlogSearchTerm(e.target.value)}
                placeholder={language === "es" ? "Buscar artículo..." : "Search articles..."}
                className="w-full text-xs text-neutral-700 bg-neutral-50 hover:bg-neutral-100/50 focus:bg-white pl-4 pr-10 py-2.5 rounded-full border border-neutral-200 focus:border-brand-pink outline-none transition-all"
              />
              <span className="absolute right-3.5 top-1/2 -translate-y-1/2 text-neutral-400 font-bold text-xs pointer-events-none">🔍</span>
            </div>
          </div>

          {/* Articles grid */}
          {(() => {
            const tempPosts = blogPosts.filter(post => {
              // Category filter
              const matchesCategory = blogCategoryFilter === "Todos" || post.category === blogCategoryFilter;
              
              // Text Search filter
              const searchLower = blogSearchTerm.toLowerCase();
              const matchesSearch = !blogSearchTerm 
                || post.titleEs.toLowerCase().includes(searchLower)
                || post.titleEn.toLowerCase().includes(searchLower)
                || post.subtitleEs.toLowerCase().includes(searchLower)
                || post.subtitleEn.toLowerCase().includes(searchLower)
                || post.contentEs.toLowerCase().includes(searchLower)
                || post.contentEn.toLowerCase().includes(searchLower);

              return matchesCategory && matchesSearch;
            });
            const filteredPosts = tempPosts.slice(0, 3);

            if (filteredPosts.length === 0) {
              return (
                <div className="text-center py-16 bg-neutral-50 rounded-2xl border border-dashed border-neutral-200 max-w-lg mx-auto w-full">
                  <span className="text-4xl">🏜️</span>
                  <p className="mt-4 text-xs font-bold text-neutral-500">
                    {language === "es" 
                      ? "No se encontraron artículos para esta categoría o búsqueda." 
                      : "No articles found matching this query."}
                  </p>
                  <button 
                    onClick={() => { setBlogCategoryFilter("Todos"); setBlogSearchTerm(""); }}
                    className="mt-3 text-xs text-brand-pink font-semibold hover:underline cursor-pointer"
                  >
                    {language === "es" ? "Limpiar filtros" : "Clear filters"}
                  </button>
                </div>
              );
            }

            return (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {filteredPosts.map((post) => {
                  const title = language === "es" ? post.titleEs : post.titleEn;
                  const excerpt = language === "es" ? post.subtitleEs : post.subtitleEn;
                  return (
                    <motion.article
                      key={post.id}
                      layout
                      initial={{ opacity: 0, y: 30 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.4 }}
                      onClick={() => setSelectedBlogPost(post)}
                      className="group bg-white rounded-2xl border border-neutral-100 shadow-sm hover:shadow-xl overflow-hidden cursor-pointer flex flex-col justify-between transition-all duration-300 transform hover:-translate-y-1.5 text-left"
                    >
                      <div>
                        {/* Image banner with scale hover effect */}
                        <div className="relative h-48 overflow-hidden bg-neutral-100">
                          <img
                            src={post.image || "https://images.unsplash.com/photo-1488646953014-85cb44e25828?w=800&auto=format"}
                            alt={title}
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                            referrerPolicy="no-referrer"
                          />
                          {/* Category Badge overlay */}
                          <div className="absolute top-4 left-4 bg-brand-pink text-white text-[10px] uppercase font-bold tracking-widest px-3 py-1 rounded-full shadow-sm z-10">
                            {language === "es" ? post.category : (
                              post.category === "Consejos" ? "Tips" 
                              : post.category === "Destinos" ? "Destinations" 
                              : post.category === "Aventura" ? "Adventure" 
                              : post.category === "Cultura" ? "Culture" 
                              : post.category === "Gastronomía" ? "Gastronomy"
                              : post.category
                            )}
                          </div>
                        </div>

                        {/* Text card content */}
                        <div className="p-6">
                          <div className="flex items-center gap-3 text-[10px] font-mono text-neutral-400 mb-3">
                            <span>{post.date}</span>
                            <span>•</span>
                            <span>{language === "es" ? post.readTimeEs : post.readTimeEn}</span>
                          </div>

                          <h4 className="font-display font-extrabold text-brand-charcoal text-base mb-3 leading-snug group-hover:text-brand-pink transition-colors line-clamp-2">
                            {title}
                          </h4>

                          <p className="text-neutral-500 text-xs font-light leading-relaxed line-clamp-3">
                            {excerpt}
                          </p>
                        </div>
                      </div>

                      {/* Author + "Read More" footer */}
                      <div className="px-6 pb-6 pt-4 border-t border-neutral-50/50 flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <div className="w-6 h-6 rounded-full bg-brand-pink/10 text-brand-pink text-[10px] uppercase font-black flex items-center justify-center">
                            {post.author.slice(0, 2).toUpperCase()}
                          </div>
                          <span className="text-[10px] font-bold text-neutral-600">{post.author}</span>
                        </div>

                        <span className="text-[10px] font-extrabold font-mono tracking-wider text-brand-pink uppercase group-hover:translate-x-1.5 transition-transform flex items-center gap-1">
                          {language === "es" ? "Leer entrada" : "Read entry"} <ArrowRight className="w-3" />
                        </span>
                      </div>
                    </motion.article>
                  );
                })}
              </div>
            );
          })()}

        </div>
      </section>

      {/* DETAILED BLOG ARTICLE MODAL (TIPO ENTRADA) */}
      <AnimatePresence>
        {selectedBlogPost && (() => {
          const post = selectedBlogPost;
          const title = language === "es" ? post.titleEs : post.titleEn;
          const content = language === "es" ? post.contentEs : post.contentEn;
          const relatedPosts = blogPosts.filter(p => p.id !== post.id && p.category === post.category).slice(0, 2);

          return (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-brand-charcoal/80 z-55 flex items-center justify-center p-4 backdrop-blur-md"
            >
              <motion.div
                initial={{ opacity: 0, scale: 0.9, y: 30 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.9, y: 30 }}
                transition={{ type: "spring", damping: 25, stiffness: 220 }}
                className="bg-white rounded-3xl overflow-hidden w-full max-w-4xl shadow-2xl max-h-[90vh] flex flex-col text-left"
              >
                {/* Banner Header Image with dismiss button */}
                <div className="relative h-64 sm:h-80 md:h-96 w-full flex-shrink-0">
                  <img
                    src={post.image || "https://images.unsplash.com/photo-1488646953014-85cb44e25828?w=1200&auto=format"}
                    alt={title}
                    className="w-full h-full object-cover"
                    referrerPolicy="no-referrer"
                  />
                  {/* Black visual gradient protector */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                  
                  {/* Category Pill Overlay */}
                  <div className="absolute bottom-6 left-6 flex flex-wrap gap-2 items-center">
                    <span className="bg-brand-pink text-white text-[10px] uppercase font-mono tracking-widest font-black px-4 py-1.5 rounded-full shadow">
                      {language === "es" ? post.category : (
                        post.category === "Consejos" ? "Tips" 
                        : post.category === "Destinos" ? "Destinations" 
                        : post.category === "Aventura" ? "Adventure" 
                        : post.category === "Cultura" ? "Culture" 
                        : post.category === "Gastronomía" ? "Gastronomy" 
                        : post.category
                      )}
                    </span>
                    <span className="bg-white/10 backdrop-blur-md text-white text-[10px] uppercase font-mono tracking-wider font-extrabold px-3 py-1.5 rounded-full border border-white/15">
                      {post.date}
                    </span>
                  </div>

                  {/* Top Close CTA */}
                  <button
                    onClick={() => setSelectedBlogPost(null)}
                    type="button"
                    className="absolute top-6 right-6 w-10 h-10 bg-black/60 hover:bg-neutral-900 text-white rounded-full flex items-center justify-center transition-all shadow border border-white/10 cursor-pointer"
                    aria-label="Close detailed post modal"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>

                {/* Main scrollable body */}
                <div className="flex-1 overflow-y-auto p-6 sm:p-10">
                  {/* Meta markers */}
                  <div className="flex items-center gap-4 text-xs font-mono text-[#808080] mb-4">
                    <div className="flex items-center gap-2">
                      <div className="w-7 h-7 rounded-full bg-brand-orange/10 text-brand-orange font-black flex items-center justify-center text-[11px]">
                        {post.author.slice(0, 2).toUpperCase()}
                      </div>
                      <span className="font-bold text-neutral-700">{post.author}</span>
                    </div>
                    <span>•</span>
                    <span className="font-bold">{language === "es" ? post.readTimeEs : post.readTimeEn}</span>
                  </div>

                  {/* Title of article */}
                  <h1 className="font-display font-black text-2xl sm:text-3xl md:text-4xl text-brand-charcoal tracking-tight leading-tight mb-6">
                    {title}
                  </h1>

                  {/* Immersive Article Content Container */}
                  <div className="text-zinc-750 text-sm sm:text-base leading-relaxed space-y-5 font-light my-8 pr-1 font-sans">
                    {content.split("\n\n").map((para, pIdx) => {
                      if (para.trim().startsWith("##")) {
                        return (
                          <h4 key={pIdx} className="font-display font-black text-brand-charcoal text-lg sm:text-xl pt-4">
                            {para.replace("##", "").trim()}
                          </h4>
                        );
                      }
                      if (para.trim().startsWith("-") || para.trim().startsWith("*")) {
                        return (
                          <ul key={pIdx} className="list-disc pl-5 space-y-2 mt-2 text-sm text-[#4d4d4d] font-medium font-sans">
                            {para.split("\n").map((li, lIdx) => (
                              <li key={lIdx}>{li.replace(/^[-\*\s]+/, "").trim()}</li>
                            ))}
                          </ul>
                        );
                      }
                      return (
                        <p key={pIdx} className="font-normal text-zinc-650">
                          {para}
                        </p>
                      );
                    })}
                  </div>

                  {/* Related block */}
                  {relatedPosts.length > 0 && (
                    <div className="border-t border-neutral-100 pt-8 mt-12">
                      <h5 className="font-display font-bold text-xs uppercase tracking-widest text-neutral-400 mb-6">
                        {language === "es" ? "Artículos Relacionados" : "Related Articles"}
                      </h5>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                        {relatedPosts.map((rp) => (
                          <div 
                            key={rp.id}
                            onClick={() => setSelectedBlogPost(rp)}
                            className="bg-[#fbfaf8] hover:bg-brand-pink/5 rounded-2xl p-4 border border-neutral-100 cursor-pointer flex gap-4 items-center transition-all text-left"
                          >
                            <img
                              src={rp.image || "https://images.unsplash.com/photo-1488646953014-85cb44e25828?w=300"}
                              alt={rp.titleEs}
                              className="w-16 h-16 object-cover rounded-xl shrink-0"
                            />
                            <div className="min-w-0">
                              <h6 className="font-display font-extrabold text-[#2c2c2c] text-xs leading-snug line-clamp-2 hover:text-[#f81585]">
                                {language === "es" ? rp.titleEs : rp.titleEn}
                              </h6>
                              <span className="text-[10px] font-mono text-neutral-400 mt-1 block">{rp.date}</span>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Dynamic travel planner CTA */}
                  <div className="bg-gradient-to-r from-brand-pink/5 to-brand-orange/5 border border-brand-pink/15 rounded-3xl p-6 sm:p-8 mt-12 flex flex-col sm:flex-row justify-between items-center gap-6">
                    <div>
                      <h4 className="font-display font-black text-[#222222] text-sm sm:text-base tracking-tight">
                        {language === "es" ? "¡Diseña tu propio viaje perfecto!" : "Design your own perfect trip!"}
                      </h4>
                      <p className="text-[11px] text-[#6d6d6d] mt-1 pr-4">
                        {language === "es" 
                          ? "Utiliza nuestro Planificador por IA o reserva hoy de forma directa."
                          : "Use our state-of-the-art AI planner to map excursions, routes, and custom itineraries."}
                      </p>
                    </div>
                    <button
                      onClick={() => {
                        setSelectedBlogPost(null);
                        scrollToId("planificador");
                      }}
                      className="bg-[#e12d8a] font-extrabold text-white text-xs px-5 py-3 rounded-full cursor-pointer hover:bg-[#e12d8a]/95 shrink-0 transition-all uppercase tracking-wider"
                    >
                      {language === "es" ? "Planificar Viaje por IA" : "Plan Trip with AI"}
                    </button>
                  </div>

                </div>
              </motion.div>
            </motion.div>
          );
        })()}
      </AnimatePresence>

      {/* OFFICE TESTIMONIALS SECTION */}
      <section id="testimonios" className="py-20 px-4 bg-white">
        <div className="max-w-7xl mx-auto">
          
          <div className="text-center max-w-2xl mx-auto mb-16">
            <h2 className="text-[#f58220] uppercase font-mono tracking-widest text-xs font-bold mb-3">
              OPINIONES DE VIAJEROS
            </h2>
            <h3 className="font-display text-3xl font-extrabold text-brand-charcoal tracking-tight">
              Testimonios de Quienes Confían en Nosotros
            </h3>
            <p className="text-brand-charcoal/70 font-light mt-3">
              Nuestra mayor garantía son los miles de viajeros que exploran el Perú de forma segura de nuestra mano.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {TESTIMONIALS.map((test, index) => (
              <div 
                key={index}
                className="bg-[#fbfaf8] border border-brand-pink/5 hover:border-brand-pink/20 rounded-3xl p-6 shadow-sm transition-all flex flex-col h-full gap-4 relative"
              >
                {/* Visual quote indicator */}
                <span className="absolute top-4 right-6 text-6xl text-brand-pink/10 font-serif font-bold pointer-events-none">“</span>

                {/* Stars ratings */}
                <div className="flex gap-1 text-amber-500">
                  {[...Array(test.rating)].map((_, i) => (
                    <Star key={i} className="w-4.5 h-4.5 fill-amber-500" />
                  ))}
                </div>

                <p className="text-sm text-brand-charcoal/80 leading-relaxed font-light flex-grow">
                  "{test.comment}"
                </p>

                {/* Author card block */}
                <div className="flex items-center gap-3 border-t border-brand-pink/15 pt-4 mt-auto">
                  {test.avatarSeed && (test.avatarSeed.startsWith("http") || test.avatarSeed.startsWith("data:image")) ? (
                    <img src={test.avatarSeed} alt={test.name} className="w-10 h-10 rounded-full object-cover border border-brand-pink/10" referrerPolicy="no-referrer" />
                  ) : (
                    <div className="w-10 h-10 rounded-full bg-brand-pink/15 text-brand-pink text-sm font-extrabold flex items-center justify-center font-display uppercase">
                      {test.avatarSeed ? test.avatarSeed.charAt(0) : test.name.charAt(0)}
                    </div>
                  )}
                  <div>
                    <h5 className="font-display font-semibold text-xs text-brand-charcoal">{test.name}</h5>
                    <p className="text-[10px] text-[#f58220] font-bold uppercase tracking-wider">{test.role}</p>
                  </div>
                  <span className="text-[9px] text-brand-charcoal/50 font-mono ml-auto shrink-0">{test.date}</span>
                </div>
              </div>
            ))}
          </div>

          {/* Core achievements banners */}
          <div className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-6 text-center max-w-5xl mx-auto bg-transparent border border-brand-pink/5 p-8 rounded-3xl bg-[#fbfaf8]">
            <div className="flex flex-col items-center">
              <Compass className="w-8 h-8 text-brand-pink animate-spin mb-2" style={{ animationDuration: '6s' }} />
              <p className="font-display font-bold text-xl text-brand-charcoal">1,200+</p>
              <p className="text-[10px] uppercase font-bold text-brand-charcoal/50 leading-relaxed tracking-wider">Rutas Operadas</p>
            </div>
            <div className="flex flex-col items-center border-l border-brand-pink/15">
              <Award className="w-8 h-8 text-brand-orange mb-2" />
              <p className="font-display font-bold text-xl text-brand-charcoal">10+ Años</p>
              <p className="text-[10px] uppercase font-bold text-brand-charcoal/50 leading-relaxed tracking-wider">De Experiencia</p>
            </div>
            <div className="flex flex-col items-center border-l border-brand-pink/15">
              <User className="w-8 h-8 text-brand-pink mb-2" />
              <p className="font-display font-bold text-xl text-brand-charcoal">12 Guías</p>
              <p className="text-[10px] uppercase font-bold text-brand-charcoal/50 leading-relaxed tracking-wider">Saber Multilingüe</p>
            </div>
            <div className="flex flex-col items-center border-l border-brand-pink/15">
              <Shield className="w-8 h-8 text-brand-orange mb-2" />
              <p className="font-display font-bold text-xl text-brand-charcoal">100%</p>
              <p className="text-[10px] uppercase font-bold text-brand-charcoal/50 leading-relaxed tracking-wider">Seguro Formal</p>
            </div>
          </div>

        </div>
      </section>

      {/* RESERVATIONS & BOOKINGS FORM SIMULATOR */}
      <section id="contacto" className="py-20 px-4 bg-[#fbfaf8] border-t border-brand-pink/5 relative">
        <div className="max-w-7xl mx-auto">
          
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-stretch">
            
            {/* Visual company info left */}
            <div className="lg:col-span-5 flex flex-col justify-between gap-8 h-full">
              <div className="space-y-4">
                <span className="text-brand-pink font-bold font-mono tracking-widest text-[11px] uppercase block">
                  ASISTENCIA PERSONALIZADA (24/7)
                </span>
                <h2 className="font-display font-extrabold text-3xl sm:text-4xl text-[#2c2c2c] tracking-tight leading-none">
                  Comienza tu Próxima Gran Aventura
                </h2>
                <p className="text-brand-charcoal/70 font-light text-sm leading-relaxed">
                  Completa tus datos en el formulario para coordinar horarios, vuelos de conexión de Lima a Ayacucho, hospedaje boutique, traslados del terminal aéreo o comidas tradicionales. Nuestro equipo te brindará una cotización formal y personalizada en menos de 1 hora.
                </p>
              </div>

              {/* Office Details Cards */}
              <div className="bg-white border border-brand-pink/10 rounded-3xl p-6 space-y-4">
                <h4 className="font-display font-extrabold text-[#2c2c2c] text-sm tracking-wider uppercase">Nuestra Oficina Principal:</h4>
                <div className="space-y-3.5 text-xs text-brand-charcoal/85">
                  <div className="flex items-start gap-2.5">
                    <MapPin className="w-4 h-4 text-brand-pink shrink-0" />
                    <p>Portal Constitución N° 12, Plaza de Armas de Ayacucho (Frente al Banco de la Nación), Perú.</p>
                  </div>
                  <div className="flex items-start gap-2.5 border-t border-brand-pink/5 pt-2">
                    <Phone className="w-4 h-4 text-brand-orange shrink-0" />
                    <div>
                      <p className="font-semibold">Central de Reservas: +51 987 654 321</p>
                      <p className="text-[10px] text-brand-charcoal/60 mt-0.5">Lunes a Domingo (6:00 AM - 10:00 PM)</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-2.5 border-t border-brand-pink/5 pt-2">
                    <Mail className="w-4 h-4 text-brand-pink shrink-0" />
                    <p className="font-mono">reservas@sisaritravel.pe</p>
                  </div>
                </div>
              </div>

              {/* Secure footer claim */}
              <div className="text-[10px] uppercase font-bold text-brand-charcoal/50 leading-relaxed font-mono tracking-wider">
                <p>✓ REGISTRO OFICIAL MINCETUR N° 1548842</p>
                <p>✓ AFILIADOS AL GOBIERNO REGIONAL DE AYACUCHO</p>
              </div>
            </div>

            {/* Simulated Booking Ticket / Form container right */}
            <div className="lg:col-span-7 bg-white border border-brand-pink/10 rounded-3xl p-6 sm:p-8 shadow-lg relative min-h-[480px]">
              <AnimatePresence mode="wait">
                
                {/* ACTIVE FORM */}
                {!bookingSuccessTicket && (
                  <motion.div 
                    key="booking-form"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="flex flex-col gap-6"
                  >
                    <div>
                      <h3 className="font-display font-extrabold text-[#2c2c2c] text-xl">Formulario de Solicitud de Viaje</h3>
                      <p className="text-xs text-brand-charcoal/60">No se requiere ningún pago en esta etapa.</p>
                    </div>

                    <form onSubmit={handleBookingSubmit} className="space-y-4 text-xs font-semibold">
                      
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        {/* Name */}
                        <div className="space-y-1.5">
                          <label htmlFor="form-name" className="text-brand-charcoal/80 uppercase">Nombre Completo *</label>
                          <input 
                            type="text" 
                            id="form-name"
                            className="w-full px-4 py-3 rounded-lg border border-brand-pink/10 focus:ring-2 focus:ring-brand-pink/30 outline-none text-brand-charcoal font-medium bg-white"
                            placeholder="Ej. Juan Pérez Huamán"
                            required
                            value={bookingForm.name}
                            onChange={(e) => setBookingForm({...bookingForm, name: e.target.value})}
                          />
                        </div>

                        {/* Phone */}
                        <div className="space-y-1.5">
                          <label htmlFor="form-phone" className="text-brand-charcoal/80 uppercase">Teléfono móvil *</label>
                          <input 
                            type="tel" 
                            id="form-phone"
                            className="w-full px-4 py-3 rounded-lg border border-brand-pink/10 focus:ring-2 focus:ring-brand-pink/30 outline-none text-brand-charcoal font-medium bg-white"
                            placeholder="Ej. +51 999 888 777"
                            required
                            value={bookingForm.phone}
                            onChange={(e) => setBookingForm({...bookingForm, phone: e.target.value})}
                          />
                        </div>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        {/* Email */}
                        <div className="space-y-1.5">
                          <label htmlFor="form-email" className="text-brand-charcoal/80 uppercase">Correo electrónico *</label>
                          <input 
                            type="email" 
                            id="form-email"
                            className="w-full px-4 py-3 rounded-lg border border-brand-pink/10 focus:ring-2 focus:ring-brand-pink/30 outline-none text-brand-charcoal font-medium bg-white"
                            placeholder="ejemplo@correo.com"
                            required
                            value={bookingForm.email}
                            onChange={(e) => setBookingForm({...bookingForm, email: e.target.value})}
                          />
                        </div>

                        {/* Travel Date */}
                        <div className="space-y-1.5">
                          <label htmlFor="form-date" className="text-brand-charcoal/80 uppercase">Fecha estimada de viaje</label>
                          <input 
                            type="date" 
                            id="form-date"
                            className="w-full px-4 py-3 rounded-lg border border-brand-pink/10 focus:ring-2 focus:ring-brand-pink/30 outline-none text-brand-charcoal font-medium bg-white"
                            value={bookingForm.date}
                            onChange={(e) => setBookingForm({...bookingForm, date: e.target.value})}
                          />
                        </div>
                      </div>

                      {/* Package selector */}
                      <div className="space-y-1.5">
                        <label htmlFor="form-destination" className="text-brand-charcoal/80 uppercase">Seleccione su Paquete Turístico *</label>
                        <select 
                          id="form-destination"
                          className="w-full px-4 py-3 rounded-lg border border-brand-pink/10 focus:ring-2 focus:ring-brand-pink/30 outline-none text-brand-charcoal font-medium bg-white cursor-pointer"
                          value={bookingForm.destination}
                          onChange={(e) => setBookingForm({...bookingForm, destination: e.target.value})}
                          required
                        >
                          <optgroup label="Salidas Locales de Ayacucho">
                            <option value="Aguas Turquesas de Millpu">Aguas Turquesas de Millpu (Full Day)</option>
                            <option value="City Tour Ayacucho Colonial">City Tour Ayacucho Colonial (Medio Día)</option>
                            <option value="Ruta Arqueológica Wari y Quinua">Complejo Arqueológico de Wari y Quinua (Full Day)</option>
                            <option value="Centro Arqueológico Vilcashuamán">Centro Arqueológico Vilcashuamán (Full Day)</option>
                          </optgroup>
                          <optgroup label="Salidas de Nivel Nacional">
                            <option value="Machu Picchu Mágico & Cusco Histórico">Machu Picchu Mágico & Cusco Histórico (4 Días)</option>
                            <option value="Aventura Marina en Paracas e Ica">Aventura Marina en Paracas e Ica (3 Días)</option>
                            <option value="Encanto Natural en la Selva de Oxapampa">Selva de Oxapampa (4 Días)</option>
                          </optgroup>
                          <optgroup label="Destinos de Nivel Internacional">
                            <option value="Pirámides de México y CDMX Histórica">Pirámides de México y Zócalo CDMX (5 Días)</option>
                            <option value="Buenos Aires Aires de Tango y Gauchos">Aires de Tango - Buenos Aires Argentina (5 Días)</option>
                            <option value="Cartagena Mágica & Playas del Caribe">Cartagena Mágica & Playas del Caribe Colombia (4 Días)</option>
                          </optgroup>
                          <option value="Ruta Personalizada con Inteligencia Artificial">Ruta Personalizada con IA (Generada en la sección posterior)</option>
                        </select>
                      </div>

                      {/* Comments */}
                      <div className="space-y-1.5">
                        <label htmlFor="form-comments" className="text-brand-charcoal/80 uppercase">Comentarios Adicionales (Número de pasajeros, hospedaje deseado...)</label>
                        <textarea 
                          id="form-comments"
                          rows={3}
                          className="w-full px-4 py-3 rounded-lg border border-brand-pink/10 focus:ring-2 focus:ring-brand-pink/30 outline-none text-brand-charcoal font-medium bg-white resize-y"
                          placeholder="Cuéntanos detalles... ej: 'Somos 4 adultos y queremos hotel de 3 estrellas.'"
                          value={bookingForm.comments}
                          onChange={(e) => setBookingForm({...bookingForm, comments: e.target.value})}
                        />
                      </div>

                      <button
                        type="submit"
                        disabled={isSubmitting}
                        className="w-full bg-brand-pink hover:bg-brand-pink/95 disabled:bg-neutral-400 text-white font-bold py-3.5 rounded-xl shadow-md uppercase tracking-wider text-sm transition-all flex items-center justify-center gap-2 mt-4 cursor-pointer"
                      >
                        {isSubmitting ? (
                          <>
                            <div className="w-5 h-5 border-2 border-white/60 border-t-white rounded-full animate-spin"></div>
                            <span>Simulando Envío Seguro...</span>
                          </>
                        ) : (
                          <>
                            <Send className="w-4.5 h-4.5 text-white" />
                            <span>Enviar Solicitud de Reserva</span>
                          </>
                        )}
                      </button>

                    </form>
                  </motion.div>
                )}

                {/* BOOKING SUCCESS TICKET */}
                {bookingSuccessTicket && (
                  <motion.div 
                    key="booking-success"
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0 }}
                    className="flex flex-col gap-6"
                  >
                    {/* Header receipt ticket line */}
                    <div className="text-center pb-4 border-b-2 border-dashed border-brand-pink/15">
                      <div className="w-12 h-12 rounded-full bg-green-100 text-green-500 font-extrabold flex items-center justify-center mx-auto mb-2 text-xl">
                        ✓
                      </div>
                      <h3 className="font-display font-bold text-lg text-brand-charcoal">¡Solicitud Generada con Éxito!</h3>
                      <p className="text-xs text-brand-charcoal/70">
                        Un asesor de Sisari Travel se comunicará al celular en breve. Su reserva se ha enviado al correo de la empresa <span className="font-bold text-brand-pink">{cmsContent.destinationFormEmail || "retabloweb@gmail.com"}</span>.
                      </p>
                    </div>

                    {/* Receipt Details Box */}
                    <div className="bg-[#fbfaf8] border border-brand-pink/15 rounded-2xl p-5 space-y-3.5 leading-relaxed text-xs">
                      <div className="flex justify-between border-b border-brand-pink/5 pb-2">
                        <span className="text-brand-charcoal/50">Código de Voucher:</span>
                        <strong className="font-mono text-brand-pink text-sm font-extrabold">{bookingSuccessTicket.ticketId}</strong>
                      </div>
                      
                      <div className="flex justify-between">
                        <span className="text-brand-charcoal/60">Destino Elegido:</span>
                        <span className="font-bold text-[#2c2c2c]">{bookingSuccessTicket.packageName}</span>
                      </div>

                      <div className="flex justify-between">
                        <span className="text-brand-charcoal/60">Viajero Titular:</span>
                        <span className="font-bold text-[#2c2c2c]">{bookingSuccessTicket.travelerName}</span>
                      </div>

                      <div className="flex justify-between">
                        <span className="text-brand-charcoal/60">Teléfono:</span>
                        <span className="font-bold text-[#2c2c2c]">{bookingSuccessTicket.travelerPhone}</span>
                      </div>

                      <div className="flex justify-between">
                        <span className="text-brand-charcoal/60">F. Nacimiento/Salida:</span>
                        <span className="font-bold text-[#2c2c2c]">{bookingSuccessTicket.travelDate}</span>
                      </div>

                      <div className="border-t border-brand-pink/10 pt-2 flex flex-col gap-1.5">
                        <span className="text-brand-charcoal/50">Comentarios del cliente:</span>
                        <p className="bg-white p-2.5 rounded-lg border border-brand-pink/5 font-light text-[11px] text-brand-charcoal">
                          {bookingSuccessTicket.comments}
                        </p>
                      </div>
                    </div>

                    {/* Receipt barcode decorative styling */}
                    <div className="flex flex-col items-center gap-1 opacity-60">
                      <div className="flex h-8 gap-0.5 justify-center items-stretch w-full">
                        {[1,2,3,4,1,3,1,2,4,1,3,2,1,2,3,4,1,2,1,4,3,2,1,1,2,3,1,4].map((w, idx) => (
                          <div 
                            key={idx} 
                            style={{ width: `${w}px` }} 
                            className="bg-brand-charcoal h-full"
                          />
                        ))}
                      </div>
                      <span className="text-[10px] font-mono tracking-wider text-brand-charcoal/50">{bookingSuccessTicket.ticketId}-{bookingSuccessTicket.dateCreated}</span>
                    </div>

                    {/* CTAs */}
                    <div className="flex flex-col sm:flex-row gap-2.5 pt-4 border-t border-brand-pink/10">
                      <button 
                        onClick={handleResetTicket}
                        className="w-full sm:w-1/2 border border-brand-pink text-brand-pink font-bold py-3 rounded-lg text-center text-xs transition-all cursor-pointer"
                      >
                        Crear Nueva Solicitud
                      </button>

                      <a
                        href={`https://wa.me/${formattedWhatsAppNumber}?text=${encodeURIComponent(`Hola Sisari Travel, soy ${bookingSuccessTicket.travelerName}. Acabo de registrar mi voucher ${bookingSuccessTicket.ticketId} para reservar el paquete "${bookingSuccessTicket.packageName}". Quisiera confirmar las tarifas.`)}`}
                        target="_blank"
                        rel="noreferrer"
                        className="w-full sm:w-1/2 bg-green-500 hover:bg-green-600 font-bold py-3 rounded-lg text-white flex items-center justify-center gap-2 shadow-sm transition-all cursor-pointer text-xs"
                      >
                        <Phone className="w-4 h-4 fill-white text-green-500 shrink-0" />
                        <span>Notificar WhatsApp</span>
                      </a>
                    </div>

                  </motion.div>
                )}

              </AnimatePresence>
            </div>

          </div>

        </div>
      </section>
          </motion.div>
        )}
      </AnimatePresence>

      {/* FOOTER FOOTNOTES AND MAP DETAILS */}
      <footer className="bg-brand-charcoal text-[#eaeaea] pt-16 pb-8 border-t border-brand-pink/15">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="grid grid-cols-1 md:grid-cols-4 gap-10 border-b border-brand-pink/10 pb-12 mb-10 text-xs">
            
            {/* Col 1 Brand Statement */}
            <div className="flex flex-col gap-4">
              <div className="flex items-center gap-2.5">
                <img
                  src={cmsContent.logoFooterImage || cmsContent.logoImage || "https://images.unsplash.com/photo-1614741118887-7a4ee193a5fa?w=200&q=80"}
                  alt="Sisari Travel Footer Logo"
                  referrerPolicy="no-referrer"
                  className="h-10 w-auto max-w-[160px] object-contain"
                />
              </div>
              <p className="text-[#a0a0a0] font-light leading-relaxed">
                {language === "es" 
                  ? (cmsContent.footerSloganEs || "Su operadora de turismo de confianza en la histórica Ayacucho con más de 10 años promoviendo la alfarería local, el senderismo ético y las memorias familiares por el mundo.") 
                  : (cmsContent.footerSloganEn || "Your trusted tour operator in historic Ayacucho with over 10 years promoting local pottery, ethical trekking, and family memories around the world.")}
              </p>
              
              {/* 5 Professional social media icons */}
              <div className="flex items-center gap-2.5 mt-2">
                <a 
                  href={cmsContent.socialLinks?.facebook || "https://facebook.com"} 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="w-8 h-8 rounded-full bg-white/5 hover:bg-brand-pink hover:text-white flex items-center justify-center text-white transition-all shadow-md group"
                  title="Facebook"
                >
                  <Facebook className="w-4 h-4 group-hover:scale-110 transition-transform" />
                </a>
                <a 
                  href={cmsContent.socialLinks?.instagram || "https://instagram.com"} 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="w-8 h-8 rounded-full bg-white/5 hover:bg-brand-pink hover:text-white flex items-center justify-center text-white transition-all shadow-md group"
                  title="Instagram"
                >
                  <Instagram className="w-4 h-4 group-hover:scale-110 transition-transform" />
                </a>
                <a 
                  href={cmsContent.socialLinks?.tiktok || "https://tiktok.com"} 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="w-8 h-8 rounded-full bg-white/5 hover:bg-brand-pink hover:text-white flex items-center justify-center text-white transition-all shadow-md group"
                  title="TikTok"
                >
                  <TiktokIcon className="w-4 h-4 group-hover:scale-110 transition-transform" />
                </a>
                <a 
                  href={cmsContent.socialLinks?.youtube || "https://youtube.com"} 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="w-8 h-8 rounded-full bg-white/5 hover:bg-brand-pink hover:text-white flex items-center justify-center text-white transition-all shadow-md group"
                  title="YouTube"
                >
                  <Youtube className="w-4 h-4 group-hover:scale-110 transition-transform" />
                </a>
                <a 
                  href={cmsContent.socialLinks?.linkedin || "https://linkedin.com"} 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="w-8 h-8 rounded-full bg-white/5 hover:bg-brand-pink hover:text-white flex items-center justify-center text-white transition-all shadow-md group"
                  title="LinkedIn"
                >
                  <Linkedin className="w-4 h-4 group-hover:scale-110 transition-transform" />
                </a>
              </div>
            </div>

            {/* Col 2 Quick links */}
            <div className="flex flex-col gap-4">
              <h4 className="font-display font-bold text-xs uppercase text-white tracking-widest">Navegación</h4>
              <ul className="space-y-2.5 font-light text-[#a0a0a0] text-left">
                <li><button onClick={() => scrollToId("inicio")} className="hover:text-brand-pink transition-colors cursor-pointer text-left block">Inicio</button></li>
                <li><button onClick={() => scrollToId("nosotros")} className="hover:text-brand-pink transition-colors cursor-pointer text-left block">Nosotros</button></li>
                <li><button onClick={() => scrollToId("paquetes")} className="hover:text-brand-pink transition-colors cursor-pointer text-left block">Paquetes</button></li>
                <li><button onClick={() => scrollToId("blog")} className="hover:text-brand-pink transition-colors cursor-pointer text-left block">Blog y Noticias</button></li>
                <li><button onClick={() => scrollToId("contacto")} className="hover:text-brand-pink transition-colors cursor-pointer text-left block">Contacto</button></li>
              </ul>
            </div>

            {/* Col 3 Local landmarks packages */}
            <div className="flex flex-col gap-4">
              <h4 className="font-display font-bold text-xs uppercase text-white tracking-widest">Salidas Locales</h4>
              <ul className="space-y-2.5 font-light text-[#a0a0a0] text-left">
                <li><button onClick={() => { setSelectedZonePage("local"); setSelectedPackage(null); scrollToId("paquetes"); }} className="hover:text-brand-pink transition-colors text-left block cursor-pointer">Pozas Turquesas de Millpu</button></li>
                <li><button onClick={() => { setSelectedZonePage("local"); setSelectedPackage(null); scrollToId("paquetes"); }} className="hover:text-brand-pink transition-colors text-left block cursor-pointer">Ruinas pre-incas de Wari</button></li>
                <li><button onClick={() => { setSelectedZonePage("local"); setSelectedPackage(null); scrollToId("paquetes"); }} className="hover:text-brand-pink transition-colors text-left block cursor-pointer">Quinua Pueblo Artesanal</button></li>
                <li><button onClick={() => { setSelectedZonePage("local"); setSelectedPackage(null); scrollToId("paquetes"); }} className="hover:text-brand-pink transition-colors text-left block cursor-pointer">Ayacucho Colonial</button></li>
                <li><button onClick={() => { setSelectedZonePage("local"); setSelectedPackage(null); scrollToId("paquetes"); }} className="hover:text-brand-pink transition-colors text-left block cursor-pointer">Centro Arqueológico Vilcashuamán</button></li>
              </ul>
            </div>

            {/* Col 4 Policies card block */}
            <div className="flex flex-col gap-4">
              <h4 className="font-display font-bold text-xs uppercase text-white tracking-widest">POLÍTICAS</h4>
              <ul className="space-y-2.5 font-light text-[#a0a0a0] text-[#a0a0a0] text-left">
                <li><button onClick={() => scrollToId("privacy")} className="hover:text-brand-pink transition-colors text-left block cursor-pointer">1. Política de Privacidad</button></li>
                <li><button onClick={() => scrollToId("cookies")} className="hover:text-brand-pink transition-colors text-left block cursor-pointer">2. Política de Cookies</button></li>
                <li><button onClick={() => scrollToId("terms")} className="hover:text-brand-pink transition-colors text-left block cursor-pointer">3. Términos y Condiciones</button></li>
                <li><button onClick={() => scrollToId("notice")} className="hover:text-brand-pink transition-colors text-left block cursor-pointer">4. Aviso Legal</button></li>
                <li><button onClick={() => scrollToId("complaints")} className="hover:text-brand-pink transition-colors text-left block cursor-pointer font-bold text-brand-orange">5. Libro de Reclamaciones 📝</button></li>
              </ul>
            </div>

          </div>

          {/* Underfooter copyright */}
          <div className="flex flex-col sm:flex-row justify-between items-center gap-4 text-[10px] text-[#808080] font-mono border-t border-white/5 pt-6">
            <p>
              © {new Date().getFullYear()} {language === "es" 
                ? (cmsContent.footerCopyrightEs || "Sisari Travel Perú. Todos los derechos reservados.") 
                : (cmsContent.footerCopyrightEn || "Sisari Travel Peru. All rights reserved.")}
            </p>
            <div className="flex gap-4">
              <a href="#" className="hover:text-white transition-colors">Políticas de Privacidad</a>
              <span>•</span>
              <a href="#" className="hover:text-white transition-colors">Libro de Reclamaciones</a>
            </div>
          </div>

        </div>
      </footer>

      {/* INTERACTIVE FLOATING WHATSAPP BOT */}
      <div className="fixed bottom-6 right-6 z-40 flex flex-col items-end gap-3">
        <AnimatePresence>
          {isWaBotOpen && (
            <motion.div
              initial={{ opacity: 0, scale: 0.85, y: 30 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.85, y: 30 }}
              transition={{ type: "spring", damping: 25, stiffness: 350 }}
              className="bg-white rounded-3xl shadow-2xl border border-brand-pink/10 w-[350px] overflow-hidden flex flex-col max-h-[500px]"
            >
              {/* Bot Header */}
              <div className="bg-gradient-to-r from-green-500 to-emerald-600 p-4 text-white flex items-center justify-between shadow-sm">
                <div className="flex items-center gap-3">
                  <div className="relative">
                    <span className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center font-display font-extrabold text-[#ffffff] text-sm shadow-inner border border-white/15">
                      🌸
                    </span>
                    <span className="absolute bottom-0 right-0 w-3 h-3 bg-green-400 border-2 border-white rounded-full animate-pulse" />
                  </div>
                  <div className="text-left">
                    <h5 className="font-display font-extrabold text-sm tracking-tight">Sari Bot</h5>
                    <p className="text-[10px] text-white/85 font-mono">
                      {language === "es" ? "● En Línea / Soporte" : "● Online / Assistant"}
                    </p>
                  </div>
                </div>
                <button
                  type="button"
                  onClick={() => setIsWaBotOpen(false)}
                  className="p-1 rounded-full hover:bg-white/10 text-white transition-colors cursor-pointer"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Chat Bubble History area */}
              <div className="p-4 overflow-y-auto flex-grow flex flex-col gap-3 max-h-[260px] bg-[#fbfaf8] scrollbar-thin">
                {waBotMessages.map((msg, index) => (
                  <div
                    key={index}
                    className={`flex flex-col max-w-[85%] ${
                      msg.sender === "user" ? "self-end items-end" : "self-start items-start"
                    }`}
                  >
                    <div
                      className={`p-3 rounded-2xl text-xs leading-relaxed text-left ${
                        msg.sender === "user"
                          ? "bg-brand-pink text-white rounded-tr-none"
                          : "bg-white text-brand-charcoal border border-brand-pink/5 rounded-tl-none shadow-sm"
                      }`}
                    >
                      {msg.text}
                    </div>
                    <span className="text-[9px] text-brand-charcoal/40 font-mono mt-1">{msg.time}</span>
                  </div>
                ))}
              </div>

              {/* Bot suggestions buttons */}
              <div className="p-2.5 bg-brand-pink/5 border-t border-brand-pink/5 flex flex-wrap gap-1.5 justify-start">
                <button
                  onClick={() => handleWaBotSend(language === "es" ? "Tour Millpu 1 Día" : "Millpu 1-Day Trip")}
                  className="bg-white hover:bg-brand-pink/10 hover:text-brand-pink border border-brand-pink/10 rounded-full px-2.5 py-1 text-[10px] font-bold text-brand-charcoal transition-all cursor-pointer"
                >
                  🎒 Millpu Tour
                </button>
                <button
                  onClick={() => handleWaBotSend(language === "es" ? "Viajar a Machu Picchu" : "Machu Picchu Travel")}
                  className="bg-white hover:bg-brand-pink/10 hover:text-brand-pink border border-brand-pink/10 rounded-full px-2.5 py-1 text-[10px] font-bold text-brand-charcoal transition-all cursor-pointer"
                >
                  ⛰️ Machu Picchu
                </button>
                <button
                  onClick={() => handleWaBotSend(language === "es" ? "Paquetes México" : "Mexico Packages")}
                  className="bg-white hover:bg-brand-pink/10 hover:text-brand-pink border border-brand-pink/10 rounded-full px-2.5 py-1 text-[10px] font-bold text-brand-charcoal transition-all cursor-pointer"
                >
                  ✈️ México
                </button>
              </div>

              {/* Quick direct active redirection band */}
              <div className="px-4 py-2 bg-green-500/5 flex items-center justify-between border-t border-brand-pink/5">
                <span className="text-[10px] text-brand-charcoal/60 leading-tight text-left">
                  {language === "es" ? "Contacta vía WhatsApp real:" : "Speak to a real agent:"}
                </span>
                <a
                  href={`https://wa.me/${formattedWhatsAppNumber}?text=${encodeURIComponent(
                    language === "es" 
                      ? "¡Hola! Estuve conversando con Sari Bot y me interesan sus tarifas para destinos locales/nacionales."
                      : "Hi! I was chatting with Sari Bot and I am interested in custom rates."
                  )}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-[#25D366] hover:bg-[#20ba5a] active:scale-95 text-white font-extrabold text-[10px] px-3 py-1.5 rounded-full flex items-center gap-1 shadow-sm transition-all cursor-pointer"
                >
                  <Phone className="w-3.5 h-3.5 fill-white text-[#25D366]" />
                  WhatsApp Live
                </a>
              </div>

              {/* TextInput Send row */}
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  handleWaBotSend(waUserQueryValue);
                }}
                className="p-3 border-t border-brand-pink/5 flex items-center gap-2 bg-white"
              >
                <input
                  type="text"
                  value={waUserQueryValue}
                  onChange={(e) => setWaUserQueryValue(e.target.value)}
                  placeholder={language === "es" ? "Escribe un mensaje..." : "Type custom message..."}
                  className="flex-grow bg-[#fbfaf8] border border-brand-pink/15 rounded-xl px-3 py-2 text-xs focus:outline-none focus:border-brand-pink focus:bg-white text-left"
                />
                <button
                  type="submit"
                  className="bg-brand-pink hover:bg-brand-pink/90 text-white p-2.5 rounded-xl active:scale-95 transition-all cursor-pointer shadow-sm"
                >
                  <Send className="w-3.5 h-3.5" />
                </button>
              </form>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Closed Button Trigger with Pulsating Notification Badge */}
        <motion.button
          onClick={() => setIsWaBotOpen(!isWaBotOpen)}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="bg-[#25D366] text-white p-4 rounded-full shadow-2xl flex items-center justify-center relative cursor-pointer group"
          style={{ boxShadow: "0 8px 30px rgba(37, 211, 102, 0.4)" }}
          title={language === "es" ? "Chatear con Sari" : "Chat with Sari"}
        >
          <Phone className="w-6 h-6 fill-white text-[#25D366]" />
          {!isWaBotOpen && (
            <span className="absolute -top-1.5 -right-1.5 bg-red-500 text-white font-mono font-bold text-[9px] w-5 h-5 rounded-full flex items-center justify-center animate-bounce border border-white">
              1
            </span>
          )}
          {/* Label tooltip */}
          <span className="absolute right-14 bg-brand-charcoal text-white text-[10px] font-bold px-3 py-1.5 rounded-xl shadow-md whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none">
            {language === "es" ? "💬 ¿Consultas? Asistente Activo" : "💬 Questions? Chat Active"}
          </span>
        </motion.button>
      </div>

      {isAdminConsoleOpen && (
        <AdminConsole 
          packages={packages} 
          onSavePackages={(updated) => setPackages(updated)} 
          blogPosts={blogPosts}
          onSaveBlogPosts={(updated) => setBlogPosts(updated)}
          cmsContent={cmsContent}
          onSaveCMSContent={(updated) => setCmsContent(updated)}
          botConfig={botConfig}
          onSaveBotConfig={(updated) => setBotConfig(updated)}
          crmLeads={crmLeads}
          onSaveCRMLeads={(updated) => setCrmLeads(updated)}
          onClose={() => setIsAdminConsoleOpen(false)} 
        />
      )}

      {/* Sleek Admin Login Passcode Modal */}
      <AnimatePresence>
        {isLoginModalOpen && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/75 backdrop-blur-sm z-[9999] flex items-center justify-center p-4"
          >
            <motion.div 
              initial={{ scale: 0.95, y: 15 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.95, y: 15 }}
              className="bg-[#1a1a1a] border border-white/10 rounded-3xl w-full max-w-sm overflow-hidden shadow-2xl p-6 text-left text-white"
            >
              <div className="flex items-center justify-between mb-4 pb-3 border-b border-white/5">
                <div className="flex items-center gap-2 text-brand-orange">
                  <Sliders className="w-5 h-5 text-brand-orange animate-pulse" />
                  <h3 className="font-display font-extrabold text-xs uppercase tracking-wider">
                    {language === "es" ? "Acceso de Administrador" : "Administrator Sign In"}
                  </h3>
                </div>
                <button 
                  onClick={() => {
                    setIsLoginModalOpen(false);
                    setAdminPasswordInput("");
                    setLoginError("");
                    setShowRecoveryForm(false);
                  }}
                  className="p-1 rounded-full text-neutral-400 hover:text-white hover:bg-white/5 transition-colors"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              <p className="text-[11px] text-neutral-400 leading-relaxed font-light mb-4 font-sans">
                {language === "es" 
                  ? "Para acceder a las funciones avanzadas como la Consola de Datos y el Diseñador Visual interactivo, confirme su contraseña de administrador."
                  : "To access administrative capabilities including the Live Console and Builder, please specify your administration passcode."}
              </p>

              {showRecoveryForm ? (
                <div className="space-y-4">
                  <h4 className="text-xs font-bold text-brand-orange uppercase tracking-wider">
                    {language === "es" ? "Actualizar Contraseña" : "Recover / Update Password"}
                  </h4>
                  <p className="text-[11px] text-neutral-400 leading-relaxed font-light font-sans">
                    {language === "es" 
                      ? "Ingrese el correo autorizado retabloweb@gmail.com para actualizar la contraseña de administración."
                      : "Enter the authorized email retabloweb@gmail.com to assign a new administration passcode."}
                  </p>
                  <div>
                    <label className="text-[9px] text-neutral-400 font-bold block uppercase mb-1 tracking-wider">
                      {language === "es" ? "Correo Autorizado" : "Authorized Email"}
                    </label>
                    <input 
                      type="email"
                      required
                      placeholder="e.g. retabloweb@gmail.com"
                      value={recoveryEmail}
                      onChange={(e) => setRecoveryEmail(e.target.value)}
                      className="w-full bg-[#2a2a2a] border border-white/10 rounded-xl px-4 py-2.5 text-white text-xs focus:outline-none focus:border-[#e12d8a]"
                    />
                  </div>
                  <div>
                    <label className="text-[9px] text-neutral-400 font-bold block uppercase mb-1 tracking-wider">
                      {language === "es" ? "Nueva Contraseña" : "New Passcode"}
                    </label>
                    <input 
                      type="password"
                      required
                      placeholder={language === "es" ? "Mínimo 4 caracteres (ej. SisariTravel*2026)" : "Min 4 characters (e.g. SisariTravel*2026)"}
                      value={newAdminPasswordVal}
                      onChange={(e) => setNewAdminPasswordVal(e.target.value)}
                      className="w-full bg-[#2a2a2a] border border-white/10 rounded-xl px-4 py-2.5 text-white text-xs focus:outline-none focus:border-[#e12d8a] font-mono"
                    />
                  </div>

                  {loginError && (
                    <p className="text-red-400 text-[10px] font-bold mt-1.5 transition-all text-left">
                      ⚠️ {loginError}
                    </p>
                  )}
                  {recoverySuccessMessage && (
                    <p className="text-green-400 text-[10px] font-bold mt-1.5 transition-all text-left">
                      ✓ {recoverySuccessMessage}
                    </p>
                  )}

                  <div className="flex gap-2 pt-2">
                    <button
                      type="button"
                      onClick={() => {
                        setShowRecoveryForm(false);
                        setLoginError("");
                        setRecoverySuccessMessage("");
                      }}
                      className="w-1/2 py-2 rounded-xl border border-white/10 hover:bg-white/5 text-[10px] font-bold uppercase transition-all cursor-pointer text-center text-neutral-350"
                    >
                      {language === "es" ? "Volver" : "Back"}
                    </button>
                    <button
                      type="button"
                      onClick={() => {
                        if (recoveryEmail.trim().toLowerCase() !== "retabloweb@gmail.com") {
                          setLoginError(language === "es" ? "El correo electrónico ingresado no esta autorizado para actualizar contraseña." : "Entered email is not authorized for password recovery.");
                          setRecoverySuccessMessage("");
                          return;
                        }
                        if (newAdminPasswordVal.trim().length < 4) {
                          setLoginError(language === "es" ? "La contraseña debe tener mínimo 4 caracteres." : "Passcode must have at least 4 characters.");
                          setRecoverySuccessMessage("");
                          return;
                        }
                        // Update
                        const pass = newAdminPasswordVal.trim();
                        localStorage.setItem("sisari_admin_passcode", pass);
                        setAdminPasscode(pass);
                        setLoginError("");
                        setRecoverySuccessMessage(language === "es" ? "Contraseña actualizada con éxito." : "Passcode updated successfully!");
                        setTimeout(() => {
                          setShowRecoveryForm(false);
                          setRecoverySuccessMessage("");
                          setRecoveryEmail("");
                          setNewAdminPasswordVal("");
                        }, 2000);
                      }}
                      className="w-1/2 py-2 rounded-xl bg-brand-orange hover:bg-brand-orange/90 text-white text-[10px] font-black uppercase tracking-wider transition-all cursor-pointer text-center"
                    >
                      {language === "es" ? "Guardar" : "Save Changes"}
                    </button>
                  </div>
                </div>
              ) : (
                <form onSubmit={(e) => {
                  e.preventDefault();
                  // Validate against the custom passcode or fallback
                  const inputVal = adminPasswordInput.trim();
                  const isMatch = inputVal === adminPasscode || 
                                  inputVal.toLowerCase() === adminPasscode.toLowerCase() ||
                                  inputVal === "SisariTravel*2026" ||
                                  inputVal.toLowerCase() === "sisaritravel*2026";

                  if (isMatch) {
                    setIsAdmin(true);
                    localStorage.setItem("sisari_admin_logged", "true");
                    setIsLoginModalOpen(false);
                    setAdminPasswordInput("");
                    setLoginError("");
                    
                    // Proceed to action
                    if (pendingAdminAction === "console") {
                      setIsAdminConsoleOpen(true);
                    } else if (pendingAdminAction === "builder") {
                      setCurrentView("builder");
                    }
                  } else {
                    setLoginError(language === "es" ? "Contraseña incorrecta. Intente de nuevo." : "Incorrect passcode. Please try again.");
                  }
                }} className="space-y-4">
                  <div>
                    <label className="text-[10px] text-neutral-400 font-bold block uppercase mb-1.5 tracking-wider">
                      {language === "es" ? "Contraseña de Acceso" : "Access Passcode"}
                    </label>
                    <input 
                      type="password"
                      autoFocus
                      required
                      placeholder={language === "es" ? "Ingrese contraseña de administrador" : "Enter administration passcode"}
                      value={adminPasswordInput}
                      onChange={(e) => setAdminPasswordInput(e.target.value)}
                      className="w-full bg-[#2a2a2a] border border-white/10 rounded-xl px-4 py-2.5 text-white placeholder-neutral-500 text-xs focus:outline-none focus:border-[#e12d8a] font-mono"
                    />
                    {loginError && (
                      <p className="text-red-400 text-[10px] font-bold mt-1.5 transition-all text-left">
                        ⚠️ {loginError}
                      </p>
                    )}
                  </div>

                  <div className="text-right">
                    <button
                      type="button"
                      onClick={() => {
                        setShowRecoveryForm(true);
                        setLoginError("");
                        setAdminPasswordInput("");
                      }}
                      className="text-[10px] text-brand-orange hover:underline font-semibold cursor-pointer"
                    >
                      {language === "es" ? "¿Olvidó su contraseña / Actualizar?" : "Forgot or update passcode?"}
                    </button>
                  </div>

                  <div className="flex items-center gap-2 pt-2">
                    <button
                      type="button"
                      onClick={() => {
                        setIsLoginModalOpen(false);
                        setAdminPasswordInput("");
                        setLoginError("");
                      }}
                      className="w-1/2 py-2 rounded-xl border border-white/10 hover:bg-white/5 text-[10px] font-bold uppercase transition-all cursor-pointer text-center text-neutral-350"
                    >
                      {language === "es" ? "Cancelar" : "Cancel"}
                    </button>
                    <button
                      type="submit"
                      className="w-1/2 py-2 rounded-xl bg-[#e12d8a] hover:bg-[#e12d8a]/90 text-white text-[10px] font-black uppercase tracking-wider transition-all shadow-md cursor-pointer text-center"
                    >
                      {language === "es" ? "Ingresar" : "Login"}
                    </button>
                  </div>
                </form>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

    </div>
  );
}
