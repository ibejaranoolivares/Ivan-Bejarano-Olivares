import React, { useEffect } from "react";
import { motion } from "motion/react";
import { 
  Clock, 
  Compass, 
  Check, 
  Phone, 
  ArrowLeft, 
  ChevronRight,
  HelpCircle
} from "lucide-react";
import { DestinationPackage } from "../types";
import { TRANSLATIONS } from "../translations";

interface ZoneCatalogPageProps {
  zone: "local" | "national" | "international";
  packages: DestinationPackage[];
  onBack: () => void;
  onSelectPackage: (pkg: DestinationPackage) => void;
  language: "es" | "en";
}

export default function ZoneCatalogPage({ zone, packages, onBack, onSelectPackage, language }: ZoneCatalogPageProps) {
  // Automatically scroll to the top of the window when the page is loaded
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "instant" as any });
  }, [zone]);

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

  // Filter packages for this specific zone
  const zonePackages = packages.filter((p) => p.category === zone);

  // Helper metadata based on the zone and language
  const zoneMetadata = {
    local: {
      title: t.toursLocalesEnAyacucho,
      badge: language === "es" ? "Tours de un Día / Excursiones" : "One Day Tours / Excursions",
      desc: t.toursLocalesDesc,
      accentBg: "from-cyan-500/10 to-teal-500/10",
      accentText: "text-cyan-600",
      accentBorder: "border-cyan-100",
      heroImage: "https://images.unsplash.com/photo-1584551246679-0daf3d275d0f?w=1600&auto=format&fit=crop&q=80"
    },
    national: {
      title: t.rutasNacionalesIncreibles,
      badge: language === "es" ? "Viajes de Aventura y Mística" : "Adventure & Mystical Travel",
      desc: t.rutasNacionalesDesc,
      accentBg: "from-amber-500/10 to-orange-500/10",
      accentText: "text-amber-600",
      accentBorder: "border-amber-100",
      heroImage: "https://images.unsplash.com/photo-1531968455001-5c5277a9b136?w=1600&auto=format&fit=crop&q=80"
    },
    international: {
      title: t.aventurasInternacionales,
      badge: language === "es" ? "Viajes Exclusivos al Exterior" : "Exclusive Trips Abroad",
      desc: t.aventurasInternacionalesDesc,
      accentBg: "from-purple-500/10 to-pink-500/10",
      accentText: "text-purple-600",
      accentBorder: "border-purple-100",
      heroImage: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=1600&auto=format&fit=crop&q=80"
    }
  }[zone];

  return (
    <div className="min-h-screen bg-[#fafaf9] py-10 px-4">
      <div className="max-w-7xl mx-auto">
        
        {/* Breadcrumbs Navigation */}
        <div className="flex items-center gap-2 text-xs font-medium text-brand-charcoal/50 mb-6 font-mono">
          <button onClick={onBack} className="hover:text-brand-pink transition-colors cursor-pointer">
            {language === "es" ? "Inicio" : "Home"}
          </button>
          <ChevronRight className="w-3 h-3 text-brand-charcoal/30" />
          <span className="text-brand-charcoal/40">
            {language === "es" ? "Paquetes" : "Packages"}
          </span>
          <ChevronRight className="w-3 h-3 text-brand-charcoal/30" />
          <span className="text-brand-pink font-semibold">{zoneMetadata.title}</span>
        </div>

        {/* Back navigation button */}
        <button 
          onClick={onBack}
          className="inline-flex items-center gap-2 text-xs font-bold text-brand-charcoal/70 hover:text-brand-pink transition-all bg-white border border-brand-charcoal/10 rounded-full px-5 py-2.5 shadow-sm hover:shadow-md cursor-pointer mb-8"
        >
          <ArrowLeft className="w-4 h-4 text-brand-pink" />
          {language === "es" ? "Volver a la Página de Inicio" : "Back to Home Page"}
        </button>

        {/* Brand Banner Header Card */}
        <div className="relative rounded-3xl overflow-hidden border border-brand-pink/5 shadow-lg bg-white mb-12">
          <div className="absolute inset-0 z-0">
            <div className="absolute inset-0 bg-gradient-to-r from-brand-charcoal via-brand-charcoal/75 to-transparent z-10" />
            <img 
              src={zoneMetadata.heroImage} 
              alt={zoneMetadata.title} 
              className="w-full h-full object-cover select-none"
              referrerPolicy="no-referrer"
            />
          </div>
          
          <div className="relative z-20 max-w-3xl p-8 sm:p-12 text-white flex flex-col gap-4 text-left">
            <span className="inline-flex px-3 py-1 bg-white/10 backdrop-blur-md rounded-full text-xs font-extrabold tracking-widest uppercase w-fit text-brand-orange">
              {zoneMetadata.badge}
            </span>
            <h1 className="font-display font-extrabold text-3xl sm:text-5xl tracking-tight leading-tight text-white drop-shadow-sm text-left">
              {zoneMetadata.title}
            </h1>
            <p className="text-sm sm:text-base leading-relaxed text-white/80 font-light max-w-2xl drop-shadow-sm text-left">
              {zoneMetadata.desc}
            </p>
          </div>
        </div>

        {/* Header summary info */}
        <div className="flex flex-col md:flex-row items-center justify-between border-b border-brand-pink/10 pb-6 mb-8 gap-4 text-left">
          <div className="text-left">
            <h2 className="font-display font-extrabold text-[#2c2c2c] text-2xl text-left">
              {language === "es" ? "Explora todos los" : "Explore all"} {zonePackages.length} {language === "es" ? "destinos disponibles" : "available destinations"}
            </h2>
            <p className="text-xs text-brand-charcoal/50 mt-1 text-left">
              {language === "es" 
                ? "Todos nuestros paquetes incluyen transporte climatizado, guiado oficial especializado, entradas y asistencia 24 horas." 
                : "All our packages include premium air-conditioned transport, certified local guides, entry tickets, and 24/7 travel care."
              }
            </p>
          </div>
          <span className="bg-brand-pink/5 text-brand-pink font-mono text-xs font-bold px-4 py-2 rounded-xl border border-brand-pink/10 whitespace-nowrap">
            {language === "es" ? "Catálogo" : "Catalog"}: {zonePackages.length} {language === "es" ? "Paquetes de Sisari" : "Sisari Packages"}
          </span>
        </div>

        {/* Core dynamic responsive package catalog grid */}
        {zonePackages.length === 0 ? (
          <div className="text-center py-20 bg-white rounded-3xl border border-brand-pink/5 shadow-sm max-w-md mx-auto">
            <HelpCircle className="w-12 h-12 text-brand-orange/40 mx-auto mb-3" />
            <p className="font-display font-bold text-brand-charcoal">
              {language === "es" ? "No hay paquetes disponibles" : "No packages found"}
            </p>
            <p className="text-xs text-brand-charcoal/50 mt-1.5 px-6">
              {language === "es" 
                ? "Prueba añadir nuevos paquetes desde la Consola de Administración para verlos reflejados aquí."
                : "Please add customized travel packages from the Admin Console to view them inside this catalog."
              }
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {zonePackages.map((pkg) => (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.35 }}
                key={pkg.id}
                className="bg-white rounded-3xl overflow-hidden border border-brand-pink/5 hover:border-brand-pink/25 hover:shadow-xl transition-all flex flex-col h-full group"
              >
                <div 
                  onClick={() => onSelectPackage(pkg)}
                  className="relative overflow-hidden aspect-[4/3] cursor-pointer"
                >
                  <img 
                    src={pkg.image} 
                    alt={pkg.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute top-4 left-4 bg-brand-charcoal/80 backdrop-blur-md text-white font-semibold text-[10px] tracking-wider uppercase px-2.5 py-1 rounded-full">
                    {pkg.location}
                  </div>
                  {pkg.category === 'local' && (
                    <div className="absolute top-4 right-4 bg-brand-pink text-white font-extrabold text-[9px] tracking-widest uppercase px-2 py-1 rounded-md shadow-sm">
                      {t.favoritoLocal}
                    </div>
                  )}
                </div>

                <div className="p-6 flex flex-col flex-grow gap-4 text-left">
                  <div className="flex items-center justify-between text-xs text-brand-charcoal/60 font-medium w-full">
                    <span className="flex items-center gap-1">
                      <Clock className="w-3.5 h-3.5 text-brand-pink" />
                      {translateDuration(pkg.duration)}
                    </span>
                    <span className="flex items-center gap-1">
                      <Compass className="w-3.5 h-3.5 text-brand-orange" />
                      {t.dificultad}: {translateDifficulty(pkg.difficulty)}
                    </span>
                  </div>

                  <h4 
                    onClick={() => onSelectPackage(pkg)}
                    className="font-display font-bold text-xl text-brand-charcoal hover:text-brand-pink transition-colors leading-tight cursor-pointer text-left scroll-my-1"
                  >
                    {pkg.title}
                  </h4>

                  <p className="text-sm text-brand-charcoal/70 leading-relaxed font-light line-clamp-3 text-left">
                    {pkg.description}
                  </p>

                  {/* Highlights Bullet List */}
                  <div className="border-t border-brand-pink/5 pt-4 text-left w-full">
                    <p className="text-[10px] font-mono uppercase tracking-widest text-[#f58220] font-bold mb-2 text-left">
                      {t.loDestacadoViaje}
                    </p>
                    <ul className="text-xs text-brand-charcoal/80 flex flex-col gap-1 w-full text-left">
                      {pkg.highlights.slice(0, 3).map((hlt, idx) => (
                        <li key={idx} className="flex items-start gap-1.5 leading-tight text-left">
                          <Check className="w-3.5 h-3.5 text-brand-pink shrink-0 mt-0.5" />
                          <span>{hlt}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Price and Action Buttons */}
                  <div className="border-t border-brand-pink/5 pt-4 mt-auto flex items-center justify-between w-full">
                    <div className="text-left">
                      <p className="text-[10px] text-brand-charcoal/50 leading-none">{t.desdeTodoIncluido}</p>
                      <p className="text-xl font-display font-extrabold text-brand-charcoal mt-1 text-left">
                        {pkg.price}
                      </p>
                    </div>
                    
                    <div className="flex gap-2">
                      <a 
                        href={`https://wa.me/51999999999?text=${encodeURIComponent(pkg.whatsAppText)}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="bg-green-500 hover:bg-green-600 active:scale-95 text-white p-2.5 rounded-full flex items-center justify-center shadow-md transition-all cursor-pointer"
                        title={language === "es" ? "Consultar por WhatsApp" : "Inquire via WhatsApp"}
                      >
                        <Phone className="w-4 h-4 fill-white text-green-500" />
                      </a>
                      <button 
                        onClick={() => onSelectPackage(pkg)}
                        className="bg-brand-pink text-white hover:bg-brand-pink/90 active:scale-95 text-xs font-bold px-4 py-2.5 rounded-xl block shadow-sm transition-all cursor-pointer"
                      >
                        {t.verDetalle}
                      </button>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        )}

        {/* Back navigation button at bottom */}
        <div className="mt-16 text-center border-t border-brand-pink/10 pt-10">
          <button 
            onClick={onBack}
            className="inline-flex items-center gap-2 text-xs font-bold text-white hover:bg-brand-pink bg-brand-charcoal rounded-full px-8 py-3.5 shadow-md active:scale-95 transition-all cursor-pointer"
          >
            <ArrowLeft className="w-4 h-4 text-brand-orange" />
            {language === "es" ? "Volver a la Página Principal" : "Return to Main Page"}
          </button>
        </div>

      </div>
    </div>
  );
}
