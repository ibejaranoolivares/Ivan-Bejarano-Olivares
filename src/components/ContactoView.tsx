import React, { useState } from "react";
import { motion } from "motion/react";
import { 
  ArrowLeft, Phone, Mail, MapPin, Send, MessageSquare, 
  Clock, Share2, Facebook, Instagram, Linkedin, Youtube, CheckCircle2 
} from "lucide-react";
import { CMSContent, ContactFormData } from "../types";

interface ContactoViewProps {
  cmsContent: CMSContent;
  language: "es" | "en";
  onBack: () => void;
}

export default function ContactoView({ cmsContent, language, onBack }: ContactoViewProps) {
  const isEs = language === "es";

  // Travel categories with target emails from CMS
  const categories = [
    { id: "ventas", labelEs: "Reservas de Tours y Ventas (Local)", labelEn: "Reservations & Tour Sales (Local)", email: cmsContent.emails?.[0] || "reservas@sisaritravel.pe" },
    { id: "operaciones", labelEs: "Operaciones y Logística Perú", labelEn: "Operations & Logistics Peru", email: cmsContent.emails?.[1] || "operaciones@sisaritravel.pe" },
    { id: "admin", labelEs: "Soporte y Dirección Internacional", labelEn: "Support & Global Administration", email: cmsContent.emails?.[2] || "administracion@sisaritravel.pe" }
  ];

  const [editableTargetEmail, setEditableTargetEmail] = useState(cmsContent.emails?.[0] || "reservas@sisaritravel.pe");

  // Form states
  const [formData, setFormData] = useState<ContactFormData>({
    name: "",
    email: "",
    phone: "",
    destination: "",
    date: "",
    comments: "",
    passengers: "",
    days: "",
    adults: "",
    children: ""
  });
  const [submitted, setSubmitted] = useState(false);

  // Default values guard
  const phone1 = cmsContent.phones?.[0] || "+51 987 654 321";
  const phone2 = cmsContent.phones?.[1] || "+51 981 112 233";
  const phone3 = cmsContent.phones?.[2] || "+51 01 432 456";
  const email1 = cmsContent.emails?.[0] || "reservas@sisaritravel.pe";
  const email2 = cmsContent.emails?.[1] || "operaciones@sisaritravel.pe";
  const email3 = cmsContent.emails?.[2] || "administracion@sisaritravel.pe";
  const addressVal = isEs 
    ? (cmsContent.addressEs || "Jirón Lima 140, 1ra Cuadra, Ayacucho, Perú")
    : (cmsContent.addressEn || "140 Jiron Lima, 1st Block, Ayacucho, Peru");
  const addressUrl = cmsContent.addressMapUrl || "https://maps.google.com/?q=Jiron+Lima+140,+Ayacucho,+Peru";

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      setFormData({
        name: "",
        email: "",
        phone: "",
        destination: "",
        date: "",
        comments: "",
        passengers: "",
        days: "",
        adults: "",
        children: ""
      });
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
      {/* Contact cover header */}
      <div className="relative h-[320px] w-full flex items-center justify-center overflow-hidden bg-brand-charcoal select-none">
        <div className="absolute inset-0 z-0">
          <img 
            src="https://images.unsplash.com/photo-1488646953014-85cb44e25828?w=1600&auto=format&fit=crop&q=80" 
            alt={isEs ? "Viaje de Aventura" : "Adventure Tour"}
            className="w-full h-full object-cover opacity-35"
            referrerPolicy="no-referrer"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#fbfaf8] via-black/40 to-black/10 z-10" />
        </div>

        <div className="relative z-20 max-w-4xl mx-auto text-center px-4 space-y-4">
          <button
            onClick={onBack}
            className="inline-flex items-center gap-2 text-xs font-bold text-white bg-black/45 backdrop-blur-md px-4 py-2 rounded-full hover:bg-brand-pink transition-all group cursor-pointer mb-2"
          >
            <ArrowLeft className="w-4 h-4 group-hover:-translate-x-0.5 transition-transform" />
            <span>{isEs ? "Volver al Inicio" : "Back to Home"}</span>
          </button>
          
          <span className="text-brand-orange text-xs font-mono font-bold uppercase tracking-[0.3em] block">
            {isEs ? "PLANIFICA Y CONECTA" : "PLAN & DISCOVER"}
          </span>

          <h1 className="font-display font-black text-4xl sm:text-5xl text-white tracking-tight drop-shadow-md">
            {isEs ? "Contacto" : "Contact Us"}
          </h1>

          <p className="text-gray-100 font-light text-sm sm:text-base max-w-xl mx-auto drop-shadow-sm">
            {isEs 
              ? "Estamos listos para escucharte. Te responderemos en menos de 2 horas hábiles."
              : "We are ready to listen to your dreams. Get a detailed personal guide reply inside 2 business hours."}
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto py-16 px-4 sm:px-6 lg:px-8 space-y-16">
        
        {/* Contact Form & Side Image block */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          
          {/* Main Inquiry Form */}
          <div className="lg:col-span-7 bg-white border border-brand-pink/10 rounded-3xl p-8 text-left shadow-sm flex flex-col justify-between">
            <div>
              <div className="text-left space-y-2 mb-6 border-b border-brand-pink/5 pb-4">
                <span className="text-xs font-bold text-brand-pink uppercase tracking-widest font-mono">
                  {isEs ? "FORMULARIO DE RESERVA / CONSULTA" : "DIRECT RESERVATION INQUIRY"}
                </span>
                <h2 className="font-display font-extrabold text-xl text-brand-charcoal leading-none">
                  {isEs ? "Envíanos un Mensaje de Consulta" : "Send a Certified Digital Quote"}
                </h2>
              </div>

              {submitted ? (
                <motion.div 
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="bg-emerald-50 border border-emerald-150 rounded-2xl p-6 text-center space-y-3"
                >
                  <div className="w-10 h-10 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto text-lg font-bold">
                    ✓
                  </div>
                  <h4 className="font-display font-extrabold text-emerald-800 text-lg">
                    {isEs ? "¡Mensaje Enviado con Éxito!" : "Message Sent Successfully!"}
                  </h4>
                  <p className="text-xs text-emerald-700 leading-relaxed font-sans">
                    {isEs 
                      ? `Nuestros asesores han registrado tu consulta con destino a: ${editableTargetEmail}. Nos comunicaremos contigo en las próximas 2 horas hábiles.`
                      : `Our team has registered your message sent to: ${editableTargetEmail}. An operations team representative will reply within 2 business hours.`}
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
                      <label className="text-[10px] font-mono uppercase tracking-widest text-[#555] font-bold block">{isEs ? "Nombre Completo *" : "Full Name *"}</label>
                      <input
                        type="text"
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        className="w-full px-3 py-2 text-xs border border-neutral-300 bg-[#fbfaf8]/40 rounded-lg outline-none focus:ring-1 focus:ring-brand-pink font-semibold focus:border-brand-pink"
                        placeholder={isEs ? "e.g. María Pérez" : "e.g. Mary Smith"}
                        required
                      />
                    </div>
                    <div className="space-y-1">
                      <label className="text-[10px] font-mono uppercase tracking-widest text-[#555] font-bold block">{isEs ? "Celular / WhatsApp *" : "Cell / WhatsApp *"}</label>
                      <input
                        type="tel"
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        className="w-full px-3 py-2 text-xs border border-neutral-300 bg-[#fbfaf8]/40 rounded-lg outline-none focus:ring-1 focus:ring-brand-pink font-semibold focus:border-brand-pink"
                        placeholder="e.g. +51 987 654 321"
                        required
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-1">
                      <label className="text-[10px] font-mono uppercase tracking-widest text-[#555] font-bold block">{isEs ? "Correo Electrónico *" : "Email Address *"}</label>
                      <input
                        type="email"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        className="w-full px-3 py-2 text-xs border border-neutral-300 bg-[#fbfaf8]/40 rounded-lg outline-none focus:ring-1 focus:ring-brand-pink font-semibold focus:border-brand-pink"
                        placeholder="e.g. maria@example.com"
                        required
                      />
                    </div>
                    <div className="space-y-1">
                      <label className="text-[10px] font-mono uppercase tracking-widest text-[#555] font-bold block">{isEs ? "Destino o Paquete de Interés" : "Tour of Choice"}</label>
                      <input
                        type="text"
                        value={formData.destination}
                        onChange={(e) => setFormData({ ...formData, destination: e.target.value })}
                        className="w-full px-3 py-2 text-xs border border-neutral-300 bg-[#fbfaf8]/40 rounded-lg outline-none focus:ring-1 focus:ring-brand-pink font-medium focus:border-brand-pink"
                        placeholder={isEs ? "e.g. Aguas Turquesas de Millpu" : "e.g. Millpu Turquoise Waters"}
                      />
                    </div>
                  </div>

                  {/* Date of trip (Fecha) AND Duration of Trip (Número de días) AND Passengers counts */}
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    <div className="space-y-1">
                      <label className="text-[10px] font-mono uppercase tracking-widest text-[#555] font-bold block">{isEs ? "Fecha Estimativa *" : "Est. Travel Date *"}</label>
                      <input
                        type="date"
                        value={formData.date}
                        onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                        className="w-full px-3 py-2 text-xs border border-neutral-300 bg-white rounded-lg outline-none focus:ring-1 focus:ring-brand-pink font-semibold text-brand-charcoal focus:border-brand-pink"
                        required
                      />
                    </div>
                    <div className="space-y-1">
                      <label className="text-[10px] font-mono uppercase tracking-widest text-[#555] font-bold block">{isEs ? "Número de Días" : "Total Days"}</label>
                      <input
                        type="number"
                        min="1"
                        value={formData.days}
                        onChange={(e) => setFormData({ ...formData, days: e.target.value })}
                        className="w-full px-3 py-2 text-xs border border-neutral-300 bg-white rounded-lg outline-none focus:ring-1 focus:ring-brand-pink font-semibold text-brand-charcoal focus:border-brand-pink"
                        placeholder="e.g. 5"
                      />
                    </div>
                    <div className="space-y-1">
                      <label className="text-[10px] font-mono uppercase tracking-widest text-[#555] font-bold block">{isEs ? "Pasajeros Totales" : "Total Passengers"}</label>
                      <input
                        type="number"
                        min="1"
                        value={formData.passengers}
                        onChange={(e) => setFormData({ ...formData, passengers: e.target.value })}
                        className="w-full px-3 py-2 text-xs border border-neutral-300 bg-white rounded-lg outline-none focus:ring-1 focus:ring-brand-pink font-semibold text-brand-charcoal focus:border-brand-pink"
                        placeholder="e.g. 3"
                      />
                    </div>
                  </div>

                  {/* Adults AND Children */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-1">
                      <label className="text-[10px] font-mono uppercase tracking-widest text-[#555] font-bold block">{isEs ? "Pax Adultos *" : "Adult Travelers *"}</label>
                      <input
                        type="number"
                        min="1"
                        value={formData.adults}
                        onChange={(e) => setFormData({ ...formData, adults: e.target.value })}
                        className="w-full px-3 py-2 text-xs border border-neutral-300 bg-[#fbfaf8]/40 rounded-lg outline-none focus:ring-1 focus:ring-brand-pink font-semibold focus:border-brand-pink"
                        placeholder="e.g. 2"
                        required
                      />
                    </div>
                    <div className="space-y-1">
                      <label className="text-[10px] font-mono uppercase tracking-widest text-[#555] font-bold block">{isEs ? "Pax Niños" : "Child Travelers"}</label>
                      <input
                        type="number"
                        min="0"
                        value={formData.children}
                        onChange={(e) => setFormData({ ...formData, children: e.target.value })}
                        className="w-full px-3 py-2 text-xs border border-neutral-300 bg-[#fbfaf8]/40 rounded-lg outline-none focus:ring-1 focus:ring-brand-pink font-semibold focus:border-brand-pink"
                        placeholder="e.g. 1"
                      />
                    </div>
                  </div>

                  {/* Message Category Selector with Editable Destinatario Emails */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-1">
                      <label className="text-[10px] font-mono uppercase tracking-widest text-[#555] font-bold block">
                        {isEs ? "Categoría del mensaje *" : "Message Category *"}
                      </label>
                      <select
                        onChange={(e) => {
                          const catId = e.target.value;
                          const selected = categories.find(c => c.id === catId);
                          if (selected) {
                            setEditableTargetEmail(selected.email);
                          }
                        }}
                        className="w-full px-3 py-2 text-xs border border-neutral-300 bg-white rounded-lg outline-none focus:ring-1 focus:ring-brand-pink font-semibold text-brand-charcoal"
                      >
                        {categories.map((cat) => (
                           <option key={cat.id} value={cat.id}>
                            {isEs ? cat.labelEs : cat.labelEn}
                          </option>
                        ))}
                      </select>
                    </div>

                    <div className="space-y-1">
                      <label className="text-[10px] font-mono uppercase tracking-widest text-[#f58220] font-bold block">
                        {isEs ? "Email de Destino (Editable)" : "Target Email Address (Editable)"}
                      </label>
                      <input
                        type="email"
                        value={editableTargetEmail}
                        onChange={(e) => setEditableTargetEmail(e.target.value)}
                        placeholder="destinatario@sisaritravel.pe"
                        className="w-full px-3 py-2 text-xs border border-neutral-300 rounded-lg outline-none focus:ring-1 focus:ring-brand-pink font-mono text-brand-pink focus:border-brand-pink"
                        required
                      />
                    </div>
                  </div>

                  <div className="space-y-1">
                    <label className="text-[10px] font-mono uppercase tracking-widest text-[#555] font-bold block">{isEs ? "Detalles del Viaje, Dudas o Ideas" : "Travel Ideas & Comments"}</label>
                    <textarea
                      rows={3}
                      value={formData.comments}
                      onChange={(e) => setFormData({ ...formData, comments: e.target.value })}
                      className="w-full px-3 py-2 text-xs border border-neutral-300 bg-[#fbfaf8]/40 rounded-lg outline-none focus:ring-1 focus:ring-brand-pink font-medium focus:border-brand-pink"
                      placeholder={isEs ? "Escribe libremente dudas de aclimatación, guiado, fechas estimadas..." : "Ask questions, share traveler counts..."}
                      required
                    />
                  </div>

                  <div className="pt-2 flex justify-start">
                    <button
                      type="submit"
                      className="bg-brand-pink text-white hover:bg-brand-pink/95 font-black text-xs uppercase tracking-wider px-6 py-3.5 rounded-full shadow-md flex items-center gap-2 cursor-pointer active:scale-95 transition-all w-full sm:w-auto justify-center"
                    >
                      <Send className="w-3.5 h-3.5 shrink-0" />
                      <span>{isEs ? "Enviar Consulta Directa" : "Submit Direct Request"}</span>
                    </button>
                  </div>
                </form>
              )}
            </div>
          </div>
          
          {/* Illustrative travel image right next to the form */}
          <div className="lg:col-span-5 rounded-3xl overflow-hidden relative border border-brand-pink/10 h-full min-h-[500px] shadow-sm select-none flex flex-col justify-between p-6">
            <img 
              src="https://images.unsplash.com/photo-1526392060635-9d6019884377?w=1000&auto=format&fit=crop&q=80" 
              alt={isEs ? "Aventura en los Andes Peruanos" : "Peruvian Andes Adventure"} 
              className="absolute inset-0 w-full h-full object-cover filter brightness-[0.70] hover:scale-105 duration-700 transition-transform" 
              referrerPolicy="no-referrer"
            />
            
            {/* Elegant glassmorphic overlay ("capa") exhibiting office hours, telephones and locations */}
            <div className="relative z-10 w-full bg-black/75 backdrop-blur-md rounded-2xl p-5 border border-white/10 text-white space-y-4">
              <span className="text-[9px] font-mono text-[#f58220] font-extrabold uppercase tracking-widest block border-b border-white/10 pb-2">
                {isEs ? "INFORMACIÓN OFICIAL" : "OFFICIAL DIRECTORY"}
              </span>
              
              {/* Address detail */}
              <div className="flex items-start gap-3">
                <span className="text-sm shrink-0">📍</span>
                <div className="text-left">
                  <span className="text-[10px] uppercase font-mono tracking-wider text-white/55 font-bold block">{isEs ? "Oficina Principal" : "Physical Address"}</span>
                  <a href={addressUrl} target="_blank" rel="noopener noreferrer" className="text-xs font-bold text-white hover:underline leading-relaxed block">
                    {addressVal}
                  </a>
                </div>
              </div>

              {/* Telephones detail */}
              <div className="flex items-start gap-3">
                <span className="text-sm shrink-0">📞</span>
                <div className="text-left">
                  <span className="text-[10px] uppercase font-mono tracking-wider text-white/55 font-bold block">{isEs ? "Teléfonos Activos" : "Travel Hotlines"}</span>
                  <div className="flex flex-col gap-0.5 mt-0.5">
                    <a href={`tel:${phone1.replace(/\s+/g, '')}`} className="text-xs font-extrabold text-[#f58220] hover:underline block">
                      {phone1} (Ventas & WhatsApp)
                    </a>
                    <a href={`tel:${phone2.replace(/\s+/g, '')}`} className="text-xs font-bold text-gray-200 hover:underline block font-sans">
                      {phone2} (Operaciones)
                    </a>
                    <a href={`tel:${phone3.replace(/\s+/g, '')}`} className="text-xs font-bold text-gray-300 hover:underline block font-sans">
                      {phone3} (Soporte)
                    </a>
                  </div>
                </div>
              </div>

              {/* Correos Oficiales */}
              <div className="flex items-start gap-3">
                <span className="text-sm shrink-0">✉️</span>
                <div className="text-left">
                  <span className="text-[10px] uppercase font-mono tracking-wider text-white/55 font-bold block">{isEs ? "Correos Oficiales" : "Official Emails"}</span>
                  <div className="flex flex-col gap-0.5 mt-0.5">
                    <a href={`mailto:${email1}`} className="text-xs font-bold text-gray-150 hover:underline block font-sans break-all">
                      {email1} (Reservas)
                    </a>
                    <a href={`mailto:${email2}`} className="text-xs font-semibold text-gray-250 hover:underline block font-sans break-all">
                      {email2} (Operaciones)
                    </a>
                    <a href={`mailto:${email3}`} className="text-xs font-semibold text-gray-350 hover:underline block font-sans break-all">
                      {email3} (Dirección)
                    </a>
                  </div>
                </div>
              </div>

              {/* Office hours detail (Editable via CMS) */}
              <div className="flex items-start gap-3">
                <span className="text-sm shrink-0">🕒</span>
                <div className="text-left">
                  <span className="text-[10px] uppercase font-mono tracking-wider text-white/55 font-bold block">{isEs ? "Horario de Atención" : "Office & Call Hours"}</span>
                  <p className="text-xs font-semibold text-gray-100 leading-relaxed">
                    {isEs 
                      ? (cmsContent.officeHoursEs || "Lunes a Sábado: 8:00 AM - 8:30 PM | Domingos: 9:00 AM - 1:00 PM")
                      : (cmsContent.officeHoursEn || "Monday to Saturday: 8:00 AM - 8:30 PM | Sundays: 9:00 AM - 1:00 PM")
                    }
                  </p>
                </div>
              </div>
            </div>

            {/* Bottom quick CTA info */}
            <div className="relative z-10 text-white text-left mt-auto pt-6">
              <span className="text-[10px] font-mono text-white/50 font-bold uppercase tracking-widest block">{isEs ? "SUEÑA TU VIAJE" : "DREAM YOUR TRIP"}</span>
              <h4 className="font-display font-extrabold text-base tracking-tight text-white">{isEs ? "Viajes Confeccionados a la Medida" : "Custom Crafted Travel Itineraries"}</h4>
            </div>
          </div>

        </div>

        {/* Section Map (Moved below as full-width and adjustable) */}
        <div id="interactive-map-group" className="bg-white border border-brand-pink/10 rounded-3xl p-8 space-y-6 shadow-sm">
          <div className="space-y-2 border-b border-brand-pink/5 pb-4 text-left">
            <span className="text-xs font-bold text-blue-500 uppercase tracking-widest font-mono">
              {isEs ? "UBICACIÓN GEORREFERENCIADA Y AJUSTABLE" : "GEOLOCATED AGENCY"}
            </span>
            <h2 className="font-display font-extrabold text-2xl text-brand-charcoal leading-none">
              {isEs ? "Ubicación de Sisari en Jirón Lima" : "Sisari Headquarters Map Location"}
            </h2>
            <p className="text-xs text-brand-charcoal/60">
              {isEs 
                ? "Utilice el mapa interactivo regulable y de ancho completo de abajo para planificar su caminata a nuestras oficinas físicas oficiales."
                : "Interact with our scalable full-width live maps tool for optimal physical route planning and walking briefings."}
            </p>
          </div>

          <div className="rounded-2xl overflow-hidden border border-brand-pink/15 h-[420px] w-full relative shadow-inner">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d1942.345672909123!2d-74.22635!3d-13.1606!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x91127e1f7d54b857%3A0x8ac159abf03cce04!2sJir%C3%B3n%20Lima%20140%2C%20Ayacucho%2005001!5e0!3m2!1ses!2spe!4v1716955000000!5m2!1ses!2spe"
              className="w-full h-full border-0 select-none"
              allowFullScreen={true}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title={isEs ? "Ubicación Sisari Travel en Jirón Lima" : "Sisari Travel Location"}
            />
          </div>

          <div className="bg-[#fbfaf8] border border-brand-pink/5 rounded-2xl p-4 text-left space-y-2">
            <div className="flex items-center gap-2">
              <span className="text-sm">🏢</span>
              <span className="text-[11px] font-bold text-brand-charcoal uppercase tracking-wider">{isEs ? "REFERENCIA DE VIAJE" : "TRAVEL REFERAL"}</span>
            </div>
            <p className="text-xs text-brand-charcoal/70 leading-relaxed font-light">
              {isEs 
                ? "Nos ubicamos a escasamente media cuadra de la hermosa e histórica Plaza de Armas de Ayacucho. Siéntete libre de visitarnos para tomar un mate de coca caliente antes de partir a tus excursiones."
                : "We stand exactly half a block away from Ayacucho's historic Central Square. Stop by our desk to pick up walking maps and enjoy warm mountain tea."}
            </p>
          </div>
        </div>

        {/* Social Media links section with editable styling connections */}
        <div className="bg-brand-charcoal rounded-3xl overflow-hidden border border-white/5 relative shadow-xl">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-0">
            {/* Column 1: Core content */}
            <div className="p-8 sm:p-12 lg:col-span-7 flex flex-col justify-center text-left space-y-6">
              <span className="text-brand-orange text-xs font-mono font-bold tracking-widest uppercase block animate-pulse">
                {isEs ? "⚡ GRUPO DE VIAJE EXCLUSIVO" : "⚡ EXCLUSIVE VIBRANT COHORT"}
              </span>
              <h3 className="font-display font-black text-2xl sm:text-4xl tracking-tight leading-tight text-white">
                {isEs ? "Únete a Nuestra Comunidad en Redes" : "Connect with Our Vibrant Digital Community"}
              </h3>
              <p className="text-xs sm:text-sm text-gray-300 leading-relaxed font-light">
                {isEs 
                  ? "¡No viajes solo! Publicamos actualizaciones diarias de rutas, fotos exclusivas tomadas por nuestros guías, alertas de promociones relámpago e historias reales de viajeros que, como tú, decidieron explorar lo inexplorado."
                  : "Never travel alone! We distribute daily mountain logs, breathtaking snaps captured by our expert guides, early-bird flash discounts, and verified field logs."}
              </p>

              {/* Enhanced interactive badges for social presence */}
              <div className="grid grid-cols-2 gap-4 pb-4">
                <div className="flex items-center gap-2 bg-white/5 border border-white/10 p-3 rounded-xl">
                  <span className="text-xl">👥</span>
                  <div className="text-left">
                    <p className="text-[11px] font-bold text-white leading-tight">10K+ Seguidores</p>
                    <p className="text-[9px] text-[#b3b3b3]">En nuestras plataformas</p>
                  </div>
                </div>
                <div className="flex items-center gap-2 bg-white/5 border border-white/10 p-3 rounded-xl">
                  <span className="text-xl">✨</span>
                  <div className="text-left">
                    <p className="text-[11px] font-bold text-white leading-tight">Comunidad Activa</p>
                    <p className="text-[9px] text-[#b3b3b3]">Sorteos y salidas grupales</p>
                  </div>
                </div>
              </div>

              {/* Social Media buttons */}
              <div className="flex flex-wrap items-center gap-3 pt-2">
                <a href={cmsContent.socialLinks?.facebook || "https://facebook.com/cecitravelperu"} target="_blank" rel="noopener noreferrer" className="px-4 py-2.5 bg-[#1877F2]/20 hover:bg-[#1877F2] text-white rounded-xl border border-[#1877F2]/30 hover:border-transparent transition-all text-xs font-bold flex items-center gap-2 cursor-pointer shadow-sm">
                  <Facebook className="w-4 h-4" />
                  <span>Facebook</span>
                </a>
                <a href={cmsContent.socialLinks?.instagram || "https://instagram.com/cecitravel.pe"} target="_blank" rel="noopener noreferrer" className="px-4 py-2.5 bg-gradient-to-r from-[#833AB4]/20 to-[#E1306C]/20 hover:from-[#833AB4] hover:to-[#E1306C] text-white rounded-xl border border-[#E1306C]/30 hover:border-transparent transition-all text-xs font-bold flex items-center gap-2 cursor-pointer shadow-sm">
                  <Instagram className="w-4 h-4" />
                  <span>Instagram</span>
                </a>
                <a href={cmsContent.socialLinks?.tiktok || "https://tiktok.com/@sisari.travel"} target="_blank" rel="noopener noreferrer" className="px-4 py-2.5 bg-white/10 hover:bg-white hover:text-black hover:border-transparent text-white rounded-xl border border-white/20 transition-all text-xs font-bold flex items-center gap-2 cursor-pointer shadow-sm" title="Síguenos en TikTok">
                  <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path d="M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.02 1.6 4.17 1.12 1.25 2.7 2.06 4.37 2.27v3.77c-1.78-.17-3.46-.99-4.66-2.3-.04-.04-.08-.08-.13-.13-.01.87.01 1.74-.01 2.62-.07 3.39-1.92 6.64-5.01 8.01-3.15 1.48-7.1.92-9.67-1.39-2.61-2.28-3.41-6.17-1.95-9.3 1.34-3.01 4.54-4.8 7.82-4.54 1.37.09 2.68.62 3.72 1.53.01-1.63-.01-3.25.01-4.88z"/>
                  </svg>
                  <span>TikTok</span>
                </a>
                <a href={cmsContent.socialLinks?.linkedin || "https://linkedin.com"} target="_blank" rel="noopener noreferrer" className="px-4 py-2.5 bg-[#0A66C2]/20 hover:bg-[#0A66C2] text-white rounded-xl border border-[#0A66C2]/30 hover:border-transparent transition-all text-xs font-bold flex items-center gap-2 cursor-pointer shadow-sm">
                  <Linkedin className="w-4 h-4" />
                  <span>LinkedIn</span>
                </a>
              </div>
            </div>

            {/* Column 2: High impact professional community imagery */}
            <div className="relative min-h-[300px] lg:h-auto lg:col-span-5 hidden sm:block overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-r lg:bg-gradient-to-l from-transparent via-brand-charcoal/40 to-brand-charcoal z-10" />
              <img 
                src="https://images.unsplash.com/photo-1527631746610-bca00a040d60?w=800&auto=format&fit=crop&q=80" 
                alt="Sisari Travel Comunidad" 
                className="w-full h-full object-cover select-none filter brightness-90 hover:scale-105 transition-transform duration-[8s]"
                referrerPolicy="no-referrer"
              />
              
              {/* Overlapping small testimonial badge */}
              <div className="absolute bottom-6 right-6 z-20 bg-white/95 backdrop-blur-md p-4 rounded-2xl shadow-xl max-w-[240px] text-left border border-white/10">
                <p className="text-[10px] text-brand-pink font-extrabold font-mono tracking-widest uppercase mb-1">💬 ÚLTIMO MENSAJE</p>
                <p className="text-[11px] text-brand-charcoal leading-normal italic font-light font-display">"Viajé con ellos a las lagunas de Millpu y el grupo de WhatsApp que armaron fue genial para conocer gente linda."</p>
                <p className="text-[9px] text-[#f58220] font-bold uppercase mt-1.5">— Sofía M., Lima</p>
              </div>
            </div>
          </div>
        </div>

      </div>
    </motion.div>
  );
}
