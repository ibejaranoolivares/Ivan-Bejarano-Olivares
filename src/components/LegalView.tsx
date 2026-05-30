import React, { useState } from "react";
import { motion } from "motion/react";
import { 
  ArrowLeft, Sliders, Type, AlignLeft, Settings, Palette, Eye, 
  BookText, HelpCircle, FileText, CheckCircle, ShieldAlert,
  Dribbble, Printer, Sparkles, Send, Check
} from "lucide-react";
import { CMSContent, CRMLead } from "../types";

interface LegalViewProps {
  cmsContent: CMSContent;
  currentType: "privacy" | "terms" | "cookies" | "notice" | "complaints";
  language: "es" | "en";
  onBack: () => void;
  onUpdateCMSContent: (updated: CMSContent) => void;
  onAddCRMLead: (lead: CRMLead) => void;
}

export default function LegalView({
  cmsContent,
  currentType,
  language,
  onBack,
  onUpdateCMSContent,
  onAddCRMLead
}: LegalViewProps) {
  const isEs = language === "es";

  // Styles configuration form state or local updates
  const { letterSpacing, lineHeight, fontSizeOffset, legalFontFamily, themeBgColor, themeTextColor } = cmsContent;

  const [activeTab, setActiveTab] = useState<typeof currentType>(currentType);
  const [showStylePanel, setShowStylePanel] = useState(false);

  // Complaints form states
  const [complaintForm, setComplaintForm] = useState({
    fullName: "",
    documentType: "DNI",
    documentNumber: "",
    representative: "",
    email: "",
    phone: "",
    address: "",
    claimType: "Reclamo" as "Reclamo" | "Queja",
    amountClaimed: "",
    description: "",
    resolutionRequested: ""
  });
  const [formSubmittedTicket, setFormSubmittedTicket] = useState<string | null>(null);

  // Helper arrays for visual customization
  const bgThemes = [
    { name: isEs ? "Blanco Antiguo" : "Antique White", bg: "#fbfaf8", text: "#2c2c2c" },
    { name: isEs ? "Aura Rosa" : "Pink Aura", bg: "#fff7f9", text: "#3d1d2b" },
    { name: isEs ? "Platino Minimal" : "Platinum Light", bg: "#f5f6f8", text: "#1a1e26" },
    { name: isEs ? "Sepia Lector" : "Sepia Paper", bg: "#f4ede1", text: "#433422" },
    { name: isEs ? "Nocturno Antracita" : "Dark Charcoal", bg: "#1a1a1a", text: "#f5f5f5" },
    { name: isEs ? "Esmeralda Mate" : "Sage Green", bg: "#f0f4f1", text: "#2c3b30" },
  ];

  const fontFamilies = [
    { name: "Inter (Sans-serif)", value: "sans" as const, class: "font-sans" },
    { name: "Playfair (Elegant Serif)", value: "serif" as const, class: "font-serif" },
    { name: "JetBrains (Tech Mono)", value: "mono" as const, class: "font-mono" },
  ];

  const letterSpacings = [
    { name: isEs ? "Normal" : "Normal", value: "normal" as const, class: "tracking-normal" },
    { name: isEs ? "Ancho" : "Wide", value: "wide" as const, class: "tracking-wide" },
    { name: isEs ? "Expandido" : "Widest", value: "widest" as const, class: "tracking-widest" },
  ];

  const lineHeights = [
    { name: isEs ? "Estándar" : "Standard", value: "normal" as const, class: "leading-normal" },
    { name: isEs ? "Relajado" : "Relaxed", value: "relaxed" as const, class: "leading-relaxed" },
    { name: isEs ? "Holgado" : "Loose", value: "loose" as const, class: "leading-loose" },
  ];

  const updateStyling = (key: string, value: any) => {
    onUpdateCMSContent({
      ...cmsContent,
      [key]: value
    });
  };

  const getPageTitle = (type: typeof activeTab) => {
    switch (type) {
      case "privacy":
        return isEs ? "Política de Privacidad" : "Privacy Policy";
      case "terms":
        return isEs ? "Términos y Condiciones" : "Terms & Conditions";
      case "cookies":
        return isEs ? "Política de Cookies" : "Cookie Policy";
      case "notice":
        return isEs ? "Aviso Legal de Operación" : "Legal Terms & Licensing";
      case "complaints":
        return isEs ? "Libro de Reclamaciones Virtual" : "Virtual Claims Logbook";
    }
  };

  const getPageContent = (type: typeof activeTab) => {
    switch (type) {
      case "privacy":
        return isEs ? cmsContent.legalPrivacyEs : cmsContent.legalPrivacyEn;
      case "terms":
        return isEs ? cmsContent.legalTermsEs : cmsContent.legalTermsEn;
      case "cookies":
        return isEs ? cmsContent.legalCookiesEs : cmsContent.legalCookiesEn;
      case "notice":
        return isEs ? cmsContent.legalNoticeEs : cmsContent.legalNoticeEn;
      case "complaints":
        return isEs ? cmsContent.legalComplaintsEs : cmsContent.legalComplaintsEn;
    }
  };

  const handleComplaintSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const ticketId = "REC-" + Math.floor(1000 + Math.random() * 9000);
    
    // Create lead entry
    const newLead: CRMLead = {
      id: "lead-" + Date.now(),
      source: "Formulario de Reserva",
      name: complaintForm.fullName,
      email: complaintForm.email,
      phone: complaintForm.phone,
      destination: `RECLAMO: ${complaintForm.claimType}`,
      comments: `${complaintForm.documentType} N° ${complaintForm.documentNumber}.\nDirección: ${complaintForm.address}.\nTens-Id: ${ticketId}.\nMonto reclamado: S/ ${complaintForm.amountClaimed || "0.00"}.\n\nDescripción del hecho:\n${complaintForm.description}\n\nPedido del cliente:\n${complaintForm.resolutionRequested}`,
      dateCreated: new Date().toLocaleDateString("es-PE"),
      status: "Nuevo"
    };

    onAddCRMLead(newLead);
    setFormSubmittedTicket(ticketId);
  };

  // Convert font variables to CSS classes
  const fontClass = fontFamilies.find(f => f.value === legalFontFamily)?.class || "font-sans";
  const letterSpacingClass = letterSpacings.find(l => l.value === letterSpacing)?.class || "tracking-normal";
  const lineHeightClass = lineHeights.find(lh => lh.value === lineHeight)?.class || "leading-relaxed";

  return (
    <div className="bg-[#fbfaf8] py-8 px-4 sm:px-6 lg:px-8 border-t border-brand-pink/5">
      <div className="max-w-7xl mx-auto space-y-10">
        
        {/* Navigation top bar */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <button
            onClick={onBack}
            className="flex items-center gap-2 text-xs font-bold text-brand-charcoal hover:text-brand-pink transition-colors group cursor-pointer"
          >
            <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
            <span>{isEs ? "Volver al Inicio" : "Back to Home"}</span>
          </button>

          {/* Quick-switch between legal links */}
          <div className="flex flex-wrap items-center gap-1 bg-white border border-brand-pink/10 p-1.5 rounded-2xl w-full sm:w-auto">
            {(["privacy", "terms", "cookies", "notice", "complaints"] as const).map((type) => (
              <button
                key={type}
                onClick={() => {
                  setActiveTab(type);
                  setFormSubmittedTicket(null);
                }}
                className={`flex items-center gap-1 px-3 py-2 rounded-xl text-[10px] uppercase tracking-wider font-extrabold cursor-pointer transition-all ${
                  activeTab === type
                    ? "bg-brand-pink text-white shadow-sm"
                    : "text-brand-charcoal/70 hover:bg-brand-pink/5"
                }`}
              >
                {type === "complaints" && <BookText className="w-3.5 h-3.5 shrink-0" />}
                <span>
                  {type === "privacy" && (isEs ? "Privacidad" : "Privacy")}
                  {type === "terms" && (isEs ? "Términos" : "Terms")}
                  {type === "cookies" && (isEs ? "Cookies" : "Cookies")}
                  {type === "notice" && (isEs ? "Aviso Legal" : "Notice")}
                  {type === "complaints" && (isEs ? "Reclamaciones" : "Complaints Book")}
                </span>
              </button>
            ))}
          </div>

          {/* Settings Customizer trigger */}
          <button
            onClick={() => setShowStylePanel(!showStylePanel)}
            className={`flex items-center gap-1.5 px-3 py-2 rounded-xl text-[11px] font-extrabold border transition-all cursor-pointer ${
              showStylePanel
                ? "bg-brand-charcoal border-brand-charcoal text-white"
                : "bg-white border-brand-pink/10 hover:bg-neutral-50 text-brand-charcoal"
            }`}
          >
            <Sliders className="w-3.5 h-3.5 shrink-0 text-brand-pink" />
            <span>{isEs ? "Ajustar Tipografía y Colores" : "Font & Background Builder"}</span>
          </button>
        </div>

        {/* STYLE PANEL DRAWER */}
        {showStylePanel && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white border-2 border-brand-pink/20 rounded-3xl p-6 shadow-md grid grid-cols-1 md:grid-cols-4 gap-6 text-left"
          >
            {/* Typo select */}
            <div className="space-y-2">
              <label className="text-[11px] font-black uppercase tracking-wider text-neutral-600 flex items-center gap-1">
                <Type className="w-3.5 h-3.5 text-brand-pink" />
                {isEs ? "Fuente Tipográfica" : "Typography Style"}
              </label>
              <div className="flex flex-col gap-1.5">
                {fontFamilies.map((f) => (
                  <button
                    key={f.value}
                    onClick={() => updateStyling("legalFontFamily", f.value)}
                    className={`px-3 py-2 rounded-xl text-xs text-left font-bold border transition-colors ${
                      legalFontFamily === f.value
                        ? "bg-brand-pink/10 border-brand-pink text-brand-pink"
                        : "bg-neutral-50/50 border-neutral-150 hover:bg-neutral-50 text-neutral-700"
                    }`}
                  >
                    {f.name}
                  </button>
                ))}
              </div>
            </div>

            {/* Letter spacing & line speed */}
            <div className="space-y-4">
              <div className="space-y-1.5">
                <label className="text-[11px] font-black uppercase tracking-wider text-neutral-600 flex items-center gap-1">
                  <AlignLeft className="w-3.5 h-3.5 text-brand-orange" />
                  {isEs ? "Interlineado Vertical" : "Line Height"}
                </label>
                <div className="grid grid-cols-3 gap-1">
                  {lineHeights.map((lh) => (
                    <button
                      key={lh.value}
                      onClick={() => updateStyling("lineHeight", lh.value)}
                      className={`py-1.5 rounded-lg text-[10px] font-extrabold border transition-colors ${
                        lineHeight === lh.value
                          ? "bg-brand-pink/10 border-brand-pink text-brand-pink"
                          : "bg-[#fbfaf8] hover:bg-neutral-50"
                      }`}
                    >
                      {lh.name}
                    </button>
                  ))}
                </div>
              </div>

              <div className="space-y-1.5">
                <label className="text-[11px] font-black uppercase tracking-wider text-neutral-600 flex items-center gap-1">
                  <AlignLeft className="w-3.5 h-3.5 text-neutral-400" />
                  {isEs ? "Espaciado de Letras" : "Letter Spacing"}
                </label>
                <div className="grid grid-cols-3 gap-1">
                  {letterSpacings.map((l) => (
                    <button
                      key={l.value}
                      onClick={() => updateStyling("letterSpacing", l.value)}
                      className={`py-1.5 rounded-lg text-[10px] font-extrabold border transition-colors ${
                        letterSpacing === l.value
                          ? "bg-brand-pink/10 border-brand-pink text-brand-pink"
                          : "bg-[#fbfaf8] hover:bg-neutral-50"
                      }`}
                    >
                      {l.name}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Font Size offset */}
            <div className="space-y-2">
              <label className="text-[11px] font-black uppercase tracking-wider text-neutral-600 block">
                {isEs ? `Tamaño de Letra (${fontSizeOffset >= 0 ? "+" : ""}${fontSizeOffset}px)` : `Font Size Shift (${fontSizeOffset >= 0 ? "+" : ""}${fontSizeOffset}px)`}
              </label>
              <div className="flex items-center gap-3 py-2">
                <button
                  onClick={() => updateStyling("fontSizeOffset", Math.max(-4, fontSizeOffset - 1))}
                  className="w-10 h-10 rounded-full border border-neutral-200 bg-neutral-50 flex items-center justify-center font-black hover:bg-neutral-100 text-sm"
                  title="Smaller font size"
                >
                  A-
                </button>
                
                {/* Reset button slider representation */}
                <div className="flex-grow h-1.5 rounded-full bg-neutral-100 relative">
                  <div
                    className="absolute top-1/2 -translate-y-1/2 w-4.5 h-4.5 rounded-full bg-brand-pink border border-white shadow-md"
                    style={{ left: `${((fontSizeOffset + 4) / 12) * 85}%` }}
                  />
                </div>

                <button
                  onClick={() => updateStyling("fontSizeOffset", Math.min(8, fontSizeOffset + 1))}
                  className="w-10 h-10 rounded-full border border-neutral-200 bg-neutral-50 flex items-center justify-center font-black hover:bg-neutral-100 text-sm"
                  title="Larger font size"
                >
                  A+
                </button>
              </div>

              <div className="text-[9px] text-[#a0a0a0] font-light italic">
                {isEs ? "(Afecta de forma inmediata a textos de acuerdos)" : "(Affects live agreement rendering directly)"}
              </div>
            </div>

            {/* Background presets */}
            <div className="space-y-2">
              <label className="text-[11px] font-black uppercase tracking-wider text-neutral-600 flex items-center gap-1">
                <Palette className="w-3.5 h-3.5 text-blue-500" />
                {isEs ? "Texturas de Fondo" : "Visual Canvas Skin"}
              </label>
              
              <div className="grid grid-cols-2 gap-2">
                {bgThemes.map((bTheme, index) => (
                  <button
                    key={index}
                    onClick={() => {
                      updateStyling("themeBgColor", bTheme.bg);
                      updateStyling("themeTextColor", bTheme.text);
                    }}
                    className="px-2.5 py-1.5 rounded-xl text-[10px] font-semibold border text-left flex items-center justify-between transition-colors hover:border-brand-pink"
                    style={{ backgroundColor: bTheme.bg, color: bTheme.text }}
                  >
                    <span>{bTheme.name}</span>
                    {themeBgColor === bTheme.bg && <span className="text-[9px] text-brand-pink">●</span>}
                  </button>
                ))}
              </div>
            </div>

          </motion.div>
        )}

        {/* MAIN BODY AREA (Layout adapts based on selected bgTheme) */}
        <div
          className="rounded-3xl border border-brand-pink/10 shadow-lg min-h-[500px] overflow-hidden flex flex-col md:flex-row items-stretch"
          style={{ backgroundColor: themeBgColor, color: themeTextColor }}
        >
          
          {/* Side quick indicator */}
          <div className="w-full md:w-3/12 border-b md:border-b-0 md:border-r border-brand-pink/5 p-8 flex flex-col justify-between gap-6 bg-black/5">
            <div className="space-y-4 text-left">
              <span className="w-10 h-10 rounded-2xl bg-brand-pink/10 text-brand-pink flex items-center justify-center font-bold text-lg">
                📋
              </span>
              <h3 className="font-display font-black text-lg uppercase tracking-tight leading-none text-[#e12d8a]">
                Ceci Legal
              </h3>
              <p className="text-[11px] opacity-75 font-light leading-relaxed">
                {isEs 
                  ? "Este acuerdo es vinculante y rige los compromisos contractuales de viaje."
                  : "These terms form operational protocols to secure sustainable activities."}
              </p>
            </div>

            {/* Micro assurance labels */}
            <div className="space-y-1 text-left text-[9px] font-mono opacity-50 uppercase font-bold">
              <p>✓ REGISTRO DIRCETUR 2026</p>
              <p>✓ GARANTÍA INDECOPI PERÚ</p>
            </div>
          </div>

          {/* Core reading details */}
          <div className="w-full md:w-9/12 p-6 sm:p-10 font-sans text-left flex flex-col justify-between gap-8">
            
            <div className="space-y-6">
              {/* Header Title */}
              <div className="border-b border-brand-pink/10 pb-4">
                <h2 className="font-display font-extrabold text-2xl tracking-normal">
                  {getPageTitle(activeTab)}
                </h2>
              </div>

              {/* Dynamic Styled Copy Reader */}
              {activeTab !== "complaints" ? (
                <div
                  className={`${fontClass} ${letterSpacingClass} ${lineHeightClass}`}
                  style={{ fontSize: `${14 + fontSizeOffset}px` }}
                >
                  <div className="whitespace-pre-line text-justify font-light opacity-95">
                    {getPageContent(activeTab)}
                  </div>
                </div>
              ) : (
                /* INTERACTIVE VIRTUAL COMPLAINTS BOOK FORM */
                <div className="space-y-6">
                  
                  {/* Explanatory introduction text from general CMS */}
                  <div className="whitespace-pre-line text-xs font-light tracking-wide leading-relaxed p-4 bg-brand-pink/5 rounded-2xl border border-brand-pink/10 text-justify">
                    {getPageContent("complaints")}
                  </div>

                  {!formSubmittedTicket ? (
                    <form onSubmit={handleComplaintSubmit} className="space-y-4 text-xs font-semibold text-brand-charcoal">
                      <div className="text-[10px] font-mono tracking-widest text-[#e12d8a] uppercase border-b border-brand-pink/5 pb-1 font-extrabold block">
                        {isEs ? "1. IDENTIFICACIÓN DEL CONSUMIDOR RECLAMANTE" : "1. IDENTIFICATION OF THE RECLAIMER"}
                      </div>
                      
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div className="space-y-1">
                          <label className="block text-neutral-600">{isEs ? "Nombre Completo *" : "Full Name *"}</label>
                          <input
                            type="text"
                            value={complaintForm.fullName}
                            onChange={(e) => setComplaintForm({ ...complaintForm, fullName: e.target.value })}
                            className="w-full px-3 py-2 border border-neutral-300 rounded-xl bg-white outline-none focus:ring-1 focus:ring-brand-pink text-left font-bold"
                            required
                          />
                        </div>

                        <div className="grid grid-cols-3 gap-2">
                          <div className="space-y-1">
                            <label className="block text-neutral-600">{isEs ? "Doc. *" : "Doc. *"}</label>
                            <select
                              value={complaintForm.documentType}
                              onChange={(e) => setComplaintForm({ ...complaintForm, documentType: e.target.value })}
                              className="w-full px-2 py-2 border border-neutral-300 rounded-xl bg-white outline-none"
                            >
                              <option value="DNI">DNI</option>
                              <option value="Pasaporte">PAS</option>
                              <option value="CE">C.E.</option>
                            </select>
                          </div>
                          <div className="col-span-2 space-y-1">
                            <label className="block text-neutral-600">{isEs ? "Número *" : "Number *"}</label>
                            <input
                              type="text"
                              value={complaintForm.documentNumber}
                              onChange={(e) => setComplaintForm({ ...complaintForm, documentNumber: e.target.value })}
                              className="w-full px-3 py-2 border border-neutral-300 rounded-xl bg-white outline-none font-bold"
                              required
                            />
                          </div>
                        </div>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                        <div className="space-y-1">
                          <label className="block text-neutral-600">{isEs ? "Email de Contacto *" : "Email *"}</label>
                          <input
                            type="email"
                            value={complaintForm.email}
                            onChange={(e) => setComplaintForm({ ...complaintForm, email: e.target.value })}
                            className="w-full px-3 py-2 border border-neutral-300 rounded-xl bg-white outline-none font-bold text-left"
                            required
                          />
                        </div>
                        <div className="space-y-1">
                          <label className="block text-neutral-600">{isEs ? "Celular / Teléfono *" : "Cell Number *"}</label>
                          <input
                            type="tel"
                            value={complaintForm.phone}
                            onChange={(e) => setComplaintForm({ ...complaintForm, phone: e.target.value })}
                            className="w-full px-3 py-2 border border-neutral-300 rounded-xl bg-white outline-none font-bold"
                            required
                          />
                        </div>
                        <div className="space-y-1">
                          <label className="block text-neutral-600">{isEs ? "Domicilio / Dirección *" : "Address *"}</label>
                          <input
                            type="text"
                            value={complaintForm.address}
                            onChange={(e) => setComplaintForm({ ...complaintForm, address: e.target.value })}
                            className="w-full px-3 py-2 border border-neutral-300 rounded-xl bg-white outline-none inline-block text-left font-bold"
                            required
                          />
                        </div>
                      </div>

                      <div className="text-[10px] font-mono tracking-widest text-brand-orange uppercase border-b border-brand-pink/5 pt-2 pb-1 font-extrabold block">
                        {isEs ? "2. DETALLE DE LA RECLAMACIÓN Y BIEN CONTRATADO" : "2. CLAIM DESCRIPTION & TRANSFERRED VALUE"}
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                        <div className="space-y-1">
                          <label className="block text-neutral-600">{isEs ? "Tipo de Incidencia *" : "Incident Type *"}</label>
                          <div className="flex gap-2">
                            <button
                              type="button"
                              onClick={() => setComplaintForm({ ...complaintForm, claimType: "Reclamo" })}
                              className={`flex-grow py-2 rounded-xl text-center font-bold border transition-all ${
                                complaintForm.claimType === "Reclamo"
                                  ? "bg-brand-orange text-white border-brand-orange"
                                  : "bg-white border-neutral-300 hover:bg-neutral-50"
                              }`}
                            >
                              {isEs ? "Reclamo" : "Claim"}
                            </button>
                            <button
                              type="button"
                              onClick={() => setComplaintForm({ ...complaintForm, claimType: "Queja" })}
                              className={`flex-grow py-2 rounded-xl text-center font-bold border transition-all ${
                                complaintForm.claimType === "Queja"
                                  ? "bg-brand-pink text-white border-brand-pink"
                                  : "bg-white border-neutral-300 hover:bg-neutral-50"
                              }`}
                            >
                              {isEs ? "Queja" : "Complaint"}
                            </button>
                          </div>
                        </div>

                        <div className="col-span-2 space-y-1">
                          <label className="block text-neutral-600">{isEs ? "Monto del Bien Turístico Reclamado (S/) *" : "Claimed Amount (S/) *"}</label>
                          <input
                            type="number"
                            value={complaintForm.amountClaimed}
                            onChange={(e) => setComplaintForm({ ...complaintForm, amountClaimed: e.target.value })}
                            placeholder="e.g. 150.00"
                            className="w-full px-3 py-2 border border-neutral-300 rounded-xl bg-white outline-none font-bold"
                            required
                          />
                        </div>
                      </div>

                      <div className="space-y-1">
                        <label className="block text-neutral-600">
                          {isEs ? "Detalle Técnico del Hecho (Explique lo sucedido) *" : "Detailed technical description of events *"}
                        </label>
                        <textarea
                          rows={4}
                          value={complaintForm.description}
                          onChange={(e) => setComplaintForm({ ...complaintForm, description: e.target.value })}
                          className="w-full px-3 py-2 border border-neutral-300 rounded-xl bg-white outline-none text-left font-bold text-xs"
                          placeholder={isEs ? "Escriba detalladamente fechas, guías y reservas afectadas..." : "Write details..."}
                          required
                        />
                      </div>

                      <div className="space-y-1">
                        <label className="block text-neutral-600">
                          {isEs ? "Pedido Concreto del Consumidor (Qué solicita) *" : "Concrete request (Resolution asked) *"}
                        </label>
                        <textarea
                          rows={3}
                          value={complaintForm.resolutionRequested}
                          onChange={(e) => setComplaintForm({ ...complaintForm, resolutionRequested: e.target.value })}
                          className="w-full px-3 py-2 border border-neutral-300 rounded-xl bg-white outline-none text-left font-medium text-xs"
                          placeholder={isEs ? "e.g. Reembolso total de la reserva, reprogramación..." : "Requested action..."}
                          required
                        />
                      </div>

                      <div className="pt-2 flex justify-end">
                        <button
                          type="submit"
                          className="bg-brand-charcoal text-white hover:bg-black font-extrabold px-6 py-3 rounded-2xl cursor-pointer flex items-center gap-1.5 active:scale-95 transition-all text-xs uppercase tracking-wider"
                        >
                          <Send className="w-3.5 h-3.5 shrink-0" />
                          <span>{isEs ? "Registrar Reclamación Oficial" : "Register Formal Claim"}</span>
                        </button>
                      </div>

                    </form>
                  ) : (
                    /* COMPLAINT SUBMITTED TICKET PREVIEW */
                    <motion.div
                      initial={{ scale: 0.95, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      className="bg-neutral-800 text-white rounded-3xl p-6 sm:p-8 space-y-6 relative border border-brand-orange/30 text-left"
                    >
                      <div className="flex items-center gap-2 text-brand-orange">
                        <CheckCircle className="w-6 h-6 shrink-0" />
                        <h4 className="font-display font-extrabold text-lg">
                          {isEs ? "¡Reclamación Registrada con Éxito!" : "Claim Logged Successfully!"}
                        </h4>
                      </div>

                      <div className="space-y-2 text-xs border-y border-white/10 py-4 font-mono">
                        <p><span className="text-gray-400">{isEs ? "Número de Ticket:" : "Ticket Reference:"}</span> <span className="text-white font-bold text-sm bg-neutral-900 px-2 py-0.5 rounded border border-white/5">{formSubmittedTicket}</span></p>
                        <p><span className="text-gray-400">{isEs ? "Reclamante:" : "Reclaimer:"}</span> <span className="text-white font-bold">{complaintForm.fullName}</span></p>
                        <p><span className="text-gray-400">{isEs ? "Tipo de Acción:" : "Claim Category:"}</span> <span className="text-brand-pink font-bold">{complaintForm.claimType}</span></p>
                        <p><span className="text-gray-400">{isEs ? "Monto en Controversia:" : "Disputed Amount:"}</span> <span className="text-brand-orange font-bold">S/ {complaintForm.amountClaimed}</span></p>
                        <p><span className="text-gray-400">{isEs ? "Fecha de Presentación:" : "Timestamp:"}</span> <span className="text-white font-bold">{new Date().toLocaleString("es-PE")}</span></p>
                      </div>

                      <div className="bg-neutral-900 rounded-2xl p-4 text-[11px] text-gray-300 font-light leading-relaxed space-y-2">
                        <p className="font-bold text-white text-xs">
                          {isEs ? "Próximos pasos legales de conformidad con INDECOPI:" : "Next operational legal procedures:"}
                        </p>
                        <p>
                          {isEs 
                            ? "1. Ceci Travel remitirá una copia certificada en formato digital a su correo electrónico en las siguientes 24 horas hábiles por transparencia."
                            : "1. Ceci Travel will transmit a dynamic digital copy to your mail within 24 business hours as legal proof."}
                        </p>
                        <p>
                          {isEs 
                            ? "2. Se procederá con la investigación interna y daremos una contestación formal fundamentada en un plazo máximo e improrrogable de 15 días hábiles de conformidad con la normativa peruana vigente."
                            : "2. We will analyze the logs and issue a formal diagnostic report within a non-negotiable 15-business-day timeline."}
                        </p>
                      </div>

                      <div className="flex flex-wrap gap-2.5">
                        <button
                          type="button"
                          onClick={() => window.print()}
                          className="bg-neutral-750 hover:bg-neutral-700 font-semibold text-[10px] px-3.5 py-2 rounded-xl flex items-center gap-1 cursor-pointer"
                        >
                          <Printer className="w-3.5 h-3.5 shrink-0 text-brand-pink" />
                          <span>{isEs ? "Imprimir Ticket / Guardar PDF" : "Print Ticket / Save PDF"}</span>
                        </button>
                        <button
                          type="button"
                          onClick={() => {
                            setFormSubmittedTicket(null);
                            setComplaintForm({
                              fullName: "",
                              documentType: "DNI",
                              documentNumber: "",
                              representative: "",
                              email: "",
                              phone: "",
                              address: "",
                              claimType: "Reclamo",
                              amountClaimed: "",
                              description: "",
                              resolutionRequested: ""
                            });
                          }}
                          className="bg-brand-pink hover:bg-brand-pink/95 text-white font-bold text-[10px] px-4 py-2 rounded-xl cursor-pointer"
                        >
                          {isEs ? "Registrar Otra Queja" : "Log Another Occurrence"}
                        </button>
                      </div>
                    </motion.div>
                  )}

                </div>
              )}
            </div>

            {/* Read indicator */}
            <div className="pt-6 border-t border-brand-pink/10 flex items-center justify-between text-[11px] opacity-60">
              <span>{isEs ? `Leído en Idioma Seleccionado: ${isEs ? "Español" : "Inglés"}` : `Agreement Rendered in: English`}</span>
              <span>Ceci Operadora de Turismo Turístico E.I.R.L.</span>
            </div>

          </div>

        </div>

      </div>
    </div>
  );
}
