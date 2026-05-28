import React, { useState } from "react";
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
  Send
} from "lucide-react";
import { DestinationPackage } from "../types";

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
}

export default function PackageLandingPage({ pkg, onBack, setBookingForm, scrollToId }: PackageLandingPageProps) {
  const [activeSubTab, setActiveSubTab] = useState<"itinerary" | "whatsIncluded" | "faqs">("itinerary");
  const [faqOpenIndex, setFaqOpenIndex] = useState<number | null>(0);

  // Auto scroll to booking form on the main home page or open a local booking section
  const handleStartBooking = () => {
    setBookingForm((prev: any) => ({
      ...prev,
      destination: pkg.title
    }));
    // Since page is inside SPA, we go back to index and scroll to contacto
    onBack();
    setTimeout(() => {
      const element = document.getElementById("contacto");
      if (element) {
        element.scrollIntoView({ behavior: "smooth" });
      }
    }, 200);
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
                  href={`https://wa.me/51999999999?text=${encodeURIComponent(pkg.whatsAppText)}`}
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

            {/* Banner Right: Giant Image Illustration */}
            <div className="lg:col-span-6 relative aspect-[4/3] lg:aspect-auto">
              <img 
                src={pkg.image} 
                alt={pkg.title}
                className="w-full h-full object-cover"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-t lg:bg-gradient-to-r from-brand-charcoal/10 to-transparent pointer-events-none" />
              
              {/* Highlight Card Floating */}
              <div className="absolute bottom-6 right-6 bg-white/90 backdrop-blur-md border border-brand-pink/20 p-4 rounded-2xl shadow-xl max-w-xs hidden sm:block">
                <p className="text-[10px] font-mono font-bold tracking-widest text-brand-orange uppercase">Sisari Experto local</p>
                <div className="flex items-center gap-2 mt-1.5">
                  <span className="text-xl">⭐</span>
                  <p className="text-xs font-semibold text-brand-charcoal">"Guiado bilingüe completo y transporte seguro puerta a puerta."</p>
                </div>
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

                        <div className="bg-white border border-brand-pink/5 rounded-2xl p-6 shadow-sm hover:shadow-md transition-shadow">
                          <span className="text-[10px] font-mono tracking-widest font-extrabold text-brand-orange uppercase">Día {dayItem.day} de Viaje</span>
                          <h3 className="font-display font-extrabold text-lg text-brand-charcoal mt-1 mb-3">
                            {dayItem.title}
                          </h3>
                          <p className="text-sm text-brand-charcoal/75 leading-relaxed font-light">
                            {dayItem.description}
                          </p>
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

          </div>

          {/* Sidebar CTA Card Right (4 cols) */}
          <div className="lg:col-span-4 flex flex-col gap-6">
            
            {/* Dynamic Interactive Booking Card */}
            <div className="sticky top-28 bg-white border border-brand-pink/15 rounded-3xl p-6 shadow-xl relative overflow-hidden">
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

              <p className="text-xs text-brand-charcoal/70 leading-relaxed font-light mb-6">
                Registra tus datos y un especialista asignado a la zona de <strong className="font-bold text-brand-pink">{pkg.location}</strong> se contactará contigo por teléfono / correo en un plazo máximo de 15 minutos para formalizar tu reserva e itinerario a medida.
              </p>

              <button 
                onClick={handleStartBooking}
                className="w-full bg-brand-pink hover:bg-brand-pink/95 text-white font-extrabold py-3.5 px-4 rounded-xl text-xs uppercase tracking-wider shadow-lg hover:shadow-brand-pink/20 transition-all flex items-center justify-center gap-2 cursor-pointer"
              >
                <span>¡Elegir y Registrar Datos!</span>
                <Send className="w-3.5 h-3.5" />
              </button>

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
