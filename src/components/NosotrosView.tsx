import React, { useState } from "react";
import { motion } from "motion/react";
import { 
  ArrowLeft, Award, Shield, Target, Eye, ExternalLink, 
  Users, Star, Compass, Clock, CheckCircle2, Send, Phone, Mail, MapPin
} from "lucide-react";
import { CMSContent, ContactFormData } from "../types";
import { TESTIMONIALS } from "../data";

interface NosotrosViewProps {
  cmsContent: CMSContent;
  language: "es" | "en";
  onBack: () => void;
  scrollToId: (id: string) => void;
}

export default function NosotrosView({ cmsContent, language, onBack, scrollToId }: NosotrosViewProps) {
  const isEs = language === "es";
  const [activeHotspot, setActiveHotspot] = useState<number | null>(null);

  const renderLucideIcon = (iconName?: string, className: string = "w-6 h-6") => {
    switch (iconName) {
      case "Shield": return <Shield className={className} />;
      case "Clock": return <Clock className={className} />;
      case "Award": return <Award className={className} />;
      case "Users": return <Users className={className} />;
      case "Compass": return <Compass className={className} />;
      case "Target": return <Target className={className} />;
      case "Eye": return <Eye className={className} />;
      case "Star": return <Star className={className} />;
      default: return <Shield className={className} />;
    }
  };

  // Contact form state
  const [formData, setFormData] = useState<ContactFormData>({
    name: "",
    email: "",
    phone: "",
    destination: "",
    date: "",
    comments: ""
  });
  const [submitted, setSubmitted] = useState(false);

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      setFormData({ name: "", email: "", phone: "", destination: "", date: "", comments: "" });
    }, 5000);
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
      className="bg-[#fbfaf8]"
    >
      {/* Tall Cover Section (Like homepage initial presentation, single-slide, eye-catching text overlay on image) */}
      <div className="relative h-[480px] w-full flex items-center justify-center overflow-hidden bg-brand-charcoal select-none">
        <div className="absolute inset-0 z-0">
          <img 
            src="https://images.unsplash.com/photo-1526772662000-3f88f10405ff?w=1600&auto=format&fit=crop&q=80" 
            alt={isEs ? "Santuario Histórico" : "Historical Sanctuary"}
            className="w-full h-full object-cover opacity-40 animate-pulse"
            style={{ animationDuration: "12s" }}
            referrerPolicy="no-referrer"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#fbfaf8] via-black/45 to-black/20 z-10" />
        </div>

        <div className="relative z-20 max-w-4xl mx-auto text-center px-4 space-y-6">
          <button
            onClick={onBack}
            className="inline-flex items-center gap-2 text-xs font-bold text-white bg-black/45 backdrop-blur-md px-4 py-2 rounded-full hover:bg-brand-pink transition-all group cursor-pointer mb-2"
          >
            <ArrowLeft className="w-4 h-4 group-hover:-translate-x-0.5 transition-transform" />
            <span>{isEs ? "Volver al Inicio" : "Back to Home"}</span>
          </button>

          <span className="text-brand-orange text-xs sm:text-sm font-bold uppercase tracking-[0.3em] font-mono block">
            {isEs ? "SISARI TRAVEL PERÚ" : "SISARI TRAVEL PERU"}
          </span>
          
          <h1 className="font-display font-black text-4xl sm:text-5xl md:text-6xl text-white tracking-tight leading-none drop-shadow-md">
            {isEs ? "Nosotros" : "About Us"}
          </h1>
          
          <p className="text-gray-100 font-light text-base sm:text-lg max-w-2xl mx-auto leading-relaxed drop-shadow-sm">
            {isEs 
              ? "Desde Huamanga para el mundo: Diseñando experiencias con el corazón de los Andes y soporte tecnológico líder."
              : "From Huamanga to the world: Designing journeys with the spirit of the Andes and modern digital efficiency."}
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto py-16 px-4 sm:px-6 lg:px-8 space-y-20">
        
        {/* Who We Are & Foundation section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-6 text-left">
            <div className="inline-flex items-center gap-2 bg-brand-pink/5 text-brand-pink text-xs uppercase font-mono tracking-widest px-3 py-1.5 rounded-full font-black">
              <Compass className="w-3.5 h-3.5" />
              <span>{isEs ? "Nuestra Historia • Quiénes Somos" : "Our Heritage • Who We Are"}</span>
            </div>
            
            <h2 className="font-display font-extrabold text-3xl sm:text-4xl text-brand-charcoal tracking-tight">
              {isEs ? cmsContent.nosotrosHeadlineEs : cmsContent.nosotrosHeadlineEn}
            </h2>
            
            <p className="text-brand-charcoal/85 leading-relaxed font-light text-sm sm:text-base">
              {isEs ? cmsContent.nosotrosDescEs : cmsContent.nosotrosDescEn}
            </p>

            <div className="border-t border-brand-pink/10 pt-6 mt-6 grid grid-cols-2 gap-6">
              <div>
                <p className="text-[10px] uppercase font-bold text-neutral-400 tracking-wider font-mono">
                  {isEs ? "Época de Fundación" : "Founding Era"}
                </p>
                <p className="font-display font-extrabold text-2xl text-[#f58220] mt-0.5">
                  Ayacucho, 2014
                </p>
                <p className="text-xs text-brand-charcoal/60 mt-0.5 font-light">
                  {isEs ? "Más de una década tejiendo memorias" : "Over a decade stitching premium memories"}
                </p>
              </div>

              <div>
                <p className="text-[10px] uppercase font-bold text-neutral-400 tracking-wider font-mono">
                  {isEs ? "Registro Oficial" : "Official Registry"}
                </p>
                <p className="font-display font-extrabold text-2xl text-brand-pink mt-0.5">
                  DIRCETUR Cert.
                </p>
                <p className="text-xs text-brand-charcoal/60 mt-0.5 font-light">
                  {isEs ? "Licencia N° 140-2026-MINCETUR" : "Governing License N° 140-2026-MINCETUR"}
                </p>
              </div>
            </div>
          </div>

          <div className="relative rounded-3xl overflow-hidden shadow-xl aspect-video md:aspect-square bg-neutral-200">
            <img 
              src="https://images.unsplash.com/photo-1584551246679-0daf3d275d0f?w=800&auto=format&fit=crop&q=80" 
              alt={isEs ? "Paisaje Andino" : "Andean Landscape"}
              className="w-full h-full object-cover"
              referrerPolicy="no-referrer"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />
            
            {/* Float values highlight badge */}
            <div className="absolute bottom-6 left-6 right-6 bg-white/95 backdrop-blur-md p-6 rounded-2xl shadow-lg border border-brand-pink/10 text-left">
              <span className="text-[10px] font-mono tracking-widest text-[#f58220] uppercase font-extrabold">
                {isEs ? "VALOR AGRREGADO" : "UNIQUE COMMITTANCE"}
              </span>
              <p className="font-display font-extrabold text-[#2c2c2c] text-sm mt-1">
                {isEs ? cmsContent.valuePropTitleEs : cmsContent.valuePropTitleEn}
              </p>
              <p className="text-xs text-neutral-600 font-light mt-1.5 leading-relaxed">
                {isEs ? cmsContent.valuePropDescEs : cmsContent.valuePropDescEn}
              </p>
            </div>
          </div>
        </div>

        {/* Credentials and editable institutional logos */}
        <div className="space-y-6 pt-4">
          <div className="text-center max-w-xl mx-auto space-y-2">
            <span className="text-brand-pink font-bold font-mono tracking-widest text-[11px] uppercase block">
              {isEs ? "ACREDITACIONES Y MEMBRESÍAS" : "ACCREDITATIONS & TRUST SEALS"}
            </span>
            <h2 className="font-display font-extrabold text-2xl text-[#2c2c2c] tracking-tight">
              {isEs ? "Instituciones de las que somos Parte" : "Entities We Proudly Belong To"}
            </h2>
            <p className="text-xs text-brand-charcoal/60">
              {isEs 
                ? "Estamos suscritos de forma activa a los principales organismos promotores de la legalidad, calidad y sostenibilidad turística."
                : "We hold verified active licenses and partnerships with top peruvian and global tourism ministries."}
            </p>
          </div>

          {(() => {
            const certsToRender = (cmsContent.certifications || []).slice(0, 12);
            while (certsToRender.length < 12) {
              certsToRender.push({
                name: "Sisari Colaborador",
                logo: "https://images.unsplash.com/photo-1541963463532-d68292c34b19?w=300&auto=format&fit=crop&q=80",
                url: "https://unesco.org"
              });
            }
            const row1 = certsToRender.slice(0, 6);
            const row2 = certsToRender.slice(6, 12);

            return (
              <div className="space-y-6 pt-4">
                {/* Fila 1 con 6 logos */}
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-6">
                  {row1.map((cert, idx) => (
                    <a
                      key={`r1-${idx}`}
                      href={cert.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="bg-white border border-brand-pink/10 hover:border-brand-pink/30 hover:shadow-lg rounded-2xl p-4 flex items-center justify-center aspect-square transition-all group hover:-translate-y-1 cursor-pointer opacity-90 hover:opacity-100"
                      title={`${cert.name} - ${isEs ? "Página Institucional" : "Institutional Site"}`}
                      id={`nosotros-cert-r1-${idx}`}
                    >
                      <img
                        src={cert.logo}
                        alt={cert.name}
                        referrerPolicy="no-referrer"
                        className="max-h-[90%] max-w-[90%] object-contain filter group-hover:scale-110 transition-all duration-300"
                      />
                    </a>
                  ))}
                </div>

                {/* Fila 2 con 6 logos */}
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-6">
                  {row2.map((cert, idx) => (
                    <a
                      key={`r2-${idx}`}
                      href={cert.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="bg-white border border-brand-pink/10 hover:border-brand-pink/30 hover:shadow-lg rounded-2xl p-4 flex items-center justify-center aspect-square transition-all group hover:-translate-y-1 cursor-pointer opacity-90 hover:opacity-100"
                      title={`${cert.name} - ${isEs ? "Página Institucional" : "Institutional Site"}`}
                      id={`nosotros-cert-r2-${idx}`}
                    >
                      <img
                        src={cert.logo}
                        alt={cert.name}
                        referrerPolicy="no-referrer"
                        className="max-h-[90%] max-w-[90%] object-contain filter group-hover:scale-110 transition-all duration-300"
                      />
                    </a>
                  ))}
                </div>
              </div>
            );
          })()}
        </div>

        {/* Why Choose Us & Statistics (Confiabilidad, Puntualidad, Responsabilidad) */}
        <div className="bg-[#fbfaf8] rounded-3xl border border-brand-pink/10 p-8 sm:p-12 relative overflow-hidden">
          <div className="absolute -top-10 -right-10 w-40 h-40 bg-brand-pink/5 rounded-full blur-2xl pointer-events-none" />
          <div className="absolute -bottom-10 -left-10 w-40 h-40 bg-brand-orange/5 rounded-full blur-2xl pointer-events-none" />

          <div className="max-w-3xl mx-auto text-center space-y-4 mb-12">
            <span className="text-[#f58220] font-mono tracking-widest text-xs font-bold uppercase block">
              {isEs ? "¿POR QUÉ ELEGIRNOS?" : "WHY CHOOSE SISARI TRAVEL"}
            </span>
            <h2 className="font-display font-black text-3xl text-brand-charcoal tracking-tight">
              {isEs ? "Tres Compromisos Absolutos de Nuestro Servicio" : "Three Absolute Standards of Our Journeys"}
            </h2>
            <p className="text-xs sm:text-sm text-brand-charcoal/70 font-light leading-relaxed">
              {isEs 
                ? "Conducimos cada guiado bajo estrictos protocolos de atención para brindarte seguridad, tranquilidad y felicidad."
                : "We execute every single tour following rigid operation lines to translate into solid trust and joy."}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Confiabilidad */}
            <div className="bg-white rounded-3xl p-6 border border-brand-pink/10 shadow-xs space-y-4 text-left hover:border-brand-pink/30 hover:shadow-sm transition-all">
              <div className="w-12 h-12 rounded-2xl bg-neutral-100 text-brand-charcoal flex items-center justify-center">
                {renderLucideIcon(cmsContent.nosotrosValue1Icon || "Shield", "w-5 h-5 text-brand-charcoal")}
              </div>
              <h3 className="font-display font-extrabold text-brand-charcoal text-base">
                {isEs ? (cmsContent.nosotrosValue1TitleEs || "Confiabilidad") : (cmsContent.nosotrosValue1TitleEn || "Reliability")}
              </h3>
              <p className="text-xs text-brand-charcoal/70 font-light leading-relaxed">
                {isEs ? cmsContent.nosotrosValue1DescEs : cmsContent.nosotrosValue1DescEn}
              </p>
              <div className="text-[10px] font-mono font-bold text-brand-charcoal/50 pt-2 border-t border-neutral-100">
                {isEs ? "🛡️ Récord: 100% Garantizado" : "🛡️ Record: 100% Guaranteed"}
              </div>
            </div>

            {/* Puntualidad */}
            <div className="bg-white rounded-3xl p-6 border border-brand-pink/10 shadow-xs space-y-4 text-left hover:border-brand-pink/30 hover:shadow-sm transition-all">
              <div className="w-12 h-12 rounded-2xl bg-neutral-100 text-brand-charcoal flex items-center justify-center">
                {renderLucideIcon(cmsContent.nosotrosValue2Icon || "Clock", "w-5 h-5 text-brand-charcoal")}
              </div>
              <h3 className="font-display font-extrabold text-brand-charcoal text-base">
                {isEs ? (cmsContent.nosotrosValue2TitleEs || "Puntualidad") : (cmsContent.nosotrosValue2TitleEn || "Punctuality")}
              </h3>
              <p className="text-xs text-brand-charcoal/70 font-light leading-relaxed">
                {isEs ? cmsContent.nosotrosValue2DescEs : cmsContent.nosotrosValue2DescEn}
              </p>
              <div className="text-[10px] font-mono font-bold text-brand-charcoal/50 pt-2 border-t border-neutral-100">
                {isEs ? "🕒 Tasa: 99.4% Puntualidad" : "🕒 Rate: 99.4% Punctuality"}
              </div>
            </div>

            {/* Responsabilidad */}
            <div className="bg-white rounded-3xl p-6 border border-brand-pink/10 shadow-xs space-y-4 text-left hover:border-brand-pink/30 hover:shadow-sm transition-all">
              <div className="w-12 h-12 rounded-2xl bg-neutral-100 text-brand-charcoal flex items-center justify-center">
                {renderLucideIcon(cmsContent.nosotrosValue3Icon || "Award", "w-5 h-5 text-brand-charcoal")}
              </div>
              <h3 className="font-display font-extrabold text-brand-charcoal text-base">
                {isEs ? (cmsContent.nosotrosValue3TitleEs || "Responsabilidad") : (cmsContent.nosotrosValue3TitleEn || "Responsibility")}
              </h3>
              <p className="text-xs text-brand-charcoal/70 font-light leading-relaxed">
                {isEs ? cmsContent.nosotrosValue3DescEs : cmsContent.nosotrosValue3DescEn}
              </p>
              <div className="text-[10px] font-mono font-bold text-brand-charcoal/50 pt-2 border-t border-neutral-100">
                {isEs ? "🌱 Huella: Carbono Neutral" : "🌱 Footprint: Carbon Neutral"}
              </div>
            </div>
          </div>

          {/* INTERACTIVE COMPROMISO IMAGE BLOCK */}
          <div className="mt-12 max-w-5xl mx-auto rounded-3xl overflow-hidden relative shadow-xl border border-brand-pink/15 group aspect-[16/9] sm:aspect-[21/9]">
            <img 
              src="https://images.unsplash.com/photo-1526392060635-9d6019884377?w=1200&auto=format&fit=crop&q=80" 
              alt="Servicio de Compromiso Sisari" 
              referrerPolicy="no-referrer"
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-[6s]"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-brand-charcoal/80 via-transparent to-brand-charcoal/20" />
            
            <div className="absolute bottom-6 left-6 text-left">
              <span className="text-[10px] uppercase font-black text-brand-orange bg-white/95 px-2.5 py-1 rounded-full shadow">
                {isEs ? "🗺️ NORMAS DE COMPROMISO DE ATENCIÓN" : "🗺️ ATTENTION STANDARDS"}
              </span>
              <p className="text-white text-xs mt-1.5 font-light max-w-sm drop-shadow">
                {isEs 
                  ? "Toca o pasa el cursor sobre las señales parpadeantes para ver nuestro compromiso."
                  : "Hover or tap on our blinking radar hotspots for detailed guides."}
              </p>
            </div>

            {/* Hotspot 1: Confiabilidad */}
            <div className="absolute top-[30%] left-[25%] -translate-x-1/2 -translate-y-1/2 z-20">
              <button
                type="button"
                onMouseEnter={() => setActiveHotspot(1)}
                onMouseLeave={() => setActiveHotspot(null)}
                onClick={() => setActiveHotspot(activeHotspot === 1 ? null : 1)}
                className="relative flex items-center justify-center w-8 h-8 rounded-full bg-brand-pink text-white font-bold cursor-pointer focus:outline-none focus:ring-2 focus:ring-white scale-110 hover:scale-125 transition-transform"
              >
                <span className="absolute animate-ping inline-flex h-full w-full rounded-full bg-brand-pink/60 opacity-75" />
                <span className="relative text-xs">🛡️</span>
              </button>
              {activeHotspot === 1 && (
                <div className="absolute top-10 left-1/2 -translate-x-1/2 w-64 bg-white/95 backdrop-blur-md rounded-2xl p-4 shadow-xl border border-brand-pink/10 text-left text-xs z-30 animate-fade-in text-brand-charcoal">
                  <h4 className="font-display font-extrabold text-brand-pink text-xs uppercase mb-1">
                    {isEs ? "Confiabilidad Absoluta" : "Total Trustability"}
                  </h4>
                  <p className="font-light text-brand-charcoal/80 leading-relaxed">
                    {isEs 
                      ? "Garantía de guiado certificado por DIRCETUR, equipamiento de montaña de primer nivel y asistencia médica 24/7."
                      : "DIRCETUR-licensed native crew, pro trekking gear, and direct mountain support dispatch open 24/7."}
                  </p>
                </div>
              )}
            </div>

            {/* Hotspot 2: Puntualidad */}
            <div className="absolute top-[50%] left-[55%] -translate-x-1/2 -translate-y-1/2 z-20">
              <button
                type="button"
                onMouseEnter={() => setActiveHotspot(2)}
                onMouseLeave={() => setActiveHotspot(null)}
                onClick={() => setActiveHotspot(activeHotspot === 2 ? null : 2)}
                className="relative flex items-center justify-center w-8 h-8 rounded-full bg-brand-pink text-white font-bold cursor-pointer focus:outline-none focus:ring-2 focus:ring-white scale-110 hover:scale-125 transition-transform"
              >
                <span className="absolute animate-ping inline-flex h-full w-full rounded-full bg-brand-pink/60 opacity-75" />
                <span className="relative text-xs">🕒</span>
              </button>
              {activeHotspot === 2 && (
                <div className="absolute top-10 left-1/2 -translate-x-1/2 w-64 bg-white/95 backdrop-blur-md rounded-2xl p-4 shadow-xl border border-brand-pink/10 text-left text-xs z-30 animate-fade-in text-brand-charcoal">
                  <h4 className="font-display font-extrabold text-brand-pink text-xs uppercase mb-1">
                    {isEs ? "Puntualidad de Acero" : "Precise Timelines"}
                  </h4>
                  <p className="font-light text-brand-charcoal/80 leading-relaxed">
                    {isEs 
                      ? "Salimos a la hora exacta para aprovechar las mejores horas de sol en Millpu, Quinua y Vilcashuamán sin demoras."
                      : "We set out at the exact promised tick-second to maximize warm mountain sun hours over Millpu turquoise pools."}
                  </p>
                </div>
              )}
            </div>

            {/* Hotspot 3: Responsabilidad */}
            <div className="absolute top-[40%] left-[80%] -translate-x-1/2 -translate-y-1/2 z-20">
              <button
                type="button"
                onMouseEnter={() => setActiveHotspot(3)}
                onMouseLeave={() => setActiveHotspot(null)}
                onClick={() => setActiveHotspot(activeHotspot === 3 ? null : 3)}
                className="relative flex items-center justify-center w-8 h-8 rounded-full bg-brand-pink text-white font-bold cursor-pointer focus:outline-none focus:ring-2 focus:ring-white scale-110 hover:scale-125 transition-transform"
              >
                <span className="absolute animate-ping inline-flex h-full w-full rounded-full bg-brand-pink/60 opacity-75" />
                <span className="relative text-xs">🌱</span>
              </button>
              {activeHotspot === 3 && (
                <div className="absolute top-10 left-1/2 -translate-x-1/2 w-64 bg-white/95 backdrop-blur-md rounded-2xl p-4 shadow-xl border border-brand-pink/10 text-left text-xs z-30 animate-fade-in text-brand-charcoal">
                  <h4 className="font-display font-extrabold text-brand-pink text-xs uppercase mb-1">
                    {isEs ? "Sostenibilidad Local" : "Local Sustainability"}
                  </h4>
                  <p className="font-light text-brand-charcoal/80 leading-relaxed">
                    {isEs 
                      ? "Apoyo económico directo a las familias alfareras de Quinua y programas de reforestación de bosques nativos."
                      : "Direct economic royalties to pottery and ceramic families in Quinua, driving clean mountain reforestation."}
                  </p>
                </div>
              )}
            </div>
          </div>

          {/* Value Stats strip */}
          <div className="mt-12 grid grid-cols-2 sm:grid-cols-4 gap-6 text-center max-w-5xl mx-auto bg-white border border-brand-pink/5 p-8 rounded-2xl shadow-sm">
            <div>
              <p className="font-display font-black text-3xl text-brand-charcoal">9.8k+</p>
              <p className="text-[10px] uppercase font-bold text-brand-charcoal/50 leading-relaxed tracking-wider font-mono mt-0.5">Viajeros Contentos</p>
            </div>
            <div className="border-l border-brand-pink/15">
              <p className="font-display font-black text-3xl text-brand-charcoal">120+</p>
              <p className="text-[10px] uppercase font-bold text-brand-charcoal/50 leading-relaxed tracking-wider font-mono mt-0.5">Rutas Operadas</p>
            </div>
            <div className="border-l border-brand-pink/15">
              <p className="font-display font-black text-3xl text-brand-charcoal">10+ Años</p>
              <p className="text-[10px] uppercase font-bold text-brand-charcoal/50 leading-relaxed tracking-wider font-mono mt-0.5">De Trayectoria</p>
            </div>
            <div className="border-l border-brand-pink/15">
              <p className="font-display font-black text-3xl text-brand-charcoal">4.9/5</p>
              <p className="text-[10px] uppercase font-bold text-brand-charcoal/50 leading-relaxed tracking-wider font-mono mt-0.5">Puntuación TripAdvisor</p>
            </div>
          </div>
        </div>

        {/* Testimonials section */}
        <div className="space-y-8 pt-4">
          <div className="text-center max-w-xl mx-auto space-y-2">
            <span className="text-brand-pink font-bold font-mono tracking-widest text-[11px] uppercase block">
              {isEs ? "TESTIMONIOS DE VIAJEROS" : "TRAVELER REVIEWS"}
            </span>
            <h2 className="font-display font-extrabold text-2xl text-[#2c2c2c] tracking-tight">
              {isEs ? "Lo Que Dicen Nuestros Clientes" : "What Our Explorers Share"}
            </h2>
            <p className="text-xs text-brand-charcoal/60">
              {isEs 
                ? "Nuestra mayor garantía es el testimonio honesto de quienes recorren el Perú asombrándose a cada paso de nuestra mano."
                : "The primary guarantee of our journeys is the honest feedback of people crossing Peru safely."}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {TESTIMONIALS.slice(0, 3).map((test, index) => (
              <div 
                key={index}
                className="bg-white border border-brand-pink/5 hover:border-brand-pink/20 rounded-3xl p-6 shadow-sm transition-all flex flex-col h-full gap-4 relative"
              >
                <span className="absolute top-4 right-6 text-6xl text-brand-pink/10 font-serif font-bold pointer-events-none">“</span>
                <div className="flex gap-1 text-amber-500">
                  {[...Array(test.rating)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-amber-500" />
                  ))}
                </div>
                <p className="text-xs text-brand-charcoal/80 leading-relaxed font-light flex-grow">
                  "{test.comment}"
                </p>
                <div className="flex items-center gap-3 border-t border-brand-pink/15 pt-4 mt-auto">
                  {test.avatarSeed && (test.avatarSeed.startsWith("http") || test.avatarSeed.startsWith("data:image")) ? (
                    <img src={test.avatarSeed} alt={test.name} className="w-9 h-9 rounded-full object-cover border border-brand-pink/10" referrerPolicy="no-referrer" />
                  ) : (
                    <div className="w-9 h-9 rounded-full bg-brand-pink/15 text-brand-pink text-xs font-extrabold flex items-center justify-center font-display uppercase">
                      {test.avatarSeed ? test.avatarSeed.charAt(0) : test.name.charAt(0)}
                    </div>
                  )}
                  <div className="text-left">
                    <h5 className="font-display font-semibold text-xs text-brand-charcoal">{test.name}</h5>
                    <p className="text-[9px] text-[#f58220] font-bold uppercase tracking-wider">{test.role}</p>
                  </div>
                  <span className="text-[9px] text-brand-charcoal/50 font-mono ml-auto shrink-0">{test.date}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Representative Team (4 people) */}
        <div className="space-y-8 pt-4">
          <div className="text-center max-w-xl mx-auto space-y-2">
            <span className="text-brand-pink font-bold font-mono tracking-widest text-[11px] uppercase block">
              {isEs ? "NUESTRO EQUIPO RESPONSABLE" : "OUR KEY CAPTAINS"}
            </span>
            <h2 className="font-display font-extrabold text-2xl text-[#2c2c2c] tracking-tight">
              {isEs ? "El Corazón de Sisari Travel" : "The Core of Sisari Travel"}
            </h2>
            <p className="text-xs text-brand-charcoal/60">
              {isEs 
                ? "Conoce a las personas dedicadas a planificar, guiar e impulsar tu aventura con un compromiso de primer nivel."
                : "Get to know the leading crew in charge of your comfort and perfect high-altitude tours."}
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {cmsContent.teamMembers?.map((member, idx) => (
              <div
                key={idx}
                className="bg-white border border-brand-pink/10 rounded-3xl overflow-hidden shadow-sm flex flex-col group hover:shadow-md transition-all duration-300"
                id={`nosotros-team-${idx}`}
              >
                <div className="aspect-[3/4] max-h-80 overflow-hidden bg-neutral-100 relative">
                  <img
                    src={member.image}
                    alt={member.name}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute top-3 left-3 bg-white/95 backdrop-blur-md px-2.5 py-1 rounded-full text-[9px] uppercase font-black text-brand-charcoal tracking-wider">
                    {idx === 0 ? "💼 Gerencia" : idx === 1 ? "🎒 Operaciones" : idx === 2 ? "🛎️ At. Cliente" : "🛡️ Marketing"}
                  </div>
                </div>

                <div className="p-5 flex-grow flex flex-col justify-between gap-4">
                  <div className="space-y-1.5 text-left">
                    <h4 className="font-display font-extrabold text-[#2c2c2c] text-sm leading-none">{member.name}</h4>
                    <p className="text-[10px] text-brand-pink font-black uppercase tracking-wider leading-none">
                      {isEs ? member.titleEs : member.titleEn}
                    </p>
                    <p className="text-[11px] text-brand-charcoal/70 font-light leading-relaxed pt-1.5 border-t border-brand-pink/5 block">
                      {isEs ? member.descEs : member.descEn}
                    </p>
                  </div>
                  
                  <div className="pt-2 border-t border-brand-pink/5 flex items-center justify-between text-[9px] font-mono text-neutral-400 uppercase font-bold">
                    <span>{isEs ? "Perfil Certificado" : "Certified Member"}</span>
                    <span>★★★★★</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Embedded Contact Form (Required by user for the Nosotros page) */}
        <div id="nosotros-contacto" className="bg-white rounded-3xl border border-brand-pink/15 overflow-hidden shadow-lg grid grid-cols-1 lg:grid-cols-12">
          <div className="lg:col-span-5 bg-brand-charcoal text-white p-8 sm:p-12 flex flex-col justify-between relative">
            <div className="absolute inset-0 bg-cover bg-center opacity-10" style={{ backgroundImage: `url('https://images.unsplash.com/photo-1488646953014-85cb44e25828?w=600&auto=format&fit=crop&q=80')` }} />
            
            <div className="text-left space-y-6 relative">
              <span className="text-brand-orange text-xs font-mono font-bold tracking-widest uppercase">
                {isEs ? "CONTÁCTANOS" : "GET IN TOUCH"}
              </span>
              <h3 className="font-display font-black text-3xl tracking-tight leading-none text-white">
                {isEs ? "Inicia Tu Próxima Gran Aventura" : "Start Your Next Big Journey"}
              </h3>
              <p className="text-xs text-gray-300 font-light leading-relaxed">
                {isEs 
                  ? "Cuéntanos tus planes de viaje y un especialista de Sisari Travel diseñará el itinerario ideal para ti de forma personalizada."
                  : "Share your travel dreams and a customized travel concierge from Sisari Travel will plan your ideal vacation itinerary."}
              </p>
            </div>

            <div className="space-y-4 pt-8 relative border-t border-white/10 text-left">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-brand-pink/10 text-brand-pink flex items-center justify-center shrink-0">
                  <Phone className="w-4 h-4" />
                </div>
                <div>
                  <p className="text-[10px] text-neutral-400 font-mono uppercase font-bold leading-none">{isEs ? "Teléfono principal" : "Principal phone"}</p>
                  <a href={`tel:${cmsContent.phones?.[0]?.replace(/\s+/g, '') || '+51987654321'}`} className="text-xs text-white hover:text-brand-pink font-bold transition-colors">
                    {cmsContent.phones?.[0] || "+51 987 654 321"}
                  </a>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-brand-orange/10 text-brand-orange flex items-center justify-center shrink-0">
                  <Mail className="w-4 h-4" />
                </div>
                <div>
                  <p className="text-[10px] text-neutral-400 font-mono uppercase font-bold leading-none">{isEs ? "Escríbenos libremente" : "Free inquiries"}</p>
                  <a href={`mailto:${cmsContent.emails?.[0] || 'reservas@sisaritravel.pe'}`} className="text-xs text-white hover:text-brand-orange font-bold transition-colors">
                    {cmsContent.emails?.[0] || "reservas@sisaritravel.pe"}
                  </a>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-blue-500/10 text-blue-500 flex items-center justify-center shrink-0">
                  <MapPin className="w-4 h-4" />
                </div>
                <div>
                  <p className="text-[10px] text-neutral-400 font-mono uppercase font-bold leading-none">{isEs ? "Oficina Central" : "Headquarters"}</p>
                  <a href={cmsContent.addressMapUrl || "https://maps.google.com/?q=Jiron+Lima+140,+Ayacucho,+Peru"} target="_blank" rel="noopener noreferrer" className="text-xs text-white hover:text-blue-400 font-semibold transition-colors leading-relaxed block">
                    {isEs ? (cmsContent.addressEs || "Jirón Lima 140, 1ra Cuadra, Ayacucho") : (cmsContent.addressEn || "140 Jiron Lima, 1st Block, Ayacucho")}
                  </a>
                </div>
              </div>
            </div>
          </div>

          <div className="lg:col-span-7 p-8 sm:p-12 text-left bg-white">
            {submitted ? (
              <motion.div 
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="bg-emerald-50 border border-emerald-150 rounded-2xl p-6 text-center space-y-3"
              >
                <div className="w-12 h-12 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto text-xl font-extrabold">
                  ✓
                </div>
                <h4 className="font-display font-extrabold text-emerald-800 text-lg">
                  {isEs ? "¡Mensaje Enviado con Éxito!" : "Message Sent Successfully!"}
                </h4>
                <p className="text-xs text-emerald-700 leading-relaxed max-w-md mx-auto">
                  {isEs 
                    ? "Araceli Fernández y el equipo de asesores de Sisari Travel han registrado tu consulta. Nos comunicaremos contigo vía email o WhatsApp en las próximas 2 horas hábiles."
                    : "Araceli Fernández and our master guides have registered your message. An operations team representative will reply within 2 business hours."}
                </p>
                <button
                  type="button"
                  onClick={() => setSubmitted(false)}
                  className="mt-2 text-xs text-emerald-800 underline font-semibold hover:text-emerald-950 cursor-pointer"
                >
                  {isEs ? "Registrar otra consulta" : "Submit another request"}
                </button>
              </motion.div>
            ) : (
              <form onSubmit={handleFormSubmit} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <label className="text-[10px] font-mono uppercase tracking-widest text-neutral-500 font-bold block">{isEs ? "Nombre Completo *" : "Full Name *"}</label>
                    <input
                      type="text"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="w-full px-3 py-2 text-xs border border-neutral-300 rounded-lg outline-none focus:ring-1 focus:ring-brand-pink font-semibold focus:border-brand-pink"
                      placeholder={isEs ? "e.g. María Pérez" : "e.g. Mary Smith"}
                      required
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="text-[10px] font-mono uppercase tracking-widest text-neutral-500 font-bold block">{isEs ? "Celular / WhatsApp *" : "Cell / WhatsApp *"}</label>
                    <input
                      type="tel"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      className="w-full px-3 py-2 text-xs border border-neutral-300 rounded-lg outline-none focus:ring-1 focus:ring-brand-pink font-semibold focus:border-brand-pink"
                      placeholder="e.g. +51 987 654 321"
                      required
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <label className="text-[10px] font-mono uppercase tracking-widest text-neutral-500 font-bold block">{isEs ? "Correo Electrónico *" : "Email Address *"}</label>
                    <input
                      type="email"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="w-full px-3 py-2 text-xs border border-neutral-300 rounded-lg outline-none focus:ring-1 focus:ring-brand-pink font-semibold focus:border-brand-pink"
                      placeholder="e.g. maria@example.com"
                      required
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="text-[10px] font-mono uppercase tracking-widest text-neutral-500 font-bold block">{isEs ? "Destino o Paquete de Interés" : "Tour of Choice"}</label>
                    <input
                      type="text"
                      value={formData.destination}
                      onChange={(e) => setFormData({ ...formData, destination: e.target.value })}
                      className="w-full px-3 py-2 text-xs border border-neutral-300 rounded-lg outline-none focus:ring-1 focus:ring-brand-pink font-medium focus:border-brand-pink"
                      placeholder={isEs ? "e.g. Aguas Turquesas de Millpu" : "e.g. Millpu Turquoise Waters"}
                    />
                  </div>
                </div>

                <div className="space-y-1">
                  <label className="text-[10px] font-mono uppercase tracking-widest text-neutral-500 font-bold block">{isEs ? "Detalles del Viaje, Dudas o Ideas" : "Travel Ideas & Comments"}</label>
                  <textarea
                    rows={4}
                    value={formData.comments}
                    onChange={(e) => setFormData({ ...formData, comments: e.target.value })}
                    className="w-full px-3 py-2 text-xs border border-neutral-300 rounded-lg outline-none focus:ring-1 focus:ring-brand-pink font-medium focus:border-brand-pink"
                    placeholder={isEs ? "Ayúdanos a planificar tu aventura ideal con número de viajeros y preferencias..." : "Help us plan by sharing travelers count and custom requirements..."}
                    required
                  />
                </div>

                <div className="pt-2 flex justify-start">
                  <button
                    type="submit"
                    className="bg-brand-pink text-white hover:bg-brand-pink/95 font-black text-xs uppercase tracking-wider px-6 py-3.5 rounded-full shadow-md flex items-center gap-2 cursor-pointer active:scale-95 transition-all"
                  >
                    <Send className="w-3.5 h-3.5 shrink-0" />
                    <span>{isEs ? "Enviar Consulta Directa" : "Submit Direct Request"}</span>
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>

      </div>
    </motion.div>
  );
}
