import React from "react";
import { motion } from "motion/react";
import { ArrowLeft, Award, Shield, Target, Eye, ExternalLink, Users, Star, Compass } from "lucide-react";
import { CMSContent } from "../types";

interface NosotrosViewProps {
  cmsContent: CMSContent;
  language: "es" | "en";
  onBack: () => void;
  scrollToId: (id: string) => void;
}

export default function NosotrosView({ cmsContent, language, onBack, scrollToId }: NosotrosViewProps) {
  const isEs = language === "es";

  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -15 }}
      transition={{ duration: 0.3 }}
      className="bg-[#fbfaf8] py-8 px-4 sm:px-6 lg:px-8 border-t border-brand-pink/5"
    >
      <div className="max-w-7xl mx-auto space-y-16">
        
        {/* Back navigation header */}
        <div className="flex items-center justify-between">
          <button
            onClick={onBack}
            className="flex items-center gap-2 text-xs font-bold text-brand-charcoal hover:text-brand-pink transition-colors group cursor-pointer"
          >
            <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
            <span>{isEs ? "Volver al Inicio" : "Back to Home"}</span>
          </button>
          
          <div className="text-[10px] font-mono font-bold uppercase tracking-widest text-brand-pink bg-brand-pink/5 px-3 py-1 rounded-full">
            {isEs ? "Página Institucional" : "Institutional Page"}
          </div>
        </div>

        {/* Hero banner section */}
        <div className="relative rounded-3xl overflow-hidden bg-brand-charcoal text-white py-16 px-8 sm:px-12 md:py-24 shadow-2xl">
          <div className="absolute inset-0 bg-cover bg-center mix-blend-overlay opacity-30 pointer-events-none" style={{ backgroundImage: `url('https://images.unsplash.com/photo-1526772662000-3f88f10405ff?w=1200&auto=format&fit=crop&q=80')` }} />
          <div className="absolute inset-0 bg-gradient-to-r from-brand-charcoal via-brand-charcoal/90 to-transparent pointer-events-none" />
          
          <div className="relative max-w-2xl space-y-4">
            <span className="text-brand-orange text-xs sm:text-sm font-bold uppercase tracking-[0.25em] font-mono block">
              {isEs ? cmsContent.nosotrosSubtitleEs : cmsContent.nosotrosSubtitleEn}
            </span>
            <h1 className="font-display font-black text-3xl sm:text-4xl md:text-5xl tracking-tight leading-tight">
              {isEs ? cmsContent.nosotrosHeadlineEs : cmsContent.nosotrosHeadlineEn}
            </h1>
            <p className="text-gray-300 font-light text-sm sm:text-base leading-relaxed">
              {isEs ? cmsContent.nosotrosDescEs : cmsContent.nosotrosDescEn}
            </p>
          </div>
        </div>

        {/* Certifications and Trust seals (8 square spots) */}
        <div className="space-y-6">
          <div className="text-center max-w-xl mx-auto space-y-2">
            <span className="text-brand-pink font-bold font-mono tracking-widest text-[11px] uppercase block">
              {isEs ? "GARANTÍAS Y MARCAS REGISTRADAS" : "TRUST SEALS & ACCREDITATIONS"}
            </span>
            <h2 className="font-display font-extrabold text-2xl text-[#2c2c2c] tracking-tight">
              {isEs ? "Nuestras Certificaciones Oficiales" : "Our Official Certifications"}
            </h2>
            <p className="text-xs text-brand-charcoal/60">
              {isEs 
                ? "Cumplimos rigurosamente con los sellos de legalidad y fomento sostenible de marcas nacionales y provinciales."
                : "We thoroughly fulfill legality compliance and eco-friendly support marks validated by Peru."}
            </p>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-4">
            {cmsContent.certifications?.map((cert, idx) => (
              <a
                key={idx}
                href={cert.url}
                target="_blank"
                rel="noopener noreferrer"
                className="bg-white border border-brand-pink/10 hover:border-brand-pink/30 hover:shadow-md rounded-2xl p-4 flex flex-col items-center justify-center text-center gap-2 transition-all group relative cursor-pointer"
                title={`${cert.name} - ${isEs ? "Sitio Oficial" : "Official Site"}`}
                id={`cert-item-${idx}`}
              >
                <div className="w-14 h-14 rounded-xl overflow-hidden bg-neutral-50 flex items-center justify-center p-1 border border-neutral-100 group-hover:scale-105 transition-transform duration-200">
                  <img
                    src={cert.logo}
                    alt={cert.name}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover rounded-lg"
                  />
                </div>
                <div className="flex items-center gap-1">
                  <span className="text-[11px] font-bold text-brand-charcoal">{cert.name}</span>
                  <ExternalLink className="w-2.5 h-2.5 text-neutral-400 group-hover:text-brand-pink shrink-0" />
                </div>
              </a>
            ))}
          </div>
        </div>

        {/* Value Prop, Mission & Vision (Interactive Bento/Card grid) */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          
          {/* Propuesta de Valor Card */}
          <div className="bg-white border border-brand-pink/10 rounded-3xl p-8 flex flex-col justify-between shadow-sm relative overflow-hidden group hover:shadow-md transition-shadow">
            <div className="absolute top-0 right-0 p-8 opacity-5">
              <Compass className="w-24 h-24 text-brand-pink" />
            </div>
            <div className="space-y-4 relative">
              <div className="w-10 h-10 rounded-2xl bg-brand-pink/10 flex items-center justify-center text-brand-pink">
                <Star className="w-5 h-5 shrink-0" />
              </div>
              <h3 className="font-display font-extrabold text-lg text-brand-charcoal">
                {isEs ? cmsContent.valuePropTitleEs : cmsContent.valuePropTitleEn}
              </h3>
              <p className="text-xs sm:text-sm text-brand-charcoal/75 leading-relaxed font-light">
                {isEs ? cmsContent.valuePropDescEs : cmsContent.valuePropDescEn}
              </p>
            </div>
            <div className="text-[10px] font-mono font-black text-brand-pink tracking-widest uppercase pt-6">
              {isEs ? "VALOR GENERADO ✓" : "ADDED VALUE ✓"}
            </div>
          </div>

          {/* Misión Card */}
          <div className="bg-white border border-brand-pink/10 rounded-3xl p-8 flex flex-col justify-between shadow-sm relative overflow-hidden group hover:shadow-md transition-shadow">
            <div className="absolute top-0 right-0 p-8 opacity-5">
              <Target className="w-24 h-24 text-brand-orange" />
            </div>
            <div className="space-y-4 relative">
              <div className="w-10 h-10 rounded-2xl bg-brand-orange/10 flex items-center justify-center text-brand-orange">
                <Target className="w-5 h-5 shrink-0" />
              </div>
              <h3 className="font-display font-extrabold text-lg text-brand-charcoal">
                {isEs ? "Misión Institucional" : "Company Mission"}
              </h3>
              <p className="text-xs sm:text-sm text-brand-charcoal/75 leading-relaxed font-light">
                {isEs ? cmsContent.misionEs : cmsContent.misionEn}
              </p>
            </div>
            <div className="text-[10px] font-mono font-black text-brand-orange tracking-widest uppercase pt-6">
              {isEs ? "NUESTRO PROPÓSITO" : "OUR PURPOSE"}
            </div>
          </div>

          {/* Visión Card */}
          <div className="bg-white border border-brand-pink/10 rounded-3xl p-8 flex flex-col justify-between shadow-sm relative overflow-hidden group hover:shadow-md transition-shadow">
            <div className="absolute top-0 right-0 p-8 opacity-5">
              <Eye className="w-24 h-24 text-blue-500" />
            </div>
            <div className="space-y-4 relative">
              <div className="w-10 h-10 rounded-2xl bg-blue-500/10 flex items-center justify-center text-blue-500">
                <Eye className="w-5 h-5 shrink-0" />
              </div>
              <h3 className="font-display font-extrabold text-lg text-brand-charcoal">
                {isEs ? "Visión de Futuro" : "Future Vision"}
              </h3>
              <p className="text-xs sm:text-sm text-brand-charcoal/75 leading-relaxed font-light">
                {isEs ? cmsContent.visionEs : cmsContent.visionEn}
              </p>
            </div>
            <div className="text-[10px] font-mono font-black text-blue-500 tracking-widest uppercase pt-6">
              {isEs ? "HACIA DÓNDE VAMOS" : "WHERE WE LEAD"}
            </div>
          </div>

        </div>

        {/* Representative Team Section (4 members) */}
        <div className="space-y-8 pt-4">
          <div className="text-center max-w-xl mx-auto space-y-2">
            <span className="text-brand-pink font-bold font-mono tracking-widest text-[11px] uppercase block">
              {isEs ? "PROFESIONALES CERTIFICADOS" : "MEET THE FOUNDERS & GUIDES"}
            </span>
            <h2 className="font-display font-extrabold text-2xl text-[#2c2c2c] tracking-tight">
              {isEs ? "Líderes de Nuestra Organización" : "Leaders of Our Organization"}
            </h2>
            <p className="text-xs text-brand-charcoal/60">
              {isEs 
                ? "Personas sumamente comprometidas con la excelencia turística, con perfiles oficiales y credenciales vigentes."
                : "Highly committed professionals with certified credentials and immense respect for local cultures."}
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {cmsContent.teamMembers?.map((member, idx) => (
              <div
                key={idx}
                className="bg-white border border-brand-pink/10 rounded-3xl overflow-hidden shadow-sm flex flex-col group hover:shadow-md transition-all duration-300"
                id={`team-member-${idx}`}
              >
                {/* Photo frame with zoom */}
                <div className="h-56 overflow-hidden bg-neutral-100 relative">
                  <img
                    src={member.image}
                    alt={member.name}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute top-3 left-3 bg-white/95 backdrop-blur-md px-2.5 py-1 rounded-full text-[9px] uppercase font-black text-brand-charcoal tracking-wider">
                    {idx === 0 ? "🌿 Founder" : "🎒 Field Crew"}
                  </div>
                </div>

                {/* Info block */}
                <div className="p-5 flex-grow flex flex-col justify-between gap-4">
                  <div className="space-y-1.5 text-left">
                    <h4 className="font-display font-extrabold text-[#2c2c2c] text-sm leading-none">{member.name}</h4>
                    <p className="text-[11px] text-brand-pink font-black uppercase tracking-wider leading-none">
                      {isEs ? member.titleEs : member.titleEn}
                    </p>
                    <p className="text-[11px] text-brand-charcoal/70 font-light leading-relaxed pt-1.5 border-t border-brand-pink/5 block">
                      {isEs ? member.descEs : member.descEn}
                    </p>
                  </div>
                  
                  {/* Standard contact badge */}
                  <div className="pt-2 border-t border-brand-pink/5 flex items-center justify-between text-[9px] font-mono text-neutral-400 uppercase font-bold">
                    <span>{isEs ? "Perfil Verificado" : "Verified Profile"}</span>
                    <span>★★★★★</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Call to action card footer */}
        <div className="bg-brand-pink/5 rounded-3xl border border-brand-pink/10 p-8 text-center space-y-4">
          <h3 className="font-display font-bold text-xl text-brand-charcoal">
            {isEs ? "¿Deseas conversar directamente con nuestro equipo?" : "Want to connect directly with our crew?"}
          </h3>
          <p className="text-xs text-brand-charcoal/70 max-w-lg mx-auto">
            {isEs 
              ? "Tanto Araceli como nuestros guías oficiales de Millpu están listos para asistirte y diseñar una aventura para el recuerdo."
              : "Araceli and our leading wilderness experts are fully prepared to draft down an unforgettable journey."}
          </p>
          <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
            <button
              onClick={() => scrollToId("contacto")}
              className="bg-brand-pink text-white hover:bg-brand-pink/90 font-extrabold text-xs uppercase tracking-wider px-5 py-2.5 rounded-full cursor-pointer transition-colors"
            >
              {isEs ? "Contáctanos Ahora" : "Contact Us"}
            </button>
            <button
              onClick={onBack}
              className="border border-brand-charcoal text-brand-charcoal hover:bg-brand-charcoal hover:text-white font-extrabold text-xs uppercase tracking-wider px-5 py-2.5 rounded-full cursor-pointer transition-colors"
            >
              {isEs ? "Explorar Destinos" : "Explore Packages"}
            </button>
          </div>
        </div>

      </div>
    </motion.div>
  );
}
