import React, { useState } from "react";
import { 
  X, 
  Plus, 
  Edit, 
  Trash2, 
  Save, 
  RotateCcw, 
  Settings, 
  Globe, 
  Image as ImageIcon, 
  Check, 
  AlertCircle,
  HelpCircle,
  Clock,
  Compass,
  DollarSign,
  MapPin,
  ArrowUp,
  ArrowDown,
  BookOpen,
  FileText,
  Bot,
  Users,
  Search,
  MessageSquare,
  FileEdit,
  Sliders,
  ChevronRight,
  Sparkles
} from "lucide-react";
import { DestinationPackage, BlogPost, CMSContent, BotConfig, CRMLead, BotPresetItem } from "../types";
import { PACKAGES } from "../data";
import { DEFAULT_BLOG_POSTS, DEFAULT_CMS_CONTENT, DEFAULT_BOT_CONFIG, DEFAULT_CRM_LEADS } from "../initialCMSData";

interface AdminConsoleProps {
  packages: DestinationPackage[];
  onSavePackages: (updatedPackages: DestinationPackage[]) => void;
  
  blogPosts: BlogPost[];
  onSaveBlogPosts: (updatedBlogPosts: BlogPost[]) => void;
  
  cmsContent: CMSContent;
  onSaveCMSContent: (updatedCMS: CMSContent) => void;
  
  botConfig: BotConfig;
  onSaveBotConfig: (updatedBot: BotConfig) => void;
  
  crmLeads: CRMLead[];
  onSaveCRMLeads: (updatedLeads: CRMLead[]) => void;
  
  onClose: () => void;
}

const PRESET_IMAGES = [
  { name: "[Local] Millpu", url: "/src/assets/images/sisari_millpu_hero_1779988973258.png" },
  { name: "[Local] City Tour", url: "https://images.unsplash.com/photo-1628155930542-3c7a64e2c833?w=600&auto=format&fit=crop&q=80" },
  { name: "[Local] Quinua", url: "https://images.unsplash.com/photo-1584551246679-0daf3d275d0f?w=600&auto=format&fit=crop&q=80" },
  { name: "[Local] Wari", url: "https://images.unsplash.com/photo-1596176530529-78163a4f7af2?w=600&auto=format&fit=crop&q=80" },
  { name: "[Nacional] Cusco & Machu Picchu", url: "/src/assets/images/sisari_machupicchu_1779988993493.png" },
  { name: "[Nacional] Huacachina Ica", url: "https://images.unsplash.com/photo-1509316975850-ff9c5deb0cd9?w=600&auto=format&fit=crop&q=80" },
  { name: "[Nacional] Oxapampa Jungle", url: "https://images.unsplash.com/photo-1516026672322-bc52d61a55d5?w=600&auto=format&fit=crop&q=80" },
  { name: "[Nacional] Iquitos Amazonas", url: "https://images.unsplash.com/photo-1549692520-acc6622b22b1?w=600&auto=format&fit=crop&q=80" },
  { name: "[Nacional] Paracas Marina", url: "https://images.unsplash.com/photo-1527112841300-300fc7db86f5?w=600&auto=format&fit=crop&q=80" },
  { name: "[Nacional] Nazca Desert", url: "https://images.unsplash.com/photo-1580618672591-eb180b1a973f?w=600&auto=format&fit=crop&q=80" },
  { name: "[Int.] Buenos Aires", url: "https://images.unsplash.com/photo-1589909202802-8f4aadce1849?w=600&auto=format&fit=crop&q=80" },
  { name: "[Int.] Cali Colombia", url: "https://images.unsplash.com/photo-1583531172005-814191b8b6c0?w=600&auto=format&fit=crop&q=80" }
];

export default function AdminConsole({ 
  packages, onSavePackages, 
  blogPosts, onSaveBlogPosts, 
  cmsContent, onSaveCMSContent,
  botConfig, onSaveBotConfig,
  crmLeads, onSaveCRMLeads,
  onClose 
}: AdminConsoleProps) {
  
  // Navigation Tabs for Admin Console
  const [activeTab, setActiveTab] = useState<"packages" | "blog" | "cms" | "bot" | "crm">("packages");
  
  const [searchTerm, setSearchTerm] = useState("");
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [successMsg, setSuccessMsg] = useState<string | null>(null);

  // ==========================================
  // PACKAGE TAB STATE & HANDLERS
  // ==========================================
  const [editingPackage, setEditingPackage] = useState<DestinationPackage | null>(null);
  const [isCreatingNewPackage, setIsCreatingNewPackage] = useState(false);
  const [packageFilter, setPackageFilter] = useState<"all" | "local" | "national" | "international">("all");

  // Package Form states
  const [pId, setPId] = useState("");
  const [pTitle, setPTitle] = useState("");
  const [pCategory, setPCategory] = useState<"local" | "national" | "international">("local");
  const [pLocation, setPLocation] = useState("");
  const [pPrice, setPPrice] = useState("");
  const [pDuration, setPDuration] = useState("");
  const [pDifficulty, setPDifficulty] = useState<"Fácil" | "Moderado" | "Exigente">("Fácil");
  const [pDescription, setPDescription] = useState("");
  const [pHighlightsText, setPHighlightsText] = useState("");
  const [pImage, setPImage] = useState("");
  const [pWhatsAppText, setPWhatsAppText] = useState("");
  const [pInclusionsText, setPInclusionsText] = useState("");
  const [pExclusionsText, setPExclusionsText] = useState("");

  const resetPackageForm = () => {
    setPId("");
    setPTitle("");
    setPCategory("local");
    setPLocation("");
    setPPrice("");
    setPDuration("");
    setPDifficulty("Fácil");
    setPDescription("");
    setPHighlightsText("");
    setPImage(PRESET_IMAGES[0].url);
    setPWhatsAppText("");
    setPInclusionsText("");
    setPExclusionsText("");
    setErrorMsg(null);
  };

  const startEditPackage = (pkg: DestinationPackage) => {
    setEditingPackage(pkg);
    setIsCreatingNewPackage(false);
    
    setPId(pkg.id);
    setPTitle(pkg.title);
    setPCategory(pkg.category);
    setPLocation(pkg.location);
    setPPrice(pkg.price);
    setPDuration(pkg.duration);
    setPDifficulty(pkg.difficulty);
    setPDescription(pkg.description || "");
    setPHighlightsText(pkg.highlights.join("\n"));
    setPImage(pkg.image || "");
    setPWhatsAppText(pkg.whatsAppText || "");
    setPInclusionsText(pkg.inclusions ? pkg.inclusions.join("\n") : "");
    setPExclusionsText(pkg.exclusions ? pkg.exclusions.join("\n") : "");
    setErrorMsg(null);
  };

  const startCreatePackage = () => {
    resetPackageForm();
    setIsCreatingNewPackage(true);
    setEditingPackage(null);
    setPId("pkg_" + Date.now());
  };

  const handleSavePackage = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg(null);

    if (!pTitle.trim()) return setErrorMsg("El título del paquete es obligatorio.");
    if (!pLocation.trim()) return setErrorMsg("La ubicación es obligatoria.");
    if (!pPrice.trim()) return setErrorMsg("El precio es obligatorio.");
    if (!pDuration.trim()) return setErrorMsg("La duración es obligatoria.");

    const parsedHighlights = pHighlightsText.split("\n").map(l => l.trim()).filter(l => l.length > 0);
    const parsedInclusions = pInclusionsText.split("\n").map(l => l.trim()).filter(l => l.length > 0);
    const parsedExclusions = pExclusionsText.split("\n").map(l => l.trim()).filter(l => l.length > 0);

    const finalWhatsAppText = pWhatsAppText.trim() || `¡Hola! Me gustaría consultar por el paquete ${pTitle} de Sisari Travel.`;

    const updatedPkg: DestinationPackage = {
      id: pId,
      title: pTitle.trim(),
      category: pCategory,
      location: pLocation.trim(),
      price: pPrice.trim(),
      duration: pDuration.trim(),
      difficulty: pDifficulty,
      description: pDescription.trim(),
      highlights: parsedHighlights.length > 0 ? parsedHighlights : ["Exploración escénica guiada"],
      image: pImage.trim() || PRESET_IMAGES[0].url,
      whatsAppText: finalWhatsAppText,
      inclusions: parsedInclusions.length > 0 ? parsedInclusions : ["Transporte turístico", "Guía profesional"],
      exclusions: parsedExclusions.length > 0 ? parsedExclusions : ["Souvenirs", "Gastos personales"],
      itinerary: editingPackage?.itinerary || [
        {
          day: 1,
          title: "Inicio y aventura espectacular guiada",
          description: `Recorrido para explorar las maravillas de ${pTitle.trim()} con asistencia local.`
        }
      ],
      faqs: editingPackage?.faqs || [
        { q: "¿Qué debo vestir?", a: "Recomendamos ropa cómoda y zapatillas antideslizantes." }
      ]
    };

    let newPackagesList: DestinationPackage[] = [];
    if (isCreatingNewPackage) {
      newPackagesList = [...packages, updatedPkg];
    } else {
      newPackagesList = packages.map(pkg => pkg.id === pId ? updatedPkg : pkg);
    }

    onSavePackages(newPackagesList);
    showSuccessToast(isCreatingNewPackage ? "¡Paquete creado con éxito!" : "¡Paquete actualizado con éxito!");
    setEditingPackage(null);
    setIsCreatingNewPackage(false);
    resetPackageForm();
  };

  const handleDeletePackage = (id: string, title: string) => {
    if (window.confirm(`¿Estás seguro de que deseas eliminar el paquete "${title}"?`)) {
      const remaining = packages.filter(p => p.id !== id);
      onSavePackages(remaining);
      showSuccessToast("Paquete eliminado del catálogo.");
      if (pId === id) {
        resetPackageForm();
        setEditingPackage(null);
        setIsCreatingNewPackage(false);
      }
    }
  };

  // Reordering packages logic
  const handleMovePackage = (index: number, direction: "up" | "down") => {
    const newIdx = direction === "up" ? index - 1 : index + 1;
    if (newIdx < 0 || newIdx >= packages.length) return;
    
    const updatedList = [...packages];
    const temp = updatedList[index];
    updatedList[index] = updatedList[newIdx];
    updatedList[newIdx] = temp;
    
    onSavePackages(updatedList);
    showSuccessToast("Orden de paquetes reestructurado.");
  };

  // ==========================================
  // BLOG TAB STATE & HANDLERS
  // ==========================================
  const [editingPost, setEditingPost] = useState<BlogPost | null>(null);
  const [isCreatingNewPost, setIsCreatingNewPost] = useState(false);

  // Blog Form States
  const [bId, setBId] = useState("");
  const [bTitleEs, setBTitleEs] = useState("");
  const [bTitleEn, setBTitleEn] = useState("");
  const [bSubtitleEs, setBSubtitleEs] = useState("");
  const [bSubtitleEn, setBSubtitleEn] = useState("");
  const [bContentEs, setBContentEs] = useState("");
  const [bContentEn, setBContentEn] = useState("");
  const [bImage, setBImage] = useState("");
  const [bCategory, setBCategory] = useState<"Consejos" | "Destinos" | "Cultura" | "Aventura">("Consejos");
  const [bReadTimeEs, setBReadTimeEs] = useState("5 min de lectura");
  const [bReadTimeEn, setBReadTimeEn] = useState("5 min read");
  const [bAuthor, setBAuthor] = useState("Administración");

  const resetBlogForm = () => {
    setBId("");
    setBTitleEs("");
    setBTitleEn("");
    setBSubtitleEs("");
    setBSubtitleEn("");
    setBContentEs("");
    setBContentEn("");
    setBImage("https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?w=600&auto=format&fit=crop&q=80");
    setBCategory("Consejos");
    setBReadTimeEs("5 min de lectura");
    setBReadTimeEn("5 min read");
    setBAuthor("Sari Travel Team");
    setErrorMsg(null);
  };

  const startEditPost = (post: BlogPost) => {
    setEditingPost(post);
    setIsCreatingNewPost(false);
    
    setBId(post.id);
    setBTitleEs(post.titleEs);
    setBTitleEn(post.titleEn);
    setBSubtitleEs(post.subtitleEs);
    setBSubtitleEn(post.subtitleEn);
    setBContentEs(post.contentEs);
    setBContentEn(post.contentEn);
    setBImage(post.image);
    setBCategory(post.category as any);
    setBReadTimeEs(post.readTimeEs);
    setBReadTimeEn(post.readTimeEn);
    setBAuthor(post.author);
    setErrorMsg(null);
  };

  const startCreatePost = () => {
    resetBlogForm();
    setIsCreatingNewPost(true);
    setEditingPost(null);
    setBId("blog_" + Date.now());
  };

  const handleSavePost = (e: React.FormEvent) => {
    e.preventDefault();
    if (!bTitleEs.trim() || !bContentEs.trim()) {
      return setErrorMsg("El título y contenido en Español son requeridos.");
    }

    const updatedPost: BlogPost = {
      id: bId,
      titleEs: bTitleEs.trim(),
      titleEn: bTitleEn.trim() || bTitleEs.trim(),
      subtitleEs: bSubtitleEs.trim(),
      subtitleEn: bSubtitleEn.trim() || bSubtitleEs.trim(),
      contentEs: bContentEs,
      contentEn: bContentEn || bContentEs,
      image: bImage.trim() || "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?w=600&auto=format&fit=crop&q=80",
      category: bCategory,
      date: editingPost?.date || new Date().toISOString().split("T")[0],
      readTimeEs: bReadTimeEs,
      readTimeEn: bReadTimeEn,
      author: bAuthor.trim() || "Sari Travel Admin"
    };

    let newPostsList: BlogPost[] = [];
    if (isCreatingNewPost) {
      newPostsList = [updatedPost, ...blogPosts]; // Insert at start
    } else {
      newPostsList = blogPosts.map(post => post.id === bId ? updatedPost : post);
    }

    onSaveBlogPosts(newPostsList);
    showSuccessToast(isCreatingNewPost ? "¡Artículo de blog publicado!" : "¡Artículo actualizado con éxito!");
    setEditingPost(null);
    setIsCreatingNewPost(false);
    resetBlogForm();
  };

  const handleDeletePost = (id: string, title: string) => {
    if (window.confirm(`¿Estás seguro de que deseas eliminar el artículo de blog "${title}"?`)) {
      const remaining = blogPosts.filter(p => p.id !== id);
      onSaveBlogPosts(remaining);
      showSuccessToast("Artículo de blog borrado permanentemente.");
      if (bId === id) {
        resetBlogForm();
        setEditingPost(null);
        setIsCreatingNewPost(false);
      }
    }
  };

  const handleMovePost = (index: number, direction: "up" | "down") => {
    const newIdx = direction === "up" ? index - 1 : index + 1;
    if (newIdx < 0 || newIdx >= blogPosts.length) return;
    
    const updatedList = [...blogPosts];
    const temp = updatedList[index];
    updatedList[index] = updatedList[newIdx];
    updatedList[newIdx] = temp;
    
    onSaveBlogPosts(updatedList);
    showSuccessToast("Prioridad del blog reordenada.");
  };

  // ==========================================
  // CMS CONTENT TAB STATE & HANDLERS
  // ==========================================
  const [cmsForm, setCmsForm] = useState<CMSContent>({ ...cmsContent });

  const handleSaveCMS = (e: React.FormEvent) => {
    e.preventDefault();
    onSaveCMSContent(cmsForm);
    showSuccessToast("¡Páginas y textos estáticos actualizados de forma global!");
  };

  // ==========================================
  // BOT CONFIGURATION TAB STATE & HANDLERS
  // ==========================================
  const [botForm, setBotForm] = useState<BotConfig>({ ...botConfig });
  const [newPresetPattern, setNewPresetPattern] = useState("");
  const [newPresetResponseEs, setNewPresetResponseEs] = useState("");
  const [newPresetResponseEn, setNewPresetResponseEn] = useState("");

  const handleAddPreset = () => {
    if (!newPresetPattern.trim() || !newPresetResponseEs.trim()) {
      return alert("El patrón clave y la respuesta en Español son obligatorios.");
    }
    const newItem: BotPresetItem = {
      pattern: newPresetPattern.trim().toLowerCase(),
      responseEs: newPresetResponseEs.trim(),
      responseEn: newPresetResponseEn.trim() || newPresetResponseEs.trim()
    };
    
    setBotForm(prev => ({
      ...prev,
      presets: [...prev.presets, newItem]
    }));
    setNewPresetPattern("");
    setNewPresetResponseEs("");
    setNewPresetResponseEn("");
  };

  const handleRemovePreset = (index: number) => {
    setBotForm(prev => ({
      ...prev,
      presets: prev.presets.filter((_, idx) => idx !== index)
    }));
  };

  const handleSaveBot = (e: React.FormEvent) => {
    e.preventDefault();
    onSaveBotConfig(botForm);
    showSuccessToast("¡Parámetros y respuestas clave del Bot actualizados con éxito!");
  };

  // ==========================================
  // CRM LEADS TAB STATE & HANDLERS
  // ==========================================
  const [selectedLead, setSelectedLead] = useState<CRMLead | null>(null);
  const [crmSearchStr, setCrmSearchStr] = useState("");
  const [crmFilterStatus, setCrmFilterStatus] = useState<"all" | "Nuevo" | "En Contacto" | "Vendido" | "Cancelado">("all");
  
  const [leadStatusVal, setLeadStatusVal] = useState<CRMLead["status"]>("Nuevo");
  const [leadNotesVal, setLeadNotesVal] = useState("");
  const [leadAgentVal, setLeadAgentVal] = useState("");

  const startEditLead = (lead: CRMLead) => {
    setSelectedLead(lead);
    setLeadStatusVal(lead.status);
    setLeadNotesVal(lead.notes || "");
    setLeadAgentVal(lead.assignedTo || "");
  };

  const handleSaveLeadDetail = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedLead) return;

    const updatedLeads = crmLeads.map(lead => {
      if (lead.id === selectedLead.id) {
        return {
          ...lead,
          status: leadStatusVal,
          notes: leadNotesVal,
          assignedTo: leadAgentVal
        };
      }
      return lead;
    });

    onSaveCRMLeads(updatedLeads);
    showSuccessToast("¡Historial de cliente actualizado en el CRM!");
    setSelectedLead(null);
  };

  const handleDeleteLead = (id: string, clientName: string) => {
    if (window.confirm(`¿Estás completamente seguro de depurar de forma permanente el lead de "${clientName}"?`)) {
      onSaveCRMLeads(crmLeads.filter(l => l.id !== id));
      showSuccessToast("Lead eliminado del CRM.");
      setSelectedLead(null);
    }
  };

  // Utility helpers
  const showSuccessToast = (msg: string) => {
    setSuccessMsg(msg);
    setTimeout(() => setSuccessMsg(null), 3000);
  };

  const handleResetEverythingToDefault = () => {
    if (window.confirm("¿Seguro que deseas reiniciar TODA la base de datos de Sisari Travel (Paquetes, Blog, Textos, Config del Bot y CRM) a los valores por defecto? Se perderá cualquier personalización actual.")) {
      onSavePackages(PACKAGES);
      onSaveBlogPosts(DEFAULT_BLOG_POSTS);
      onSaveCMSContent(DEFAULT_CMS_CONTENT);
      onSaveBotConfig(DEFAULT_BOT_CONFIG);
      onSaveCRMLeads(DEFAULT_CRM_LEADS);
      showSuccessToast("¡Sistema completo restablecido de forma holística!");
      
      // Sync internal forms
      setCmsForm({ ...DEFAULT_CMS_CONTENT });
      setBotForm({ ...DEFAULT_BOT_CONFIG });
      resetPackageForm();
      setEditingPackage(null);
      setEditingPost(null);
      setSelectedLead(null);
    }
  };

  // Filters for CRM
  const filteredLeads = crmLeads.filter(lead => {
    const matchesSearch = lead.name.toLowerCase().includes(crmSearchStr.toLowerCase()) || 
                          lead.destination.toLowerCase().includes(crmSearchStr.toLowerCase()) ||
                          lead.phone.includes(crmSearchStr);
    const matchesStatus = crmFilterStatus === "all" || lead.status === crmFilterStatus;
    return matchesSearch && matchesStatus;
  });

  return (
    <div className="fixed inset-0 bg-brand-charcoal/45 backdrop-blur-md z-50 flex items-center justify-center p-4 overflow-hidden">
      <div className="bg-white rounded-[32px] shadow-2xl w-full max-w-6xl h-[92vh] flex flex-col overflow-hidden border border-brand-pink/15 animate-fade-in font-sans">
        
        {/* TAB HEADER BAR */}
        <div className="px-6 py-5 border-b border-brand-pink/10 flex flex-col md:flex-row md:items-center justify-between gap-4 bg-gradient-to-r from-brand-pink/5 via-transparent to-brand-orange/5 shrink-0">
          <div className="flex items-center gap-3">
            <div className="bg-[#1a1a1a] text-white p-2.5 rounded-2xl">
              <Sliders className="w-5.5 h-5.5 text-brand-pink animate-pulse" />
            </div>
            <div>
              <h2 className="font-display font-extrabold text-xl lg:text-2xl text-brand-charcoal flex items-center gap-2">
                Consola General del Administrador
                <span className="bg-brand-orange/15 text-brand-orange border border-brand-orange/10 font-mono text-[9px] font-black uppercase px-2 py-0.5 rounded-full tracking-widest leading-none shrink-0">
                  Sisari Hub
                </span>
              </h2>
              <p className="text-[11px] text-brand-charcoal/60 mt-0.5">
                Panel integral e intuitivo para actualizar catálogos de paquetes, publicar entradas de blog, personalizar textos estáticos y gestionar el CRM y las respuestas del Chatbot.
              </p>
            </div>
          </div>
          <button 
            onClick={onClose}
            className="p-2 bg-neutral-100 hover:bg-brand-pink/10 text-neutral-500 hover:text-brand-pink rounded-full transition-all cursor-pointer shadow-sm self-end md:self-center"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* METRICS & BANNER FLAGS */}
        {successMsg && (
          <div className="bg-emerald-50 border-y border-emerald-200/60 px-6 py-3 text-emerald-800 text-xs font-semibold flex items-center gap-2 shrink-0 animate-bounce-subtle">
            <Check className="w-4 h-4 text-emerald-600 font-extrabold shrink-0" />
            <span>{successMsg}</span>
          </div>
        )}

        {/* NAVIGATION TAB CONTROLLERS */}
        <div className="bg-neutral-50 border-b border-neutral-100 px-6 py-2 shrink-0 flex gap-2 overflow-x-auto no-scrollbar">
          <button 
            onClick={() => { setActiveTab("packages"); setSearchTerm(""); }}
            className={`px-4 py-2 rounded-xl text-xs font-extrabold uppercase tracking-wide gap-1.5 transition-all flex items-center shrink-0 ${
              activeTab === "packages" ? "bg-white text-brand-pink shadow-xs border-b-2 border-brand-pink" : "hover:bg-neutral-100 text-neutral-600"
            }`}
          >
            <Compass className="w-4 h-4 shrink-0" />
            <span>📦 Paquetes ({packages.length})</span>
          </button>

          <button 
            onClick={() => { setActiveTab("blog"); setSearchTerm(""); }}
            className={`px-4 py-2 rounded-xl text-xs font-extrabold uppercase tracking-wide gap-1.5 transition-all flex items-center shrink-0 ${
              activeTab === "blog" ? "bg-white text-brand-pink shadow-xs border-b-2 border-brand-pink" : "hover:bg-neutral-100 text-neutral-600"
            }`}
          >
            <BookOpen className="w-4 h-4 shrink-0 text-amber-500" />
            <span>✍️ Blog y Noticias ({blogPosts.length})</span>
          </button>

          <button 
            onClick={() => { setActiveTab("cms"); setSearchTerm(""); }}
            className={`px-4 py-2 rounded-xl text-xs font-extrabold uppercase tracking-wide gap-1.5 transition-all flex items-center shrink-0 ${
              activeTab === "cms" ? "bg-white text-brand-pink shadow-xs border-b-2 border-brand-pink" : "hover:bg-neutral-100 text-neutral-600"
            }`}
          >
            <FileEdit className="w-4 h-4 shrink-0 text-cyan-600" />
            <span>💻 CMS de Páginas</span>
          </button>

          <button 
            onClick={() => { setActiveTab("bot"); setSearchTerm(""); }}
            className={`px-4 py-2 rounded-xl text-xs font-extrabold uppercase tracking-wide gap-1.5 transition-all flex items-center shrink-0 ${
              activeTab === "bot" ? "bg-white text-brand-pink shadow-xs border-b-2 border-brand-pink" : "hover:bg-neutral-100 text-neutral-600"
            }`}
          >
            <Bot className="w-4 h-4 shrink-0 text-purple-600" />
            <span>🤖 Respuestas Bot ({botForm.presets.length})</span>
          </button>

          <button 
            onClick={() => { setActiveTab("crm"); setSearchTerm(""); }}
            className={`px-4 py-2 rounded-xl text-xs font-extrabold uppercase tracking-wide gap-1.5 transition-all flex items-center shrink-0 ${
              activeTab === "crm" ? "bg-white text-brand-pink shadow-xs border-b-2 border-brand-pink" : "hover:bg-neutral-100 text-neutral-600"
            }`}
          >
            <Users className="w-4 h-4 shrink-0 text-emerald-600 animate-pulse" />
            <span className="flex items-center gap-1.5">
              📊 CRM de Clientes
              {crmLeads.filter(l => l.status === "Nuevo").length > 0 && (
                <span className="bg-red-500 text-white font-black text-[9px] px-1.5 py-0.5 rounded-full animate-pulse leading-none">
                  {crmLeads.filter(l => l.status === "Nuevo").length}
                </span>
              )}
            </span>
          </button>
        </div>

        {/* WORKSPACE AREA COMPONENTS */}
        <div className="flex-1 flex overflow-hidden min-h-0">
          
          {/* ==================================================================== */}
          {/* TAB 1: PACKAGES CATALOG MANAGER */}
          {/* ==================================================================== */}
          {activeTab === "packages" && (
            <div className="flex-1 flex overflow-hidden w-full">
              {/* Left Column list */}
              <div className="w-full md:w-5/12 border-r border-[#eaeaea] flex flex-col bg-[#faf9f8] overflow-hidden">
                <div className="p-4 border-b border-[#eaeaea] flex flex-col gap-3 shrink-0 bg-white">
                  <div className="flex gap-2">
                    <div className="relative flex-1">
                      <Search className="w-3.5 h-3.5 absolute left-3 top-2.5 text-neutral-400" />
                      <input
                        type="text"
                        placeholder="Buscar paquete..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="w-full pl-8 pr-3 py-2 text-xs border border-brand-pink/15 rounded-xl bg-neutral-50/50 focus:bg-white focus:ring-1 focus:ring-brand-pink outline-none"
                      />
                    </div>
                    <button
                      onClick={startCreatePackage}
                      className="bg-brand-pink text-white hover:bg-brand-pink/90 px-3.5 py-2 rounded-xl text-xs font-extrabold flex items-center gap-1 transition-all active:scale-95 whitespace-nowrap cursor-pointer shadow-sm"
                    >
                      <Plus className="w-3.5 h-3.5" /> Agregar
                    </button>
                  </div>

                  <div className="flex gap-1 overflow-x-auto pb-0.5 no-scrollbar">
                    {(["all", "local", "national", "international"] as const).map(cat => (
                      <button
                        key={cat}
                        onClick={() => setPackageFilter(cat)}
                        className={`text-[9px] font-bold uppercase px-3 py-1.5 rounded-lg border whitespace-nowrap cursor-pointer transition-all ${
                          packageFilter === cat 
                            ? "bg-brand-charcoal text-white border-brand-charcoal shadow-sm" 
                            : "bg-white text-neutral-600 border-neutral-200 hover:bg-neutral-50"
                        }`}
                      >
                        {cat === "all" ? "Todos" : cat === "local" ? "🏝️ Locales" : cat === "national" ? "⛰️ Nac." : "✈️ Int."}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Scroller packages with mover handles */}
                <div className="flex-1 overflow-y-auto p-4 space-y-3.5 no-scrollbar">
                  {packages
                    .map((p, idx) => ({ p, idx }))
                    .filter(({ p }) => {
                      const mSState = p.title.toLowerCase().includes(searchTerm.toLowerCase()) || p.location.toLowerCase().includes(searchTerm.toLowerCase());
                      const mCState = packageFilter === "all" || p.category === packageFilter;
                      return mSState && mCState;
                    })
                    .map(({ p: pkg, idx }) => (
                      <div 
                        key={pkg.id}
                        className={`p-3.5 rounded-2xl border transition-all ${
                          editingPackage?.id === pkg.id 
                            ? "bg-brand-pink/5 border-brand-pink/40 shadow-xs" 
                            : "bg-white border-neutral-100 hover:border-brand-pink/20 hover:shadow-xs"
                        }`}
                      >
                        <div className="flex gap-3">
                          <img 
                            src={pkg.image} 
                            alt={pkg.title}
                            className="w-16 h-12 object-cover rounded-xl shrink-0 border border-neutral-100"
                            referrerPolicy="no-referrer"
                          />
                          <div className="min-w-0 flex-1">
                            <div className="flex items-center justify-between gap-1">
                              <span className={`text-[8px] font-black uppercase px-2 py-0.5 rounded-md ${
                                pkg.category === "local" ? "bg-sky-50 text-sky-700 border border-sky-100" :
                                pkg.category === "national" ? "bg-amber-50 text-amber-700 border border-amber-100" : "bg-purple-50 text-purple-700 border border-purple-100"
                              }`}>
                                {pkg.category === "local" ? "Local" : pkg.category === "national" ? "Nac" : "Int"}
                              </span>
                              <span className="font-mono font-black text-xs text-brand-pink">
                                {pkg.price}
                              </span>
                            </div>
                            <h4 className="font-display font-bold text-xs text-brand-charcoal truncate mt-1">
                              {pkg.title}
                            </h4>
                            <p className="text-[10px] text-neutral-500 flex items-center gap-0.5 truncate mt-0.5">
                              <MapPin className="w-3 h-3 text-neutral-400" /> {pkg.location}
                            </p>
                          </div>
                        </div>

                        {/* Card controls including prioritizer */}
                        <div className="flex items-center justify-between gap-1.5 mt-3 pt-2.5 border-t border-neutral-100">
                          {/* Sorter moves */}
                          <div className="flex items-center gap-1 bg-neutral-100 rounded-md p-0.5">
                            <button
                              type="button"
                              onClick={() => handleMovePackage(idx, "up")}
                              disabled={idx === 0}
                              className="p-1 text-neutral-600 hover:text-brand-pink disabled:opacity-30 disabled:pointer-events-none transition-colors"
                              title="Subir prioridad en catálogo"
                            >
                              <ArrowUp className="w-3 h-3" />
                            </button>
                            <button
                              type="button"
                              onClick={() => handleMovePackage(idx, "down")}
                              disabled={idx === packages.length - 1}
                              className="p-1 text-neutral-600 hover:text-brand-pink disabled:opacity-30 disabled:pointer-events-none transition-colors"
                              title="Bajar prioridad en catálogo"
                            >
                              <ArrowDown className="w-3 h-3" />
                            </button>
                          </div>

                          <div className="flex items-center gap-1.5">
                            <button
                              onClick={() => startEditPackage(pkg)}
                              className="px-2.5 py-1 rounded-lg text-[10px] bg-brand-charcoal/5 hover:bg-brand-pink/10 hover:text-brand-pink text-brand-charcoal font-black transition-all cursor-pointer flex items-center gap-1"
                            >
                              <Edit className="w-3 h-3" /> Editar
                            </button>
                            <button
                              onClick={() => handleDeletePackage(pkg.id, pkg.title)}
                              className="px-2.5 py-1 rounded-lg text-[10px] bg-red-50 hover:bg-red-100 text-red-600 font-bold transition-all cursor-pointer flex items-center gap-1"
                            >
                              <Trash2 className="w-3 h-3" /> Borrar
                            </button>
                          </div>
                        </div>
                      </div>
                    ))}
                </div>
              </div>

              {/* Right Column Form */}
              <div className="hidden md:flex flex-1 flex-col overflow-y-auto p-6 bg-white space-y-4">
                {(!editingPackage && !isCreatingNewPackage) ? (
                  <div className="h-full flex flex-col items-center justify-center text-center py-20">
                    <Compass className="w-12 h-12 text-brand-pink/30 mb-3 animate-bounce-subtle" />
                    <h4 className="font-display font-black text-sm text-brand-charcoal">Configurar Paquetes</h4>
                    <p className="text-[11px] text-neutral-500 max-w-xs mt-1">
                      Elige cualquier destino a la izquierda para editar sus fotos, precios y descripciones de ruta, o crea uno nuevo de inmediato.
                    </p>
                  </div>
                ) : (
                  <form onSubmit={handleSavePackage} className="space-y-4 text-xs">
                    <div className="pb-3 border-b border-neutral-100 flex items-center justify-between">
                      <h3 className="font-display font-extrabold text-[#e12d8a] uppercase tracking-wide">
                        {isCreatingNewPackage ? "✨ Creando Nuevo Paquete Turístico" : `✍️ Editando: ${pTitle}`}
                      </h3>
                      <button 
                        type="button"
                        onClick={() => { resetPackageForm(); setEditingPackage(null); setIsCreatingNewPackage(false); }}
                        className="text-[11px] text-neutral-400 hover:text-red-500 transition-colors"
                      >
                        Cancelar
                      </button>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-1">
                        <label className="font-black text-neutral-700">Título del Paquete *</label>
                        <input
                          type="text"
                          value={pTitle}
                          onChange={(e) => setPTitle(e.target.value)}
                          placeholder="Ej. Bosques Sagrados de Rurujurujam"
                          className="w-full px-3 py-2 border border-neutral-200 rounded-xl focus:ring-1 focus:ring-brand-pink focus:border-brand-pink outline-none"
                          required
                        />
                      </div>
                      <div className="space-y-1">
                        <label className="font-black text-neutral-700">Ubicación Territorial *</label>
                        <input
                          type="text"
                          value={pLocation}
                          onChange={(e) => setPLocation(e.target.value)}
                          placeholder="Ej. Ayacucho, Perú"
                          className="w-full px-3 py-2 border border-neutral-200 rounded-xl focus:ring-1 focus:ring-brand-pink focus:border-brand-pink outline-none"
                          required
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-3 gap-3">
                      <div className="space-y-1">
                        <label className="font-black text-neutral-700">Categoría</label>
                        <select
                          value={pCategory}
                          onChange={(e) => setPCategory(e.target.value as any)}
                          className="w-full px-2.5 py-2 border border-neutral-200 bg-white rounded-xl focus:ring-1 focus:ring-brand-pink outline-none"
                        >
                          <option value="local">Ayacucho (Local)</option>
                          <option value="national">Perú (Nacional)</option>
                          <option value="international">Exterior (Internacional)</option>
                        </select>
                      </div>
                      <div className="space-y-1">
                        <label className="font-black text-neutral-700">Precio Lista *</label>
                        <input
                          type="text"
                          value={pPrice}
                          onChange={(e) => setPPrice(e.target.value)}
                          placeholder="S/. 95 o $ 220"
                          className="w-full px-3 py-2 border border-neutral-200 rounded-xl focus:ring-1 focus:ring-brand-pink outline-none"
                          required
                        />
                      </div>
                      <div className="space-y-1">
                        <label className="font-black text-neutral-700">Duración Estancia *</label>
                        <input
                          type="text"
                          value={pDuration}
                          onChange={(e) => setPDuration(e.target.value)}
                          placeholder="Full Day, 3 Días / 2 Noches"
                          className="w-full px-3 py-2 border border-neutral-200 rounded-xl focus:ring-1 focus:ring-brand-pink outline-none"
                          required
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-1">
                        <label className="font-black text-neutral-700">Física de Dificultad</label>
                        <select
                          value={pDifficulty}
                          onChange={(e) => setPDifficulty(e.target.value as any)}
                          className="w-full px-3 py-2 border border-neutral-200 bg-white rounded-xl focus:ring-1 focus:ring-brand-pink outline-none"
                        >
                          <option value="Fácil">Fácil</option>
                          <option value="Moderado">Moderado</option>
                          <option value="Exigente">Exigente</option>
                        </select>
                      </div>
                      <div className="space-y-1">
                        <label className="font-black text-neutral-700">Imagen de Portada (URL)</label>
                        <input
                          type="text"
                          value={pImage}
                          onChange={(e) => setPImage(e.target.value)}
                          placeholder="https://images.unsplash.com/..."
                          className="w-full px-3 py-2 border border-neutral-200 rounded-xl focus:ring-1 focus:ring-brand-pink outline-none"
                        />
                      </div>
                    </div>

                    <div className="space-y-1">
                      <label className="font-black text-neutral-700 font-mono block">O elige de la galería prediseñada:</label>
                      <div className="flex flex-wrap gap-1.5 p-2 bg-neutral-50 rounded-xl max-h-16 overflow-y-auto border border-neutral-100">
                        {PRESET_IMAGES.map((pr, i) => (
                          <button
                            key={i}
                            type="button"
                            onClick={() => setPImage(pr.url)}
                            className={`px-2 py-1 rounded-md text-[9px] border cursor-pointer ${
                              pImage === pr.url ? "bg-brand-pink text-white border-brand-pink font-bold" : "bg-white text-neutral-600 hover:bg-neutral-100"
                            }`}
                          >
                            {pr.name}
                          </button>
                        ))}
                      </div>
                    </div>

                    <div className="space-y-1">
                      <label className="font-black text-neutral-700 block">Descripción breve</label>
                      <textarea
                        value={pDescription}
                        onChange={(e) => setPDescription(e.target.value)}
                        rows={2}
                        placeholder="Descripción cautivadora del viaje..."
                        className="w-full px-3 py-2 border border-neutral-200 rounded-xl focus:ring-1 focus:ring-brand-pink resize-none"
                      />
                    </div>

                    <div className="space-y-1">
                      <label className="font-black text-neutral-700 block">Atractivos Principales (Línea por línea)</label>
                      <textarea
                        value={pHighlightsText}
                        onChange={(e) => setPHighlightsText(e.target.value)}
                        rows={2}
                        placeholder="Senderismo guiada&#10;Baño termal medicinal&#10;Cata de quesos rústicos"
                        className="w-full px-3 py-2 border border-neutral-200 rounded-xl focus:ring-1 focus:ring-brand-pink resize-none font-mono text-[10px]"
                      />
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-1">
                        <label className="font-black text-neutral-700 block">¿Qué Incluye el Tour?</label>
                        <textarea
                          value={pInclusionsText}
                          onChange={(e) => setPInclusionsText(e.target.value)}
                          rows={2}
                          placeholder="Vehículo privado climatizado&#10;Boleto de ingreso oficial&#10;Balón medicinal de oxígeno"
                          className="w-full px-3 py-2 border border-neutral-200 rounded-xl focus:ring-1 focus:ring-brand-pink resize-none font-mono text-[10px]"
                        />
                      </div>
                      <div className="space-y-1">
                        <label className="font-black text-neutral-700 block">¿Qué No Incluye?</label>
                        <textarea
                          value={pExclusionsText}
                          onChange={(e) => setPExclusionsText(e.target.value)}
                          rows={2}
                          placeholder="Artículos personales&#10;Souvenirs de alfarería"
                          className="w-full px-3 py-2 border border-neutral-200 rounded-xl focus:ring-1 focus:ring-brand-pink resize-none font-mono text-[10px]"
                        />
                      </div>
                    </div>

                    <div className="space-y-1">
                      <label className="font-black text-neutral-700 block">Texto de Contacto WhatsApp (Predefinido)</label>
                      <input
                        type="text"
                        value={pWhatsAppText}
                        onChange={(e) => setPWhatsAppText(e.target.value)}
                        placeholder="Mensaje de compra rápido..."
                        className="w-full px-3 py-2 border border-neutral-200 rounded-xl focus:ring-1 focus:ring-brand-pink"
                      />
                    </div>

                    {errorMsg && (
                      <p className="text-red-500 font-bold block bg-red-50 p-2 rounded-lg text-[10px]">{errorMsg}</p>
                    )}

                    <div className="pt-2 flex justify-end gap-2.5">
                      <button
                        type="submit"
                        className="bg-brand-pink text-white hover:bg-brand-pink/90 font-extrabold px-6 py-2.5 rounded-xl flex items-center gap-1.5 active:scale-95 transition-all shadow-md cursor-pointer"
                      >
                        <Save className="w-4 h-4" /> Guardar Cambios
                      </button>
                    </div>
                  </form>
                )}
              </div>
            </div>
          )}

          {/* ==================================================================== */}
          {/* TAB 2: BLOG & ARTICLE MANAGER */}
          {/* ==================================================================== */}
          {activeTab === "blog" && (
            <div className="flex-1 flex overflow-hidden w-full">
              {/* Left Column Blogs List */}
              <div className="w-full md:w-5/12 border-r border-[#eaeaea] flex flex-col bg-[#faf9f8] overflow-hidden">
                <div className="p-4 border-b border-[#eaeaea] bg-white flex items-center justify-between shrink-0">
                  <h3 className="font-display font-extrabold text-xs uppercase text-neutral-700">Artículos Publicados</h3>
                  <button
                    onClick={startCreatePost}
                    className="bg-brand-pink text-white hover:bg-brand-pink/90 px-3 py-1.5 rounded-xl text-[10px] font-extrabold flex items-center gap-1 transition-all cursor-pointer shadow-sm"
                  >
                    <Plus className="w-3.5 h-3.5" /> Nuevo Artículo
                  </button>
                </div>

                <div className="flex-1 overflow-y-auto p-4 space-y-3.5 no-scrollbar">
                  {blogPosts.map((post, idx) => (
                    <div 
                      key={post.id}
                      className={`p-3.5 rounded-2xl border transition-all ${
                        editingPost?.id === post.id 
                          ? "bg-brand-pink/5 border-brand-pink/40 shadow-xs" 
                          : "bg-white border-neutral-100 hover:border-brand-pink/15 hover:shadow-xs"
                      }`}
                    >
                      <div className="flex gap-3">
                        <img 
                          src={post.image} 
                          alt={post.titleEs}
                          className="w-14 h-14 object-cover rounded-xl shrink-0 border border-neutral-100"
                        />
                        <div className="min-w-0 flex-1">
                          <div className="flex items-center justify-between text-[8px] font-bold text-neutral-400">
                            <span>{post.date}</span>
                            <span className="text-[#f58220] uppercase">{post.category}</span>
                          </div>
                          <h4 className="font-display font-bold text-xs text-brand-charcoal truncate mt-0.5" title={post.titleEs}>
                            {post.titleEs}
                          </h4>
                          <p className="text-[10px] text-neutral-500 truncate">{post.subtitleEs}</p>
                        </div>
                      </div>

                      {/* Card controls for sorting & actions */}
                      <div className="flex items-center justify-between mt-3 pt-2.5 border-t border-neutral-100">
                        {/* Positions */}
                        <div className="flex items-center gap-1 bg-neutral-100 rounded-md p-0.5">
                          <button
                            type="button"
                            onClick={() => handleMovePost(idx, "up")}
                            disabled={idx === 0}
                            className="p-1 text-neutral-500 hover:text-brand-pink disabled:opacity-20 disabled:pointer-events-none transition-colors"
                            title="Mover artículo arriba"
                          >
                            <ArrowUp className="w-3 h-3" />
                          </button>
                          <button
                            type="button"
                            onClick={() => handleMovePost(idx, "down")}
                            disabled={idx === blogPosts.length - 1}
                            className="p-1 text-neutral-500 hover:text-brand-pink disabled:opacity-20 disabled:pointer-events-none transition-colors"
                            title="Mover artículo abajo"
                          >
                            <ArrowDown className="w-3 h-3" />
                          </button>
                        </div>

                        <div className="flex items-center gap-1">
                          <button
                            onClick={() => startEditPost(post)}
                            className="px-2 py-1 rounded-lg text-[9px] bg-neutral-100 hover:bg-neutral-200 text-neutral-700 font-extrabold flex items-center gap-0.5"
                          >
                            <Edit className="w-3 h-3" /> Editar
                          </button>
                          <button
                            onClick={() => handleDeletePost(post.id, post.titleEs)}
                            className="px-2 py-1 rounded-lg text-[9px] bg-red-50 hover:bg-red-100 text-red-600 font-bold flex items-center gap-0.5"
                          >
                            <Trash2 className="w-2.5 h-2.5" /> Borrar
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Right Column Form */}
              <div className="hidden md:flex flex-1 flex-col overflow-y-auto p-6 bg-white space-y-4">
                {(!editingPost && !isCreatingNewPost) ? (
                  <div className="h-full flex flex-col items-center justify-center text-center py-20">
                    <BookOpen className="w-12 h-12 text-amber-400/30 mb-3 animate-bounce-subtle" />
                    <h4 className="font-display font-black text-sm text-brand-charcoal">Publicación de Blog y Noticias</h4>
                    <p className="text-[11px] text-neutral-500 max-w-xs mt-1">
                      Crea artículos de viaje, consejos de equipaje, o reseñas culturales andinas reales. Todos las publicaciones se guardan de forma permanente.
                    </p>
                  </div>
                ) : (
                  <form onSubmit={handleSavePost} className="space-y-4 text-xs">
                    <div className="pb-3 border-b border-neutral-100 flex items-center justify-between">
                      <h3 className="font-display font-extrabold text-[#f58220] uppercase tracking-wide">
                        {isCreatingNewPost ? "📝 Escribiendo Nueva Entrada de Blog" : `✍️ Editando Entrada: ${bTitleEs}`}
                      </h3>
                      <button 
                        type="button"
                        onClick={() => { resetBlogForm(); setEditingPost(null); setIsCreatingNewPost(false); }}
                        className="text-[11px] text-neutral-400 hover:text-red-500 transition-colors"
                      >
                        Cancelar
                      </button>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      {/* Spanish Titles */}
                      <div className="space-y-3.5 p-3.5 bg-neutral-50/50 rounded-2xl border border-neutral-100">
                        <span className="font-black text-[9px] tracking-wider uppercase text-brand-pink block">Sección Español (ES)</span>
                        <div className="space-y-1">
                          <label className="font-black text-neutral-700">Título Principal *</label>
                          <input
                            type="text"
                            value={bTitleEs}
                            onChange={(e) => setBTitleEs(e.target.value)}
                            placeholder="Ej. Bosques ancestrales de Puyas"
                            className="w-full px-3 py-2 border border-neutral-200 rounded-xl bg-white outline-none focus:ring-1 focus:ring-brand-pink"
                            required
                          />
                        </div>
                        <div className="space-y-1">
                          <label className="font-black text-neutral-700">Subtítulo Descriptivo</label>
                          <input
                            type="text"
                            value={bSubtitleEs}
                            onChange={(e) => setBSubtitleEs(e.target.value)}
                            placeholder="Un resumen corto de 10 palabras..."
                            className="w-full px-3 py-2 border border-neutral-200 rounded-xl bg-white outline-none focus:ring-1 focus:ring-brand-pink"
                          />
                        </div>
                        <div className="space-y-1">
                          <label className="font-black text-neutral-700">Contenido Expandido (Markdown o texto plano) *</label>
                          <textarea
                            value={bContentEs}
                            onChange={(e) => setBContentEs(e.target.value)}
                            rows={6}
                            placeholder="Escribe el cuerpo de tu artículo de blog aquí..."
                            className="w-full px-3 py-2 border border-neutral-200 rounded-xl bg-white outline-none focus:ring-1 focus:ring-brand-pink font-mono text-[11px]"
                            required
                          />
                        </div>
                      </div>

                      {/* English Titles */}
                      <div className="space-y-3.5 p-3.5 bg-neutral-50/50 rounded-2xl border border-neutral-100">
                        <span className="font-black text-[9px] tracking-wider uppercase text-cyan-600 block">English Section (EN)</span>
                        <div className="space-y-1">
                          <label className="font-black text-neutral-700">Post Title *</label>
                          <input
                            type="text"
                            value={bTitleEn}
                            onChange={(e) => setBTitleEn(e.target.value)}
                            placeholder="Ej. Ancient forests of Puyas"
                            className="w-full px-3 py-2 border border-neutral-200 rounded-xl bg-white outline-none focus:ring-1 focus:ring-brand-pink"
                          />
                        </div>
                        <div className="space-y-1">
                          <label className="font-black text-neutral-700">Short Subtitle</label>
                          <input
                            type="text"
                            value={bSubtitleEn}
                            onChange={(e) => setBSubtitleEn(e.target.value)}
                            placeholder="Short summary in English..."
                            className="w-full px-3 py-2 border border-neutral-200 rounded-xl bg-white outline-none focus:ring-1 focus:ring-brand-pink"
                          />
                        </div>
                        <div className="space-y-1">
                          <label className="font-black text-neutral-700">Full Content Body *</label>
                          <textarea
                            value={bContentEn}
                            onChange={(e) => setBContentEn(e.target.value)}
                            rows={6}
                            placeholder="Write your article body in English here..."
                            className="w-full px-3 py-2 border border-neutral-200 rounded-xl bg-white outline-none focus:ring-1 focus:ring-brand-pink font-mono text-[11px]"
                          />
                        </div>
                      </div>
                    </div>

                    <div className="grid grid-cols-4 gap-3 bg-neutral-50 p-4 rounded-2xl border border-neutral-100">
                      <div className="space-y-1">
                        <label className="font-black text-neutral-700">Categoría Artículo</label>
                        <select
                          value={bCategory}
                          onChange={(e) => setBCategory(e.target.value as any)}
                          className="w-full px-3 py-2 border border-neutral-200 bg-white rounded-xl focus:ring-1 focus:ring-brand-pink outline-none"
                        >
                          <option value="Consejos">🚀 Consejos (Tips)</option>
                          <option value="Destinos">🏖️ Destinos (Destinations)</option>
                          <option value="Cultura">🎭 Cultura (Culture)</option>
                          <option value="Aventura">🧗 Aventura (Adventure)</option>
                        </select>
                      </div>
                      <div className="space-y-1">
                        <label className="font-black text-neutral-700">Autor Visible</label>
                        <input
                          type="text"
                          value={bAuthor}
                          onChange={(e) => setBAuthor(e.target.value)}
                          className="w-full px-3 py-2 border border-neutral-200 bg-white rounded-xl focus:ring-1"
                        />
                      </div>
                      <div className="space-y-1">
                        <label className="font-black text-neutral-700">Tiempo de Lectura (ES)</label>
                        <input
                          type="text"
                          value={bReadTimeEs}
                          onChange={(e) => setBReadTimeEs(e.target.value)}
                          className="w-full px-3 py-2 border border-neutral-200 bg-white rounded-xl focus:ring-1"
                        />
                      </div>
                      <div className="space-y-1">
                        <label className="font-black text-neutral-700">Reading Time (EN)</label>
                        <input
                          type="text"
                          value={bReadTimeEn}
                          onChange={(e) => setBReadTimeEn(e.target.value)}
                          className="w-full px-3 py-2 border border-neutral-200 bg-white rounded-xl focus:ring-1"
                        />
                      </div>
                    </div>

                    <div className="space-y-1">
                      <label className="font-black text-neutral-700">URL de Imagen Decorativa</label>
                      <input
                        type="text"
                        value={bImage}
                        onChange={(e) => setBImage(e.target.value)}
                        placeholder="https://images.unsplash.com/..."
                        className="w-full px-3 py-2 border border-neutral-200 rounded-xl"
                      />
                    </div>

                    <div className="flex justify-end gap-2 p-1">
                      <button
                        type="submit"
                        className="bg-[#f58220] hover:bg-[#d46a10] text-white font-extrabold px-6 py-2.5 rounded-xl flex items-center gap-1.5 transition-all shadow-md cursor-pointer"
                      >
                        <Save className="w-4 h-4" /> Publicar Artículo
                      </button>
                    </div>
                  </form>
                )}
              </div>
            </div>
          )}

          {/* ==================================================================== */}
          {/* TAB 3: STATIC CMS CONTENT BLOCKS */}
          {/* ==================================================================== */}
          {activeTab === "cms" && (
            <form onSubmit={handleSaveCMS} className="flex-1 overflow-y-auto p-6 md:p-8 space-y-6 bg-white text-xs">
              <div className="border-b border-neutral-100 pb-3 flex items-center justify-between">
                <div>
                  <h3 className="font-display font-extrabold text-brand-charcoal text-base">CMS: Modificador Global de Contenidos</h3>
                  <p className="text-[10px] text-neutral-500 mt-0.5">Edita de forma libre las secciones de la página de inicio (Nosotros, Contacto y Banner) en Español e Inglés.</p>
                </div>
                <button
                  type="submit"
                  className="bg-brand-pink text-white hover:bg-brand-pink/90 px-5 py-2.5 rounded-xl font-extrabold text-xs shadow-md transition-all cursor-pointer flex items-center gap-1.5"
                >
                  <Save className="w-4 h-4" /> Guardar Contenidos de la Web
                </button>
              </div>

              {/* Grid sections edits */}
              <div className="space-y-5">
                
                {/* SECTION 1: ABOUT US (NOSOTROS) */}
                <div className="p-5 rounded-2xl border border-[#eaeaea] bg-neutral-50/40 space-y-4">
                  <div className="flex items-center gap-2 border-b border-neutral-100 pb-2">
                    <span className="w-2.5 h-2.5 rounded-full bg-amber-500" />
                    <h4 className="font-display font-extrabold text-xs uppercase text-brand-charcoal">Sección: Nosotros (Filosofía de la empresa)</h4>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    {/* ES details */}
                    <div className="space-y-2.5">
                      <span className="text-[10px] uppercase font-bold text-neutral-400 block">Español</span>
                      <div className="space-y-1">
                        <label className="font-extrabold text-neutral-600 block">Etiqueta Chica Subtítulo</label>
                        <input
                          type="text"
                          value={cmsForm.nosotrosSubtitleEs}
                          onChange={(e) => setCmsForm({ ...cmsForm, nosotrosSubtitleEs: e.target.value })}
                          className="w-full px-3 py-1.5 border border-neutral-200 bg-white rounded-xl focus:ring-1 focus:ring-brand-pink focus:border-brand-pink"
                        />
                      </div>
                      <div className="space-y-1">
                        <label className="font-extrabold text-neutral-600 block font-sans">Título Principal de Sección</label>
                        <input
                          type="text"
                          value={cmsForm.nosotrosHeadlineEs}
                          onChange={(e) => setCmsForm({ ...cmsForm, nosotrosHeadlineEs: e.target.value })}
                          className="w-full px-3 py-1.5 border border-neutral-200 bg-white rounded-xl focus:ring-1 focus:ring-brand-pink focus:border-brand-pink"
                        />
                      </div>
                      <div className="space-y-1">
                        <label className="font-extrabold text-neutral-600 block">Párrafo de Descripción Principal</label>
                        <textarea
                          value={cmsForm.nosotrosDescEs}
                          onChange={(e) => setCmsForm({ ...cmsForm, nosotrosDescEs: e.target.value })}
                          rows={3}
                          className="w-full px-3 py-1.5 border border-neutral-200 bg-white rounded-xl focus:ring-1 resize-none"
                        />
                      </div>
                    </div>

                    {/* EN details */}
                    <div className="space-y-2.5">
                      <span className="text-[10px] uppercase font-bold text-neutral-400 block">English (EN)</span>
                      <div className="space-y-1">
                        <label className="font-extrabold text-neutral-600 block">Small Tagline Header</label>
                        <input
                          type="text"
                          value={cmsForm.nosotrosSubtitleEn}
                          onChange={(e) => setCmsForm({ ...cmsForm, nosotrosSubtitleEn: e.target.value })}
                          className="w-full px-3 py-1.5 border border-neutral-200 bg-white rounded-xl focus:ring-1 focus:ring-brand-pink"
                        />
                      </div>
                      <div className="space-y-1">
                        <label className="font-extrabold text-neutral-600 block">Main Section Title</label>
                        <input
                          type="text"
                          value={cmsForm.nosotrosHeadlineEn}
                          onChange={(e) => setCmsForm({ ...cmsForm, nosotrosHeadlineEn: e.target.value })}
                          className="w-full px-3 py-1.5 border border-neutral-200 bg-white rounded-xl focus:ring-1 focus:ring-brand-pink"
                        />
                      </div>
                      <div className="space-y-1">
                        <label className="font-extrabold text-neutral-600 block">Main Introductory Paragraph</label>
                        <textarea
                          value={cmsForm.nosotrosDescEn}
                          onChange={(e) => setCmsForm({ ...cmsForm, nosotrosDescEn: e.target.value })}
                          rows={3}
                          className="w-full px-3 py-1.5 border border-neutral-200 bg-white rounded-xl focus:ring-1 resize-none"
                        />
                      </div>
                    </div>
                  </div>
                </div>

                {/* SECTION 2: CONTACT & SERVICE (CONTACTO) */}
                <div className="p-5 rounded-2xl border border-[#eaeaea] bg-neutral-50/40 space-y-4">
                  <div className="flex items-center gap-2 border-b border-neutral-100 pb-2">
                    <span className="w-2.5 h-2.5 rounded-full bg-[#e12d8a]" />
                    <h4 className="font-display font-extrabold text-xs uppercase text-brand-charcoal">Sección: Reserva y Contacto (Asesores)</h4>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    {/* ES details */}
                    <div className="space-y-2">
                      <span className="text-[10px] uppercase font-bold text-neutral-400 block">Español</span>
                      <div className="space-y-1">
                        <label className="font-extrabold text-neutral-600 block">Título Banner de Reservas</label>
                        <input
                          type="text"
                          value={cmsForm.contactoHeadlineEs}
                          onChange={(e) => setCmsForm({ ...cmsForm, contactoHeadlineEs: e.target.value })}
                          className="w-full px-3 py-1.5 border border-neutral-200 bg-white rounded-xl font-bold"
                        />
                      </div>
                      <div className="space-y-1">
                        <label className="font-extrabold text-neutral-600 block">Subtítulo Pequeño</label>
                        <input
                          type="text"
                          value={cmsForm.contactoSubtitleEs}
                          onChange={(e) => setCmsForm({ ...cmsForm, contactoSubtitleEs: e.target.value })}
                          className="w-full px-3 py-1.5 border border-neutral-200 bg-white rounded-xl"
                        />
                      </div>
                    </div>

                    {/* EN details */}
                    <div className="space-y-2">
                      <span className="text-[10px] uppercase font-bold text-neutral-400 block">English</span>
                      <div className="space-y-1">
                        <label className="font-extrabold text-neutral-600 block">Booking Title Banner</label>
                        <input
                          type="text"
                          value={cmsForm.contactoHeadlineEn}
                          onChange={(e) => setCmsForm({ ...cmsForm, contactoHeadlineEn: e.target.value })}
                          className="w-full px-3 py-1.5 border border-neutral-200 bg-white rounded-xl font-bold"
                        />
                      </div>
                      <div className="space-y-1">
                        <label className="font-extrabold text-neutral-600 block">Small Booking Subtitle</label>
                        <input
                          type="text"
                          value={cmsForm.contactoSubtitleEn}
                          onChange={(e) => setCmsForm({ ...cmsForm, contactoSubtitleEn: e.target.value })}
                          className="w-full px-3 py-1.5 border border-neutral-200 bg-white rounded-xl"
                        />
                      </div>
                    </div>
                  </div>
                </div>

                {/* SECTION 3: CORPORATE CONTACTS & SOCIAL LINKS */}
                <div className="p-5 rounded-2xl border border-[#eaeaea] bg-neutral-50/40 space-y-4 text-left">
                  <div className="flex items-center gap-2 border-b border-neutral-100 pb-2">
                    <span className="w-2.5 h-2.5 rounded-full bg-[#f58220]" />
                    <h4 className="font-display font-extrabold text-xs uppercase text-brand-charcoal">Configuración: Canales del CRM & Redes</h4>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {/* Phones */}
                    <div className="space-y-2.5 p-4 bg-white border border-neutral-150 rounded-2xl">
                      <span className="text-[10px] uppercase font-black text-neutral-500 block">📞 Centrales Telefónicas (Hasta 2)</span>
                      <div className="space-y-2">
                        <div>
                          <label className="text-[10px] font-bold text-neutral-500 block">Teléfono Principal</label>
                          <input
                            type="text"
                            value={cmsForm.phones?.[0] || ""}
                            onChange={(e) => {
                              const updated = [...(cmsForm.phones || [])];
                              if (updated.length === 0) updated.push("", "");
                              updated[0] = e.target.value;
                              setCmsForm({ ...cmsForm, phones: updated });
                            }}
                            className="w-full px-3 py-1 border border-neutral-200 rounded-lg text-xs"
                          />
                        </div>
                        <div>
                          <label className="text-[10px] font-bold text-neutral-500 block">Teléfono Secundario</label>
                          <input
                            type="text"
                            value={cmsForm.phones?.[1] || ""}
                            onChange={(e) => {
                              const updated = [...(cmsForm.phones || [])];
                              if (updated.length === 0) updated.push("", "");
                              updated[1] = e.target.value;
                              setCmsForm({ ...cmsForm, phones: updated });
                            }}
                            className="w-full px-3 py-1 border border-neutral-200 rounded-lg text-xs"
                          />
                        </div>
                      </div>
                    </div>

                    {/* WhatsApp */}
                    <div className="space-y-2.5 p-4 bg-white border border-neutral-150 rounded-2xl">
                      <span className="text-[10px] uppercase font-black text-green-500 block">💬 Configuración de Redirección WhatsApp</span>
                      <div className="space-y-2">
                        <div>
                          <label className="text-[10px] font-bold text-neutral-500 block">Número WhatsApp (Código País + Número sin espacios)</label>
                          <input
                            type="text"
                            value={cmsForm.whatsappNumber || ""}
                            onChange={(e) => setCmsForm({ ...cmsForm, whatsappNumber: e.target.value })}
                            placeholder="e.g. +51987654321"
                            className="w-full px-3 py-1 border border-neutral-200 rounded-lg text-xs font-mono"
                          />
                        </div>
                        <div>
                          <label className="text-[10px] font-bold text-neutral-500 block">Mensaje Semilla Predeterminado</label>
                          <input
                            type="text"
                            value={cmsForm.whatsappText || ""}
                            onChange={(e) => setCmsForm({ ...cmsForm, whatsappText: e.target.value })}
                            className="w-full px-3 py-1 border border-neutral-200 rounded-lg text-xs"
                          />
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {/* Reservation Emails */}
                    <div className="space-y-2.5 p-4 bg-white border border-neutral-150 rounded-2xl">
                      <span className="text-[10px] uppercase font-black text-neutral-500 block">✉ Correos Corporativos Reservas (Hasta 3)</span>
                      <div className="space-y-2">
                        <div>
                          <label className="text-[10px] font-bold text-neutral-500 block">Email Reservas Principal</label>
                          <input
                            type="email"
                            value={cmsForm.emails?.[0] || ""}
                            onChange={(e) => {
                              const updated = [...(cmsForm.emails || [])];
                              while (updated.length < 3) updated.push("");
                              updated[0] = e.target.value;
                              setCmsForm({ ...cmsForm, emails: updated });
                            }}
                            className="w-full px-3 py-1 border border-neutral-200 rounded-lg text-xs font-mono"
                          />
                        </div>
                        <div>
                          <label className="text-[10px] font-bold text-neutral-500 block">Email Operaciones / Soporte</label>
                          <input
                            type="email"
                            value={cmsForm.emails?.[1] || ""}
                            onChange={(e) => {
                              const updated = [...(cmsForm.emails || [])];
                              while (updated.length < 3) updated.push("");
                              updated[1] = e.target.value;
                              setCmsForm({ ...cmsForm, emails: updated });
                            }}
                            className="w-full px-3 py-1 border border-neutral-200 rounded-lg text-xs font-mono"
                          />
                        </div>
                        <div>
                          <label className="text-[10px] font-bold text-neutral-500 block">Email Gerencia</label>
                          <input
                            type="email"
                            value={cmsForm.emails?.[2] || ""}
                            onChange={(e) => {
                              const updated = [...(cmsForm.emails || [])];
                              while (updated.length < 3) updated.push("");
                              updated[2] = e.target.value;
                              setCmsForm({ ...cmsForm, emails: updated });
                            }}
                            className="w-full px-3 py-1 border border-neutral-200 rounded-lg text-xs font-mono"
                          />
                        </div>
                      </div>
                    </div>

                    {/* Social networks & reviews */}
                    <div className="space-y-2.5 p-4 bg-white border border-neutral-150 rounded-2xl">
                      <span className="text-[10px] uppercase font-black text-blue-500 block">🔗 Enlaces a Redes Sociales oficiales</span>
                      <div className="space-y-2 text-xs">
                        <div className="grid grid-cols-2 gap-2">
                          <div>
                            <label className="text-[9px] text-neutral-500 block font-bold">Facebook</label>
                            <input
                              type="text"
                              value={cmsForm.socialLinks?.facebook || ""}
                              onChange={(e) => setCmsForm({
                                ...cmsForm,
                                socialLinks: { ...(cmsForm.socialLinks || DEFAULT_CMS_CONTENT.socialLinks), facebook: e.target.value }
                              })}
                              className="w-full px-2.5 py-1 border border-neutral-200 rounded-lg text-[11px]"
                            />
                          </div>
                          <div>
                            <label className="text-[9px] text-neutral-500 block font-bold">Instagram</label>
                            <input
                              type="text"
                              value={cmsForm.socialLinks?.instagram || ""}
                              onChange={(e) => setCmsForm({
                                ...cmsForm,
                                socialLinks: { ...(cmsForm.socialLinks || DEFAULT_CMS_CONTENT.socialLinks), instagram: e.target.value }
                              })}
                              className="w-full px-2.5 py-1 border border-neutral-200 rounded-lg text-[11px]"
                            />
                          </div>
                        </div>
                        <div className="grid grid-cols-2 gap-2">
                          <div>
                            <label className="text-[9px] text-neutral-500 block font-bold">LinkedIn</label>
                            <input
                              type="text"
                              value={cmsForm.socialLinks?.linkedin || ""}
                              onChange={(e) => setCmsForm({
                                ...cmsForm,
                                socialLinks: { ...(cmsForm.socialLinks || DEFAULT_CMS_CONTENT.socialLinks), linkedin: e.target.value }
                              })}
                              className="w-full px-2.5 py-1 border border-neutral-200 rounded-lg text-[11px]"
                            />
                          </div>
                          <div>
                            <label className="text-[9px] text-neutral-500 block font-bold">YouTube</label>
                            <input
                              type="text"
                              value={cmsForm.socialLinks?.youtube || ""}
                              onChange={(e) => setCmsForm({
                                ...cmsForm,
                                socialLinks: { ...(cmsForm.socialLinks || DEFAULT_CMS_CONTENT.socialLinks), youtube: e.target.value }
                              })}
                              className="w-full px-2.5 py-1 border border-neutral-200 rounded-lg text-[11px]"
                            />
                          </div>
                        </div>

                        <span className="text-[10px] uppercase font-black text-brand-pink block border-t border-neutral-100 pt-2">⭐ Direccionamiento de Opiniones</span>
                        <div className="grid grid-cols-2 gap-2">
                          <div>
                            <label className="text-[9px] text-neutral-500 block font-bold">Google G.Page</label>
                            <input
                              type="text"
                              value={cmsForm.socialReviewsLinks?.google || ""}
                              onChange={(e) => setCmsForm({
                                ...cmsForm,
                                socialReviewsLinks: { ...(cmsForm.socialReviewsLinks || DEFAULT_CMS_CONTENT.socialReviewsLinks), google: e.target.value }
                              })}
                              className="w-full px-2.5 py-1 border border-neutral-200 rounded-lg text-[11px]"
                            />
                          </div>
                          <div>
                            <label className="text-[9px] text-neutral-500 block font-bold">TripAdvisor</label>
                            <input
                              type="text"
                              value={cmsForm.socialReviewsLinks?.tripadvisor || ""}
                              onChange={(e) => setCmsForm({
                                ...cmsForm,
                                socialReviewsLinks: { ...(cmsForm.socialReviewsLinks || DEFAULT_CMS_CONTENT.socialReviewsLinks), tripadvisor: e.target.value }
                              })}
                              className="w-full px-2.5 py-1 border border-neutral-200 rounded-lg text-[11px]"
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* SECTION 4: CERTIFICATIONS EDIT PANEL (8 SPOTS) */}
                <div className="p-5 rounded-2xl border border-[#eaeaea] bg-neutral-50/40 space-y-4 text-left">
                  <div className="flex items-center gap-2 border-b border-neutral-100 pb-2">
                    <span className="w-2.5 h-2.5 rounded-full bg-[#e12d8a]" />
                    <h4 className="font-display font-extrabold text-xs uppercase text-brand-charcoal">Gestión de 8 Sellos e Instituciones de Certificación</h4>
                  </div>
                  <p className="text-[10px] text-neutral-500 italic block">Las certificaciones (Marca Perú, Marca Ayacucho, Canatur, etc.) se redirigen al sitio cargado al hacer clic en sus logos cuadrados.</p>

                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
                    {(cmsForm.certifications || DEFAULT_CMS_CONTENT.certifications).map((cert, index) => (
                      <div key={index} className="p-3 bg-white border border-neutral-200 rounded-2xl space-y-2.5 text-[11px]">
                        <span className="text-[10px] font-black text-brand-pink block bg-neutral-50 px-2 py-0.5 rounded">Logo N° {index + 1} - {cert.name}</span>
                        <div className="space-y-1">
                          <label className="text-[9px] text-neutral-500">Nombre Oficial</label>
                          <input
                            type="text"
                            value={cert.name}
                            onChange={(e) => {
                              const updated = [...(cmsForm.certifications || DEFAULT_CMS_CONTENT.certifications)];
                              updated[index] = { ...updated[index], name: e.target.value };
                              setCmsForm({ ...cmsForm, certifications: updated });
                            }}
                            className="w-full px-2 py-0.5 border border-neutral-200 rounded text-xs"
                          />
                        </div>
                        <div className="space-y-1">
                          <label className="text-[9px] text-neutral-500">Logo URL (Icono Cuadrado)</label>
                          <input
                            type="text"
                            value={cert.logo}
                            onChange={(e) => {
                              const updated = [...(cmsForm.certifications || DEFAULT_CMS_CONTENT.certifications)];
                              updated[index] = { ...updated[index], logo: e.target.value };
                              setCmsForm({ ...cmsForm, certifications: updated });
                            }}
                            className="w-full px-2 py-0.5 border border-neutral-200 rounded text-[10px] font-mono"
                          />
                        </div>
                        <div className="space-y-1">
                          <label className="text-[9px] text-neutral-500">Redirección / Redirección Web</label>
                          <input
                            type="text"
                            value={cert.url}
                            onChange={(e) => {
                              const updated = [...(cmsForm.certifications || DEFAULT_CMS_CONTENT.certifications)];
                              updated[index] = { ...updated[index], url: e.target.value };
                              setCmsForm({ ...cmsForm, certifications: updated });
                            }}
                            className="w-full px-2 py-0.5 border border-neutral-200 rounded text-[10px] pb-0.5 font-mono"
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* SECTION 5: MISSION, VISION, & VALUE PROPOSITION */}
                <div className="p-5 rounded-2xl border border-[#eaeaea] bg-neutral-50/40 space-y-4 text-left">
                  <div className="flex items-center gap-2 border-b border-neutral-100 pb-2">
                    <span className="w-2.5 h-2.5 rounded-full bg-blue-500" />
                    <h4 className="font-display font-extrabold text-xs uppercase text-brand-charcoal">Propuesta de Valor, Misión y Visión de Negocio</h4>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {/* Val Prop ES */}
                    <div className="bg-white p-3.5 border border-neutral-200 rounded-2xl space-y-2.5">
                      <span className="text-[10px] uppercase font-black text-brand-pink block pb-1 border-b border-neutral-100">Propuesta de Valor (ES)</span>
                      <div className="space-y-1">
                        <label className="text-[10px] block">Título</label>
                        <input
                          type="text"
                          value={cmsForm.valuePropTitleEs || ""}
                          onChange={(e) => setCmsForm({ ...cmsForm, valuePropTitleEs: e.target.value })}
                          className="w-full px-2.5 py-1 border border-neutral-200 rounded-lg text-xs font-bold"
                        />
                      </div>
                      <div className="space-y-1">
                        <label className="text-[10px] block">Descripción Párrafo</label>
                        <textarea
                          value={cmsForm.valuePropDescEs || ""}
                          onChange={(e) => setCmsForm({ ...cmsForm, valuePropDescEs: e.target.value })}
                          rows={3}
                          className="w-full px-2.5 py-1 border border-neutral-200 rounded-lg text-xs"
                        />
                      </div>
                    </div>

                    {/* Val Prop EN */}
                    <div className="bg-white p-3.5 border border-neutral-200 rounded-2xl space-y-2.5">
                      <span className="text-[10px] uppercase font-black text-brand-pink block pb-1 border-b border-neutral-100">Value Proposition (EN)</span>
                      <div className="space-y-1">
                        <label className="text-[10px] block">Title</label>
                        <input
                          type="text"
                          value={cmsForm.valuePropTitleEn || ""}
                          onChange={(e) => setCmsForm({ ...cmsForm, valuePropTitleEn: e.target.value })}
                          className="w-full px-2.5 py-1 border border-neutral-200 rounded-lg text-xs font-bold"
                        />
                      </div>
                      <div className="space-y-1">
                        <label className="text-[10px] block">Description Paragraph</label>
                        <textarea
                          value={cmsForm.valuePropDescEn || ""}
                          onChange={(e) => setCmsForm({ ...cmsForm, valuePropDescEn: e.target.value })}
                          rows={3}
                          className="w-full px-2.5 py-1 border border-neutral-200 rounded-lg text-xs"
                        />
                      </div>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {/* Mission ES/EN */}
                    <div className="bg-white p-3.5 border border-neutral-200 rounded-2xl space-y-2">
                      <span className="text-[10px] uppercase font-black text-brand-orange block pb-1 border-b border-neutral-100">Misión Institucional (ES & EN)</span>
                      <div>
                        <label className="text-[10px] text-neutral-500 block">Español</label>
                        <textarea
                          value={cmsForm.misionEs || ""}
                          onChange={(e) => setCmsForm({ ...cmsForm, misionEs: e.target.value })}
                          rows={2.5}
                          className="w-full px-2.5 py-1 border border-neutral-200 rounded-lg text-xs"
                        />
                      </div>
                      <div>
                        <label className="text-[10px] text-neutral-500 block">English</label>
                        <textarea
                          value={cmsForm.misionEn || ""}
                          onChange={(e) => setCmsForm({ ...cmsForm, misionEn: e.target.value })}
                          rows={2.5}
                          className="w-full px-2.5 py-1 border border-neutral-200 rounded-lg text-xs"
                        />
                      </div>
                    </div>

                    {/* Vision ES/EN */}
                    <div className="bg-white p-3.5 border border-neutral-200 rounded-2xl space-y-2">
                      <span className="text-[10px] uppercase font-black text-blue-500 block pb-1 border-b border-neutral-100 font-sans">Visión Institucional (ES & EN)</span>
                      <div>
                        <label className="text-[10px] text-neutral-500 block">Español</label>
                        <textarea
                          value={cmsForm.visionEs || ""}
                          onChange={(e) => setCmsForm({ ...cmsForm, visionEs: e.target.value })}
                          rows={2.5}
                          className="w-full px-2.5 py-1 border border-neutral-200 rounded-lg text-xs"
                        />
                      </div>
                      <div>
                        <label className="text-[10px] text-neutral-500 block">English</label>
                        <textarea
                          value={cmsForm.visionEn || ""}
                          onChange={(e) => setCmsForm({ ...cmsForm, visionEn: e.target.value })}
                          rows={2.5}
                          className="w-full px-2.5 py-1 border border-neutral-200 rounded-lg text-xs"
                        />
                      </div>
                    </div>
                  </div>
                </div>

                {/* SECTION 6: REPRESENTATIVE MEMBERS (4 BIOGRAPHIES) */}
                <div className="p-5 rounded-2xl border border-[#eaeaea] bg-neutral-50/40 space-y-4 text-left">
                  <div className="flex items-center gap-2 border-b border-neutral-100 pb-2">
                    <span className="w-2.5 h-2.5 rounded-full bg-[#f58220]" />
                    <h4 className="font-display font-extrabold text-xs uppercase text-brand-charcoal">Equipo Humano Representativo (Hasta 4 Miembros)</h4>
                  </div>
                  <p className="text-[10px] text-neutral-500 block italic">Definido para: Araceli Fernández (CEO), Russo Gálvez (Guía), Juan Pérez (Guía) e Iván Bejarano (Marketing) con descripciones resumidas de 3 líneas.</p>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {(cmsForm.teamMembers || DEFAULT_CMS_CONTENT.teamMembers).map((member, index) => (
                      <div key={index} className="p-4 bg-white border border-neutral-150 rounded-2xl space-y-2.5 text-xs text-left">
                        <span className="text-[10px] font-black text-brand-orange block">Miembro N° {index + 1} - {member.name}</span>
                        <div className="grid grid-cols-2 gap-2">
                          <div>
                            <label className="text-[9px] text-neutral-500 block">Nombre Completo</label>
                            <input
                              type="text"
                              value={member.name}
                              onChange={(e) => {
                                const updated = [...(cmsForm.teamMembers || DEFAULT_CMS_CONTENT.teamMembers)];
                                updated[index] = { ...updated[index], name: e.target.value };
                                setCmsForm({ ...cmsForm, teamMembers: updated });
                              }}
                              className="w-full px-2.5 py-1 border border-neutral-200 rounded-lg text-xs font-bold"
                            />
                          </div>
                          <div>
                            <label className="text-[9px] text-neutral-500 block">Foto de Perfil (URL)</label>
                            <input
                              type="text"
                              value={member.image}
                              onChange={(e) => {
                                const updated = [...(cmsForm.teamMembers || DEFAULT_CMS_CONTENT.teamMembers)];
                                updated[index] = { ...updated[index], image: e.target.value };
                                setCmsForm({ ...cmsForm, teamMembers: updated });
                              }}
                              className="w-full px-2.5 py-1 border border-neutral-200 rounded-lg text-[10px] font-mono"
                            />
                          </div>
                        </div>

                        <div className="grid grid-cols-2 gap-2">
                          <div>
                            <label className="text-[9px] text-neutral-500 block">Puesto / Título (ES)</label>
                            <input
                              type="text"
                              value={member.titleEs}
                              onChange={(e) => {
                                const updated = [...(cmsForm.teamMembers || DEFAULT_CMS_CONTENT.teamMembers)];
                                updated[index] = { ...updated[index], titleEs: e.target.value };
                                setCmsForm({ ...cmsForm, teamMembers: updated });
                              }}
                              className="w-full px-2.5 py-1 border border-neutral-200 rounded-lg text-xs font-semibold"
                            />
                          </div>
                          <div>
                            <label className="text-[9px] text-neutral-500 block">Role / Designation (EN)</label>
                            <input
                              type="text"
                              value={member.titleEn}
                              onChange={(e) => {
                                const updated = [...(cmsForm.teamMembers || DEFAULT_CMS_CONTENT.teamMembers)];
                                updated[index] = { ...updated[index], titleEn: e.target.value };
                                setCmsForm({ ...cmsForm, teamMembers: updated });
                              }}
                              className="w-full px-2.5 py-1 border border-neutral-200 rounded-lg text-xs font-semibold"
                            />
                          </div>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                          <div>
                            <label className="text-[9px] text-neutral-500 block">Resumen Bio (ES, ~3 líneas)</label>
                            <textarea
                              value={member.descEs}
                              onChange={(e) => {
                                const updated = [...(cmsForm.teamMembers || DEFAULT_CMS_CONTENT.teamMembers)];
                                updated[index] = { ...updated[index], descEs: e.target.value };
                                setCmsForm({ ...cmsForm, teamMembers: updated });
                              }}
                              rows={2.5}
                              className="w-full px-2.5 py-1 border border-neutral-200 rounded-lg text-[11px]"
                            />
                          </div>
                          <div>
                            <label className="text-[9px] text-neutral-500 block">Brief Bio (EN, ~3 lines)</label>
                            <textarea
                              value={member.descEn}
                              onChange={(e) => {
                                const updated = [...(cmsForm.teamMembers || DEFAULT_CMS_CONTENT.teamMembers)];
                                updated[index] = { ...updated[index], descEn: e.target.value };
                                setCmsForm({ ...cmsForm, teamMembers: updated });
                              }}
                              rows={2.5}
                              className="w-full px-2.5 py-1 border border-neutral-200 rounded-lg text-[11px]"
                            />
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* SECTION 7: DETAILED AGREEMENTS & CONTRACTUAL TEXTS (PRIVACY, LEGISLATION, ETC) */}
                <div className="p-5 rounded-2xl border border-[#eaeaea] bg-neutral-50/40 space-y-4 text-left">
                  <div className="flex items-center gap-2 border-b border-neutral-100 pb-2">
                    <span className="w-2.5 h-2.5 rounded-full bg-brand-charcoal" />
                    <h4 className="font-display font-extrabold text-xs uppercase text-brand-charcoal">Redacción Legal: Documentos de Privacidad, Términos & Libro Reclamaciones</h4>
                  </div>
                  <p className="text-[10px] text-neutral-500 block font-light">Todas las páginas legales son editables en sus párrafos correspondientes para Español (ES) e Inglés (EN).</p>

                  <div className="space-y-4">
                    {/* Privacy */}
                    <div className="bg-white p-4 border border-neutral-200 rounded-2xl grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="text-[10px] font-black uppercase text-brand-pink block pb-1 border-b">1. Política de Privacidad (ES)</label>
                        <textarea
                          value={cmsForm.legalPrivacyEs || ""}
                          onChange={(e) => setCmsForm({ ...cmsForm, legalPrivacyEs: e.target.value })}
                          rows={4}
                          className="w-full px-2.5 py-1 border border-neutral-200 rounded-lg text-xs font-light mt-1 w-full"
                        />
                      </div>
                      <div>
                        <label className="text-[10px] font-black uppercase text-brand-pink block pb-1 border-b">1. Privacy Policy (EN)</label>
                        <textarea
                          value={cmsForm.legalPrivacyEn || ""}
                          onChange={(e) => setCmsForm({ ...cmsForm, legalPrivacyEn: e.target.value })}
                          rows={4}
                          className="w-full px-2.5 py-1 border border-neutral-200 rounded-lg text-xs font-light mt-1 w-full"
                        />
                      </div>
                    </div>

                    {/* Terms */}
                    <div className="bg-white p-4 border border-neutral-200 rounded-2xl grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="text-[10px] font-black uppercase text-brand-orange block pb-1 border-b">2. Términos y Condiciones (ES)</label>
                        <textarea
                          value={cmsForm.legalTermsEs || ""}
                          onChange={(e) => setCmsForm({ ...cmsForm, legalTermsEs: e.target.value })}
                          rows={4}
                          className="w-full px-2.5 py-1 border border-neutral-200 rounded-lg text-xs font-light mt-1 w-full"
                        />
                      </div>
                      <div>
                        <label className="text-[10px] font-black uppercase text-brand-orange block pb-1 border-b">2. Terms & Conditions (EN)</label>
                        <textarea
                          value={cmsForm.legalTermsEn || ""}
                          onChange={(e) => setCmsForm({ ...cmsForm, legalTermsEn: e.target.value })}
                          rows={4}
                          className="w-full px-2.5 py-1 border border-neutral-200 rounded-lg text-xs font-light mt-1 w-full"
                        />
                      </div>
                    </div>

                    {/* Cookies */}
                    <div className="bg-white p-4 border border-neutral-200 rounded-2xl grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="text-[10px] font-black uppercase text-blue-500 block pb-1 border-b">3. Política de Cookies (ES)</label>
                        <textarea
                          value={cmsForm.legalCookiesEs || ""}
                          onChange={(e) => setCmsForm({ ...cmsForm, legalCookiesEs: e.target.value })}
                          rows={4}
                          className="w-full px-2.5 py-1 border border-neutral-200 rounded-lg text-xs font-light mt-1 w-full"
                        />
                      </div>
                      <div>
                        <label className="text-[10px] font-black uppercase text-blue-500 block pb-1 border-b">3. Cookie Policy (EN)</label>
                        <textarea
                          value={cmsForm.legalCookiesEn || ""}
                          onChange={(e) => setCmsForm({ ...cmsForm, legalCookiesEn: e.target.value })}
                          rows={4}
                          className="w-full px-2.5 py-1 border border-neutral-200 rounded-lg text-xs font-light mt-1 w-full"
                        />
                      </div>
                    </div>

                    {/* Notice */}
                    <div className="bg-white p-4 border border-neutral-200 rounded-2xl grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="text-[10px] font-black uppercase text-neutral-600 block pb-1 border-b">4. Aviso Legal de Operación de Marca (ES)</label>
                        <textarea
                          value={cmsForm.legalNoticeEs || ""}
                          onChange={(e) => setCmsForm({ ...cmsForm, legalNoticeEs: e.target.value })}
                          rows={4}
                          className="w-full px-2.5 py-1 border border-neutral-200 rounded-lg text-xs font-light mt-1 w-full"
                        />
                      </div>
                      <div>
                        <label className="text-[10px] font-black uppercase text-neutral-600 block pb-1 border-b">4. Legal Notice & Operational Accreditations (EN)</label>
                        <textarea
                          value={cmsForm.legalNoticeEn || ""}
                          onChange={(e) => setCmsForm({ ...cmsForm, legalNoticeEn: e.target.value })}
                          rows={4}
                          className="w-full px-2.5 py-1 border border-neutral-200 rounded-lg text-xs font-light mt-1 w-full"
                        />
                      </div>
                    </div>

                    {/* Complaints Book introductory text */}
                    <div className="bg-white p-4 border border-neutral-200 rounded-2xl grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="text-[10px] font-black uppercase text-[#e12d8a] block pb-1 border-b">5. Libro de Reclamaciones - Párrafo Explicativo (ES)</label>
                        <textarea
                          value={cmsForm.legalComplaintsEs || ""}
                          onChange={(e) => setCmsForm({ ...cmsForm, legalComplaintsEs: e.target.value })}
                          rows={4}
                          className="w-full px-2.5 py-1 border border-neutral-200 rounded-lg text-xs font-light mt-1 w-full"
                        />
                      </div>
                      <div>
                        <label className="text-[10px] font-black uppercase text-[#e12d8a] block pb-1 border-b">5. Complaints Logbook - Explanatory Note (EN)</label>
                        <textarea
                          value={cmsForm.legalComplaintsEn || ""}
                          onChange={(e) => setCmsForm({ ...cmsForm, legalComplaintsEn: e.target.value })}
                          rows={4}
                          className="w-full px-2.5 py-1 border border-neutral-200 rounded-lg text-xs font-light mt-1 w-full"
                        />
                      </div>
                    </div>
                  </div>
                </div>

              </div>

              <div className="pt-2 flex justify-end">
                <button
                  type="submit"
                  className="bg-brand-charcoal text-white hover:bg-black font-extrabold px-6 py-2.5 rounded-xl cursor-pointer"
                >
                  Actualizar Todo el Contenido Estático
                </button>
              </div>
            </form>
          )}

          {/* ==================================================================== */}
          {/* TAB 4: CHATBOT CONFIG & PRESETS */}
          {/* ==================================================================== */}
          {activeTab === "bot" && (
            <div className="flex-1 flex flex-col md:flex-row overflow-hidden w-full text-xs bg-white">
              {/* Bot Core Settings Panel (Left/Top) */}
              <form onSubmit={handleSaveBot} className="w-full md:w-5/12 border-r border-[#eaeaea] p-5 space-y-4 overflow-y-auto bg-neutral-50/40">
                <div className="border-b border-neutral-100 pb-2.5">
                  <h3 className="font-display font-extrabold text-xs text-neutral-700 uppercase">Identidad & Mensajes de Bienvenida</h3>
                </div>

                <div className="space-y-1">
                  <label className="font-black text-neutral-600 block">Nombre del Asistente Bot</label>
                  <input
                    type="text"
                    value={botForm.botName}
                    onChange={(e) => setBotForm({ ...botForm, botName: e.target.value })}
                    className="w-full px-3 py-1.5 border border-neutral-200 bg-white rounded-xl focus:ring-1 focus:ring-brand-pink outline-none font-bold"
                    required
                  />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div className="space-y-1">
                    <label className="font-black text-neutral-600 block">Rol del Agente (ES)</label>
                    <input
                      type="text"
                      value={botForm.agentRoleEs}
                      onChange={(e) => setBotForm({ ...botForm, agentRoleEs: e.target.value })}
                      className="w-full px-3 py-1.5 border border-neutral-200 bg-white rounded-xl"
                      required
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="font-black text-neutral-600 block">Agent Role (EN)</label>
                    <input
                      type="text"
                      value={botForm.agentRoleEn}
                      onChange={(e) => setBotForm({ ...botForm, agentRoleEn: e.target.value })}
                      className="w-full px-3 py-1.5 border border-neutral-200 bg-white rounded-xl"
                      required
                    />
                  </div>
                </div>

                <div className="space-y-1">
                  <label className="font-black text-neutral-600 block">Saludo inicial emergente (ES) *</label>
                  <textarea
                    value={botForm.welcomeMessageEs}
                    onChange={(e) => setBotForm({ ...botForm, welcomeMessageEs: e.target.value })}
                    rows={3}
                    className="w-full px-3 py-1.5 border border-neutral-200 bg-white rounded-xl resize-none font-mono text-[10px]"
                    required
                  />
                </div>

                <div className="space-y-1">
                  <label className="font-black text-neutral-600 block">Emergant Welcome Greeting (EN) *</label>
                  <textarea
                    value={botForm.welcomeMessageEn}
                    onChange={(e) => setBotForm({ ...botForm, welcomeMessageEn: e.target.value })}
                    rows={3}
                    className="w-full px-3 py-1.5 border border-neutral-200 bg-white rounded-xl resize-none font-mono text-[10px]"
                    required
                  />
                </div>

                <button
                  type="submit"
                  className="w-full bg-[#e12d8a] hover:bg-[#c02072] text-white py-2 rounded-xl font-black uppercase tracking-wider text-[10px] mt-4 transition-all shadow-sm cursor-pointer"
                >
                  Guardar Perfil de Identidad
                </button>
              </form>

              {/* Bot presets config and list (Right/Bottom) */}
              <div className="flex-1 p-5 flex flex-col overflow-hidden">
                <div className="border-b border-neutral-100 pb-2 shrink-0">
                  <h3 className="font-display font-extrabold text-xs text-neutral-700 uppercase">Respuestas Clave de Disparador por Palabras</h3>
                  <p className="text-[10px] text-neutral-500 mt-0.5">El bot escaneará el texto ingresado. Si coincide con alguna clave (ej: "millpu" o "precio"), responderá de inmediato lo aquí configurado.</p>
                </div>

                {/* Preset adder */}
                <div className="bg-neutral-50/50 p-4 border border-neutral-100 rounded-2xl my-3 space-y-3 shrink-0">
                  <span className="font-extrabold text-[10px] uppercase text-neutral-500 block">Añadir Nueva Respuesta Clave</span>
                  <div className="grid grid-cols-3 gap-3">
                    <div className="space-y-1 col-span-1">
                      <label className="font-bold text-neutral-600 block">Palabra clave disparador (Minúsculas)</label>
                      <input
                        type="text"
                        placeholder="ej. machu"
                        value={newPresetPattern}
                        onChange={(e) => setNewPresetPattern(e.target.value)}
                        className="w-full px-3 py-1.5 border border-neutral-200 bg-white rounded-xl focus:ring-1 focus:ring-brand-pink"
                      />
                    </div>
                    <div className="space-y-1 col-span-1">
                      <label className="font-bold text-neutral-600 block">Respuesta en Español (ES)</label>
                      <input
                        type="text"
                        placeholder="Ofrecemos boletos..."
                        value={newPresetResponseEs}
                        onChange={(e) => setNewPresetResponseEs(e.target.value)}
                        className="w-full px-3 py-1.5 border border-neutral-200 bg-white rounded-xl focus:ring-1 focus:ring-brand-pink"
                      />
                    </div>
                    <div className="space-y-1 col-span-1">
                      <label className="font-bold text-neutral-600 block">English Response (EN)</label>
                      <input
                        type="text"
                        placeholder="We offer tickets..."
                        value={newPresetResponseEn}
                        onChange={(e) => setNewPresetResponseEn(e.target.value)}
                        className="w-full px-3 py-1.5 border border-neutral-200 bg-white rounded-xl focus:ring-1 focus:ring-brand-pink"
                      />
                    </div>
                  </div>
                  <div className="flex justify-end pt-1">
                    <button
                      type="button"
                      onClick={handleAddPreset}
                      className="bg-brand-charcoal text-white hover:bg-black font-extrabold px-4 py-1.5 rounded-lg text-[10px] cursor-pointer"
                    >
                      Sumar Disparador Clave
                    </button>
                  </div>
                </div>

                {/* Scroller patterns list */}
                <div className="flex-1 overflow-y-auto space-y-2 pr-1 no-scrollbar">
                  <span className="font-extrabold text-[10px] text-neutral-400 block mb-1">Disparadores Claves Activos ({botForm.presets.length})</span>
                  {botForm.presets.length === 0 ? (
                    <p className="text-[11px] text-neutral-400 text-center py-6">No hay palabras claves configuradas. El bot usará siempre respuestas genéricas.</p>
                  ) : (
                    botForm.presets.map((preset, index) => (
                      <div key={index} className="px-3.5 py-3 border border-neutral-100 rounded-xl flex items-center justify-between gap-4 hover:bg-neutral-50">
                        <div className="min-w-0 flex-1 space-y-1">
                          <div className="flex items-center gap-2">
                            <span className="bg-brand-pink/10 text-brand-pink font-mono font-black text-[10px] px-2 py-0.5 rounded-md border border-brand-pink/5">
                              Palabra clave: "{preset.pattern}"
                            </span>
                          </div>
                          <div className="grid grid-cols-2 gap-2 text-[10.5px]">
                            <p className="text-neutral-600 italic truncate"><strong className="text-neutral-400 text-[9px] not-italic mr-1">ES:</strong>{preset.responseEs}</p>
                            <p className="text-neutral-500 italic truncate"><strong className="text-neutral-400 text-[9px] not-italic mr-1">EN:</strong>{preset.responseEn}</p>
                          </div>
                        </div>
                        <button
                          type="button"
                          onClick={() => handleRemovePreset(index)}
                          className="p-1 px-2 hover:bg-red-50 text-red-600 hover:text-red-700 font-bold border border-transparent hover:border-red-100 rounded-lg shrink-0 transition-colors cursor-pointer"
                          title="Eliminar disparador"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    ))
                  )}
                </div>
              </div>
            </div>
          )}

          {/* ==================================================================== */}
          {/* TAB 5: CRM LEADS & RESERVATIONS SYSTEM */}
          {/* ==================================================================== */}
          {activeTab === "crm" && (
            <div className="flex-1 flex overflow-hidden w-full text-xs">
              {/* Leaft list with dynamic CRM cards and Status selectors */}
              <div className="w-full md:w-5/12 border-r border-[#eaeaea] bg-[#faf9f8] flex flex-col overflow-hidden">
                <div className="p-4 border-b border-[#eaeaea] bg-white space-y-3.5 shrink-0">
                  <div className="relative">
                    <Search className="w-3.5 h-3.5 absolute left-3 top-2.5 text-neutral-400" />
                    <input
                      type="text"
                      placeholder="Buscar por cliente, destino..."
                      value={crmSearchStr}
                      onChange={(e) => setCrmSearchStr(e.target.value)}
                      className="w-full pl-8 pr-3 py-2 text-xs border border-brand-pink/15 rounded-xl bg-neutral-50/50 outline-none focus:bg-white focus:ring-1 focus:ring-brand-pink"
                    />
                  </div>
                  <div className="flex gap-1 overflow-x-auto pb-0.5 no-scrollbar">
                    {(["all", "Nuevo", "En Contacto", "Vendido", "Cancelado"] as const).map(st => (
                      <button
                        key={st}
                        onClick={() => setCrmFilterStatus(st)}
                        className={`text-[9px] font-bold px-2.5 py-1.5 rounded-lg border cursor-pointer transition-all ${
                          crmFilterStatus === st 
                            ? "bg-brand-charcoal text-white border-brand-charcoal shadow-sm" 
                            : "bg-white text-neutral-600 border-neutral-200 hover:bg-neutral-50"
                        }`}
                      >
                        {st === "all" ? "Todos" : 
                         st === "Nuevo" ? "🔴 Nuevo" : 
                         st === "En Contacto" ? "🟡 En Contacto" : 
                         st === "Vendido" ? "🟢 Vendido" : "⚪ Cancelado"}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Scroller Leads card */}
                <div className="flex-1 overflow-y-auto p-4 space-y-3.5 no-scrollbar">
                  {filteredLeads.length === 0 ? (
                    <div className="text-center py-12 px-4 space-y-2">
                      <HelpCircle className="w-8 h-8 text-neutral-300 mx-auto" />
                      <p className="text-[11px] text-neutral-400">No hay clientes con estas características.</p>
                    </div>
                  ) : (
                    filteredLeads.map((lead) => (
                      <div 
                        key={lead.id}
                        onClick={() => startEditLead(lead)}
                        className={`p-3.5 rounded-2xl border transition-all cursor-pointer text-left ${
                          selectedLead?.id === lead.id 
                            ? "bg-brand-pink/5 border-brand-pink/40 shadow-xs" 
                            : "bg-white border-neutral-100 hover:border-brand-pink/15 hover:shadow-2xs"
                        }`}
                      >
                        <div className="flex items-center justify-between text-[8px] font-mono mb-1.5">
                          <span className="bg-neutral-100 text-neutral-600 font-bold px-1.5 py-0.5 rounded">
                            {lead.source}
                          </span>
                          <span className="text-neutral-400">{lead.dateCreated}</span>
                        </div>

                        <h4 className="font-display font-bold text-xs text-brand-charcoal flex items-center justify-between">
                          <span>{lead.name}</span>
                          <span className={`text-[9px] font-extrabold uppercase px-2 py-0.5 rounded-md ${
                            lead.status === "Nuevo" ? "bg-red-50 text-red-700 border border-red-100" :
                            lead.status === "En Contacto" ? "bg-amber-50 text-amber-600 border border-amber-100" :
                            lead.status === "Vendido" ? "bg-emerald-50 text-emerald-700 border border-emerald-100" : "bg-neutral-100 text-neutral-500"
                          }`}>
                            {lead.status}
                          </span>
                        </h4>

                        <p className="font-semibold text-neutral-600 text-[10.5px] mt-1.5 flex items-center gap-1">
                          <Compass className="w-3.5 h-3.5 text-neutral-400 shrink-0" />
                          <span className="truncate">{lead.destination}</span>
                        </p>

                        <div className="flex items-center justify-between gap-1 text-[10px] text-neutral-400 mt-2.5 pt-2 border-t border-dashed border-neutral-100">
                          <span>👤 Asignado: {lead.assignedTo || "Sin asignar"}</span>
                          <ChevronRight className="w-3.5 h-3.5 text-neutral-300" />
                        </div>
                      </div>
                    ))
                  )}
                </div>
              </div>

              {/* Right Column edit notes & Status update */}
              <div className="hidden md:flex flex-1 flex-col overflow-y-auto p-6 bg-white shrink-0">
                {!selectedLead ? (
                  <div className="h-full flex flex-col items-center justify-center text-center">
                    <Users className="w-12 h-12 text-emerald-500/25 mb-2.5 animate-bounce-subtle" />
                    <h4 className="font-display font-black text-sm text-brand-charcoal">Ficha de Cliente Integrado</h4>
                    <p className="text-[11px] text-neutral-400 max-w-xs mt-0.5">
                      Toma control de los clientes interesados. Actualiza sus estados, añade apuntes internos de seguimiento y cataloga las ventas de forma directa.
                    </p>
                  </div>
                ) : (
                  <form onSubmit={handleSaveLeadDetail} className="space-y-4">
                    <div className="pb-3 border-b border-neutral-100 flex items-center justify-between shrink-0">
                      <div>
                        <span className="text-[9px] font-mono bg-neutral-100 px-1.5 py-0.5 rounded text-neutral-500">CLIENTE ID: {selectedLead.id}</span>
                        <h3 className="font-display font-black text-xs text-brand-charcoal mt-1">Interesado: {selectedLead.name}</h3>
                      </div>
                      <button 
                        type="button"
                        onClick={() => handleDeleteLead(selectedLead.id, selectedLead.name)}
                        className="text-[10px] font-medium text-red-500 hover:underline cursor-pointer"
                      >
                        Eliminar Lead permanentemente
                      </button>
                    </div>

                    <div className="p-4 bg-neutral-50 rounded-2xl border border-neutral-100 space-y-2">
                      <span className="text-[9px] uppercase font-bold text-neutral-400 block tracking-widest">Información de Entrada Recibida</span>
                      <div className="grid grid-cols-2 gap-3 text-[10.5px]">
                        <p><strong>Teléfono:</strong> <a href={`tel:${selectedLead.phone}`} className="text-brand-pink hover:underline font-semibold font-mono">{selectedLead.phone}</a></p>
                        <p><strong>Email:</strong> <span className="text-neutral-700 font-semibold">{selectedLead.email}</span></p>
                        <p><strong>Destino de Consulta:</strong> <span className="text-neutral-800 font-extrabold">{selectedLead.destination}</span></p>
                        <p><strong>Fecha estimada:</strong> <span className="text-[#f58220] font-bold">{selectedLead.travelDate || "Flexible"}</span></p>
                      </div>
                      {selectedLead.comments && (
                        <div className="mt-2 text-[10px] text-neutral-500 bg-white p-2 rounded-lg border border-neutral-100">
                          <strong>Comentario original:</strong> "{selectedLead.comments}"
                        </div>
                      )}
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      {/* Status Selector */}
                      <div className="space-y-1">
                        <label className="font-black text-neutral-600 block">Etapa del Embudo (Status)</label>
                        <select
                          value={leadStatusVal}
                          onChange={(e) => setLeadStatusVal(e.target.value as any)}
                          className="w-full px-3 py-2 border border-neutral-200 bg-white rounded-xl focus:ring-1 outline-none text-xs"
                        >
                          <option value="Nuevo">🔴 Lead Nuevo</option>
                          <option value="En Contacto">🟡 En Contacto (Seguimiento)</option>
                          <option value="Vendido">🟢 Vendido (Cerrado)</option>
                          <option value="Cancelado">⚪ Cancelado (Archivado)</option>
                        </select>
                      </div>

                      {/* Agent Selector */}
                      <div className="space-y-1">
                        <label className="font-black text-neutral-600 block">Asignar a Representante</label>
                        <input
                          type="text"
                          value={leadAgentVal}
                          onChange={(e) => setLeadAgentVal(e.target.value)}
                          placeholder="Representante Sisari..."
                          className="w-full px-3 py-2 border border-neutral-200 bg-white rounded-xl text-xs"
                        />
                      </div>
                    </div>

                    {/* Follow-up comments notes */}
                    <div className="space-y-1">
                      <label className="font-black text-neutral-600 block">Apuntes de Seguimiento Interno</label>
                      <textarea
                        value={leadNotesVal}
                        onChange={(e) => setLeadNotesVal(e.target.value)}
                        rows={4}
                        placeholder="ej. Llamado a las 3pm. Interesado en tramos de tren. Solicita coordinar hotel de 3 estrellas en Cusco..."
                        className="w-full px-3 py-2 border border-neutral-200 rounded-xl font-mono text-[11px]"
                      />
                    </div>

                    <div className="pt-2 flex justify-end gap-2.5">
                      <button
                        type="button"
                        onClick={() => setSelectedLead(null)}
                        className="px-4 py-2 hover:bg-neutral-50 text-neutral-500 font-bold"
                      >
                        Cerrar Ficha
                      </button>
                      <button
                        type="submit"
                        className="bg-emerald-600 hover:bg-emerald-700 text-white font-extrabold px-5 py-2 rounded-xl flex items-center gap-1 cursor-pointer transition-all active:scale-95 shadow-sm"
                      >
                        <Save className="w-3.5 h-3.5" /> Registrar en CRM
                      </button>
                    </div>
                  </form>
                )}
              </div>
            </div>
          )}

        </div>

        {/* ADMIN FOOTER BAR */}
        <div className="px-6 py-4.5 border-t border-[#eaeaea] bg-neutral-50 shrink-0 flex items-center justify-between flex-wrap gap-4 text-xs">
          <span className="text-neutral-500 font-mono">
            {activeTab === "packages" ? `Paquetes totales en memoria: ${packages.length}` :
             activeTab === "blog" ? `Artículos de Blog en memoria: ${blogPosts.length}` : 
             activeTab === "crm" ? `Historiales registrados en CRM: ${crmLeads.length}` : "Hub de Administración de Sisari Travel"}
          </span>
          
          <div className="flex items-center gap-3">
            <button
              onClick={handleResetEverythingToDefault}
              className="bg-neutral-200 hover:bg-red-50 text-neutral-600 hover:text-red-600 font-bold px-3.5 py-1.5 rounded-xl transition-all cursor-pointer border border-[#eaeaea]"
              title="Restablece toda la base de datos a los valores iniciales"
            >
              ⚠️ Reiniciar Sistema Completo
            </button>
            <button
              onClick={onClose}
              className="bg-brand-charcoal text-white hover:bg-black font-extrabold px-6 py-2 rounded-xl text-xs transition-all cursor-pointer shadow-sm"
            >
              Terminar Sesión de Administrador
            </button>
          </div>
        </div>

      </div>
    </div>
  );
}
