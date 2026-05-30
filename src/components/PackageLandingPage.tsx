import React, { useState, useEffect } from "react";
import { motion } from "motion/react";
import { 
  ArrowLeft, 
  Clock, 
  Compass, 
  MapPin, 
  Check, 
  X, 
  Phone, 
  Award, 
  ShieldCheck, 
  Sparkles, 
  HelpCircle, 
  Calendar,
  Send,
  FileText
} from "lucide-react";
import { DestinationPackage, CRMLead } from "../types";

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

interface PackageLandingPageProps {
  pkg: DestinationPackage;
  onBack: () => void;
  setBookingForm: React.Dispatch<React.SetStateAction<any>>;
  scrollToId: (id: string) => void;
  whatsappNumber?: string;
  onAddCRMLead?: (lead: CRMLead) => void;
  destinationFormEmail?: string;
  tripadvisorUrl?: string;
  googleReviewsUrl?: string;
}

export default function PackageLandingPage({ 
  pkg, 
  onBack, 
  setBookingForm, 
  scrollToId, 
  whatsappNumber, 
  onAddCRMLead, 
  destinationFormEmail,
  tripadvisorUrl,
  googleReviewsUrl
}: PackageLandingPageProps) {
  const [activeSubTab, setActiveSubTab] = useState<"itinerary" | "whatsIncluded" | "faqs">("itinerary");
  const [faqOpenIndex, setFaqOpenIndex] = useState<number | null>(0);
  const [activeImage, setActiveImage] = useState(pkg.image);

  // Advanced Responsive Reservation Form States
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    adults: "2",
    children: "0",
    hotelRating: "3_star",
    physicalState: "good",
    dietaryRestrictions: "none",
    travelDate: new Date().toISOString().split('T')[0],
    comments: ""
  });
  const [isBooked, setIsBooked] = useState(false);
  const [isBookingSubmit, setIsBookingSubmit] = useState(false);
  const [reviewSuccessMessage, setReviewSuccessMessage] = useState("");

  const [localReviews, setLocalReviews] = useState<{ id: string; name: string; rating: number; date: string; comment: string; avatar?: string }[]>(() => {
    try {
      const saved = localStorage.getItem(`sisari_reviews_${pkg.id}`);
      if (saved) return JSON.parse(saved);
    } catch (e) {}

    return [
      {
        id: "rev1",
        name: "Mariela Bustamante (Cusco)",
        rating: 5,
        date: "Hace 4 días",
        comment: `¡Una experiencia absolutamente inolvidable! Reservamos el tour de "${pkg.title}" con Sisari Travel y fue lo máximo. El guiado es súper completo e inspirador, la movilidad impecable y muy segura. ¡Recomendado con los ojos cerrados!`,
        avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=120&auto=format&fit=crop&q=80"
      },
      {
        id: "rev2",
        name: "Carlos Villagarcía (Lima)",
        rating: 5,
        date: "Hace 1 semana",
        comment: `Estupendo el nivel de organización técnica. La atención pre-viaje por WhatsApp es rapidísima e hiper-personalizada. Durante la caminata nos integraron de verdad con la alfarería local. El paisaje es majestuoso.`,
        avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=120&auto=format&fit=crop&q=80"
      },
      {
        id: "rev3",
        name: "John & Claire Miller (EEUU)",
        rating: 5,
        date: "Hace 3 semanas",
        comment: `Highly customized experience! Security standards are extremely professional. The guide went above and beyond explaining the historical significance. Splendid tour of Peru!`,
        avatar: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=120&auto=format&fit=crop&q=80"
      }
    ];
  });

  useEffect(() => {
    localStorage.setItem(`sisari_reviews_${pkg.id}`, JSON.stringify(localReviews));
  }, [localReviews, pkg.id]);

  const [newReviewName, setNewReviewName] = useState("");
  const [newReviewRating, setNewReviewRating] = useState(5);
  const [newReviewComment, setNewReviewComment] = useState("");
  const [isAddingReview, setIsAddingReview] = useState(false);

  // States for in-place reviews editing
  const [editingReviewId, setEditingReviewId] = useState<string | null>(null);
  const [editingReviewName, setEditingReviewName] = useState("");
  const [editingReviewComment, setEditingReviewComment] = useState("");
  const [editingReviewRating, setEditingReviewRating] = useState(5);
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const handleSaveEditedReview = (id: string) => {
    if (!editingReviewName.trim() || !editingReviewComment.trim()) {
      alert("Por favor completa el nombre y comentario del testimonio.");
      return;
    }
    setLocalReviews(prev => prev.map(rev => 
      rev.id === id 
        ? { ...rev, name: editingReviewName.trim(), comment: editingReviewComment.trim(), rating: editingReviewRating } 
        : rev
    ));
    setEditingReviewId(null);
    setReviewSuccessMessage("¡Testimonio modificado con éxito!");
    setTimeout(() => setReviewSuccessMessage(""), 4000);
  };

  const handleAddReview = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newReviewName.trim() || !newReviewComment.trim()) {
      alert("Por favor completa tu nombre y escribe un comentario.");
      return;
    }
    const brandNew = {
      id: "rev_" + Date.now(),
      name: newReviewName.trim(),
      rating: newReviewRating,
      date: "Hoy mismo",
      comment: newReviewComment.trim(),
      avatar: `https://images.unsplash.com/photo-${1510000000000 + Math.floor(Math.random() * 900000)}?w=120&auto=format&fit=crop&q=80`
    };
    setLocalReviews(prev => [brandNew, ...prev]);
    setNewReviewName("");
    setNewReviewComment("");
    setNewReviewRating(5);
    setIsAddingReview(false);
    setReviewSuccessMessage("¡Gracias por compartir tu reseña! Se ha publicado en tiempo real.");
    setTimeout(() => setReviewSuccessMessage(""), 5000);
  };

  const handleSubmitBooking = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.phone || !formData.email) {
      alert("Por favor completa los campos obligatorios: Nombre, Correo y Celular.");
      return;
    }

    setIsBookingSubmit(true);

    try {
      const response = await fetch("/api/send-booking-email", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          phone: formData.phone,
          adults: formData.adults,
          children: formData.children,
          hotelRating: formData.hotelRating,
          physicalState: formData.physicalState,
          dietaryRestrictions: formData.dietaryRestrictions,
          travelDate: formData.travelDate,
          comments: formData.comments,
          packageTitle: pkg.title,
          packagePrice: pkg.price,
          destinationEmail: destinationFormEmail
        })
      });
      const data = await response.json();
      console.log("Reservation API response details:", data);
    } catch (err) {
      console.error("Failed to send booking data using server side API:", err);
    }
    
    // Generate a fresh lead
    if (onAddCRMLead) {
      const newLead: CRMLead = {
        id: `lead-booking-${Date.now()}`,
        source: "Formulario de Reserva",
        name: formData.name,
        phone: formData.phone,
        email: formData.email,
        dateCreated: new Date().toISOString().slice(0, 10),
        destination: pkg.title,
        travelDate: formData.travelDate,
        comments: `Adultos: ${formData.adults}, Niños: ${formData.children}. Hotel: ${formData.hotelRating}. Estado Físico: ${formData.physicalState}. Dieta: ${formData.dietaryRestrictions}. Notas: ${formData.comments || "Ninguna"}`,
        status: "Nuevo",
        notes: `Reserva de paquete detallada en landing page del paquete. Fecha programada de viaje: ${formData.travelDate}.`
      };
      onAddCRMLead(newLead);
    }
    
    setIsBookingSubmit(false);
    setIsBooked(true);
  };

  const getBookingText = () => {
    const hotelLabels: Record<string, string> = {
      none: "Sin hotel (Solo tours)",
      "2_star": "Estrellas ⭐⭐ (Económico)",
      "3_star": "Estrellas ⭐⭐⭐ (Estándar/Recomendado)",
      "4_star": "Estrellas ⭐⭐⭐⭐ (Superior)",
      "5_star": "Estrellas ⭐⭐⭐⭐⭐ (Lujo)"
    };
    const physicalLabels: Record<string, string> = {
      good: "Excelente estado físico",
      normal: "Físico regular (Sedentario leve)",
      restricted: "Condición armada/limitada (Asistencia)"
    };
    const dietaryLabels: Record<string, string> = {
      none: "Sin restricciones alimentarias",
      vegetarian: "Vegetariano",
      vegan: "Vegano",
      gluten_free: "Intolerante al Gluten (Celiaco)"
    };

    return `🚨 *RESERVA DE PAQUETE: ${pkg.title.toUpperCase()}* 🚨\n\n` +
           `👤 *Cliente:* ${formData.name}\n` +
           `✉️ *Correo:* ${formData.email}\n` +
           `📞 *WhatsApp/Cel:* ${formData.phone}\n` +
           `📅 *Fecha de Viaje:* ${formData.travelDate}\n` +
           `👥 *Adultos:* ${formData.adults} | *Niños:* ${formData.children}\n` +
           `🏨 *Categoría de Hotel:* ${hotelLabels[formData.hotelRating] || formData.hotelRating}\n` +
           `🏃‍♂️ *Estado Físico:* ${physicalLabels[formData.physicalState] || formData.physicalState}\n` +
           `🥗 *Dieta:* ${dietaryLabels[formData.dietaryRestrictions] || formData.dietaryRestrictions}\n` +
           `💬 *Notas / Alergias:* ${formData.comments || "Ninguna"}\n\n` +
           `💵 *Tarifa Base:* ${pkg.price}\n` +
           `📍 *Ubicación del Destino:* ${pkg.location}\n\n` +
           `_Generado por Sisari Travel Perú CRM._`;
  };

  const mailLink = `mailto:${destinationFormEmail || "retabloweb@gmail.com"},reservas@sisaritravel.pe?subject=${encodeURIComponent(`Reserva de Paquete: ${pkg.title} - ${formData.name}`)}&body=${encodeURIComponent(getBookingText().replace(/\*/g, ""))}`;
  const whatsappLink = `https://wa.me/${whatsappNumber ? whatsappNumber.replace(/\D/g, "") : "51987654321"}?text=${encodeURIComponent(getBookingText())}`;

  useEffect(() => {
    setActiveImage(pkg.image);
  }, [pkg]);

  // Beautiful fallback gallery images to always show 3 secondary photos if pkg doesn't have custom ones
  const getSecondaryImages = () => {
    const custom = pkg.galleryImages || [];
    if (custom.length >= 3) return custom.slice(0, 3);
    
    // Provide gorgeous, highly-relevant Unsplash images as fallbacks
    const defaultsByCat = {
      local: [
        "https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?w=600&auto=format&fit=crop&q=80",
        "https://images.unsplash.com/photo-1501555088652-021faa106b9b?w=600&auto=format&fit=crop&q=80",
        "https://images.unsplash.com/photo-1596176530529-78163a4f7af2?w=600&auto=format&fit=crop&q=80"
      ],
      national: [
        "https://images.unsplash.com/photo-1526392060635-9d6019884377?w=600&auto=format&fit=crop&q=80",
        "https://images.unsplash.com/photo-1509316975850-ff9c5deb0cd9?w=600&auto=format&fit=crop&q=80",
        "https://images.unsplash.com/photo-1516026672322-bc52d61a55d5?w=600&auto=format&fit=crop&q=80"
      ],
      international: [
        "https://images.unsplash.com/photo-1518638150341-f81217277b0d?w=600&auto=format&fit=crop&q=80",
        "https://images.unsplash.com/photo-1500485035595-cbe6f645feb1?w=600&auto=format&fit=crop&q=80",
        "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=600&auto=format&fit=crop&q=80"
      ]
    };
    const cat = pkg.category || "local";
    const selectedDefaults = defaultsByCat[cat] || defaultsByCat.local;
    
    // Merge custom and defaults to fill up exactly 3 items
    const merged = [...custom];
    for (let i = 0; i < 3; i++) {
      if (merged.length < 3) {
        merged.push(selectedDefaults[i % selectedDefaults.length]);
      }
    }
    return merged.slice(0, 3);
  };

  // Scroll directly to the local landing page reservation form
  const handleStartBooking = () => {
    const el = document.getElementById("booking-card");
    if (el) {
      el.scrollIntoView({ behavior: "smooth", block: "center" });
    } else {
      setBookingForm((prev: any) => ({
        ...prev,
        destination: pkg.title
      }));
      onBack();
      setTimeout(() => {
        const element = document.getElementById("contacto");
        if (element) {
          element.scrollIntoView({ behavior: "smooth" });
        }
      }, 200);
    }
  };

  const getDifficultyColor = (diff: string) => {
    switch (diff) {
      case "Fácil": return "bg-green-100 text-green-700 border-green-200";
      case "Moderado": return "bg-orange-100 text-orange-700 border-orange-200";
      case "Exigente": return "bg-red-100 text-red-700 border-red-200";
      default: return "bg-neutral-100 text-neutral-700 border-neutral-200";
    }
  };

  const getCategoryLabel = (cat: string) => {
    switch (cat) {
      case "local": return "Experiencia Local";
      case "national": return "Destino Nacional";
      case "international": return "Destino Internacional";
      default: return "Turismo";
    }
  };

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.5 }}
      className="pb-24 bg-[#fffcfb]"
    >
      {/* TOP NAVIGATION BREADCRUMB */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-5 flex items-center justify-between border-b border-brand-pink/5">
        <button 
          onClick={onBack}
          className="inline-flex items-center gap-2 text-sm font-semibold text-brand-charcoal hover:text-brand-pink group transition-all cursor-pointer"
        >
          <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1.5 transition-transform" />
          <span>Volver al Catálogo</span>
        </button>
        <div className="hidden sm:flex items-center gap-2 text-xs font-mono text-brand-charcoal/55">
          <span>PAQUETES</span>
          <span>&gt;</span>
          <span className="uppercase text-brand-pink">{getCategoryLabel(pkg.category)}</span>
          <span>&gt;</span>
          <span className="truncate max-w-[200px] font-bold text-brand-charcoal/85">{pkg.title}</span>
        </div>
      </div>

      {/* GIANT LANDING HERO BANNER */}
      <section className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-4 pb-12">
        <div className="relative rounded-3xl overflow-hidden shadow-xl border border-brand-pink/10 bg-white">
          <div className="grid grid-cols-1 lg:grid-cols-12">
            
            {/* Banner Left: Details Copy */}
            <div className="lg:col-span-6 p-8 sm:p-12 md:p-16 flex flex-col justify-center gap-6">
              
              <div className="flex flex-wrap items-center gap-2.5">
                <span className="px-3 py-1 rounded-full text-xs font-bold bg-brand-pink/10 text-brand-pink border border-brand-pink/15">
                  {getCategoryLabel(pkg.category)}
                </span>
                <span className={`px-2.5 py-1 rounded-md text-[11px] font-bold border ${getDifficultyColor(pkg.difficulty)}`}>
                  Nivel {pkg.difficulty}
                </span>
                <span className="inline-flex items-center gap-1 text-xs text-brand-charcoal/60 font-medium">
                  <MapPin className="w-3.5 h-3.5 text-brand-orange" />
                  {pkg.location}
                </span>
              </div>

              <h1 className="font-display text-3xl sm:text-4xl md:text-5xl font-extrabold text-brand-charcoal tracking-tight leading-tight">
                {pkg.title}
              </h1>

              <p className="text-base text-brand-charcoal/80 leading-relaxed font-light">
                {pkg.description}
              </p>

              {/* Badges parameters */}
              <div className="grid grid-cols-3 gap-3 py-4 border-y border-brand-pink/10 my-2">
                <div className="text-center">
                  <p className="text-[10px] font-mono tracking-wider text-brand-orange uppercase font-bold">Duración</p>
                  <p className="font-display font-black text-brand-charcoal text-sm flex items-center justify-center gap-1 mt-1">
                    <Clock className="w-4 h-4 text-brand-pink shrink-0" />
                    <span>{pkg.duration}</span>
                  </p>
                </div>
                <div className="text-center border-l border-brand-pink/10">
                  <p className="text-[10px] font-mono tracking-wider text-brand-orange uppercase font-bold">Inversión desde</p>
                  <p className="font-display font-black text-brand-pink text-lg mt-1">
                    {pkg.price}
                  </p>
                </div>
                <div className="text-center border-l border-brand-pink/10">
                  <p className="text-[10px] font-mono tracking-wider text-brand-orange uppercase font-bold">Operador Oficial</p>
                  <p className="font-display font-semibold text-brand-charcoal text-xs flex items-center justify-center gap-1 mt-1.5">
                    <Award className="w-4 h-4 text-brand-orange" />
                    <span>Sisari Travel</span>
                  </p>
                </div>
              </div>

              {/* Action and pricing banner bottom */}
              <div className="flex flex-col sm:flex-row items-center gap-3.5 mt-2">
                <button 
                  onClick={handleStartBooking}
                  className="w-full sm:w-auto bg-brand-pink hover:bg-brand-pink/95 text-white font-extrabold px-8 py-4 rounded-2xl shadow-lg transition-all flex items-center justify-center gap-2 cursor-pointer text-sm tracking-wider uppercase group"
                >
                  <Calendar className="w-4.5 h-4.5" />
                  <span>Reservar Cupo Ahora</span>
                </button>
                
                <a 
                  href={`https://wa.me/${whatsappNumber ? whatsappNumber.replace(/\D/g, "") : "51999999999"}?text=${encodeURIComponent(pkg.whatsAppText)}`}
                  target="_blank"
                  rel="noreferrer"
                  className="w-full sm:w-auto bg-green-500 hover:bg-green-600 text-white font-extrabold px-6 py-4 rounded-2xl shadow-md transition-all flex items-center justify-center gap-2 cursor-pointer text-sm"
                >
                  <Phone className="w-4.5 h-4.5 fill-white text-green-500" />
                  <span>Consultar WhatsApp</span>
                </a>
              </div>

              {/* Safe agency badge */}
              <div className="inline-flex items-center gap-2 mt-2 px-3 py-1.5 rounded-lg bg-emerald-50 text-emerald-800 border border-emerald-100 text-xs w-fit">
                <ShieldCheck className="w-4 h-4 text-emerald-600" />
                <span>Salida 100% Garantizada, Operador Turístico Autorizado por Mincetur</span>
              </div>

            </div>

            {/* Banner Right: Giant Image Illustration + 3 Secondary Photos */}
            <div className="lg:col-span-6 flex flex-col gap-3 relative">
              <div className="relative aspect-[4/3] h-[360px] md:h-[400px] rounded-3xl overflow-hidden border border-brand-pink/10 shadow-lg bg-neutral-100">
                <img 
                  src={activeImage || pkg.image} 
                  alt={pkg.title}
                  className="w-full h-full object-cover transition-all duration-300"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-gradient-to-t lg:bg-gradient-to-r from-brand-charcoal/15 to-transparent pointer-events-none" />
                
                {/* Highlight Card Floating */}
                <div className="absolute bottom-4 right-4 bg-white/90 backdrop-blur-md border border-brand-pink/20 p-3 rounded-xl shadow-xl max-w-xs hidden sm:block">
                  <p className="text-[9px] font-mono font-bold tracking-widest text-brand-orange uppercase text-left">Sisari Experto local</p>
                  <div className="flex items-center gap-2 mt-1">
                    <span className="text-sm">⭐</span>
                    <p className="text-[11px] font-semibold text-brand-charcoal text-left">"Guiado bilingüe completo y transporte seguro puerta a puerta."</p>
                  </div>
                </div>
              </div>

              {/* 3 Secondary photos section */}
              <div className="grid grid-cols-4 gap-2.5">
                {/* First element is the main image itself */}
                {[pkg.image, ...getSecondaryImages()].map((imgUrl, i) => {
                  const isActive = activeImage === imgUrl;
                  return (
                    <button
                      key={i}
                      onClick={() => setActiveImage(imgUrl)}
                      className={`h-16 md:h-20 rounded-2xl overflow-hidden border-2 cursor-pointer transition-all ${
                        isActive ? "border-brand-pink scale-95 shadow-md" : "border-neutral-200 hover:border-brand-pink/50 bg-neutral-100"
                      }`}
                      title={i === 0 ? "Foto Principal" : `Foto Secundaria ${i}`}
                    >
                      <img 
                        src={imgUrl} 
                        alt={`${pkg.title} Vista ${i + 1}`} 
                        className="w-full h-full object-cover hover:scale-105 transition-transform"
                        referrerPolicy="no-referrer"
                      />
                    </button>
                  );
                })}
              </div>

              {/* GOOGLE MAPS EMBEDDED UNDER COMPLEMENTARY PHOTOS */}
              <div className="bg-white border border-brand-pink/15 rounded-3xl p-5 shadow-lg overflow-hidden space-y-3 mt-4 text-left">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-display font-black text-brand-charcoal uppercase tracking-wider flex items-center gap-1.5">
                    📍 Ubicación Geográfica
                  </span>
                  <span className="text-[10px] font-mono font-bold text-brand-pink bg-brand-pink/5 px-2 py-0.5 rounded-full">
                    {pkg.location}
                  </span>
                </div>
                
                <div className="rounded-2xl overflow-hidden border border-neutral-100 h-44 bg-neutral-50 relative">
                  <iframe
                    title={`Ubicación de ${pkg.title}`}
                    src={
                      pkg.googleMapEmbedUrl && pkg.googleMapEmbedUrl.startsWith("http")
                        ? pkg.googleMapEmbedUrl
                        : `https://maps.google.com/maps?q=${encodeURIComponent(
                            pkg.location + ", Ayacucho, Peru"
                          )}&t=&z=13&ie=UTF8&iwloc=&output=embed`
                    }
                    className="w-full h-full border-0"
                    allowFullScreen
                    loading="lazy"
                  />
                </div>
                <p className="text-[9px] text-[#2c2c2c]/50 leading-normal">
                  Ubicación referencial de la experiencia turística de {pkg.title}.
                </p>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* RICH MULTI-TAB INFORMATION ENGINE */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
          
          {/* Main info panel left (8 cols) */}
          <div className="lg:col-span-8 flex flex-col gap-6">
            
            {/* Action Sub Tabs Header */}
            <div className="flex border-b border-brand-pink/10 gap-6">
              <button 
                onClick={() => setActiveSubTab("itinerary")}
                className={`py-4 text-sm font-bold uppercase tracking-wider relative transition-all cursor-pointer ${
                  activeSubTab === "itinerary" 
                    ? "text-brand-pink focus:outline-none" 
                    : "text-brand-charcoal/50 hover:text-brand-charcoal"
                }`}
              >
                Itinerario Completo
                {activeSubTab === "itinerary" && (
                  <motion.div layoutId="subtabBorder" className="absolute bottom-0 left-0 right-0 h-[3px] bg-brand-pink" />
                )}
              </button>
              
              <button 
                onClick={() => setActiveSubTab("whatsIncluded")}
                className={`py-4 text-sm font-bold uppercase tracking-wider relative transition-all cursor-pointer ${
                  activeSubTab === "whatsIncluded" 
                    ? "text-brand-pink focus:outline-none" 
                    : "text-brand-charcoal/50 hover:text-brand-charcoal"
                }`}
              >
                ¿Qué incluye el servicio?
                {activeSubTab === "whatsIncluded" && (
                  <motion.div layoutId="subtabBorder" className="absolute bottom-0 left-0 right-0 h-[3px] bg-brand-pink" />
                )}
              </button>

              <button 
                onClick={() => setActiveSubTab("faqs")}
                className={`py-4 text-sm font-bold uppercase tracking-wider relative transition-all cursor-pointer ${
                  activeSubTab === "faqs" 
                    ? "text-brand-pink focus:outline-none" 
                    : "text-brand-charcoal/50 hover:text-brand-charcoal"
                }`}
              >
                Preguntas Frecuentes
                {activeSubTab === "faqs" && (
                  <motion.div layoutId="subtabBorder" className="absolute bottom-0 left-0 right-0 h-[3px] bg-brand-pink" />
                )}
              </button>
            </div>

            {/* TAB CONTENT CONTAINER */}
            <div className="mt-4">
              
              {/* SUB TAB: ITINERARY */}
              {activeSubTab === "itinerary" && (
                <motion.div 
                  initial={{ opacity: 0 }} 
                  animate={{ opacity: 1 }} 
                  className="space-y-8"
                >
                  <p className="text-sm text-brand-charcoal/70 leading-relaxed font-light">
                    Nuestro equipo ha trazado con cuidado esta ruta para maximizar tu disfrute, cuidar tu ritmo físico y conectarte directamente con la identidad local del destino. Sigue el cronograma sugerido:
                  </p>

                  <div className="relative pl-6 sm:pl-8 border-l-2 border-dashed border-brand-pink/20 space-y-10 ml-2">
                    {pkg.itinerary.map((dayItem, idx) => (
                      <div key={idx} className="relative">
                        
                        {/* Day indicator number bullet node */}
                        <div className="absolute -left-[35px] sm:-left-[43px] top-0 w-8 h-8 rounded-full bg-brand-pink text-white font-display font-black text-xs flex items-center justify-center border-4 border-white shadow-md">
                          {dayItem.day}
                        </div>

                        <div className="bg-white border border-brand-pink/5 rounded-2xl p-6 shadow-sm hover:shadow-md transition-shadow flex flex-col md:flex-row gap-5 items-start text-left">
                          <div className="flex-1">
                            <span className="text-[10px] font-mono tracking-widest font-extrabold text-brand-orange uppercase">Día {dayItem.day} de Viaje</span>
                            <h3 className="font-display font-extrabold text-lg text-brand-charcoal mt-1 mb-3">
                              {dayItem.title}
                            </h3>
                            <p className="text-sm text-brand-charcoal/75 leading-relaxed font-light">
                              {dayItem.description}
                            </p>
                          </div>
                          
                          {/* Complementary photo for each day of the itinerary */}
                          <div className="w-full md:w-44 h-28 shrink-0 rounded-2xl overflow-hidden border border-neutral-100 shadow-xs relative bg-neutral-50">
                            <img 
                              src={
                                dayItem.dayImage && dayItem.dayImage.trim() 
                                  ? dayItem.dayImage 
                                  : [
                                      "https://images.unsplash.com/photo-1501555088652-021faa106b9b?w=400&q=80",
                                      "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?w=400&q=80",
                                      "https://images.unsplash.com/photo-1584551246679-0daf3d275d0f?w=400&q=80",
                                      "https://images.unsplash.com/photo-1596176530529-78163a4f7af2?w=400&q=80",
                                      "https://images.unsplash.com/photo-1526392060635-9d6019884377?w=400&q=80"
                                    ][idx % 5]
                              }
                              alt={`Ruta del Día ${dayItem.day}`} 
                              className="w-full h-full object-cover select-none"
                              referrerPolicy="no-referrer"
                            />
                            <span className="absolute bottom-1.5 right-1.5 bg-black/60 backdrop-blur-xs text-[8px] font-bold text-white px-1.5 py-0.5 rounded-md uppercase tracking-wider">
                              Vista Ruta {dayItem.day}
                            </span>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </motion.div>
              )}

              {/* SUB TAB: WHAT'S INCLUDED */}
              {activeSubTab === "whatsIncluded" && (
                <motion.div 
                  initial={{ opacity: 0 }} 
                  animate={{ opacity: 1 }} 
                  className="grid grid-cols-1 md:grid-cols-2 gap-8"
                >
                  {/* Included section */}
                  <div className="bg-emerald-50/50 border border-emerald-100 rounded-3xl p-6 md:p-8">
                    <h3 className="font-display font-black text-emerald-800 text-lg flex items-center gap-2 mb-4">
                      <span className="w-7 h-7 rounded-full bg-emerald-100 flex items-center justify-center text-emerald-600 text-xs">✓</span>
                      <span>El servicio SÍ incluye:</span>
                    </h3>
                    <ul className="space-y-3">
                      {pkg.inclusions.map((inc, i) => (
                        <li key={i} className="flex items-start gap-2 text-sm text-[#2f4f3c] leading-relaxed font-light">
                          <Check className="w-4.5 h-4.5 text-emerald-600 shrink-0 mt-0.5" />
                          <span>{inc}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Excluded section */}
                  <div className="bg-red-50/30 border border-neutral-100 rounded-3xl p-6 md:p-8">
                    <h3 className="font-display font-black text-neutral-800 text-lg flex items-center gap-2 mb-4">
                      <span className="w-7 h-7 rounded-full bg-red-100 flex items-center justify-center text-red-500 font-bold text-xs">✗</span>
                      <span>No incluye (gastos libres):</span>
                    </h3>
                    <ul className="space-y-3">
                      {pkg.exclusions.map((exc, i) => (
                        <li key={i} className="flex items-start gap-2 text-sm text-brand-charcoal/70 leading-relaxed font-light">
                          <span className="text-red-500 font-bold shrink-0 text-md leading-none mt-0.5">•</span>
                          <span>{exc}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </motion.div>
              )}

              {/* SUB TAB: FAQS */}
              {activeSubTab === "faqs" && (
                <motion.div 
                  initial={{ opacity: 0 }} 
                  animate={{ opacity: 1 }} 
                  className="space-y-4"
                >
                  <p className="text-sm text-brand-charcoal/70 font-light mb-6">
                    Resolvemos tus dudas principales para que puedas empacar con total tranquilidad. Si tienes consultas adicionales, no dudes en escribirnos por WhatsApp:
                  </p>

                  <div className="space-y-3">
                    {pkg.faqs.map((faq, i) => (
                      <div 
                        key={i} 
                        className="bg-white border border-brand-pink/5 rounded-2xl overflow-hidden transition-all shadow-sm"
                      >
                        <button 
                          onClick={() => setFaqOpenIndex(faqOpenIndex === i ? null : i)}
                          className="w-full flex items-center justify-between p-5 text-left font-display font-bold text-sm sm:text-base text-brand-charcoal hover:bg-brand-pink/5 transition-colors cursor-pointer"
                        >
                          <span className="flex items-center gap-2">
                            <HelpCircle className="w-4.5 h-4.5 text-brand-pink shrink-0" />
                            <span>{faq.q}</span>
                          </span>
                          <span className="text-brand-pink text-xs font-mono">{faqOpenIndex === i ? "▲" : "▼"}</span>
                        </button>
                        
                        {faqOpenIndex === i && (
                          <div className="p-5 pt-0 border-t border-dashed border-brand-pink/5 bg-brand-pink/[0.01]">
                            <p className="text-sm text-brand-charcoal/75 leading-relaxed font-light">
                              {faq.a}
                            </p>
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                </motion.div>
              )}

            </div>

            {/* HIGH-IMPACT HIGHLIGHTS PREVIEW */}
            <div className="bg-gradient-to-tr from-brand-pink/5 via-transparent to-brand-orange/5 p-6 sm:p-8 rounded-3xl border border-brand-pink/10 mt-6">
              <h3 className="font-display font-extrabold text-brand-charcoal text-lg mb-4 flex items-center gap-2">
                <Sparkles className="w-5 h-5 text-brand-orange" />
                <span>Puntos Clave Exclusivos de Sisari</span>
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {pkg.highlights.map((hlt, i) => (
                  <div key={i} className="flex items-start gap-3 bg-white p-4 rounded-2xl border border-brand-pink/5 shadow-sm">
                    <span className="w-6 h-6 rounded-full bg-brand-orange/15 text-brand-orange flex items-center justify-center shrink-0 font-bold text-xs">✓</span>
                    <span className="text-sm text-brand-charcoal/85 font-medium leading-snug">{hlt}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* COMPARTIR Y VALORACIONES INTEGRADOS - RESPONSIVO */}
            <div className="mt-8 bg-neutral-50/50 rounded-3xl border border-brand-pink/10 p-6 sm:p-8 space-y-6">
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-brand-pink/10 pb-6">
                <div>
                  <h3 className="font-display font-extrabold text-brand-charcoal text-xl text-left">Valora y Comparte esta Experiencia</h3>
                  <p className="text-xs text-brand-charcoal/60 mt-1 text-left">Comparte con tus amigos o planifica en grupo en tus redes favoritas.</p>
                </div>

                {/* Social Share Buttons */}
                <div className="flex flex-wrap items-center gap-2">
                  <span className="text-[10px] uppercase font-black tracking-wider text-brand-orange py-1">Compartir:</span>
                  
                  {/* WhatsApp */}
                  <a 
                    href={`https://api.whatsapp.com/send?text=${encodeURIComponent(`¡Oye! Mira este increíble paquete turístico en Perú: ${pkg.title} (${pkg.price}) con Sisari Travel. Entra a ver los detalles del viaje aquí: ${window.location.href}`)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-2 rounded-xl bg-green-50 text-green-600 hover:bg-green-600 hover:text-white transition-all cursor-pointer shadow-xs flex items-center gap-1 text-xs font-bold"
                    title="Compartir por WhatsApp"
                  >
                    <span className="text-md">💬</span>
                    <span>WA</span>
                  </a>

                  {/* Facebook */}
                  <a 
                    href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(window.location.href)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-2 rounded-xl bg-blue-50 text-blue-600 hover:bg-blue-600 hover:text-white transition-all cursor-pointer shadow-xs flex items-center gap-1 text-xs font-bold"
                    title="Compartir en Facebook"
                  >
                    <span className="text-md">👥</span>
                    <span>FB</span>
                  </a>

                  {/* Twitter / X */}
                  <a 
                    href={`https://twitter.com/intent/tweet?text=${encodeURIComponent(`¡Planificando nuestro próximo viaje con Sisari Travel! Increíble el paquete: ${pkg.title}`)}&url=${encodeURIComponent(window.location.href)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-2 rounded-xl bg-neutral-900 text-white hover:bg-black transition-all cursor-pointer shadow-xs flex items-center gap-1 text-xs font-bold"
                    title="Compartir en X / Twitter"
                  >
                    <span className="text-[10px]">𝕏</span>
                    <span>Tweet</span>
                  </a>

                  {/* Copy Link */}
                  <button 
                    onClick={() => {
                      navigator.clipboard.writeText(window.location.href);
                      alert("¡Enlace copiado al portapapeles! Listo para pegar y compartir en tus redes sociales.");
                    }}
                    className="p-2 rounded-xl bg-brand-pink/10 text-brand-pink hover:bg-brand-pink hover:text-white transition-all cursor-pointer shadow-xs flex items-center gap-1 text-xs font-bold"
                    title="Copiar Enlace de Landing"
                  >
                    <span>🔗 Copy</span>
                  </button>
                </div>
              </div>

              {/* TRIPADVISOR & CERTIFICATIONS SUB SECTION */}
              <div className="bg-white p-4 sm:p-5 rounded-2xl border border-neutral-100 flex flex-col sm:flex-row items-center justify-between gap-5 text-left">
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-ping" />
                    <span className="text-[10px] font-mono tracking-widest text-emerald-600 uppercase font-bold">TripAdvisor Recomendado</span>
                  </div>
                  <h4 className="font-display font-extrabold text-[#00af87] text-md">¿Quieres ver opiniones en TripAdvisor?</h4>
                  <p className="text-xs text-brand-charcoal/65 leading-relaxed font-light">
                    Nuestra reputación como operador oficial certificado Mincetur es excelente. Lee o deja tus opiniones directamente en nuestro perfil oficial.
                  </p>
                </div>
                
                <div className="shrink-0 flex gap-2">
                  <a 
                    href={tripadvisorUrl || "https://www.tripadvisor.com.pe/"} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="bg-[#00af87] hover:bg-[#008767] text-white px-4 py-2.5 rounded-xl font-bold text-xs flex items-center gap-1.5 transition-all shadow-xs uppercase tracking-wider"
                  >
                    <span>🦉 Visitar TripAdvisor</span>
                  </a>
                  <a 
                    href={googleReviewsUrl || "https://google.com/"} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="bg-white hover:bg-neutral-50 text-neutral-700 border border-neutral-200 px-4 py-2.5 rounded-xl font-bold text-xs flex items-center gap-1.5 transition-all shadow-xs"
                  >
                    <span>🎯 Google Reviews</span>
                  </a>
                </div>
              </div>

              {/* TESTIMONIOS Y VALORACIONES SECT */}
              <div className="space-y-6 text-left">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="font-display font-extrabold text-brand-charcoal text-lg">Testimonios de Viajeros ({localReviews.length})</h3>
                    <div className="flex items-center gap-1.5 mt-1">
                      <div className="flex text-yellow-500 font-bold text-sm">★★★★★</div>
                      <span className="text-xs font-bold text-brand-charcoal/70 animate-pulse">5.0 / 5.0 basada en opiniones reales</span>
                    </div>
                  </div>
                  
                  <button
                    type="button"
                    onClick={() => setIsAddingReview(!isAddingReview)}
                    className="text-xs font-bold text-brand-pink hover:text-brand-orange transition-colors flex items-center gap-1 cursor-pointer"
                  >
                    {isAddingReview ? "✕ Cerrar Formulario" : "✍️ Dejar Testimonio"}
                  </button>
                </div>

                {reviewSuccessMessage && (
                  <p className="p-3 bg-emerald-50 text-emerald-800 text-xs font-bold rounded-xl animate-fade-in border border-emerald-100">
                    {reviewSuccessMessage}
                  </p>
                )}

                {isAddingReview && (
                  <form onSubmit={handleAddReview} className="bg-white border border-brand-pink/15 p-5 rounded-2xl space-y-3.5 shadow-sm animate-scale-up">
                    <h4 className="font-display font-bold text-xs uppercase tracking-wider text-brand-charcoal">Escribe tu Experiencia en {pkg.title}</h4>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                      <div>
                        <label className="text-[10px] font-bold text-neutral-500 uppercase block mb-1">Nombre Completo</label>
                        <input
                          type="text"
                          required
                          value={newReviewName}
                          onChange={(e) => setNewReviewName(e.target.value)}
                          placeholder="Ej. Sofía Mendoza"
                          className="w-full text-xs px-3 py-2 border border-neutral-200 rounded-lg outline-none focus:ring-1 focus:ring-brand-pink text-[#2c2c2c]"
                        />
                      </div>
                      <div>
                        <label className="text-[10px] font-bold text-neutral-500 uppercase block mb-1">Valoración / Estrellas</label>
                        <select
                          value={newReviewRating}
                          onChange={(e) => setNewReviewRating(Number(e.target.value))}
                          className="w-full text-xs px-3 py-2 border border-neutral-200 rounded-lg outline-none focus:ring-1 focus:ring-brand-pink bg-white text-[#2c2c2c] font-bold cursor-pointer"
                        >
                          <option value="5">⭐⭐⭐⭐⭐ (Excelente)</option>
                          <option value="4">⭐⭐⭐⭐ (Muy Bueno)</option>
                          <option value="3">⭐⭐⭐ (Bueno)</option>
                        </select>
                      </div>
                    </div>
                    <div>
                      <label className="text-[10px] font-bold text-neutral-500 uppercase block mb-1">Comentario del Viaje</label>
                      <textarea
                        required
                        value={newReviewComment}
                        onChange={(e) => setNewReviewComment(e.target.value)}
                        placeholder="Cuéntanos qué fue lo que más te gustó, la comida, el guiado, los paisajes..."
                        rows={3}
                        className="w-full text-xs px-3 py-2 border border-neutral-200 rounded-lg outline-none focus:ring-1 focus:ring-brand-pink text-[#2c2c2c]"
                      />
                    </div>
                    <button
                      type="submit"
                      className="bg-brand-pink hover:bg-brand-orange text-white px-5 py-2.5 rounded-xl text-xs font-bold transition-all uppercase tracking-wider shadow-sm w-full sm:w-auto cursor-pointer"
                    >
                      Publicar testimonio ahora
                    </button>
                  </form>
                )}

                <div className="grid grid-cols-1 gap-4">
                  {localReviews.map((rev) => (
                    <div key={rev.id} className="bg-white border border-brand-pink/5 hover:border-brand-pink/15 p-5 rounded-2xl shadow-xs transition-all space-y-3.5">
                      
                      {editingReviewId === rev.id ? (
                        <div className="bg-neutral-50 p-4.5 rounded-xl border border-neutral-150 space-y-3 text-left">
                          <p className="text-[10px] uppercase font-black text-brand-pink">Formulario de Edición Rápida</p>
                          <div className="grid grid-cols-2 gap-2">
                            <div>
                              <span className="text-[8px] font-bold text-neutral-400 block uppercase">Nombre</span>
                              <input
                                type="text"
                                value={editingReviewName}
                                onChange={(e) => setEditingReviewName(e.target.value)}
                                className="w-full text-xs px-2.5 py-1.5 border border-neutral-200 bg-white rounded-md text-[#222]"
                              />
                            </div>
                            <div>
                              <span className="text-[8px] font-bold text-neutral-400 block uppercase">Valoración</span>
                              <select
                                value={editingReviewRating}
                                onChange={(e) => setEditingReviewRating(Number(e.target.value))}
                                className="w-full text-xs px-2.5 py-1.5 border border-neutral-200 bg-white rounded-md text-[#222] font-bold"
                              >
                                <option value="5">⭐⭐⭐⭐⭐</option>
                                <option value="4">⭐⭐⭐⭐</option>
                                <option value="3">⭐⭐⭐</option>
                              </select>
                            </div>
                          </div>
                          <div>
                            <span className="text-[8px] font-bold text-neutral-400 block uppercase">Testimonio</span>
                            <textarea
                              value={editingReviewComment}
                              onChange={(e) => setEditingReviewComment(e.target.value)}
                              rows={2.5}
                              className="w-full text-xs px-2.5 py-1.5 border border-neutral-200 bg-white rounded-md text-[#222]"
                            />
                          </div>
                          <div className="flex gap-2 justify-end">
                            <button
                              type="button"
                              onClick={() => setEditingReviewId(null)}
                              className="px-3 py-1.5 rounded-lg border border-neutral-200 hover:bg-neutral-100 text-neutral-600 text-[10px] font-bold cursor-pointer"
                            >
                              Cancelar
                            </button>
                            <button
                              type="button"
                              onClick={() => handleSaveEditedReview(rev.id)}
                              className="px-3.5 py-1.5 rounded-lg bg-brand-pink hover:bg-brand-orange text-white text-[10px] font-extrabold cursor-pointer transition-colors shadow-sm"
                            >
                              Guardar Cambios
                            </button>
                          </div>
                        </div>
                      ) : (
                        <>
                          <div className="flex items-center justify-between gap-3 text-left">
                            <div className="flex items-center gap-3">
                              <img 
                                src={rev.avatar || "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=100&q=80"}
                                className="w-10 h-10 rounded-full object-cover border border-neutral-200" 
                              />
                              <div>
                                <h4 className="font-display font-black text-sm text-brand-charcoal">{rev.name}</h4>
                                <span className="text-[9px] text-neutral-400 block">{rev.date}</span>
                              </div>
                            </div>

                            <div className="text-right flex flex-col items-end gap-1.5">
                              <div className="text-yellow-400 font-bold text-xs">
                                {"★".repeat(rev.rating)}
                                {"☆".repeat(5 - rev.rating)}
                              </div>
                              <button
                                type="button"
                                onClick={() => {
                                  setEditingReviewId(rev.id);
                                  setEditingReviewName(rev.name);
                                  setEditingReviewComment(rev.comment);
                                  setEditingReviewRating(rev.rating);
                                }}
                                className="text-[9px] font-black text-brand-pink hover:text-brand-orange hover:underline cursor-pointer uppercase tracking-wider flex items-center justify-center gap-0.5"
                                title="Editar testimonio directamente"
                              >
                                ✏️ Editar Testimonio
                              </button>
                            </div>
                          </div>

                          <p className="text-xs text-brand-charcoal/80 leading-relaxed font-light italic text-left">
                            "{rev.comment}"
                          </p>

                          <div className="pt-2.5 border-t border-brand-pink/5 flex flex-wrap items-center justify-between gap-2.5 text-[10px]">
                            {/* Compartir directo en Redes */}
                            <div className="flex items-center gap-1.5 flex-wrap">
                              <span className="text-neutral-400 font-bold">Compartir:</span>
                              
                              {/* WhatsApp Share */}
                              <a
                                target="_blank"
                                rel="noopener noreferrer"
                                referrerPolicy="no-referrer"
                                href={`https://api.whatsapp.com/send?text=${encodeURIComponent(`Testimonio de ${rev.name}: "${rev.comment}" - ¡Míralo en Sisari Travel! http://sisaritravel.com`)}`}
                                className="p-1 px-1.5 rounded bg-[#25D366]/10 text-[#128C7E] hover:bg-[#25D366]/20 font-extrabold transition-all flex items-center gap-0.5 cursor-pointer text-[9px]"
                                title="Compartir en WhatsApp"
                              >
                                💬 WhatsApp
                              </a>

                              {/* Facebook Share */}
                              <a
                                target="_blank"
                                rel="noopener noreferrer"
                                referrerPolicy="no-referrer"
                                href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent('https://sisaritravel.com')}`}
                                className="p-1 px-1.5 rounded bg-[#1877F2]/10 text-[#1877F2] hover:bg-[#1877F2]/20 font-extrabold transition-all flex items-center gap-0.5 cursor-pointer text-[9px]"
                                title="Compartir en Facebook"
                              >
                                👥 Facebook
                              </a>

                              {/* Twitter/X Share */}
                              <a
                                target="_blank"
                                rel="noopener noreferrer"
                                referrerPolicy="no-referrer"
                                href={`https://twitter.com/intent/tweet?text=${encodeURIComponent(`Testimonio de ${rev.name}: "${rev.comment}"`)}&url=${encodeURIComponent('https://sisaritravel.com')}`}
                                className="p-1 px-1.5 rounded bg-neutral-900/10 text-neutral-900 hover:bg-neutral-900/20 font-extrabold transition-all flex items-center gap-0.5 cursor-pointer text-[9px]"
                                title="Compartir en Twitter/X"
                              >
                                🐦 X
                              </a>
                            </div>

                            <button
                              type="button"
                              onClick={() => {
                                navigator.clipboard.writeText(`Testimonio de ${rev.name}: "${rev.comment}" - Excelente viaje con Sisari Travel.`);
                                setCopiedId(rev.id);
                                setTimeout(() => setCopiedId(null), 2000);
                              }}
                              className="px-2 py-1 rounded bg-brand-pink/5 hover:bg-brand-pink/10 text-brand-pink font-bold transition-all cursor-pointer flex items-center gap-0.5 shrink-0"
                            >
                              {copiedId === rev.id ? "✓ ¡Copiado!" : "🔗 Copiar Reseña"}
                            </button>
                          </div>
                        </>
                      )}

                    </div>
                  ))}
                </div>
              </div>
            </div>

          </div>

          {/* Sidebar CTA Card Right (4 cols) */}
          <div className="lg:col-span-4 flex flex-col gap-6">
            
            {/* Dynamic Interactive Booking Card */}
            <div id="booking-card" className="sticky top-28 bg-white border border-brand-pink/15 rounded-3xl p-6 shadow-xl relative overflow-hidden">
              <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-brand-pink to-brand-orange" />
              
              <div className="flex items-center gap-2 mb-4">
                <SisariLogoSVG className="w-8 h-8" />
                <div>
                  <p className="text-[10px] font-mono tracking-wider text-brand-orange font-bold uppercase">Agencia Certificada</p>
                  <p className="text-sm text-[#2c2c2c] font-black">SISARI TRAVEL PERÚ</p>
                </div>
              </div>

              <div className="bg-[#fbfaf8] border border-brand-pink/10 rounded-2xl p-4 mb-4">
                <p className="text-xs text-brand-charcoal/50 leading-none">Paquete Seleccionado:</p>
                <h4 className="font-display font-bold text-sm text-brand-charcoal mt-1.5 leading-snug">{pkg.title}</h4>
                <div className="flex justify-between items-center mt-3 border-t border-brand-pink/5 pt-3 text-xs">
                  <span className="text-brand-charcoal/60">Tarifa Todo Incluido:</span>
                  <strong className="text-brand-pink text-sm font-extrabold">{pkg.price}</strong>
                </div>
              </div>

               <div>
                {!isBooked ? (
                  <form onSubmit={handleSubmitBooking} className="space-y-3.5 text-left mt-3">
                    <div>
                      <label className="block text-[10px] font-bold text-brand-charcoal uppercase tracking-wider mb-1">Nombre Completo *</label>
                      <input 
                        type="text" 
                        required
                        placeholder="Ej. Juan Pérez"
                        value={formData.name}
                        onChange={(e) => setFormData({...formData, name: e.target.value})}
                        className="w-full text-xs px-3 py-2 border border-neutral-200 rounded-xl focus:border-brand-pink outline-none font-medium text-[#2c2c2c]"
                      />
                    </div>

                    <div className="grid grid-cols-2 gap-2">
                      <div>
                        <label className="block text-[10px] font-bold text-brand-charcoal uppercase tracking-wider mb-1">WhatsApp / Celular *</label>
                        <input 
                          type="tel" 
                          required
                          placeholder="Ej. +51 987654321"
                          value={formData.phone}
                          onChange={(e) => setFormData({...formData, phone: e.target.value})}
                          className="w-full text-xs px-3 py-2 border border-neutral-200 rounded-xl focus:border-brand-pink outline-none font-medium text-[#2c2c2c]"
                        />
                      </div>
                      <div>
                        <label className="block text-[10px] font-bold text-brand-charcoal uppercase tracking-wider mb-1">Correo Electrónico *</label>
                        <input 
                          type="email" 
                          required
                          placeholder="perez@mail.com"
                          value={formData.email}
                          onChange={(e) => setFormData({...formData, email: e.target.value})}
                          className="w-full text-xs px-3 py-2 border border-neutral-200 rounded-xl focus:border-brand-pink outline-none font-medium text-[#2c2c2c]"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-2">
                      <div>
                        <label className="block text-[10px] font-bold text-brand-charcoal uppercase tracking-wider mb-1">N° de Adultos *</label>
                        <select 
                          value={formData.adults}
                          onChange={(e) => setFormData({...formData, adults: e.target.value})}
                          className="w-full text-xs px-3 py-2 border border-neutral-200 rounded-xl bg-white focus:border-brand-pink outline-none font-medium text-[#2c2c2c] cursor-pointer"
                        >
                          <option value="1">1 adulto</option>
                          <option value="2">2 adultos</option>
                          <option value="3">3 adultos</option>
                          <option value="4">4 adultos</option>
                          <option value="5">5 adultos</option>
                          <option value="6+">6 a más adultos</option>
                        </select>
                      </div>
                      <div>
                        <label className="block text-[10px] font-bold text-brand-charcoal uppercase tracking-wider mb-1">N° de Niños (2-12 años)</label>
                        <select 
                          value={formData.children}
                          onChange={(e) => setFormData({...formData, children: e.target.value})}
                          className="w-full text-xs px-3 py-2 border border-neutral-200 rounded-xl bg-white focus:border-brand-pink outline-none font-medium text-[#2c2c2c] cursor-pointer"
                        >
                          <option value="0">Sin niños</option>
                          <option value="1">1 niño</option>
                          <option value="2">2 niños</option>
                          <option value="3">3 niños</option>
                          <option value="4+">4 a más niños</option>
                        </select>
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-2">
                      <div>
                        <label className="block text-[10px] font-bold text-brand-charcoal uppercase tracking-wider mb-1">Categoría de Hotel</label>
                        <select 
                          value={formData.hotelRating}
                          onChange={(e) => setFormData({...formData, hotelRating: e.target.value})}
                          className="w-full text-xs px-3 py-2 border border-neutral-200 rounded-xl bg-white focus:border-brand-pink outline-none font-medium text-[#2c2c2c] cursor-pointer"
                        >
                          <option value="none">Sin hotel (solo tours)</option>
                          <option value="2_star">Económico (2 ⭐⭐)</option>
                          <option value="3_star">Recomendado (3 ⭐⭐⭐)</option>
                          <option value="4_star">Santi / Superior (4 ⭐⭐⭐⭐)</option>
                          <option value="5_star">De Lujo (5 ⭐⭐⭐⭐⭐)</option>
                        </select>
                      </div>
                      <div>
                        <label className="block text-[10px] font-bold text-brand-charcoal uppercase tracking-wider mb-1">Fecha de Viaje</label>
                        <input 
                          type="date" 
                          required
                          value={formData.travelDate}
                          onChange={(e) => setFormData({...formData, travelDate: e.target.value})}
                          className="w-full text-xs px-3 py-2 border border-neutral-200 rounded-xl focus:border-brand-pink outline-none font-medium text-[#2c2c2c]"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-2">
                      <div>
                        <label className="block text-[10px] font-bold text-brand-charcoal uppercase tracking-wider mb-1">Estado Físico</label>
                        <select 
                          value={formData.physicalState}
                          onChange={(e) => setFormData({...formData, physicalState: e.target.value})}
                          className="w-full text-xs px-3 py-2 border border-neutral-200 rounded-xl bg-white focus:border-brand-pink outline-none font-medium text-[#2c2c2c] cursor-pointer"
                        >
                          <option value="good">Excelente / Saludable</option>
                          <option value="normal">Normal (Poca actividad)</option>
                          <option value="restricted">Limitaciones leves (Adulto mayor)</option>
                        </select>
                      </div>
                      <div>
                        <label className="block text-[10px] font-bold text-brand-charcoal uppercase tracking-wider mb-1">Restricción Alimentaria</label>
                        <select 
                          value={formData.dietaryRestrictions}
                          onChange={(e) => setFormData({...formData, dietaryRestrictions: e.target.value})}
                          className="w-full text-xs px-3 py-2 border border-neutral-200 rounded-xl bg-white focus:border-brand-pink outline-none font-medium text-[#2c2c2c] cursor-pointer"
                        >
                          <option value="none">Sin restricciones</option>
                          <option value="vegetarian">Vegetariano</option>
                          <option value="vegan">Vegano</option>
                          <option value="gluten_free">Gluten Free / Celíaco</option>
                        </select>
                      </div>
                    </div>

                    <div>
                      <label className="block text-[10px] font-bold text-brand-charcoal uppercase tracking-wider mb-1">Requerimientos o notas especiales</label>
                      <textarea 
                        rows={2}
                        placeholder="Cosas como: hotel de 3 estrellas, dieta especial..."
                        value={formData.comments}
                        onChange={(e) => setFormData({...formData, comments: e.target.value})}
                        className="w-full text-xs px-3 py-2 border border-neutral-200 rounded-xl focus:border-brand-pink outline-none font-light text-[#2c2c2c]"
                      />
                    </div>

                    {pkg.brochurePdfUrl && (
                      <a
                        href={pkg.brochurePdfUrl}
                        download={`Brochure_${pkg.title.replace(/\s+/g, '_')}.pdf`}
                        target="_blank"
                        rel="noreferrer"
                        className="w-full bg-neutral-100 hover:bg-neutral-200 text-neutral-800 font-extrabold py-2 px-3 rounded-xl text-[10px] uppercase tracking-wider border border-neutral-200 transition-all flex items-center justify-center gap-1.5 cursor-pointer no-underline"
                      >
                        <FileText className="w-3.5 h-3.5 text-brand-pink shrink-0" />
                        <span>Descargar Brochure PDF</span>
                      </a>
                    )}

                    <button 
                      type="submit"
                      className="w-full bg-brand-pink hover:bg-brand-pink/95 text-white font-extrabold py-3 px-4 rounded-xl text-xs uppercase tracking-wider shadow-lg hover:shadow-brand-pink/20 transition-all flex items-center justify-center gap-2 cursor-pointer mt-1"
                    >
                      <span>Reservar y Enviar Solicitud</span>
                      <Send className="w-3.5 h-3.5" />
                    </button>
                  </form>
                ) : (
                  <motion.div 
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="p-4 bg-emerald-50/50 border border-emerald-100 rounded-2xl space-y-4 text-center text-xs mt-3"
                  >
                    <div className="w-10 h-10 rounded-full bg-emerald-100 text-emerald-600 text-lg flex items-center justify-center font-bold mx-auto">
                      ✓
                    </div>
                    <div>
                      <h4 className="font-display font-black text-emerald-950 text-sm">¡Reserva Registrada en el CRM!</h4>
                      <p className="text-emerald-800/85 mt-1 font-light leading-relaxed">
                        Tu solicitud de viaje ha sido registrada correctamente como un nuevo lead. Completa el envío oficial del itinerario con los canales directos:
                      </p>
                    </div>

                    <div className="space-y-2 pt-1">
                      <a 
                        href={mailLink}
                        target="_blank"
                        rel="noreferrer"
                        className="w-full bg-brand-charcoal text-white hover:bg-black font-extrabold py-2.5 px-4 rounded-xl text-[10px] uppercase tracking-wider transition-all flex items-center justify-center gap-2 cursor-pointer no-underline shadow-sm"
                      >
                        <span>✉ Envío Oficial por Correo</span>
                      </a>

                      <a 
                        href={whatsappLink}
                        target="_blank"
                        rel="noreferrer"
                        className="w-full bg-green-500 text-white hover:bg-green-600 font-extrabold py-2.5 px-4 rounded-xl text-[10px] uppercase tracking-wider transition-all flex items-center justify-center gap-2 cursor-pointer no-underline shadow-sm"
                      >
                        <span>💬 Confirmación WhatsApp Copy</span>
                      </a>

                      <button
                        onClick={() => setIsBooked(false)}
                        className="text-[10px] font-bold text-neutral-500 hover:text-brand-pink underline block mx-auto pt-2 cursor-pointer"
                      >
                        Registrar otra reserva
                      </button>
                    </div>
                  </motion.div>
                )}
              </div>

              <div className="border-t border-brand-pink/5 pt-4 mt-4 space-y-2 text-[11px] text-brand-charcoal/60 leading-tight">
                <div className="flex items-center gap-1.5">
                  <span className="text-emerald-500 font-bold text-sm leading-none">✓</span>
                  <span>Sin penalidad por cambio de fechas.</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <span className="text-emerald-500 font-bold text-sm leading-none">✓</span>
                  <span>Opción de pago fraccionado disponible.</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <span className="text-emerald-500 font-bold text-sm leading-none">✓</span>
                  <span>Soporte telefónico de contingencia 24/7.</span>
                </div>
              </div>
            </div>

          </div>

        </div>
      </section>

    </motion.div>
  );
}
