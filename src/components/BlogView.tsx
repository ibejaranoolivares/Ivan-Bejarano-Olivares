import React, { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { ArrowLeft, Search, Calendar, User, Clock, Share2, Facebook, Linkedin, Instagram, Sparkles, Check, ChevronRight } from "lucide-react";
import { BlogPost } from "../types";

interface BlogViewProps {
  blogPosts: BlogPost[];
  language: "es" | "en";
  onBack: () => void;
  scrollToId: (id: string) => void;
  onSelectPackage?: (pkg: any) => void;
}

export default function BlogView({ blogPosts, language, onBack, scrollToId, onSelectPackage }: BlogViewProps) {
  const isEs = language === "es";
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string>("All");
  const [activePost, setActivePost] = useState<BlogPost | null>(null);
  const [copiedLink, setCopiedLink] = useState(false);

  // Filter blog posts based on search and category
  const activePosts = blogPosts.filter(post => post.active !== false);
  
  const filteredPosts = activePosts.filter(post => {
    const title = (isEs ? post.titleEs : post.titleEn) || "";
    const subtitle = (isEs ? post.subtitleEs : post.subtitleEn) || "";
    const category = post.category || "";
    const matchesSearch = title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          subtitle.toLowerCase().includes(searchQuery.toLowerCase());
    
    if (selectedCategory === "All") {
      return matchesSearch;
    }
    return matchesSearch && category.toLowerCase() === selectedCategory.toLowerCase();
  });

  // Extract unique categories
  const categories = ["All", ...Array.from(new Set(activePosts.map(p => p.category).filter(Boolean)))];

  const handleCopyLink = (post: BlogPost) => {
    const fakeUrl = `${window.location.origin}/blog/${post.id}`;
    navigator.clipboard.writeText(fakeUrl).then(() => {
      setCopiedLink(true);
      setTimeout(() => setCopiedLink(false), 2000);
    });
  };

  const getShareUrl = (network: "facebook" | "linkedin" | "instagram", post: BlogPost) => {
    const postTitle = encodeURIComponent(isEs ? post.titleEs : post.titleEn);
    const postUrl = encodeURIComponent(`${window.location.origin}/blog/${post.id}`);
    
    switch (network) {
      case "facebook":
        return `https://www.facebook.com/sharer/sharer.php?u=${postUrl}`;
      case "linkedin":
        return `https://www.linkedin.com/sharing/share-offsite/?url=${postUrl}`;
      case "instagram":
        // Instagram doesn't have a direct share URL; redirect to profile or copy
        return `https://instagram.com/cecitravel.pe`;
      default:
        return "#";
    }
  };

  return (
    <div className="bg-[#fbfaf8] py-8 px-4 sm:px-6 lg:px-8 border-t border-brand-pink/5 min-h-[70vh]">
      <div className="max-w-7xl mx-auto">
        <AnimatePresence mode="wait">
          {!activePost ? (
            /* BLOG INDEX LIST VIEW */
            <motion.div
              key="list-view"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.25 }}
              className="space-y-12"
            >
              {/* Top Navigation Row */}
              <div className="flex items-center justify-between">
                <button
                  onClick={onBack}
                  className="flex items-center gap-2 text-xs font-bold text-brand-charcoal hover:text-brand-pink transition-colors group cursor-pointer"
                >
                  <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
                  <span>{isEs ? "Volver al Inicio" : "Back to Home"}</span>
                </button>
                
                <span className="text-[10px] font-mono font-bold uppercase tracking-widest text-[#e12d8a] bg-brand-pink/5 px-3 py-1 rounded-full">
                  {isEs ? "Publicaciones de Ceci" : "Ceci Publications"}
                </span>
              </div>

              {/* Title & Banner intro */}
              <div className="text-center max-w-2xl mx-auto space-y-3">
                <span className="text-brand-pink font-bold font-mono tracking-widest text-[11px] uppercase block">
                  {isEs ? "NOTICIAS, CONSEJOS Y BITÁCORAS" : "NEWS, TRAVEL TIPS & CHRONICLES"}
                </span>
                <h1 className="font-display font-black text-3xl sm:text-4xl text-[#2c2c2c] tracking-tight">
                  {isEs ? "Ceci Blog: Inspírate a Descubrir" : "Ceci Blog: Inspire Your Wanderlust"}
                </h1>
                <p className="text-xs sm:text-sm text-brand-charcoal/70 font-light leading-relaxed">
                  {isEs 
                    ? "Explora guías detalladas redactadas por nuestros expertos, noticias de festividades puneñas o ayacuchanas, y consejos de senderismo ético."
                    : "Track curated guidelines compiled by our leading wilderness experts, regional traditional festivity dates, and sustainable traveling advice."}
                </p>
              </div>

              {/* Search & Category filter panel card */}
              <div className="bg-white border border-brand-pink/10 rounded-2xl p-4 sm:p-6 flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4 shadow-sm">
                
                {/* Search string inputs */}
                <div className="relative flex-grow max-w-md">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#a0a0a0]" />
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder={isEs ? "Buscar noticias o consejos..." : "Search travel guides..."}
                    className="w-full bg-[#fbfaf8] border border-brand-pink/10 rounded-xl pl-9 pr-4 py-2 text-xs focus:ring-1 focus:ring-brand-pink outline-none text-left font-bold"
                  />
                </div>

                {/* Categories filter selectors */}
                <div className="flex flex-wrap items-center gap-1.5 self-start md:self-auto">
                  {categories.map((cat) => (
                    <button
                      key={cat}
                      onClick={() => setSelectedCategory(cat)}
                      className={`px-3 py-1.5 rounded-full text-[11px] font-bold border transition-all cursor-pointer ${
                        (selectedCategory === cat)
                          ? "bg-brand-pink border-brand-pink text-white"
                          : "bg-neutral-50/50 border-neutral-200 text-brand-charcoal hover:bg-neutral-100/50"
                      }`}
                    >
                      {cat === "All" ? (isEs ? "Todos" : "All") : cat}
                    </button>
                  ))}
                </div>

              </div>

              {/* Blog Grid rendering */}
              {filteredPosts.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                  {filteredPosts.map((post) => {
                    const title = isEs ? post.titleEs : post.titleEn;
                    const subtitle = isEs ? post.subtitleEs : post.subtitleEn;
                    const readTime = isEs ? post.readTimeEs : post.readTimeEn;
                    
                    return (
                      <article
                        key={post.id}
                        className="bg-white border border-brand-pink/10 rounded-3xl overflow-hidden shadow-sm hover:shadow-lg transition-all flex flex-col group h-full cursor-pointer"
                        onClick={() => {
                          setActivePost(post);
                          window.scrollTo({ top: 0, behavior: "smooth" });
                        }}
                      >
                        {/* Img header */}
                        <div className="h-52 overflow-hidden bg-neutral-100 relative">
                          <img
                            src={post.image}
                            alt={title}
                            referrerPolicy="no-referrer"
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                          />
                          <div className="absolute top-3 left-3 bg-brand-pink/90 backdrop-blur-md text-white font-bold text-[9px] px-2.5 py-1 rounded-full uppercase tracking-wider">
                            {post.category}
                          </div>
                        </div>

                        {/* Article body summary */}
                        <div className="p-6 flex-grow flex flex-col justify-between gap-4 text-left">
                          <div className="space-y-2">
                            <div className="flex items-center gap-4 text-[10px] text-brand-charcoal/50 font-mono">
                              <span className="flex items-center gap-1"><Calendar className="w-3 h-3 text-brand-orange" /> {post.date}</span>
                              <span className="flex items-center gap-1"><Clock className="w-3 h-3 text-brand-pink" /> {readTime}</span>
                            </div>
                            <h3 className="font-display font-extrabold text-[#2c2c2c] text-base leading-snug group-hover:text-brand-pink transition-colors">
                              {title}
                            </h3>
                            <p className="text-[11px] text-brand-charcoal/70 font-light leading-relaxed line-clamp-3">
                              {subtitle}
                            </p>
                          </div>

                          <div className="pt-4 border-t border-brand-pink/5 flex items-center justify-between">
                            <div className="flex items-center gap-2">
                              <div className="w-6 h-6 rounded-full bg-brand-pink/10 flex items-center justify-center font-bold text-[9px] text-brand-pink">
                                {post.author ? post.author.substring(0, 2).toUpperCase() : "CT"}
                              </div>
                              <span className="text-[10px] font-bold text-brand-charcoal/80">Por {post.author || "Ceci Staff"}</span>
                            </div>

                            <span className="text-[10px] uppercase font-black text-brand-pink flex items-center gap-0.5 group-hover:translate-x-1 transition-transform">
                              {isEs ? "Leer Más" : "Read More"} <ChevronRight className="w-3 h-3 shrink-0" />
                            </span>
                          </div>
                        </div>
                      </article>
                    );
                  })}
                </div>
              ) : (
                <div className="text-center py-20 bg-white rounded-3xl border border-brand-pink/10">
                  <span className="text-3xl">🏜️</span>
                  <p className="text-sm font-semibold text-brand-charcoal mt-2">
                    {isEs ? "No se encontraron publicaciones." : "No articles found."}
                  </p>
                  <p className="text-xs text-brand-charcoal/50">
                    {isEs ? "Prueba cambiando las palabras clave." : "Try adjusting your search criteria."}
                  </p>
                </div>
              )}

            </motion.div>
          ) : (
            /* DETAILED BLOG ARTICLE VIEW */
            <motion.div
              key="detail-view"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.25 }}
              className="max-w-4xl mx-auto space-y-10"
            >
              {/* Back to list button header */}
              <div className="flex items-center justify-between">
                <button
                  onClick={() => setActivePost(null)}
                  className="flex items-center gap-2 text-xs font-bold text-brand-charcoal hover:text-brand-pink transition-colors group cursor-pointer"
                >
                  <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
                  <span>{isEs ? "Volver al Listado de Artículos" : "Back to Blog List"}</span>
                </button>

                <div className="flex items-center gap-2">
                  <span className="text-[9px] font-mono uppercase bg-neutral-200/50 text-neutral-600 px-2.5 py-1 rounded-full font-bold">
                    {activePost.category}
                  </span>
                </div>
              </div>

              {/* Cover dynamic asset image */}
              <div className="h-64 sm:h-[400px] rounded-3xl overflow-hidden relative shadow-md">
                <img
                  src={activePost.image}
                  alt={isEs ? activePost.titleEs : activePost.titleEn}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                <div className="absolute bottom-6 left-6 right-6 text-white text-left space-y-2">
                  <div className="flex items-center gap-4 text-xs font-mono text-white/90">
                    <span className="flex items-center gap-1"><Calendar className="w-3.5 h-3.5 text-brand-orange" /> {activePost.date}</span>
                    <span className="flex items-center gap-1"><Clock className="w-3.5 h-3.5 text-brand-pink" /> {isEs ? activePost.readTimeEs : activePost.readTimeEn}</span>
                    <span className="flex items-center gap-1">• Por {activePost.author || "Ceci Travel"}</span>
                  </div>
                  <h1 className="font-display font-black text-2xl sm:text-3xl md:text-4xl tracking-tight leading-tight">
                    {isEs ? activePost.titleEs : activePost.titleEn}
                  </h1>
                </div>
              </div>

              {/* Share and action buttons bar */}
              <div className="border-y border-brand-pink/10 py-3 flex flex-wrap items-center justify-between gap-4">
                <div className="flex items-center gap-3">
                  <span className="text-xs font-bold text-brand-charcoal/60 flex items-center gap-1.5 shrink-0">
                    <Share2 className="w-3.5 h-3.5 text-brand-pink" />
                    {isEs ? "Reposterar / Compartir:" : "Repost this article:"}
                  </span>
                  
                  {/* Facbook shared */}
                  <a
                    href={getShareUrl("facebook", activePost)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-2 rounded-full border border-neutral-200 hover:border-blue-600 hover:bg-blue-50 text-neutral-600 hover:text-blue-600 transition-all flex items-center justify-center cursor-pointer"
                    title={isEs ? "Compartir en Facebook" : "Share on Facebook"}
                  >
                    <Facebook className="w-4 h-4 shrink-0" />
                  </a>

                  {/* LinkedIn shared */}
                  <a
                    href={getShareUrl("linkedin", activePost)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-2 rounded-full border border-neutral-200 hover:border-blue-700 hover:bg-blue-50 text-neutral-600 hover:text-blue-700 transition-all flex items-center justify-center cursor-pointer"
                    title={isEs ? "Compartir en LinkedIn" : "Share on LinkedIn"}
                  >
                    <Linkedin className="w-4 h-4 shrink-0" />
                  </a>

                  {/* Instagram shared */}
                  <a
                    href={getShareUrl("instagram", activePost)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-2 rounded-full border border-neutral-200 hover:border-pink-600 hover:bg-pink-50 text-neutral-600 hover:text-pink-600 transition-all flex items-center justify-center cursor-pointer"
                    title={isEs ? "Ver Instagram Oficial" : "Visit Instagram Profile"}
                  >
                    <Instagram className="w-4 h-4 shrink-0" />
                  </a>

                  {/* Normal clipboard copied shared link */}
                  <button
                    onClick={() => handleCopyLink(activePost)}
                    className="flex items-center gap-1 text-[11px] font-bold text-brand-charcoal opacity-70 hover:opacity-100 hover:text-brand-pink transition-all px-2.5 py-1.5 rounded-lg bg-neutral-100 shrink-0 cursor-pointer"
                  >
                    {copiedLink ? (
                      <>
                        <Check className="w-3.5 h-3.5 text-green-500 shrink-0" />
                        <span className="text-green-600">{isEs ? "¡Copiado!" : "Copied!"}</span>
                      </>
                    ) : (
                      <>
                        <Share2 className="w-3.5 h-3.5 text-neutral-400 shrink-0" />
                        <span>{isEs ? "Copiar Enlace" : "Copy Link"}</span>
                      </>
                    )}
                  </button>
                </div>

                <div className="text-right">
                  <span className="text-[10px] font-mono text-brand-charcoal/50">
                    Art. Id: {activePost.id}
                  </span>
                </div>
              </div>

              {/* Inner content rich text block */}
              <div className="bg-white border border-brand-pink/5 rounded-3xl p-6 sm:p-10 shadow-sm text-left font-sans">
                {/* Intro summary sentence */}
                <div className="border-l-4 border-brand-pink pl-4 py-1 mb-8">
                  <p className="font-sans font-bold text-base text-brand-charcoal">
                    {isEs ? activePost.subtitleEs : activePost.subtitleEn}
                  </p>
                </div>

                {/* Main paragraphs */}
                <div className="space-y-6 text-sm text-brand-charcoal/85 leading-relaxed font-light whitespace-pre-line text-justify">
                  {(isEs ? activePost.contentEs : activePost.contentEn) || 
                   (isEs ? activePost.subtitleEs : activePost.subtitleEn)}
                </div>
              </div>

              {/* Call to action (Rich Banner inside article) */}
              <div className="bg-gradient-to-r from-brand-charcoal to-neutral-900 rounded-3xl text-white p-8 relative overflow-hidden shadow-xl text-left flex flex-col sm:flex-row items-center justify-between gap-6 group">
                <div className="absolute inset-0 bg-cover bg-center mix-blend-overlay opacity-15 pointer-events-none" style={{ backgroundImage: `url('${activePost.image}')` }} />
                
                <div className="space-y-2 relative max-w-xl">
                  <span className="text-brand-orange font-bold font-mono text-[10px] uppercase tracking-widest flex items-center gap-1">
                    <Sparkles className="w-3 h-3 text-brand-orange animate-spin-slow shrink-0" />
                    {isEs ? "CONEXIÓN EXCLUSIVA DE ACCIÓN" : "EXCLUSIVE CECI TRAVEL ADVENTURE"}
                  </span>
                  <h3 className="font-display font-black text-xl sm:text-2xl tracking-tight leading-snug">
                    {isEs ? "¿Inspirado por este maravilloso destino?" : "Inspired by this incredible destination?"}
                  </h3>
                  <p className="text-xs text-neutral-300 font-light leading-relaxed">
                    {isEs
                      ? "Planifica un recorrido de ensueño con el planificador de Ceci Travel de inmediato. Personaliza hospedajes, guías oficiales, vehículos de traslado privado y equipamiento de trekking con Sisari IA."
                      : "Draft an immersive trip design right away with our smart assistant. Select comfortable accommodations, experienced local guides, and top logistics."}
                  </p>
                </div>

                <div className="relative shrink-0 flex flex-col gap-2">
                  <button
                    onClick={() => {
                      // Navigate back to planificador
                      scrollToId("planificador");
                    }}
                    className="bg-brand-pink hover:bg-brand-pink/90 text-white font-extrabold text-xs uppercase tracking-wider px-5 py-3 rounded-full shadow-md text-center cursor-pointer transition-all active:scale-95 whitespace-nowrap"
                  >
                    {isEs ? "Planificar con Sisari Bot 🌸" : "Plan with Sisari Bot 🌸"}
                  </button>
                  <button
                    onClick={() => {
                      scrollToId("contacto");
                    }}
                    className="bg-white/10 hover:bg-white/20 text-white font-extrabold text-[10px] uppercase tracking-wider px-4 py-2 rounded-full text-center cursor-pointer transition-all"
                  >
                    {isEs ? "Consultar Tarifas Especiales" : "Inquire Special Rates"}
                  </button>
                </div>
              </div>

              {/* Back to index trigger underpost */}
              <div className="pt-4 flex justify-start">
                <button
                  type="button"
                  onClick={() => {
                    setActivePost(null);
                    window.scrollTo({ top: 0, behavior: "smooth" });
                  }}
                  className="text-xs font-semibold text-brand-pink hover:underline flex items-center gap-1 cursor-pointer"
                >
                  ← {isEs ? "Ver más noticias y artículos de viaje" : "Browse all articles and news guidelines"}
                </button>
              </div>

            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
